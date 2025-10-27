import { useMemo } from "react";
import { api } from "root/trpc/react";

/**
 * Custom hook to fetch response data by date range
 * @param daysBack - Number of days to go back from today (default: 7)
 * @returns Object containing response data, loading state, error state, and date range
 */
export function useResponses(daysBack: number = 7) {
  // Calculate date range - memoized to prevent unnecessary refetches
  const { startDate, endDate } = useMemo(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - daysBack);
    return { startDate, endDate };
  }, [daysBack]);

  const {
    data: responsesData,
    isLoading,
    error,
  } = api.survey.getResponsesByDateRange.useQuery({
    startDate,
    endDate,
  });

  return {
    data: responsesData,
    isLoading,
    error,
    startDate,
    endDate,
  };
}
