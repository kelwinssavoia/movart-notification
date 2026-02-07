import axios from 'axios';
import { env } from '../config/env';
import { logger } from '../utils/logger';

const TELEGRAM_API_URL = `https://api.telegram.org/bot${env.telegram.botToken}`;

export async function sendMessage(message: string): Promise<boolean> {
  try {
    logger.debug(`Sending message to channel: ${env.telegram.channelId}`);
    await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: env.telegram.channelId,
      text: message,
      parse_mode: 'HTML',
    });
    
    logger.info('Telegram message sent successfully');
    return true;
  } catch (error) {
    logger.error('Failed to send Telegram message', error);
    throw error;
  }
}

export async function sendErrorAlert(context: string, error: Error): Promise<void> {
  const errorMessage = `
⚠️ <b>ERRO NO SISTEMA DE NOTIFICAÇÕES</b>

<b>Contexto:</b> ${context}
<b>Erro:</b> ${error.message}
<b>Horário:</b> ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
`.trim();

  try {
    await sendMessage(errorMessage);
  } catch (sendError) {
    // Log error but don't throw - we don't want to fail silently but also can't do much if Telegram is down
    logger.error('Failed to send error alert to Telegram', sendError);
  }
}
