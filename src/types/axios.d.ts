import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    useLoading?: boolean;
  }
}

export { AxiosRequestConfig };
