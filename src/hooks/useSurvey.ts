import { api } from "../trpc/react";

/**
 * Custom hook to fetch survey data from the server
 * @returns Object containing survey data, loading state, and error state
 */
export function useSurvey() {
  const {
    data: survey,
    isLoading,
    error,
    refetch,
  } = api.survey.getSurvey.useQuery();

  return {
    survey,
    isLoading,
    error,
    refetch,
  };
}
