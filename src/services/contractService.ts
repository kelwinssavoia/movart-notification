import axios from 'axios';
import { env } from '../config/env';
import { getAccessToken } from './authService';
import { logger } from '../utils/logger';

export interface Contract {
  id: number;
  nome: string;
  sexo: number;
  telefone: string | null;
  email: string | null;
  situacao: number;
  plano: string;
  tipo: string;
  data_inicio_plano: string;
  data_fim_plano: string;
  periodicidade: string;
  valor_total: number;
}

interface ContractResponse {
  current_page: number;
  data: Contract[];
  last_page: number;
  total: number;
}

export async function getAllActiveContracts(): Promise<Contract[]> {
  const token = await getAccessToken();
  const allContracts: Contract[] = [];
  let currentPage = 1;
  let lastPage = 1;

  logger.info('Fetching all active contracts from Seu Fisio API');

  do {
    try {
      const response = await axios.get<ContractResponse>(
        `${env.seufisio.baseUrl}/api/relatorio/cliente/fixos`,
        {
          params: {
            page: currentPage,
            rowsPerPage: 100,
            descending: true,
            'filterWhere[situacao]': 2, // Active contracts
            'filterWhere[opcao_pacote_servico]': 'ambos',
            'filterWhere[pacotes_pausados]': 0,
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

      allContracts.push(...response.data.data);
      lastPage = response.data.last_page;
      
      logger.debug(`Fetched page ${currentPage}/${lastPage}, got ${response.data.data.length} contracts`);
      currentPage++;
    } catch (error) {
      logger.error(`Failed to fetch contracts page ${currentPage}`, error);
      throw new Error('Failed to fetch contracts from Seu Fisio API');
    }
  } while (currentPage <= lastPage);

  logger.info(`Fetched ${allContracts.length} total active contracts`);
  return allContracts;
}

export function getExpiringContracts(contracts: Contract[], daysThreshold: number): Contract[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const thresholdDate = new Date(today);
  thresholdDate.setDate(thresholdDate.getDate() + daysThreshold);

  return contracts.filter(contract => {
    const endDate = new Date(contract.data_fim_plano);
    endDate.setHours(0, 0, 0, 0);
    
    // Include contracts expiring between today and threshold date
    return endDate >= today && endDate <= thresholdDate;
  }).sort((a, b) => {
    // Sort by expiration date (earliest first)
    return new Date(a.data_fim_plano).getTime() - new Date(b.data_fim_plano).getTime();
  });
}

export function formatExpiringContractsMessage(contracts: Contract[], daysThreshold: number): string {
  if (contracts.length === 0) {
    return `📋 Nenhum plano encerrando nos próximos ${daysThreshold} dias.`;
  }

  const header = `⚠️ <b>PLANOS ENCERRANDO (próximos ${daysThreshold} dias)</b>\n\n`;
  
  const contractList = contracts.map((contract, index) => {
    const endDate = new Date(contract.data_fim_plano);
    const formattedDate = endDate.toLocaleDateString('pt-BR');
    const daysUntilExpiry = Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    
    let urgencyIcon = '🟢';
    if (daysUntilExpiry <= 3) {
      urgencyIcon = '🔴';
    } else if (daysUntilExpiry <= 7) {
      urgencyIcon = '🟡';
    }

    return `${urgencyIcon} <b>${contract.nome}</b>
   📅 Encerra: ${formattedDate} (${daysUntilExpiry} dias)
   📦 Plano: ${contract.plano}
   📞 Tel: ${contract.telefone || 'Não informado'}`;
  }).join('\n\n');

  const footer = `\n\n📊 Total: ${contracts.length} plano(s)`;

  return header + contractList + footer;
}
