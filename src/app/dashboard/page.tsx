"use client";

import { useEffect } from "react";
import { useResponses } from "root/hooks/useResponses";
import { ResponseDetailsChart } from "./_components/ResponseDetailsChart";
import { TotalResponsesCard } from "./_components/TotalResponsesCard";
import { GoogleRedirectsCard } from "./_components/GoogleRedirectsCard";

export default function DashboardPage() {
  // Fetch responses data for the past 30 days (better for chart data)
  const { data, isLoading } = useResponses(30);

  // Console log the data when it's loaded
  useEffect(() => {
    if (data) {
      console.log("Responses data:", data);
    }
  }, [data]);

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

        {/* Chart Section */}
        <ResponseDetailsChart
          responses={data?.responses ?? []}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
