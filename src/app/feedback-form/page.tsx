"use client";

import { useSurvey } from "../../hooks/useSurvey";
import { LoadingState, ErrorState, SurveyDebug } from "../_components";
import { FeedbackFormLayout } from "../_components/layouts/FeedbackFormLayout";

export default function FeedbackFormPage() {
  const { survey, isLoading, error } = useSurvey();

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

  return (
    <FeedbackFormLayout title={survey?.title}>
      <SurveyDebug survey={survey!} />
    </FeedbackFormLayout>
  );
}
