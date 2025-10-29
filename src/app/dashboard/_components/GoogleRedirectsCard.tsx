"use client";

import { useGoogleRedirects } from "root/hooks/useGoogleRedirects";

export function GoogleRedirectsCard() {
  const { data, isLoading } = useGoogleRedirects();

  // Format the count with thousand separators
  const formattedCount = data?.count?.toLocaleString() ?? "0";

  return (
    <div className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">
            Total Google Redirects
          </p>
          <div className="mt-2">
            {isLoading ? (
              <div className="h-16 w-32 animate-pulse rounded-lg bg-gray-200" />
            ) : (
              <p className="text-5xl font-semibold text-[#222222]">
                {formattedCount}
              </p>
            )}
          </div>
        </div>
        <div className="rounded-full bg-orange-100 p-3">
          <svg
            className="h-6 w-6 text-orange-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
