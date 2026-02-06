import cron from 'node-cron';
import { env } from '../config/env';
import { getTodayEvents, filterPendingCheckins, formatCheckinMessage } from '../services/eventService';
import { sendMessage, sendErrorAlert } from '../services/telegramService';
import { logger } from '../utils/logger';

// Track already notified events to avoid spam
const notifiedEvents = new Set<number>();

// Clear notified events at midnight
function resetNotifiedEvents(): void {
  notifiedEvents.clear();
  logger.info('Cleared notified events cache');
}

export function startCheckinJob(): void {
  const cronExpression = env.cron.checkin;
  
  logger.info(`Scheduling check-in notification job with cron expression: ${cronExpression}`);
  logger.info(`Check-in config: types=[${env.checkin.allowedTypes.join(', ')}], statuses=[${env.checkin.allowedStatuses.join(', ')}], minutesAfter=${env.checkin.minutesAfterStart}`);
  
  // Schedule midnight reset
  cron.schedule('0 0 * * *', resetNotifiedEvents);
  
  cron.schedule(cronExpression, async () => {
    logger.info('Running check-in notification job');
    
    try {
      const events = await getTodayEvents();
      const pending = filterPendingCheckins(events);
      
      // Filter out already notified events
      const newPending = pending.filter(p => !notifiedEvents.has(p.id));
      
      if (newPending.length > 0) {
        const message = formatCheckinMessage(newPending);
        if (message) {
          await sendMessage(message);
        }
        
        // Mark as notified
        newPending.forEach(p => notifiedEvents.add(p.id));
        logger.info(`Check-in job completed. Notified ${newPending.length} new pending check-ins`);
      } else {
        logger.info('Check-in job completed. No new pending check-ins to notify');
      }
    } catch (error) {
      logger.error('Check-in notification job failed', error);
      await sendErrorAlert('Notificação de Check-in', error as Error);
    }
  });
  
  logger.info('Check-in job scheduled successfully');
}

// Manual trigger for testing
export async function runCheckinJobNow(): Promise<void> {
  logger.info('Manually triggering check-in notification job');
  
  try {
    const events = await getTodayEvents();
    const pending = filterPendingCheckins(events);
    
    if (pending.length > 0) {
      const message = formatCheckinMessage(pending);
      if (message) {
        await sendMessage(message);
      }
    }
    
    logger.info(`Manual check-in notification completed. Found ${pending.length} pending check-ins`);
  } catch (error) {
    logger.error('Manual check-in notification failed', error);
    await sendErrorAlert('Notificação de Check-in (Manual)', error as Error);
    throw error;
  }
}

