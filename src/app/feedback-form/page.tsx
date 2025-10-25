"use client";

import { useState } from "react";
import { useSurvey } from "../../hooks/useSurvey";
import { LoadingState, ErrorState, SurveyDebug } from "../_components";
import { FeedbackFormLayout } from "../_components/layouts/FeedbackFormLayout";
import {
  Button,
  Card,
  RatingQuestionType,
  TextQuestionType,
} from "../_components/theme";

export default function FeedbackFormPage() {
  const { survey, isLoading, error } = useSurvey();
  const [formResponses, setFormResponses] = useState<
    Record<number, string | number>
  >({});

  const handleRatingChange = (questionKey: number, rating: number) => {
    setFormResponses((prev) => ({
      ...prev,
      [questionKey]: rating,
    }));
  };

  const handleTextChange = (questionKey: number, text: string) => {
    setFormResponses((prev) => ({
      ...prev,
      [questionKey]: text,
    }));
  };

  if (isLoading) {
    return (
      <FeedbackFormLayout>
        <LoadingState />
      </FeedbackFormLayout>
    );
  }

  if (error) {
    return (
      <FeedbackFormLayout>
        <ErrorState error={error} />
      </FeedbackFormLayout>
    );
  }

  if (!survey) {
    return (
      <FeedbackFormLayout>
        <ErrorState error={{ message: "No survey data available" }} />
      </FeedbackFormLayout>
    );
  }

  // Calculate progress
  const totalQuestions = survey.questions.length;
  const completedQuestions = Object.keys(formResponses).length;
  const progressPercentage = (completedQuestions / totalQuestions) * 100;

  return (
    <FeedbackFormLayout title={survey.title}>
      <div className="space-y-6">
        {/* Progress Indicator */}
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

        {/* Questions */}
        {survey.questions.map((question, index) => {
          const isCompleted = formResponses[question.questionId] !== undefined;

          if (question.type === "rating") {
            return (
              <Card
                key={question.questionId}
                className={`mb-4 transition-all duration-300 ${
                  isCompleted
                    ? "border-[var(--color-accent-green)]/30 bg-white/8"
                    : "border-white/10"
                }`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                      isCompleted
                        ? "bg-[var(--color-accent-green)] text-white"
                        : "bg-white/10 text-[var(--color-text-light)]"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <RatingQuestionType
                    key={question.questionId}
                    label={question.label}
                    onRatingChange={(rating) =>
                      handleRatingChange(question.questionId, rating)
                    }
                  />
                </div>
              </Card>
            );
          }

          if (question.type === "text") {
            return (
              <Card
                key={question.questionId}
                className={`transition-all duration-300 ${
                  isCompleted
                    ? "border-[var(--color-accent-green)]/30 bg-white/8"
                    : "border-white/10"
                }`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                      isCompleted
                        ? "bg-[var(--color-accent-green)] text-white"
                        : "bg-white/10 text-[var(--color-text-light)]"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <TextQuestionType
                    key={question.questionId}
                    className="flex-1"
                    label={question.label}
                    onTextChange={(text) =>
                      handleTextChange(question.questionId, text)
                    }
                  />
                </div>
              </Card>
            );
          }

          return null;
        })}

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button
            className={`transition-all duration-300 ${
              completedQuestions === totalQuestions
                ? "scale-105 shadow-[var(--color-accent-pink)]/25 shadow-lg"
                : "opacity-70"
            }`}
            disabled={completedQuestions !== totalQuestions}
          >
            Submit Feedback
          </Button>
        </div>
      </div>
    </FeedbackFormLayout>
  );
}
