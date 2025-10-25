"use client";

import { useSurvey } from "../../hooks/useSurvey";
import { useFeedbackForm } from "../../hooks/useFeedbackForm";
import { LoadingState, ErrorState, QuestionRenderer } from "../_components";
import { FeedbackFormLayout } from "../_components/layouts/FeedbackFormLayout";
import { Button, ProgressIndicator } from "../_components/theme";

export default function FeedbackFormPage() {
  const { survey, isLoading, error } = useSurvey();
  const { formState, updateResponse } = useFeedbackForm({
    totalQuestions: survey?.questions.length || 0,
  });

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

  return (
    <FeedbackFormLayout title={survey.title}>
      <div className="space-y-6">
        {/* Progress Indicator */}
        <ProgressIndicator
          completedQuestions={formState.completedQuestions}
          totalQuestions={formState.totalQuestions}
        />

        {/* Questions */}
        {survey.questions.map((question, index) => (
          <QuestionRenderer
            key={question.questionId}
            question={question}
            questionNumber={index + 1}
            isCompleted={formState.responses[question.questionId] !== undefined}
            onRatingChange={(questionId, rating) =>
              updateResponse(questionId, rating)
            }
            onTextChange={(questionId, text) =>
              updateResponse(questionId, text)
            }
          />
        ))}

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button
            className={`transition-all duration-300 ${
              formState.isComplete
                ? "scale-105 shadow-[var(--color-accent-pink)]/25 shadow-lg"
                : "opacity-70"
            }`}
            disabled={!formState.isComplete}
          >
            Submit Feedback
          </Button>
        </div>
      </div>
    </FeedbackFormLayout>
  );
}
