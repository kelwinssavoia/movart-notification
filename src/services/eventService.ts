import axios from 'axios';
import { env } from '../config/env';
import { getAccessToken } from './authService';
import { logger } from '../utils/logger';

interface Event {
  id: number;
  status_id: number;
  isAtendimento: number;
  title: string;
  cliente_id: number;
  start: string;
  end: string;
  confirmado: number;
  tipo_atendimento_nome: string;
  profissional_nome: string;
  sala_nome: string;
}

interface EventsResponse {
  events: Event[];
}

export interface PendingCheckin {
  id: number;
  clientName: string;
  clienteId: number;
  startTime: string;
  endTime: string;
  appointmentType: string;
  professional: string;
  room: string;
  minutesOverdue: number;
}

/**
 * Get today's events from the API
 */
export async function getTodayEvents(): Promise<Event[]> {
  const token = await getAccessToken();
  
  // Get start and end of today in Unix timestamp
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  
  const startTimestamp = Math.floor(startOfDay.getTime() / 1000);
  const endTimestamp = Math.floor(endOfDay.getTime() / 1000);
  
  logger.info(`Fetching events from ${startOfDay.toISOString()} to ${endOfDay.toISOString()}`);
  
  try {
    const response = await axios.get<EventsResponse>(
      `${env.seufisio.baseUrl}/api/eventos`,
      {
        params: {
          start: startTimestamp,
          end: endTimestamp,
          is_minha_agenda: 0,
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          'SetFisio': env.seufisio.studioId,
          'x-version-app': '22',
          'acesso': 'web-desktop',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
        },
      }
    );
    
    const events = response.data.events || [];
    logger.info(`Fetched ${events.length} events for today`);
    
    return events;
  } catch (error) {
    logger.error('Failed to fetch events', error);
    throw new Error('Failed to fetch events from Seu Fisio API');
  }
}

/**
 * Filter events that need check-in notification
 */
export function filterPendingCheckins(events: Event[]): PendingCheckin[] {
  const now = new Date();
  const minutesThreshold = env.checkin.minutesAfterStart;
  const allowedTypes = env.checkin.allowedTypes;
  const allowedStatuses = env.checkin.allowedStatuses;
  
  logger.debug(`Filtering events with: types=${allowedTypes.join(',')}, statuses=${allowedStatuses.join(',')}, minutesAfter=${minutesThreshold}`);
  
  const pending: PendingCheckin[] = [];
  
  for (const event of events) {
    // Skip non-appointments
    if (event.isAtendimento !== 1) continue;
    
    // Check if status is allowed
    if (!allowedStatuses.includes(event.status_id)) continue;
    
    // Check if type is allowed
    if (!allowedTypes.includes(event.tipo_atendimento_nome)) continue;
    
    // Skip if already confirmed (check-in done)
    if (event.confirmado === 1) continue;
    
    // Check if event has started and threshold time has passed
    const eventStart = new Date(event.start.replace(' ', 'T') + '-03:00'); // Assuming Brazil timezone
    const minutesSinceStart = (now.getTime() - eventStart.getTime()) / (1000 * 60);
    
    // Only alert if event started and threshold passed, but event hasn't ended
    const eventEnd = new Date(event.end.replace(' ', 'T') + '-03:00');
    if (minutesSinceStart >= minutesThreshold && now < eventEnd) {
      pending.push({
        id: event.id,
        clientName: event.title,
        clienteId: event.cliente_id,
        startTime: event.start,
        endTime: event.end,
        appointmentType: event.tipo_atendimento_nome,
        professional: event.profissional_nome,
        room: event.sala_nome,
        minutesOverdue: Math.floor(minutesSinceStart),
      });
    }
  }
  
  logger.info(`Found ${pending.length} events pending check-in`);
  return pending;
}

/**
 * Format pending check-ins message for Telegram
 * Returns null if no pending check-ins (don't send any message)
 */
export function formatCheckinMessage(pendingCheckins: PendingCheckin[]): string | null {
  if (pendingCheckins.length === 0) {
    return null; // Don't send message when everyone checked in
  }
  
  let message = `⚠️ <b>CHECK-IN PENDENTE</b> (${pendingCheckins.length})\n\n`;
  
  // Sort by start time
  const sorted = [...pendingCheckins].sort((a, b) => 
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
  
  for (const item of sorted) {
    const startTime = item.startTime.split(' ')[1]?.substring(0, 5) || item.startTime;
    message += `🔴 <b>${item.clientName}</b>\n`;
    message += `   ⏰ ${startTime} (${item.minutesOverdue}min atrás)\n`;
    message += `   📋 ${item.appointmentType}\n`;
    message += `   🏠 ${item.room}\n\n`;
  }
  
  return message;
}
