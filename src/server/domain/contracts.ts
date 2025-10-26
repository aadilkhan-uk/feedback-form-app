import type { Survey, SurveyQuestionResponse } from "./types";

export interface IReviewService {
  generateWrittenReview(answers: SurveyQuestionResponse[]): Promise<string>;
}

export interface ISurveyRepo {
  getSurvey(): Promise<Survey | null>;
}

export interface IResponseRepo {
  submitResponse(data: {
    surveyId: string;
    answers: SurveyQuestionResponse[];
  }): Promise<{ id: number }>;
}
