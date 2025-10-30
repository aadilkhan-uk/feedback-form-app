"use client";

import { Card } from "./Card";

interface QuestionWrapperProps {
  children: React.ReactNode;
  questionNumber: number;
  questionIndex: number;
  isCompleted: boolean;
  isRequired?: boolean;
}

export function QuestionWrapper({
  children,
  questionNumber,
  questionIndex,
  isCompleted,
  isRequired = false,
}: QuestionWrapperProps) {
  // Stagger animation delay based on question index
  const animationDelay = `${0.9 + questionIndex * 0.15}s`;

  return (
    <div
      style={{
        animation: `fadeInUp 0.6s ease-out forwards ${animationDelay}`,
        opacity: 0,
      }}
    >
      <Card
        className={`mb-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg ${
          isCompleted
            ? "animate-[pulseGreen_0.5s_ease-out] border-[var(--color-accent-green)]/30 bg-white/8"
            : "border-white/10"
        }`}
      >
        <div className="mb-4">
          <div className="mb-3 flex items-center gap-3">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                isCompleted
                  ? "scale-110 bg-[var(--color-accent-green)] text-white"
                  : "bg-white/10 text-[var(--color-text-light)]"
              }`}
            >
              {questionNumber}
            </div>
            {isRequired && (
              <div className="flex items-center gap-1 text-sm">
                <span className="font-semibold text-[var(--color-accent-pink)]">
                  *
                </span>
                <span className="text-[var(--color-text-light)]">Required</span>
              </div>
            )}
          </div>
          <div>{children}</div>
        </div>
      </Card>
    </div>
  );
}
