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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

interface QuestionRatingChartProps {
  questionId: number;
  questionLabel: string;
  responses: SubmissionWithAnswers[];
  startDate: string;
  endDate: string;
  loading?: boolean;
}

export function QuestionRatingChart({
  questionId,
  questionLabel,
  responses,
  startDate,
  endDate,
  loading = false,
}: QuestionRatingChartProps) {
  const chartData = useMemo(() => {
    // Filter responses by date range
    let filteredResponses = responses;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      filteredResponses = responses.filter((response) => {
        const responseDate = new Date(response.createdAt);
        return responseDate >= start && responseDate <= end;
      });
    }

    // Extract answers for this specific question
    const answersForQuestion = filteredResponses
      .flatMap((response) => response.answers)
      .filter(
        (answer) =>
          answer.questionId === questionId && answer.ratingValue !== null,
      );

    // Count ratings from 1 to 5
    const ratingCounts: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    answersForQuestion.forEach((answer) => {
      if (answer.ratingValue !== null) {
        const rating = answer.ratingValue;
        if (rating >= 1 && rating <= 5) {
          ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
        }
      }
    });

    // Convert to array format for the chart
    return [5, 4, 3, 2, 1].map((rating) => ({
      rating: rating.toString(),
      count: ratingCounts[rating] || 0,
    }));
  }, [responses, questionId, startDate, endDate]);

  const chartConfig = {
    count: {
      label: "Responses",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  if (loading) {
    return (
      <Card>
        <div className="px-6 py-4">
          <CardTitle className="text-base text-gray-900">
            {questionLabel}
          </CardTitle>
        </div>
        <CardContent className="px-6 pb-6">
          <div className="flex min-h-[280px] items-center justify-center sm:h-80">
            <p className="text-gray-400">Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalResponses = chartData.reduce((sum, d) => sum + d.count, 0);

  return (
    <Card className="shadow-sm">
      <div className="px-6 py-4">
        <CardTitle className="text-base text-gray-900">
          {questionLabel}
        </CardTitle>
      </div>
      <CardContent className="px-6 pb-6">
        {totalResponses === 0 ? (
          <div className="flex min-h-[280px] items-center justify-center">
            <p className="text-sm text-gray-400">No data available</p>
          </div>
        ) : (
          <div className="min-h-[280px] w-full rounded-lg border-2 border-blue-500 p-2 sm:h-80">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
              >
                <defs>
                  <linearGradient
                    id={`colorCount${questionId}`}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={1} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis
                  type="number"
                  tick={{ fill: "#6B7280", fontSize: 11 }}
                  axisLine={{ stroke: "#D1D5DB" }}
                  tickLine={{ stroke: "#D1D5DB" }}
                />
                <YAxis
                  dataKey="rating"
                  type="category"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={{ stroke: "#D1D5DB" }}
                  width={40}
                />
                <ChartTooltip
                  content={<ChartTooltipContent hideLabel />}
                  labelStyle={{ color: "#374151" }}
                  cursor={{ fill: "#F3F4F6", fillOpacity: 0.2 }}
                />
                <Bar
                  dataKey="count"
                  fill={`url(#colorCount${questionId})`}
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
