import { parseEvolutionWebhookPayload } from '../services/whatsappWebhookService';

const samplePayload = {
  message: {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: {
            text: '*Lembrete de pagamento*\n\nOlá Kelwin, tudo bem?',
          },
          footer: {
            text: 'MovArt: Voce e a Arte que se Move',
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'quick_reply',
                buttonParamsJson: '{"display_text":"Ja paguei","id":"paid:216"}',
              },
              {
                name: 'quick_reply',
                buttonParamsJson: '{"display_text":"Falar com a MovArt","id":"support:216"}',
              },
            ],
            messageParamsJson: '{"from":"api","templateId":"c2f00003-3b04-4009-8a79-345a3c7dea42"}',
          },
        },
      },
    },
    key: {
      remoteJid: '5511970231208@s.whatsapp.net',
    },
  },
};

console.log(JSON.stringify(parseEvolutionWebhookPayload(samplePayload), null, 2));
