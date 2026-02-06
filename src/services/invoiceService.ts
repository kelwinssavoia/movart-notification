import axios from 'axios';
import { env } from '../config/env';
import { getAccessToken } from './authService';
import { logger } from '../utils/logger';

export interface Invoice {
  id: number;
  titulo: string;
  descricao: string | null;
  valor: number;
  cliente_id: number;
  pago: number;
  data_vencimento: string;
  data_lancamento: string;
  produtos_servicos_vinculados: string;
  cliente: {
    id: number;
    nome: string;
    email: string | null;
    telefone: string | null;
  };
}

interface InvoiceResponse {
  valor_total: number;
  current_page: number;
  data: Invoice[];
  last_page: number;
  total: number;
}

export async function getUnpaidInvoices(): Promise<Invoice[]> {
  const token = await getAccessToken();
  const allInvoices: Invoice[] = [];
  let currentPage = 1;
  let lastPage = 1;

  logger.info('Fetching all unpaid invoices from Seu Fisio API');

  do {
    try {
      const response = await axios.get<InvoiceResponse>(
        `${env.seufisio.baseUrl}/api/conta-receber`,
        {
          params: {
            page: currentPage,
            rowsPerPage: 50,
            sortBy: 'data_vencimento',
            descending: false,
            'filterWhere[pago]': 0,
            'filterWhere[filtroData]': 'data_vencimento',
            'filterWhere[sortBy]': 'data_vencimento',
            'filterWhere[orderBy]': 'asc',
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

      allInvoices.push(...response.data.data);
      lastPage = response.data.last_page;
      
      logger.debug(`Fetched page ${currentPage}/${lastPage}, got ${response.data.data.length} invoices`);
      currentPage++;
    } catch (error) {
      logger.error(`Failed to fetch invoices page ${currentPage}`, error);
      throw new Error('Failed to fetch invoices from Seu Fisio API');
    }
  } while (currentPage <= lastPage);

  logger.info(`Fetched ${allInvoices.length} total unpaid invoices`);
  return allInvoices;
}

export interface CategorizedInvoices {
  overdue: Invoice[];
  dueToday: Invoice[];
  totalOverdueAmount: number;
  totalDueTodayAmount: number;
}

export function categorizeInvoices(invoices: Invoice[]): CategorizedInvoices {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdue: Invoice[] = [];
  const dueToday: Invoice[] = [];

  for (const invoice of invoices) {
    const dueDate = new Date(invoice.data_vencimento);
    dueDate.setHours(0, 0, 0, 0);

    if (dueDate.getTime() === today.getTime()) {
      dueToday.push(invoice);
    } else if (dueDate < today) {
      overdue.push(invoice);
    }
  }

  // Sort overdue by most overdue first
  overdue.sort((a, b) => new Date(a.data_vencimento).getTime() - new Date(b.data_vencimento).getTime());

  return {
    overdue,
    dueToday,
    totalOverdueAmount: overdue.reduce((sum, inv) => sum + inv.valor, 0),
    totalDueTodayAmount: dueToday.reduce((sum, inv) => sum + inv.valor, 0),
  };
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatInvoiceList(invoices: Invoice[], showDaysOverdue: boolean = false): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return invoices.map((invoice, index) => {
    const dueDate = new Date(invoice.data_vencimento);
    const formattedDate = dueDate.toLocaleDateString('pt-BR');
    
    let daysInfo = '';
    if (showDaysOverdue) {
      const daysOverdue = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
      daysInfo = ` (${daysOverdue} dias)`;
    }

    return `${index + 1}. <b>${invoice.cliente.nome}</b>
   💰 ${formatCurrency(invoice.valor)}
   📅 Venc: ${formattedDate}${daysInfo}
   📞 ${invoice.cliente.telefone || 'Sem telefone'}`;
  }).join('\n\n');
}

export function formatInvoiceMessage(categorized: CategorizedInvoices): string {
  const parts: string[] = [];

  // Overdue section
  if (categorized.overdue.length > 0) {
    parts.push(`🔴 <b>FATURAS ATRASADAS</b> (${categorized.overdue.length})
Total: ${formatCurrency(categorized.totalOverdueAmount)}

${formatInvoiceList(categorized.overdue, true)}`);
  }

  // Due today section
  if (categorized.dueToday.length > 0) {
    parts.push(`🟡 <b>FATURAS VENCENDO HOJE</b> (${categorized.dueToday.length})
Total: ${formatCurrency(categorized.totalDueTodayAmount)}

${formatInvoiceList(categorized.dueToday, false)}`);
  }

  if (parts.length === 0) {
    return '✅ Nenhuma fatura atrasada ou vencendo hoje.';
  }

  return parts.join('\n\n━━━━━━━━━━━━━━━━━━━━\n\n');
}
