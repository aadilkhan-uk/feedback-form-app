"use client";

import { useState } from "react";
import { useSurvey } from "../../hooks/useSurvey";
import { useFeedbackForm } from "../../hooks/useFeedbackForm";
import { LoadingState, ErrorState, QuestionRenderer } from "../_components";
import { FeedbackFormLayout } from "../_components/layouts/FeedbackFormLayout";
import { Button, ProgressIndicator } from "../_components/theme";
import { api } from "../../trpc/react";

export default function FeedbackFormPage() {
  const { survey, isLoading, error } = useSurvey();
  const { formState, updateResponse } = useFeedbackForm({
    totalQuestions: survey?.questions.length || 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitResponseMutation = api.survey.submitResponse.useMutation({
    onSuccess: (data) => {
      setIsSubmitting(false);
      if (data.review) {
        alert(data.review);
      }
    },
    onError: (error) => {
      setIsSubmitting(false);
      alert(`Error submitting feedback: ${error.message}`);
    },
  });

  const handleSubmit = async () => {
    if (!survey || !formState.isComplete) return;

    setIsSubmitting(true);

    const answers = Object.entries(formState.responses).map(
      ([questionId, response]) => ({
        questionId: parseInt(questionId),
        response,
      }),
    );

    submitResponseMutation.mutate({
      surveyId: survey.surveyId,
      answers,
    });
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
              formState.isComplete && !isSubmitting
                ? "scale-105 shadow-[var(--color-accent-pink)]/25 shadow-lg"
                : "opacity-70"
            }`}
            disabled={!formState.isComplete || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </div>
      </div>
    </FeedbackFormLayout>
  );
}
