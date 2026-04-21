import cron from 'node-cron';
import { env } from '../config/env';
import {
  buildCustomerReminderBatch,
  formatCustomerReminderMessage,
  formatPixKeyMessage,
  getUnpaidInvoices,
} from '../services/invoiceService';
import { normalizeWhatsAppPhone, sendWhatsAppMessage } from '../services/whatsappService';
import { logger } from '../utils/logger';

async function executeWhatsAppReminderJob(customerId?: number): Promise<void> {
  const invoices = await getUnpaidInvoices();
  const filteredInvoices = customerId
    ? invoices.filter((invoice) => invoice.cliente.id === customerId)
    : invoices;
  const batch = buildCustomerReminderBatch(filteredInvoices);

  const failedCustomers: string[] = [];
  const skippedCustomers = batch.customersWithoutPhone.map((customer) => customer.customerName);
  let sentCount = 0;

  if (customerId && batch.customers.length === 0 && batch.customersWithoutPhone.length === 0) {
    throw new Error(`No due or overdue invoices found for customer ${customerId}`);
  }

  for (const customer of batch.customers) {
    const normalizedPhone = normalizeWhatsAppPhone(customer.phone);

    if (!normalizedPhone) {
      skippedCustomers.push(customer.customerName);
      logger.warn(`Skipping WhatsApp reminder for ${customer.customerName}: invalid phone`);
      continue;
    }

    try {
      await sendWhatsAppMessage({
        to: normalizedPhone,
        message: formatCustomerReminderMessage(customer),
        metadata: {
          source: 'seufisio-invoice-reminder',
          customerId: customer.clienteId,
          invoiceIds: customer.invoices.map((invoice) => invoice.id),
          overdueCount: customer.overdueInvoices.length,
          dueTodayCount: customer.dueTodayInvoices.length,
        },
      });

      if (!env.whatsapp.paymentUrl) {
        await sendWhatsAppMessage({
          to: normalizedPhone,
          message: formatPixKeyMessage(),
          metadata: {
            source: 'seufisio-pix-key',
            customerId: customer.clienteId,
          },
        });
      }

      sentCount++;
    } catch (error) {
      failedCustomers.push(customer.customerName);
      logger.error(`Failed to send WhatsApp reminder to ${customer.customerName}`, error);
    }
  }

  logger.info('WhatsApp reminder job summary', {
    totalCustomers: batch.customers.length,
    sentCount,
    skippedCount: skippedCustomers.length,
    failedCount: failedCustomers.length,
    skippedCustomers,
    failedCustomers,
  });
}

export function startWhatsAppReminderJob(): void {
  const cronExpression = env.cron.whatsappReminders;

  logger.info(`Scheduling WhatsApp reminder job with cron expression: ${cronExpression} (timezone: America/Sao_Paulo)`);

  cron.schedule(cronExpression, async () => {
    logger.info('Running WhatsApp reminder job');

    try {
      await executeWhatsAppReminderJob();
      logger.info('WhatsApp reminder job completed');
    } catch (error) {
      logger.error('WhatsApp reminder job failed', error);
    }
  }, {
    timezone: 'America/Sao_Paulo',
  });

  logger.info('WhatsApp reminder job scheduled successfully');
}

export async function runWhatsAppReminderJobNow(): Promise<void> {
  logger.info('Manually triggering WhatsApp reminder job');

  try {
    await executeWhatsAppReminderJob();
    logger.info('Manual WhatsApp reminder job completed');
  } catch (error) {
    logger.error('Manual WhatsApp reminder job failed', error);
    throw error;
  }
}

export async function runWhatsAppReminderTestForCustomer(customerId: number): Promise<void> {
  logger.info(`Manually triggering WhatsApp reminder test for customer ${customerId}`);

  try {
    await executeWhatsAppReminderJob(customerId);
    logger.info(`Manual WhatsApp reminder test completed for customer ${customerId}`);
  } catch (error) {
    logger.error(`Manual WhatsApp reminder test failed for customer ${customerId}`, error);
    throw error;
  }
}
