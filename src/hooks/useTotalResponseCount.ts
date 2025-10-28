import { api } from "root/trpc/react";

/**
 * Custom hook to fetch total response count
 * @returns Object containing total count, loading state, and error state
 */
export function useTotalResponseCount() {
  const { data, isLoading, error } =
    api.survey.getTotalResponseCount.useQuery();

  return {
    data,
    isLoading,
    error,
  };
}
