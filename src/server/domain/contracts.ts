import type { Survey } from "./types";

export interface IReviewService {
  generateWrittenReview(answers: Record<number, unknown>): Promise<string>;
}

export interface ISurveyRepo {
  getSurvey(): Promise<Survey | null>;
}

export interface IResponseRepo {
  submitResponse(data: {
    surveyId: string;
    answers: Record<number, unknown>;
  }): Promise<{ id: string }>;
}
