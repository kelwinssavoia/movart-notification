import cron from 'node-cron';
import { env } from '../config/env';
import { getTodayBirthdays, formatBirthdayMessage } from '../services/birthdayService';
import { sendMessage, sendErrorAlert } from '../services/telegramService';
import { logger } from '../utils/logger';

export function startBirthdayJob(): void {
  const cronExpression = env.cron.birthday;
  
  logger.info(`Scheduling birthday job with cron expression: ${cronExpression}`);
  
  cron.schedule(cronExpression, async () => {
    logger.info('Running birthday notification job');
    
    try {
      const birthdays = await getTodayBirthdays();
      const message = formatBirthdayMessage(birthdays);
      await sendMessage(message);
      
      logger.info('Birthday notification job completed successfully');
    } catch (error) {
      logger.error('Birthday notification job failed', error);
      
      // Send error alert but don't throw - this prevents affecting other jobs
      await sendErrorAlert('Notificação de Aniversariantes', error as Error);
    }
  });
  
  logger.info('Birthday job scheduled successfully');
}

// Manual trigger for testing
export async function runBirthdayJobNow(): Promise<void> {
  logger.info('Manually triggering birthday notification job');
  
  try {
    const birthdays = await getTodayBirthdays();
    const message = formatBirthdayMessage(birthdays);
    await sendMessage(message);
    
    logger.info('Manual birthday notification completed successfully');
  } catch (error) {
    logger.error('Manual birthday notification failed', error);
    await sendErrorAlert('Notificação de Aniversariantes (Manual)', error as Error);
    throw error;
  }
}
