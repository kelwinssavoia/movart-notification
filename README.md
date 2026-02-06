# Seu Fisio Notification System

Sistema de notificações automatizadas para o Seu Fisio via Telegram.

## Funcionalidades

- 🎂 **Aniversariantes do dia** - Diário às 8h
- ⚠️ **Planos encerrando** - Segunda às 8h (configurável)
- 💰 **Faturas atrasadas e vencendo hoje** - Diário às 8h
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
| `CRON_BIRTHDAY` | Cron aniversariantes | `0 8 * * *` |
| `CRON_PLAN_EXPIRATION` | Cron planos | `0 8 * * 1` |
| `CRON_INVOICES` | Cron faturas | `0 8 * * *` |
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
npm run build && npm start     # Produção
```


