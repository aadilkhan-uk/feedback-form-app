export type QuestionType = "rating" | "text";

export interface SurveyQuestion {
  key: string;
  label: string;
  type: QuestionType;
}

export interface Survey {
  id: string;
  title: string;
  questions: SurveyQuestion[];
}
