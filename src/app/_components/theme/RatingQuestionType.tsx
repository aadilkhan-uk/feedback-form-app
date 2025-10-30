"use client";

import React, { useState } from "react";

interface RatingQuestionTypeProps {
  label: string;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

export const RatingQuestionType: React.FC<RatingQuestionTypeProps> = ({
  label,
  onRatingChange,
  className = "",
}) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // Rating scale: 1-5
  const ratingOptions = [1, 2, 3, 4, 5];

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    onRatingChange?.(rating);
  };

  // Get color based on rating (1=red, 5=green)
  const getRatingColor = (rating: number) => {
    const colors = {
      1: {
        bg: "#ef4444",
        border: "#ef4444",
        shadow: "rgba(239, 68, 68, 0.25)",
      }, // red
      2: {
        bg: "#f97316",
        border: "#f97316",
        shadow: "rgba(249, 115, 22, 0.25)",
      }, // orange
      3: {
        bg: "#eab308",
        border: "#eab308",
        shadow: "rgba(234, 179, 8, 0.25)",
      }, // yellow
      4: {
        bg: "#84cc16",
        border: "#84cc16",
        shadow: "rgba(132, 204, 22, 0.25)",
      }, // lime
      5: {
        bg: "#66e0b4",
        border: "#66e0b4",
        shadow: "rgba(102, 224, 180, 0.25)",
      }, // green (current accent)
    };
    return colors[rating as keyof typeof colors] || colors[5];
  };

  return (
    <div className={className}>
      {/* Label */}
      <label className="mb-4 block text-base leading-tight font-normal text-[var(--color-text-white)]">
        {label}
      </label>

      {/* Rating Buttons */}
      <div className="mb-4 flex flex-wrap gap-2 sm:gap-3">
        {ratingOptions.map((rating) => {
          const colors = getRatingColor(rating);
          const isSelected = selectedRating === rating;

          return (
            <button
              key={rating}
              onClick={() => handleRatingClick(rating)}
              className={`group relative flex h-12 w-12 items-center justify-center rounded-lg border-2 text-base font-semibold transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-primary-bg)] focus:outline-none active:scale-95 sm:h-14 sm:w-14 sm:text-lg ${
                isSelected
                  ? "text-[var(--color-text-white)] shadow-lg"
                  : "border-white/20 bg-white/10 text-[var(--color-text-light)]"
              } `}
              style={
                isSelected
                  ? {
                      backgroundColor: colors.bg,
                      borderColor: colors.border,
                      boxShadow: `0 10px 15px -3px ${colors.shadow}, 0 4px 6px -4px ${colors.shadow}`,
                    }
                  : ({
                      // Show color hint on hover
                      "--hover-color": colors.bg,
                      "--hover-border": colors.border,
                    } as React.CSSProperties)
              }
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = `${colors.bg}20`;
                  e.currentTarget.style.borderColor = `${colors.border}60`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = "";
                  e.currentTarget.style.borderColor = "";
                }
              }}
              aria-label={`Rate ${rating}`}
              role="radio"
              aria-checked={isSelected}
            >
              {rating}
            </button>
          );
        })}
      </div>

      {/* Rating Labels (Mobile-first, hidden on larger screens to reduce clutter) */}
      <div
        className="flex justify-between text-xs text-[var(--color-text-muted)] sm:hidden"
        style={{ width: "calc(5 * 3rem + 4 * 0.5rem)" }}
      >
        <span>Poor</span>
        <span>Excellent</span>
      </div>
    </div>
  );
};
