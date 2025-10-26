import OpenAI from "openai";
import type { IReviewService } from "../domain/contracts";
import type { SurveyQuestionResponse } from "../domain/types";
import { env } from "root/env";
import { SurveyRepo } from "./SurveyRepo";

export const ReviewService: IReviewService = {
  generateWrittenReview: async (answers: SurveyQuestionResponse[]) => {
    try {
      // Get survey to map questionIds to question labels
      const survey = await SurveyRepo.getSurvey();
      if (!survey) {
        throw new Error("Survey not found");
      }

      // Map questionIds to their labels for context
      const questionMap = new Map(
        survey.questions.map((q) => [q.questionId, q]),
      );

      // Build a structured list of all responses with context
      const responseDetails = answers.map((answer) => {
        const question = questionMap.get(answer.questionId);
        return {
          question: question?.label || `Question ${answer.questionId}`,
          answer: answer.response,
          type: question?.type,
        };
      });

      // Calculate objective score from ratings ONLY
      const ratingAnswers = answers.filter((answer) => {
        const question = questionMap.get(answer.questionId);
        return (
          question?.type === "rating" && typeof answer.response === "number"
        );
      });

      let objectiveScore = 0;
      if (ratingAnswers.length > 0) {
        const sum = ratingAnswers.reduce(
          (acc, answer) => acc + (answer.response as number),
          0,
        );
        objectiveScore = sum / ratingAnswers.length;
      }

      // Build the prompt with objective data
      const responseText = responseDetails
        .map(
          (r) =>
            `Question: ${r.question}\nAnswer: ${r.answer}${r.type === "rating" ? "/5" : ""}`,
        )
        .join("\n\n");

      const prompt = `Based on the following customer survey responses, generate a comprehensive and objective written review.
Your output should be as if you are a customer leaving a review on Google Maps. Do not include any other text in your response.

Survey Responses:
${responseText}

Please provide an objective, honest assessment based solely on these responses. 
Include the objective score prominently in your review. 
Be specific about what the customer liked or didn't like based on their actual responses.
Add some character to your review, don't be too formal. 
Also dont make it more than 240 characters.`;

      const openai = new OpenAI({
        apiKey: env.OPENAI_API_KEY,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 800,
      });

      const generatedReview =
        completion.choices[0]?.message?.content ||
        "Unable to generate review at this time.";

      return generatedReview;
    } catch (error) {
      console.error("Error generating review:", error);
      return "Unable to generate review at this time.";
    }
  },
};
