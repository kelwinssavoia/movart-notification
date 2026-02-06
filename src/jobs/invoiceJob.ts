import cron from 'node-cron';
import { env } from '../config/env';
import { getUnpaidInvoices, categorizeInvoices, formatInvoiceMessage } from '../services/invoiceService';
import { sendMessage, sendErrorAlert } from '../services/telegramService';
import { logger } from '../utils/logger';

export function startInvoiceJob(): void {
  const cronExpression = env.cron.invoices;
  
  logger.info(`Scheduling invoice notification job with cron expression: ${cronExpression}`);
  
  cron.schedule(cronExpression, async () => {
    logger.info('Running invoice notification job');
    
    try {
      const invoices = await getUnpaidInvoices();
      const categorized = categorizeInvoices(invoices);
      
      // Only send message if there are overdue or due today invoices
      if (categorized.overdue.length > 0 || categorized.dueToday.length > 0) {
        const message = formatInvoiceMessage(categorized);
        await sendMessage(message);
        logger.info(`Invoice job completed. Overdue: ${categorized.overdue.length}, Due today: ${categorized.dueToday.length}`);
      } else {
        logger.info('Invoice job completed. No overdue or due today invoices found.');
      }
    } catch (error) {
      logger.error('Invoice notification job failed', error);
      
      // Send error alert but don't throw - this prevents affecting other jobs
      await sendErrorAlert('Notificação de Faturas', error as Error);
    }
  });
  
  logger.info('Invoice job scheduled successfully');
}

// Manual trigger for testing
export async function runInvoiceJobNow(): Promise<void> {
  logger.info('Manually triggering invoice notification job');
  
  try {
    const invoices = await getUnpaidInvoices();
    const categorized = categorizeInvoices(invoices);
    const message = formatInvoiceMessage(categorized);
    await sendMessage(message);
    
    logger.info(`Manual invoice notification completed. Overdue: ${categorized.overdue.length}, Due today: ${categorized.dueToday.length}`);
  } catch (error) {
    logger.error('Manual invoice notification failed', error);
    await sendErrorAlert('Notificação de Faturas (Manual)', error as Error);
    throw error;
  }
}
