import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create a restaurant
  const restaurant = await prisma.restaurant.upsert({
    where: { id: "default-restaurant" },
    update: {},
    create: {
      id: "default-restaurant",
      name: "Choppaluna",
      placeId: null,
    },
  });
  console.log("✅ Created restaurant:", restaurant.name);

  // Create a survey
  const survey = await prisma.survey.upsert({
    where: { slug: "choppaluna-feedback" },
    update: {},
    create: {
      title: "Choppaluna Feedback Form",
      slug: "choppaluna-feedback",
      isActive: true,
      restaurantId: restaurant.id,
      googleRedirects: 0,
    },
  });
  console.log("✅ Created survey:", survey.title);

  // Create questions
  const questions = [
    {
      surveyId: survey.id,
      type: "rating" as const,
      required: true,
      label: "How do you feel about the product?",
      sortOrder: 1,
    },
    {
      surveyId: survey.id,
      type: "rating" as const,
      required: true,
      label: "How was your service today?",
      sortOrder: 2,
    },
    {
      surveyId: survey.id,
      type: "rating" as const,
      required: false,
      label: "How was your experience today?",
      sortOrder: 3,
    },
    {
      surveyId: survey.id,
      type: "text" as const,
      required: false,
      label: "What did you like about your service today?",
      sortOrder: 4,
    },
  ];

  for (const questionData of questions) {
    const question = await prisma.question.upsert({
      where: {
        id: `${survey.id}-${questionData.sortOrder}`,
      },
      update: {},
      create: {
        id: `${survey.id}-${questionData.sortOrder}`,
        ...questionData,
      },
    });
    console.log(`✅ Created question ${questionData.sortOrder}:`, question.label);
  }

  console.log("\n🎉 Seed completed successfully!");
  console.log(`\n📋 Survey URL: /feedback-form?slug=choppaluna-feedback`);
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

