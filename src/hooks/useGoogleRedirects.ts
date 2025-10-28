import { api } from "root/trpc/react";

/**
 * Custom hook to fetch google redirects count
 * @returns Object containing count, loading state, and error state
 */
export function useGoogleRedirects() {
  const { data, isLoading, error } = api.survey.getGoogleRedirects.useQuery();

  return {
    data,
    isLoading,
    error,
  };
}
