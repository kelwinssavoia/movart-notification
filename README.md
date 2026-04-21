# Seu Fisio Notification System

Sistema de notificações automatizadas para o Seu Fisio via Telegram e WhatsApp.

## Funcionalidades

- 🎂 **Aniversariantes do dia** - Diário às 8h
- ⚠️ **Planos encerrando** - Segunda às 8h (configurável)
- 💰 **Faturas atrasadas e vencendo hoje** - Diário às 8h
- 📲 **Lembretes de cobrança por WhatsApp (somente vencendo hoje)** - Diário às 9h (São Paulo)
- 📋 **Check-in pendente** - A cada 5 minutos (configurável)

## Instalação

```bash
npm install
cp .env.example .env
# Editar .env com suas credenciais
```

## Configuração

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `SEUFISIO_USERNAME` | Email de login | - |
| `SEUFISIO_PASSWORD` | Senha | - |
| `SEUFISIO_CLIENT_SECRET` | Client secret da API | - |
| `SEUFISIO_STUDIO_ID` | ID do estúdio | - |
| `TELEGRAM_BOT_TOKEN` | Token do bot Telegram | - |
| `TELEGRAM_CHANNEL_ID` | ID do canal | - |
| `WHATSAPP_ENABLED` | Ativa envio por WhatsApp | `false` |
| `EVOLUTION_API_URL` | URL base da Evolution API | - |
| `EVOLUTION_API_KEY` | API key da Evolution API | - |
| `EVOLUTION_INSTANCE` | Nome da instância conectada | - |
| `WHATSAPP_WEBHOOK_PORT` | Porta do webhook local | `3333` |
| `WHATSAPP_WEBHOOK_PATH` | Caminho do webhook local | `/webhooks/whatsapp` |
| `WHATSAPP_TIMEOUT_MS` | Timeout da chamada HTTP | `15000` |
| `WHATSAPP_BUSINESS_NAME` | Nome exibido nas mensagens | `MovArt` |
| `WHATSAPP_CONTACT_PHONE` | Telefone para retorno na mensagem | - |
| `WHATSAPP_PAYMENT_URL` | Link de pagamento opcional | - |
| `WHATSAPP_PIX_KEY` | Chave PIX enviada na mensagem | `59.697.431/0001-00` |
| `WHATSAPP_DRY_RUN` | Monta/loga mensagens sem enviar | `false` |
| `CRON_BIRTHDAY` | Cron aniversariantes | `0 8 * * *` |
| `CRON_PLAN_EXPIRATION` | Cron planos | `0 8 * * 1` |
| `CRON_INVOICES` | Cron faturas | `0 8 * * *` |
| `CRON_WHATSAPP_REMINDERS` | Cron lembretes WhatsApp | `0 9 * * *` |
| `CRON_CHECKIN` | Cron check-in | `*/5 * * * *` |
| `PLAN_EXPIRATION_DAYS` | Dias antecedência | `14` |
| `CHECKIN_ALLOWED_TYPES` | Tipos permitidos | `Pilates 1x,2x,3x na Semana` |
| `CHECKIN_ALLOWED_STATUSES` | Status IDs | `1` |
| `CHECKIN_MINUTES_AFTER_START` | Minutos após início | `10` |

## Uso

```bash
npm run dev                    # Inicia cronjobs
npm run dev -- --test          # Testa todas
npm run dev -- --test-birthday # Aniversariantes
npm run dev -- --test-plans    # Planos
npm run dev -- --test-invoices # Faturas
npm run dev -- --test-checkin  # Check-in
npm run dev -- --test-whatsapp-reminders # Lembretes WhatsApp
npm run dev -- --test-whatsapp-customer-id=123 # Teste de um cliente específico
npm run dev -- --test-whatsapp-webhook-sample # Teste do parser do webhook
npm run build && npm start     # Produção
```

## WhatsApp

O job de WhatsApp reutiliza as faturas em aberto do Seu Fisio e envia um lembrete consolidado por cliente somente para cobranças vencendo hoje.

O envio agora é feito pela Evolution API no endpoint:

```text
POST {EVOLUTION_API_URL}/message/sendButtons/{EVOLUTION_INSTANCE}
```

Com o body:

```json
{
  "number": "5511999999999",
  "title": "Lembrete de pagamento",
  "description": "Olá, Cliente! ...",
  "footer": "MovArt: Voce e a Arte que se Move",
  "buttons": [
    {
      "id": "paid:123",
      "title": "Ja paguei",
      "displayText": "Ja paguei"
    },
    {
      "id": "support:123",
      "title": "Falar com a MovArt",
      "displayText": "Falar com a MovArt"
    }
  ],
  "delay": 1200
}
```

Se quiser validar o fluxo sem disparar mensagem real, use `WHATSAPP_DRY_RUN=true`.

## Webhook WhatsApp

O projeto agora também expõe um webhook local para receber eventos da Evolution API e entender respostas dos botões.

- URL padrão: `http://localhost:3333/webhooks/whatsapp`
- Campos suportados:
  - `viewOnceMessage.message.interactiveMessage`
  - `interactiveResponseMessage.nativeFlowResponseMessage`
  - `buttonsResponseMessage`

Quando o cliente responder aos botões, o sistema reconhece IDs como:

- `paid:<clienteId>`
- `support:<clienteId>`
