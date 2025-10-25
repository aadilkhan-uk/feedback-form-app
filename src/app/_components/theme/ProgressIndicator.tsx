"use client";

import { Card } from "./Card";

interface ProgressIndicatorProps {
  completedQuestions: number;
  totalQuestions: number;
}

export function ProgressIndicator({
  completedQuestions,
  totalQuestions,
}: ProgressIndicatorProps) {
  const progressPercentage = (completedQuestions / totalQuestions) * 100;

  return (
    <Card className="mb-8">
      <div className="mb-4">
        <div className="mb-2 flex justify-between text-sm text-[var(--color-text-light)]">
          <span>Progress</span>
          <span>
            {completedQuestions}/{totalQuestions} completed
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/10">
          <div
            className="h-2 rounded-full bg-[var(--color-accent-green)] transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </Card>
  );
}
