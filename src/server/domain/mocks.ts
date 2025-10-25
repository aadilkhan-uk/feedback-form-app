import type { IReviewService, ISurveyRepo, IResponseRepo } from "./contracts";

export const MockReviewService: IReviewService = {
  generateWrittenReview: async (answers: Record<number, unknown>) => {
    return "This is a mock generated review";
  },
};

export const MockSurveyRepo: ISurveyRepo = {
  getSurvey: async () => {
    return {
      id: "1",
      title: "Choppaluna Feedback Form",
      questions: [
        {
          key: "1",
          label: "How do you feel about the product?",
          type: "rating",
        },
        {
          key: "2",
          label: "How was your service today?",
          type: "rating",
        },
        {
          key: "3",
          label: "How was your experience today?",
          type: "rating",
        },
        {
          key: "4",
          label: "What did you like about your service today?",
          type: "text",
        },
      ],
    };
  },
};

export const MockResponseRepo: IResponseRepo = {
  submitResponse: async (data: {
    surveyId: string;
    answers: Record<number, unknown>;
  }) => {
    return { id: "1" };
  },
};
