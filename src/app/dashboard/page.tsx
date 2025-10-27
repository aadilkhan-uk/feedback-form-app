"use client";

import { useEffect } from "react";
import { useResponses } from "root/hooks/useResponses";

export default function DashboardPage() {
  // Fetch responses data for the past week
  const { data } = useResponses(7);

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
          <div className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Responses
                </p>
                <div className="mt-2">
                  <div className="h-16 w-32 rounded-lg bg-gray-200" />
                </div>
                <div className="mt-3 flex items-center gap-1">
                  <svg
                    className="h-4 w-4 text-[#4CAF50]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <span className="text-sm text-[#4CAF50]">8.5%</span>
                  <span className="text-sm text-gray-600">
                    Up from yesterday
                  </span>
                </div>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <svg
                  className="h-6 w-6 text-[#A78BFA]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857M17 20v-2c0-.656-.126-1.283-.356-1.857"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2: Total Google Redirects */}
          <div className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Google Redirects
                </p>
                <div className="mt-2">
                  <div className="h-16 w-32 rounded-lg bg-gray-200" />
                </div>
                <div className="mt-3 flex items-center gap-1">
                  <svg
                    className="h-4 w-4 text-[#4CAF50]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <span className="text-sm text-[#4CAF50]">8.5%</span>
                  <span className="text-sm text-gray-600">
                    Up from yesterday
                  </span>
                </div>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <svg
                  className="h-6 w-6 text-[#A78BFA]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M17 20v-2c0-.656-.126-1.283-.356-1.857M17 20v-2c0-.656-.126-1.283-.356-1.857"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#222222]">
              Response Details
            </h2>
            {/* Dropdown placeholder */}
            <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2">
              <span className="text-sm text-gray-700">October</span>
              <svg
                className="h-4 w-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Chart placeholder */}
          <div className="flex h-80 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100">
            <p className="text-gray-400">Chart placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
