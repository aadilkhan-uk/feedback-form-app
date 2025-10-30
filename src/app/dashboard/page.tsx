"use client";

import { useEffect, useState, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useResponses } from "root/hooks/useResponses";
import { ResponseDetailsChart } from "./_components/ResponseDetailsChart";
import { TotalResponsesCard } from "./_components/TotalResponsesCard";
import { GoogleRedirectsCard } from "./_components/GoogleRedirectsCard";
import { DateRangePicker } from "./_components/DateRangePicker";
import { QuestionRatingChart } from "./_components/QuestionRatingChart";
import { format, subDays } from "date-fns";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-gray-50 to-purple-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard content if not authenticated
  if (!session) {
    return null;
  }
  // Fetch responses data for the past 30 days (better for chart data)
  const { data, isLoading } = useResponses(30);

  // Console log the data when it's loaded
  useEffect(() => {
    if (data) {
      console.log("Responses data:", data);
    }
  }, [data]);

  // Default date range: last 30 days
  const defaultStartDate = useMemo(
    () => format(subDays(new Date(), 30), "yyyy-MM-dd"),
    [],
  );
  const defaultEndDate = useMemo(() => format(new Date(), "yyyy-MM-dd"), []);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const handleDateRangeChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-purple-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-2">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h1 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-bold text-transparent">
                Dashboard
              </h1>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </div>
            </button>
          </div>
          <p className="ml-11 text-gray-600">
            Monitor feedback and track responses
          </p>
        </div>

        {/* Summary Cards Section */}
        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          <TotalResponsesCard />
          <GoogleRedirectsCard />
        </div>

        {/* Charts Section */}
        <div className="mt-4 space-y-8">
          {/* Date Range Picker Section */}
          <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Filter by Date Range
                </p>
                <p className="text-xs text-gray-500">Default: last 30 days</p>
              </div>
            </div>
            <DateRangePicker
              onDateRangeChange={handleDateRangeChange}
              defaultDaysBack={30}
            />
          </div>

          {/* Response Details Chart Section */}
          <div>
            <div className="mt-4 mb-4 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-blue-500"></div>
              <h2 className="text-lg font-semibold text-gray-900">
                Response Trends
              </h2>
            </div>
            <ResponseDetailsChart
              responses={data?.responses ?? []}
              startDate={startDate}
              endDate={endDate}
              loading={isLoading}
            />
          </div>

          {/* Rating Charts Section */}
          <div>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-purple-500"></div>
              <h2 className="text-lg font-semibold text-gray-900">
                Rating Breakdown
              </h2>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-6">
              <QuestionRatingChart
                questionId={1}
                questionLabel="Rate the service you received today out of 5"
                responses={data?.responses ?? []}
                startDate={startDate}
                endDate={endDate}
                loading={isLoading}
                color="blue"
              />
              <QuestionRatingChart
                questionId={2}
                questionLabel="Rate the taste of your meal today out of 5"
                responses={data?.responses ?? []}
                startDate={startDate}
                endDate={endDate}
                loading={isLoading}
                color="purple"
              />
              <QuestionRatingChart
                questionId={3}
                questionLabel="Rate the presentation of your meal today out of 5"
                responses={data?.responses ?? []}
                startDate={startDate}
                endDate={endDate}
                loading={isLoading}
                color="orange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
