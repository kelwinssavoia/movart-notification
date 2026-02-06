import axios from 'axios';
import { env } from '../config/env';
import { getAccessToken } from './authService';
import { logger } from '../utils/logger';

export interface BirthdayClient {
  id: number;
  nome: string;
  data_nascimento: string;
  telefone: string | null;
  foto: string | null;
  url_avatar: string;
}

interface BirthdayResponse {
  hoje: {
    clientes: BirthdayClient[];
    cliente_desde: unknown[];
    usuarios: unknown[];
  };
  amanha: {
    clientes: BirthdayClient[];
    cliente_desde: unknown[];
    usuarios: unknown[];
  };
  depois_amanha: {
    clientes: BirthdayClient[];
    cliente_desde: unknown[];
    usuarios: unknown[];
  };
}

export async function getTodayBirthdays(): Promise<BirthdayClient[]> {
  const token = await getAccessToken();
  
  logger.info('Fetching today\'s birthdays from Seu Fisio API');
  
  try {
    const response = await axios.get<BirthdayResponse>(
      `${env.seufisio.baseUrl}/api/dashboard/aniversariantes`,
      {
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
    
    const birthdays = response.data.hoje.clientes;
    logger.info(`Found ${birthdays.length} birthday(s) today`);
    
    return birthdays;
  } catch (error) {
    logger.error('Failed to fetch birthdays', error);
    throw new Error('Failed to fetch birthdays from Seu Fisio API');
  }
}

export function formatBirthdayMessage(clients: BirthdayClient[]): string {
  if (clients.length === 0) {
    return '📅 Não há aniversariantes hoje.';
  }

  const header = `🎂 <b>ANIVERSARIANTES DE HOJE</b> 🎉\n\n`;
  
  const clientList = clients.map((client, index) => {
    const age = calculateAge(client.data_nascimento);
    return `${index + 1}. <b>${client.nome}</b> - ${age} anos`;
  }).join('\n');

  return header + clientList;
}

function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}
