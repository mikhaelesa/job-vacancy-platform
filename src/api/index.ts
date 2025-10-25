import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { supabaseClient } from "../constants/supabaseClient.constant";

let cachedToken: string | null = null;

supabaseClient.auth.onAuthStateChange((_event, session) => {
  cachedToken = session?.access_token ?? null;
});

const createApiInstance = (config?: AxiosRequestConfig): AxiosInstance => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_ROOT_API_URL,
    timeout: 6000,
    validateStatus: (status) => status >= 200 && status < 300,
    ...config,
  });
};

class ApiClient {
  private api: AxiosInstance = createApiInstance();
  constructor(props?: { apiInstance?: AxiosInstance }) {
    if (props?.apiInstance) this.api = props.apiInstance;
  }

  public async request<T, D>(config: AxiosRequestConfig, withToken = false) {
    try {
      if (withToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${cachedToken}`,
        };
      }
      const response = await this.api.request<T, AxiosResponse<T, D>, D>(
        config
      );
      return response;
    } catch (err) {
      const axiosError = err as AxiosError;
      throw axiosError;
    }
  }
}

export { createApiInstance };
export default ApiClient;
