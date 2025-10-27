"use client";

import { useMemo, useState } from "react";
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "root/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

interface ResponseDetailsChartProps {
  responses: SubmissionWithAnswers[];
  loading?: boolean;
}

export function ResponseDetailsChart({
  responses,
  loading = false,
}: ResponseDetailsChartProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Process responses to group by date
  const chartData = useMemo(() => {
    // Filter responses by date range if dates are selected
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

  // Get default min/max dates for the inputs
  const defaultDates = useMemo(() => {
    if (responses.length === 0) {
      return { min: "", max: "" };
    }

    const dates = responses.map((r) => new Date(r.createdAt));
    const min = new Date(Math.min(...dates.map((d) => d.getTime())));
    const max = new Date(Math.max(...dates.map((d) => d.getTime())));

    return {
      min: min.toISOString().split("T")[0],
      max: max.toISOString().split("T")[0],
    };
  }, [responses]);

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
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Response Details</CardTitle>
            <CardDescription>
              Total responses: {responses.length}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={defaultDates.min}
              max={defaultDates.max}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none sm:w-auto"
              placeholder="Start date"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || defaultDates.min}
              max={defaultDates.max}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none sm:w-auto"
              placeholder="End date"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-80 items-center justify-center">
            <p className="text-gray-400">No data available for this period</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-80 w-full">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
