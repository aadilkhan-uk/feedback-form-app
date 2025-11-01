# 📊 Database Setup Guide

This guide shows you how to add records to your database.

---

## 🌱 Option 1: Seed Script (Recommended)

I've created a seed script that will populate your database with a sample survey.

### **What it creates:**
- ✅ A restaurant: "Choppaluna"
- ✅ A survey: "Choppaluna Feedback Form"
- ✅ 4 questions (3 rating, 1 text)

### **Step 1: Install Dependencies**

```bash
pnpm install
```

### **Step 2: Run the Seed Script**

**For Local Development:**
```bash
pnpm db:seed
```

**For Production Database:**
```bash
# Set your production DATABASE_URL temporarily
DATABASE_URL="your-production-postgres-url" pnpm db:seed
```

### **Step 3: Access Your Survey**

After seeding, your feedback form will be available at:
```
https://your-app.vercel.app/feedback-form?slug=choppaluna-feedback
```

---

## 🎨 Option 2: Prisma Studio (Visual Database Editor)

Prisma Studio provides a visual interface to add/edit records.

### **For Local Database:**

```bash
pnpm db:studio
```

This opens a browser at `http://localhost:5555` where you can:
- Browse tables
- Add/edit/delete records
- View relationships

### **For Production Database:**

```bash
# Set production DATABASE_URL
DATABASE_URL="your-production-postgres-url" pnpm db:studio
```

⚠️ **Warning**: Be careful editing production data!

---

## 🔧 Option 3: Direct SQL

You can connect to your PostgreSQL database and run SQL directly.

### **Get Connection Details:**

**For Vercel Postgres:**
1. Go to your Vercel dashboard
2. Click "Storage" → Your Postgres database
3. Click "Connect" to get connection details

### **Using psql (PostgreSQL CLI):**

```bash
psql "your-postgres-connection-string"
```

### **Example: Create a Survey**

```sql
-- Insert a restaurant
INSERT INTO "Restaurant" (id, name, "createdAt", "updatedAt")
VALUES ('rest-1', 'My Restaurant', NOW(), NOW());

-- Insert a survey
INSERT INTO "Survey" (id, title, slug, "isActive", "restaurantId", "createdAt", "updatedAt")
VALUES ('survey-1', 'Customer Feedback', 'customer-feedback', true, 'rest-1', NOW(), NOW());

-- Insert a question
INSERT INTO "Question" (id, type, required, label, "sortOrder", "surveyId")
VALUES ('q-1', 'rating', true, 'How was your experience?', 1, 'survey-1');
```

---

## 📝 Option 4: Modify the Seed Script

Edit `prisma/seed.ts` to customize your data:

```typescript
// Change restaurant name
const restaurant = await prisma.restaurant.upsert({
  where: { id: "default-restaurant" },
  update: {},
  create: {
    id: "default-restaurant",
    name: "Your Restaurant Name", // ← Change this
    placeId: null,
  },
});

// Change survey details
const survey = await prisma.survey.upsert({
  where: { slug: "your-custom-slug" }, // ← Change this
  update: {},
  create: {
    title: "Your Survey Title", // ← Change this
    slug: "your-custom-slug", // ← Change this
    isActive: true,
    restaurantId: restaurant.id,
    googleRedirects: 0,
  },
});

// Add/modify questions
const questions = [
  {
    surveyId: survey.id,
    type: "rating" as const,
    required: true,
    label: "Your question here?", // ← Change this
    sortOrder: 1,
  },
  // Add more questions...
];
```

Then run: `pnpm db:seed`

---

## 🚀 Quick Start for Production

To seed your production database right now:

1. **Get your production DATABASE_URL:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Copy the `DATABASE_URL` value

2. **Run the seed:**
   ```bash
   DATABASE_URL="postgresql://your-connection-string" pnpm db:seed
   ```

3. **Verify it worked:**
   - Visit: `https://your-app.vercel.app/feedback-form?slug=choppaluna-feedback`
   - You should see your survey!

---

## 📋 Database Schema Reference

Here's what you can create:

### **Restaurant**
```typescript
{
  id: string,
  name: string,
  placeId?: string,
  createdAt: Date,
  updatedAt: Date
}
```

### **Survey**
```typescript
{
  id: string,
  title: string,
  slug: string, // Used in URL: /feedback-form?slug=YOUR_SLUG
  isActive: boolean,
  googleRedirects: number,
  restaurantId?: string,
  createdAt: Date,
  updatedAt: Date
}
```

### **Question**
```typescript
{
  id: string,
  type: "rating" | "text",
  required: boolean,
  label: string, // The question text
  sortOrder: number, // Display order (1, 2, 3...)
  surveyId: string
}
```

### **Submission** (Created automatically when users submit)
```typescript
{
  id: string,
  surveyId: string,
  createdAt: Date
}
```

### **Answer** (Created automatically when users submit)
```typescript
{
  id: string,
  submissionId: string,
  questionId: string,
  textValue?: string, // For text questions
  ratingValue?: number, // For rating questions (1-10)
}
```

---

## 🔍 Troubleshooting

### "Error: P1001: Can't reach database server"

**Solution**: Check your `DATABASE_URL` is correct and includes `?sslmode=require`

### "Unique constraint failed"

**Solution**: The seed script uses `upsert`, so running it multiple times is safe. If you see this error, the data already exists (which is fine!).

### "Permission denied"

**Solution**: Make sure your database user has write permissions. Vercel Postgres should have this by default.

---

## 🎯 Next Steps

After seeding:

1. ✅ Visit your feedback form: `/feedback-form?slug=your-slug`
2. ✅ Submit a test response
3. ✅ Check the dashboard: `/dashboard`
4. ✅ View responses in Prisma Studio or the dashboard

Need help? Check the main README.md or DEPLOYMENT.md files!

