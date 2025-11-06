"use client";

import { useSurvey } from "../../hooks/useSurvey";
import { useFeedbackForm } from "../../hooks/useFeedbackForm";
import { useSubmitFeedback } from "../../hooks/useSubmitFeedback";
import { LoadingState, ErrorState, QuestionRenderer } from "../_components";
import { FeedbackFormLayout } from "../_components/layouts/FeedbackFormLayout";
import { Button, ProgressIndicator } from "../_components/theme";

export default function FeedbackFormPage() {
  const { survey, isLoading, error } = useSurvey();
  const { formState, updateResponse } = useFeedbackForm({
    questions: survey?.questions || [],
  });

  const { isSubmitting, handleSubmit, canSubmit } = useSubmitFeedback({
    surveyId: survey?.surveyId || "",
    responses: formState.responses,
    isComplete: formState.isComplete,
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
      <div className="space-y-3 md:space-y-6">
        {/* Welcome Header - with fade in animation */}
        <div className="mb-3 animate-[fadeIn_0.6s_ease-out] text-center md:mb-6">
          <h1 className="mb-1 animate-[slideDown_0.6s_ease-out] text-xl font-bold text-white md:mb-3 md:text-3xl lg:text-4xl">
            Tell us about your experience
          </h1>
          <p className="animate-[fadeIn_0.8s_ease-out] text-sm text-[var(--color-text-light)] md:text-base lg:text-lg">
            Your feedback helps us improve and serve you better
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="animate-[fadeIn_0.8s_ease-out]">
          <ProgressIndicator
            completedQuestions={formState.completedQuestions}
            totalQuestions={formState.totalQuestions}
          />
        </div>

        {/* Questions */}
        {survey.questions.map((question, index) => (
          <QuestionRenderer
            key={question.questionId}
            question={question}
            questionNumber={index + 1}
            questionIndex={index}
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
        <div className="flex animate-[fadeInUp_1s_ease-out] justify-center pt-2 md:pt-4">
          <Button
            className={`transition-all duration-300 ${
              canSubmit
                ? "scale-105 shadow-[var(--color-accent-pink)]/25 shadow-lg hover:scale-110"
                : "opacity-70"
            }`}
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </div>
      </div>
    </FeedbackFormLayout>
  );
}
