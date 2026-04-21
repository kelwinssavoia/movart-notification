import dotenv from 'dotenv';

dotenv.config();

function getEnvVar(name: string, required = true): string {
  const value = process.env[name];
  if (required && !value) {
    throw new Error(`Environment variable ${name} is required but not set`);
  }
  return value || '';
}

export const env = {
  // Seu Fisio API
  seufisio: {
    username: getEnvVar('SEUFISIO_USERNAME'),
    password: getEnvVar('SEUFISIO_PASSWORD'),
    clientSecret: getEnvVar('SEUFISIO_CLIENT_SECRET'),
    studioId: getEnvVar('SEUFISIO_STUDIO_ID'),
    baseUrl: 'https://api.seufisio.com.br',
    versionApp: getEnvVar('SEUFISIO_VERSION_APP', false) || '22',
  },

  // Telegram
  telegram: {
    botToken: getEnvVar('TELEGRAM_BOT_TOKEN'),
    channelId: getEnvVar('TELEGRAM_CHANNEL_ID'),
  },

  // WhatsApp
  whatsapp: {
    enabled: (getEnvVar('WHATSAPP_ENABLED', false) || 'false').toLowerCase() === 'true',
    timeoutMs: parseInt(getEnvVar('WHATSAPP_TIMEOUT_MS', false) || '15000', 10),
    businessName: getEnvVar('WHATSAPP_BUSINESS_NAME', false) || 'MovArt',
    contactPhone: getEnvVar('WHATSAPP_CONTACT_PHONE', false),
    paymentUrl: getEnvVar('WHATSAPP_PAYMENT_URL', false),
    pixKey: getEnvVar('WHATSAPP_PIX_KEY', false) || '59.697.431/0001-00',
    dryRun: (getEnvVar('WHATSAPP_DRY_RUN', false) || 'false').toLowerCase() === 'true',
    evolutionApiUrl: getEnvVar('EVOLUTION_API_URL', false),
    evolutionApiKey: getEnvVar('EVOLUTION_API_KEY', false),
    evolutionInstance: getEnvVar('EVOLUTION_INSTANCE', false),
    webhookPort: parseInt(getEnvVar('WHATSAPP_WEBHOOK_PORT', false) || '3333', 10),
    webhookPath: getEnvVar('WHATSAPP_WEBHOOK_PATH', false) || '/webhooks/whatsapp',
  },

  // Plan Expiration Settings
  planExpirationDays: parseInt(getEnvVar('PLAN_EXPIRATION_DAYS', false) || '14', 10),

  // Checkin Settings
  checkin: {
    allowedTypes: (getEnvVar('CHECKIN_ALLOWED_TYPES', false) || 'Pilates 1x na Semana,Pilates 2x na Semana,Pilates 3x na Semana').split(',').map(s => s.trim()),
    allowedStatuses: (getEnvVar('CHECKIN_ALLOWED_STATUSES', false) || '1').split(',').map(s => parseInt(s.trim(), 10)),
    minutesAfterStart: parseInt(getEnvVar('CHECKIN_MINUTES_AFTER_START', false) || '10', 10),
  },

  // Cron Schedules
  cron: {
    birthday: getEnvVar('CRON_BIRTHDAY', false) || '0 8 * * *',
    planExpiration: getEnvVar('CRON_PLAN_EXPIRATION', false) || '0 8 * * 1', // Every Monday at 8am
    invoices: getEnvVar('CRON_INVOICES', false) || '0 8 * * *', // Every day at 8am
    whatsappReminders: getEnvVar('CRON_WHATSAPP_REMINDERS', false) || '0 9 * * *', // Every day at 9am
    checkin: getEnvVar('CRON_CHECKIN', false) || '*/5 * * * *', // Every 5 minutes
  },
};
