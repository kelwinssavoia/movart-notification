import axios from 'axios';
import { env } from '../config/env';
import { logger } from '../utils/logger';

export interface WhatsAppMessagePayload {
  to: string;
  message: string;
  metadata?: Record<string, unknown>;
}

function normalizePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, '');

  if (!digits) {
    return null;
  }

  if (digits.startsWith('55') && digits.length >= 12) {
    return digits;
  }

  if (digits.length >= 10 && digits.length <= 11) {
    return `55${digits}`;
  }

  return digits.length >= 12 ? digits : null;
}

export function normalizeWhatsAppPhone(phone: string | null | undefined): string | null {
  if (!phone) {
    return null;
  }

  return normalizePhone(phone);
}

function getEvolutionApiUrl(path: 'sendText'): string {
  if (!env.whatsapp.evolutionApiUrl) {
    throw new Error('EVOLUTION_API_URL is required when WhatsApp is enabled');
  }

  if (!env.whatsapp.evolutionInstance) {
    throw new Error('EVOLUTION_INSTANCE is required when WhatsApp is enabled');
  }

  return `${env.whatsapp.evolutionApiUrl.replace(/\/$/, '')}/message/${path}/${env.whatsapp.evolutionInstance}`;
}

async function postEvolutionMessage(
  path: 'sendText',
  body: Record<string, unknown>,
  headers: Record<string, string>
): Promise<void> {
  await axios.post(getEvolutionApiUrl(path), body, {
    headers,
    timeout: env.whatsapp.timeoutMs,
  });
}

export async function sendWhatsAppMessage(payload: WhatsAppMessagePayload): Promise<void> {
  if (!env.whatsapp.enabled) {
    logger.info(`WhatsApp disabled, skipping message to ${payload.to}`);
    return;
  }

  if (env.whatsapp.dryRun) {
    logger.info(`WhatsApp dry run enabled, message prepared for ${payload.to}`);
    logger.debug(payload.message);
    return;
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (!env.whatsapp.evolutionApiKey) {
    throw new Error('EVOLUTION_API_KEY is required when WhatsApp is enabled');
  }

  headers.apikey = env.whatsapp.evolutionApiKey;

  const textBody = {
    number: payload.to,
    text: payload.message,
    delay: 1200,
    metadata: payload.metadata || {},
  };
  try {
    await postEvolutionMessage('sendText', textBody, headers);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error('Evolution API request failed', {
        status: error.response?.status,
        data: error.response?.data,
        dataJson: JSON.stringify(error.response?.data, null, 2),
      });
      throw error;
    } else {
      throw error;
    }
  }

  logger.info(`WhatsApp message sent successfully to ${payload.to}`);
}
