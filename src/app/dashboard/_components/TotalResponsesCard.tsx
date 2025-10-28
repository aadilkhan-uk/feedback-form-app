"use client";

import { useTotalResponseCount } from "root/hooks/useTotalResponseCount";

export function TotalResponsesCard() {
  const { data, isLoading } = useTotalResponseCount();

  // Format the count with thousand separators
  const formattedCount = data?.count?.toLocaleString() ?? "0";

  // Determine the change percent display
  const changePercent = data?.changePercent;
  const changeText =
    typeof changePercent === "number"
      ? `${changePercent > 0 ? "+" : ""}${changePercent.toFixed(1)}%`
      : "—";

  const changeColor =
    typeof changePercent === "number" && changePercent >= 0
      ? "text-[#4CAF50]"
      : "text-red-500";
  const changeArrow = typeof changePercent === "number" && changePercent >= 0;

  return (
    <div className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">Total Responses</p>
          <div className="mt-2">
            {isLoading ? (
              <div className="h-16 w-32 animate-pulse rounded-lg bg-gray-200" />
            ) : (
              <p className="text-5xl font-semibold text-[#222222]">
                {formattedCount}
              </p>
            )}
          </div>
          <div className="mt-3 flex items-center gap-1">
            {isLoading ? (
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            ) : (
              <>
                {changePercent !== null && (
                  <svg
                    className={`h-4 w-4 ${changeColor}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {changeArrow ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                      />
                    )}
                  </svg>
                )}
                <span className={`text-sm ${changeColor}`}>{changeText}</span>
                <span className="text-sm text-gray-600">
                  {typeof changePercent === "number"
                    ? changePercent >= 0
                      ? "Up from yesterday"
                      : "Down from yesterday"
                    : "No change data"}
                </span>
              </>
            )}
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
