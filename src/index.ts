import { env } from './config/env';
import { startBirthdayJob, runBirthdayJobNow } from './jobs/birthdayJob';
import { startPlanExpirationJob, runPlanExpirationJobNow } from './jobs/planExpirationJob';
import { startInvoiceJob, runInvoiceJobNow } from './jobs/invoiceJob';
import { startCheckinJob, runCheckinJobNow } from './jobs/checkinJob';
import { logger } from './utils/logger';

async function main(): Promise<void> {
  logger.info('='.repeat(50));
  logger.info('Seu Fisio Notification System Starting...');
  logger.info('='.repeat(50));

  // Check if running in test mode (immediate execution)
  const testBirthday = process.argv.includes('--test-birthday');
  const testPlanExpiration = process.argv.includes('--test-plans');
  const testInvoices = process.argv.includes('--test-invoices');
  const testCheckin = process.argv.includes('--test-checkin');
  const testAll = process.argv.includes('--test');

  if (testBirthday || testPlanExpiration || testInvoices || testCheckin || testAll) {
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
    
    logger.info('All jobs scheduled. System is running...');
    logger.info(`Birthday notifications: ${env.cron.birthday}`);
    logger.info(`Plan expiration notifications: ${env.cron.planExpiration} (${env.planExpirationDays} days threshold)`);
    logger.info(`Invoice notifications: ${env.cron.invoices}`);
    logger.info(`Check-in notifications: ${env.cron.checkin} (${env.checkin.minutesAfterStart}min after start)`);
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
