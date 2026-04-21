import { env } from './config/env';
import { startBirthdayJob, runBirthdayJobNow } from './jobs/birthdayJob';
import { startPlanExpirationJob, runPlanExpirationJobNow } from './jobs/planExpirationJob';
import { startInvoiceJob, runInvoiceJobNow } from './jobs/invoiceJob';
import { startCheckinJob, runCheckinJobNow } from './jobs/checkinJob';
import {
  startWhatsAppReminderJob,
  runWhatsAppReminderJobNow,
  runWhatsAppReminderTestForCustomer,
} from './jobs/whatsappReminderJob';
import { startWhatsAppWebhookServer } from './services/whatsappWebhookService';
import { logger } from './utils/logger';

function getArgValue(flagName: string): string | null {
  const exactPrefix = `${flagName}=`;
  const exactMatch = process.argv.find((arg) => arg.startsWith(exactPrefix));

  if (exactMatch) {
    return exactMatch.slice(exactPrefix.length);
  }

  const flagIndex = process.argv.findIndex((arg) => arg === flagName);
  if (flagIndex >= 0) {
    return process.argv[flagIndex + 1] || null;
  }

  return null;
}

async function main(): Promise<void> {
  logger.info('='.repeat(50));
  logger.info('Seu Fisio Notification System Starting...');
  logger.info('='.repeat(50));

  // Check if running in test mode (immediate execution)
  const testBirthday = process.argv.includes('--test-birthday');
  const testPlanExpiration = process.argv.includes('--test-plans');
  const testInvoices = process.argv.includes('--test-invoices');
  const testCheckin = process.argv.includes('--test-checkin');
  const testWhatsAppReminders = process.argv.includes('--test-whatsapp-reminders');
  const testWhatsAppCustomerId = getArgValue('--test-whatsapp-customer-id');
  const testWhatsAppWebhookSample = process.argv.includes('--test-whatsapp-webhook-sample');
  const testAll = process.argv.includes('--test');
  const hasCustomerTest = !!testWhatsAppCustomerId;

  if (testBirthday || testPlanExpiration || testInvoices || testCheckin || testWhatsAppReminders || hasCustomerTest || testWhatsAppWebhookSample || testAll) {
    logger.info('Running in TEST MODE - executing jobs immediately');
    
    try {
      if (testBirthday || testAll) {
        logger.info('Testing birthday notifications...');
        await runBirthdayJobNow();
      }
      
      if (testPlanExpiration || testAll) {
        logger.info('Testing plan expiration notifications...');
        await runPlanExpirationJobNow();
      }
      
      if (testInvoices || testAll) {
        logger.info('Testing invoice notifications...');
        await runInvoiceJobNow();
      }
      
      if (testCheckin || testAll) {
        logger.info('Testing check-in notifications...');
        await runCheckinJobNow();
      }

      if (testWhatsAppReminders || testAll) {
        logger.info('Testing WhatsApp reminders...');
        await runWhatsAppReminderJobNow();
      }

      if (hasCustomerTest) {
        const customerId = Number(testWhatsAppCustomerId);

        if (Number.isNaN(customerId) || customerId <= 0) {
          throw new Error('--test-whatsapp-customer-id must be a valid numeric customer id');
        }

        logger.info(`Testing WhatsApp reminder for customer ${customerId}...`);
        await runWhatsAppReminderTestForCustomer(customerId);
      }

      if (testWhatsAppWebhookSample) {
        logger.info('Testing WhatsApp webhook sample parser...');
        await import('./tests/whatsappWebhookSample');
      }
      
      logger.info('Test execution completed');
      process.exit(0);
    } catch (error) {
      logger.error('Test execution failed', error);
      process.exit(1);
    }
  } else {
    // Start all scheduled jobs
    startBirthdayJob();
    startPlanExpirationJob();
    startInvoiceJob();
    startCheckinJob();
    startWhatsAppReminderJob();
    startWhatsAppWebhookServer();
    
    logger.info('All jobs scheduled. System is running...');
    logger.info(`Birthday notifications: ${env.cron.birthday}`);
    logger.info(`Plan expiration notifications: ${env.cron.planExpiration} (${env.planExpirationDays} days threshold)`);
    logger.info(`Invoice notifications: ${env.cron.invoices}`);
    logger.info(`Check-in notifications: ${env.cron.checkin} (${env.checkin.minutesAfterStart}min after start)`);
    logger.info(`WhatsApp reminders: ${env.cron.whatsappReminders} (enabled=${env.whatsapp.enabled}, dryRun=${env.whatsapp.dryRun})`);
    logger.info(`WhatsApp webhook: http://localhost:${env.whatsapp.webhookPort}${env.whatsapp.webhookPath}`);
    logger.info('='.repeat(50));
    
    // Keep the process alive
    process.on('SIGINT', () => {
      logger.info('Shutting down notification system...');
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      logger.info('Shutting down notification system...');
      process.exit(0);
    });
  }
}

main().catch((error) => {
  logger.error('Fatal error during startup', error);
  process.exit(1);
});
