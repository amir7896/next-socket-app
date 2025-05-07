import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

export function useCustomQuery<TData = unknown>(
  key: string[],
  url: string,
  config?: AxiosRequestConfig,
  options?: UseQueryOptions<TData>
) {
  return useQuery<TData>({
    queryKey: key,
    queryFn: async () => {
      const res = await axios.get(url, config);
      return res.data;
    },
    ...options,
  });
}

// When use method
// const { data, isLoading } = useCustomQuery(["users"], "/api/users");
