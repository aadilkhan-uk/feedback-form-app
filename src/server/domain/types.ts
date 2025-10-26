export type QuestionType = "rating" | "text";

export interface SurveyQuestion {
  questionId: number;
  label: string;
  type: QuestionType;
}

export interface Survey {
  surveyId: string;
  title: string;
  questions: SurveyQuestion[];
}

export interface SurveyQuestionResponse {
  questionId: number;
  response: string | number;
}

export interface SurveyResponse {
  surveyId: string;
  responses: SurveyQuestionResponse[];
}
