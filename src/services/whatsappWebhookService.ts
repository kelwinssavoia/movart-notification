import http, { IncomingMessage, ServerResponse } from 'http';
import { env } from '../config/env';
import { logger } from '../utils/logger';

interface EvolutionButtonDefinition {
  name?: string;
  buttonParamsJson?: string;
}

interface ParsedWhatsAppAction {
  kind: 'button-definition' | 'button-reply';
  buttonId: string;
  displayText?: string;
  from?: string;
  rawType: string;
}

function safeJsonParse<T>(value: string | undefined | null): T | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function getMessageRoot(payload: any): any {
  return payload?.data?.message || payload?.message || payload?.data || payload;
}

function getInteractiveMessage(messageRoot: any): any {
  return (
    messageRoot?.viewOnceMessage?.message?.interactiveMessage ||
    messageRoot?.interactiveMessage ||
    null
  );
}

function extractButtonDefinitions(messageRoot: any, from?: string): ParsedWhatsAppAction[] {
  const interactiveMessage = getInteractiveMessage(messageRoot);
  const buttons: EvolutionButtonDefinition[] = interactiveMessage?.nativeFlowMessage?.buttons || [];
  const actions: ParsedWhatsAppAction[] = [];

  for (const button of buttons) {
    const params = safeJsonParse<{ id?: string; display_text?: string }>(button.buttonParamsJson);
    if (!params?.id) {
      continue;
    }

    actions.push({
      kind: 'button-definition',
      buttonId: params.id,
      displayText: params.display_text,
      from,
      rawType: button.name || 'unknown',
    });
  }

  return actions;
}

function extractButtonReply(messageRoot: any, from?: string): ParsedWhatsAppAction | null {
  const nativeFlowResponse =
    messageRoot?.interactiveResponseMessage?.nativeFlowResponseMessage ||
    messageRoot?.viewOnceMessage?.message?.interactiveResponseMessage?.nativeFlowResponseMessage ||
    null;

  const responseParams = safeJsonParse<{ id?: string; display_text?: string }>(nativeFlowResponse?.paramsJson);
  if (responseParams?.id) {
    return {
      kind: 'button-reply',
      buttonId: responseParams.id,
      displayText: responseParams.display_text,
      from,
      rawType: 'nativeFlowResponseMessage',
    };
  }

  const buttonReply =
    messageRoot?.buttonsResponseMessage ||
    messageRoot?.templateButtonReplyMessage ||
    messageRoot?.viewOnceMessage?.message?.buttonsResponseMessage ||
    null;

  const selectedId = buttonReply?.selectedButtonId || buttonReply?.selectedId;
  const selectedText = buttonReply?.selectedDisplayText;

  if (!selectedId) {
    return null;
  }

  return {
    kind: 'button-reply',
    buttonId: selectedId,
    displayText: selectedText,
    from,
    rawType: buttonReply?.constructor?.name || 'buttonsResponseMessage',
  };
}

export function parseEvolutionWebhookPayload(payload: any): ParsedWhatsAppAction[] {
  const messageRoot = getMessageRoot(payload);
  const from =
    messageRoot?.key?.remoteJid ||
    payload?.data?.key?.remoteJid ||
    payload?.sender ||
    payload?.data?.sender ||
    undefined;

  const actions: ParsedWhatsAppAction[] = [];
  const buttonReply = extractButtonReply(messageRoot, from);
  if (buttonReply) {
    actions.push(buttonReply);
  }

  actions.push(...extractButtonDefinitions(messageRoot, from));
  return actions;
}

async function readJsonBody(req: IncomingMessage): Promise<any> {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const rawBody = Buffer.concat(chunks).toString('utf8');
  return rawBody ? JSON.parse(rawBody) : {};
}

function sendJson(res: ServerResponse, statusCode: number, body: Record<string, unknown>): void {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function handleParsedAction(action: ParsedWhatsAppAction): void {
  if (action.kind === 'button-reply') {
    if (action.buttonId.startsWith('paid:')) {
      logger.info('Customer reported payment via WhatsApp button', action);
      return;
    }

    if (action.buttonId.startsWith('support:')) {
      logger.info('Customer requested support via WhatsApp button', action);
      return;
    }

    if (action.buttonId.startsWith('pix:')) {
      logger.info('Customer requested PIX key via WhatsApp button', action);
      return;
    }

    logger.info('Received WhatsApp button reply', action);
    return;
  }

  logger.debug('Observed outbound WhatsApp button definition', action);
}

export function startWhatsAppWebhookServer(): void {
  const port = env.whatsapp.webhookPort;
  const path = env.whatsapp.webhookPath;

  const server = http.createServer(async (req, res) => {
    if (req.method !== 'POST' || req.url !== path) {
      sendJson(res, 404, { ok: false });
      return;
    }

    try {
      const payload = await readJsonBody(req);
      const actions = parseEvolutionWebhookPayload(payload);

      logger.info('Received WhatsApp webhook', {
        event: payload?.event,
        actionsFound: actions.length,
      });

      for (const action of actions) {
        handleParsedAction(action);
      }

      sendJson(res, 200, {
        ok: true,
        actions: actions.map((action) => ({
          kind: action.kind,
          buttonId: action.buttonId,
          displayText: action.displayText,
          from: action.from,
          rawType: action.rawType,
        })),
      });
    } catch (error) {
      logger.error('Failed to process WhatsApp webhook', error);
      sendJson(res, 400, {
        ok: false,
        error: error instanceof Error ? error.message : 'Invalid webhook payload',
      });
    }
  });

  server.listen(port, () => {
    logger.info(`WhatsApp webhook server listening on port ${port} path ${path}`);
  });
}
