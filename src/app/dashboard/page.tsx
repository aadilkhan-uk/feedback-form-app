"use client";

import { useEffect, useState, useMemo } from "react";
import { useResponses } from "root/hooks/useResponses";
import { ResponseDetailsChart } from "./_components/ResponseDetailsChart";
import { TotalResponsesCard } from "./_components/TotalResponsesCard";
import { GoogleRedirectsCard } from "./_components/GoogleRedirectsCard";
import { DateRangePicker } from "./_components/DateRangePicker";
import { QuestionRatingChart } from "./_components/QuestionRatingChart";
import { format, subDays } from "date-fns";

export default function DashboardPage() {
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
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="mb-8 text-3xl font-semibold text-[#222222]">
          Dashboard
        </h1>

        {/* Summary Cards Section */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {/* Card 1: Total Responses */}
          <TotalResponsesCard />

          {/* Card 2: Total Google Redirects */}
          <GoogleRedirectsCard />
        </div>

        {/* Date Range Picker Section */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">
              Filter by date range (default: last 30 days)
            </p>
          </div>
          <DateRangePicker
            onDateRangeChange={handleDateRangeChange}
            defaultDaysBack={30}
          />
        </div>

        {/* Response Details Chart Section */}
        <div className="mb-8 grid grid-cols-1 gap-6">
          <ResponseDetailsChart
            responses={data?.responses ?? []}
            startDate={startDate}
            endDate={endDate}
            loading={isLoading}
          />
        </div>

        {/* Rating Charts Section */}
        <div className="mb-8 grid grid-cols-1 gap-6">
          <QuestionRatingChart
            questionId={1}
            questionLabel="Rate the service you received today out of 5"
            responses={data?.responses ?? []}
            startDate={startDate}
            endDate={endDate}
            loading={isLoading}
          />
          <QuestionRatingChart
            questionId={2}
            questionLabel="Rate the taste of your meal today out of 5"
            responses={data?.responses ?? []}
            startDate={startDate}
            endDate={endDate}
            loading={isLoading}
          />
          <QuestionRatingChart
            questionId={3}
            questionLabel="Rate the presentation of your meal today out of 5"
            responses={data?.responses ?? []}
            startDate={startDate}
            endDate={endDate}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
