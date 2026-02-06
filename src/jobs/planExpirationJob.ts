import cron from 'node-cron';
import { env } from '../config/env';
import { getAllActiveContracts, getExpiringContracts, formatExpiringContractsMessage } from '../services/contractService';
import { sendMessage, sendErrorAlert } from '../services/telegramService';
import { logger } from '../utils/logger';

export function startPlanExpirationJob(): void {
  const cronExpression = env.cron.planExpiration;
  const daysThreshold = env.planExpirationDays;
  
  logger.info(`Scheduling plan expiration job with cron expression: ${cronExpression}`);
  logger.info(`Will notify for plans expiring within ${daysThreshold} days`);
  
  cron.schedule(cronExpression, async () => {
    logger.info('Running plan expiration notification job');
    
    try {
      const allContracts = await getAllActiveContracts();
      const expiringContracts = getExpiringContracts(allContracts, daysThreshold);
      const message = formatExpiringContractsMessage(expiringContracts, daysThreshold);
      await sendMessage(message);
      
      logger.info(`Plan expiration job completed. Found ${expiringContracts.length} expiring contracts.`);
    } catch (error) {
      logger.error('Plan expiration notification job failed', error);
      
      // Send error alert but don't throw - this prevents affecting other jobs
      await sendErrorAlert('Notificação de Planos Encerrando', error as Error);
    }
  });
  
  logger.info('Plan expiration job scheduled successfully');
}

// Manual trigger for testing
export async function runPlanExpirationJobNow(): Promise<void> {
  const daysThreshold = env.planExpirationDays;
  
  logger.info(`Manually triggering plan expiration notification job (${daysThreshold} days threshold)`);
  
  try {
    const allContracts = await getAllActiveContracts();
    const expiringContracts = getExpiringContracts(allContracts, daysThreshold);
    const message = formatExpiringContractsMessage(expiringContracts, daysThreshold);
    await sendMessage(message);
    
    logger.info(`Manual plan expiration notification completed. Found ${expiringContracts.length} expiring contracts.`);
  } catch (error) {
    logger.error('Manual plan expiration notification failed', error);
    await sendErrorAlert('Notificação de Planos Encerrando (Manual)', error as Error);
    throw error;
  }
}
