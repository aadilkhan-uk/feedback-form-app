"use client";

import { useState } from "react";
import { api } from "../trpc/react";

interface UseSubmitFeedbackProps {
  surveyId: number;
  responses: Record<number, string | number>;
  isComplete: boolean;
}

export function useSubmitFeedback({
  surveyId,
  responses,
  isComplete,
}: UseSubmitFeedbackProps) {
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
    if (!isComplete) return;

    setIsSubmitting(true);

    const answers = Object.entries(responses).map(([questionId, response]) => ({
      questionId: parseInt(questionId),
      response,
    }));

    submitResponseMutation.mutate({
      surveyId,
      answers,
    });
  };

  return {
    isSubmitting,
    handleSubmit,
    canSubmit: isComplete && !isSubmitting,
  };
}
