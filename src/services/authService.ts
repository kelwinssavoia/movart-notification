import axios from 'axios';
import { env } from '../config/env';
import { logger } from '../utils/logger';

interface AuthResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export async function getAccessToken(): Promise<string> {
  // Return cached token if still valid (with 5 min buffer)
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry - 5 * 60 * 1000) {
    logger.debug('Using cached access token');
    return cachedToken;
  }

  logger.info('Requesting new access token from Seu Fisio API');

  try {
    const response = await axios.post<AuthResponse>(
      `${env.seufisio.baseUrl}/oauth/token`,
      {
        username: env.seufisio.username,
        password: env.seufisio.password,
        grant_type: 'password',
        client_id: 2,
        client_secret: env.seufisio.clientSecret,
        scope: '*',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-version-app': '22',
          'acesso': 'web-desktop',
          'X-Requested-With': 'XMLHttpRequest',
        },
      }
    );

    cachedToken = response.data.access_token;
    tokenExpiry = Date.now() + response.data.expires_in * 1000;

    logger.info('Successfully obtained access token');
    return cachedToken;
  } catch (error) {
    logger.error('Failed to obtain access token', error);
    throw new Error('Authentication failed with Seu Fisio API');
  }
}

export function clearTokenCache(): void {
  cachedToken = null;
  tokenExpiry = null;
}
