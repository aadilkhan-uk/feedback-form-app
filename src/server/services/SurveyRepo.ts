import { db } from "../db";
import type { ISurveyRepo } from "../domain/contracts";
import type { Survey, SurveyQuestion } from "../domain/types";

/**
 * Maps a Prisma QuestionType enum to a domain QuestionType
 */
function mapQuestionType(
  prismaType: "text" | "rating",
): SurveyQuestion["type"] {
  return prismaType;
}

/**
 * Maps a Prisma Question to a domain SurveyQuestion
 * Using string hash to create a numeric ID for compatibility
 */
function mapPrismaQuestionToDomain(
  prismaQuestion: {
    id: string;
    label: string;
    type: "text" | "rating";
    required: boolean;
    sortOrder: number;
  },
  index: number,
): SurveyQuestion {
  // Generate a numeric questionId by hashing the string ID
  // Using a simple approach: use the index + 1 or hash the string
  // For simplicity, we'll use index + 1 which will give us sequential IDs
  // If you need stable IDs, you could hash the string ID properly
  const questionId = index + 1;

  return {
    questionId,
    label: prismaQuestion.label,
    type: mapQuestionType(prismaQuestion.type),
  };
}

/**
 * Maps a Prisma Survey to a domain Survey
 */
function mapPrismaSurveyToDomain(prismaSurvey: {
  id: string;
  title: string;
  questions: Array<{
    id: string;
    label: string;
    type: "text" | "rating";
    required: boolean;
    sortOrder: number;
  }>;
}): Survey {
  // Sort questions by sortOrder
  const sortedQuestions = [...prismaSurvey.questions].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  // Map questions to domain format
  const questions = sortedQuestions.map(mapPrismaQuestionToDomain);

  return {
    surveyId: prismaSurvey.id,
    title: prismaSurvey.title,
    questions,
  };
}

export const SurveyRepo: ISurveyRepo = {
  async getSurvey() {
    try {
      const survey = await db.survey.findUnique({
        where: { id: "cmh6n4gvs0001bqhqz51kovhx" },
        include: {
          questions: {
            orderBy: {
              sortOrder: "asc",
            },
          },
        },
      });

      if (!survey) {
        return null;
      }

      return mapPrismaSurveyToDomain(survey);
    } catch (error) {
      console.error("Error fetching survey:", error);
      return null;
    }
  },
};
