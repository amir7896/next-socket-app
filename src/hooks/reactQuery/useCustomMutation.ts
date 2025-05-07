import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

export interface MutationParams<TData = unknown> {
  url: string;
  data?: TData;
  config?: AxiosRequestConfig;
}

type Method = "post" | "put" | "delete";

export function useCustomMutation<TResponse = unknown, TRequest = unknown>(
  method: Method,
  options?: UseMutationOptions<TResponse, Error, MutationParams<TRequest>>
) {
  return useMutation<TResponse, Error, MutationParams<TRequest>>({
    mutationFn: async ({ url, data, config }) => {
      const response = await axios[method](url, data, config);
      return response.data;
    },
    ...options,
  });
}
