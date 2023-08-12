import { defaults } from './client.ts';
import { getItem, removeItem } from '@/utils/storage';

const baseUrl = 'https://mock.apifox.cn/m1/3113011-0-default';

function beforeRequest(config?: RequestInit) {
  if (!config) return;

  const token = getItem('token');
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
}

function afterRequest(response: Response) {
  if (response.status === 404) {
    removeItem('token');
    window.location.href = '/sign-in';
  }

  return response;
}

function processFetchInput(input: RequestInfo | URL) {
  if (typeof input !== 'string') {
    return input;
  }

  if (input.startsWith('http')) {
    return input;
  }

  return baseUrl + input;
}

const fetcher = async (input: RequestInfo | URL, init?: RequestInit) => {
  try {
    input = processFetchInput(input);
    const config = beforeRequest(init);
    const response = await fetch(input, config);
    const result = afterRequest(response);

    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

defaults.fetch = fetcher;

export * from './client.ts';
