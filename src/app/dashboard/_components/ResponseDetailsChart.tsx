"use client";

import { useMemo } from "react";
import type { SubmissionWithAnswers } from "root/server/domain/types";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "root/components/ui/chart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "root/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

interface ResponseDetailsChartProps {
  responses: SubmissionWithAnswers[];
  startDate: string;
  endDate: string;
  loading?: boolean;
}

export function ResponseDetailsChart({
  responses,
  startDate,
  endDate,
  loading = false,
}: ResponseDetailsChartProps) {
  // Process responses to group by date
  const chartData = useMemo(() => {
    // Filter responses by date range
    let filteredResponses = responses;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Include the entire end date

      filteredResponses = responses.filter((response) => {
        const responseDate = new Date(response.createdAt);
        return responseDate >= start && responseDate <= end;
      });
    }

    // Group by date
    const groupedByDate = filteredResponses.reduce(
      (acc, response) => {
        const date = new Date(response.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date]++;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Convert to array format for the chart
    return Object.entries(groupedByDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => {
        // Sort by date
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }, [responses, startDate, endDate]);

  const chartConfig = {
    count: {
      label: "Responses",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Response Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-80 items-center justify-center">
            <p className="text-gray-400">Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <div className="px-6 py-4">
        <div>
          <h3 className="text-lg leading-none font-semibold">
            Response Details
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Total responses: {responses.length}
          </p>
        </div>
      </div>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-80 items-center justify-center">
            <p className="text-gray-400">No data available for this period</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-80 w-full">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#D1D5DB" }}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#D1D5DB" }}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                labelStyle={{ color: "#374151" }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#colorCount)"
                dot={{ fill: "#3B82F6", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
