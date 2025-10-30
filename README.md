# Feedback Form App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## 🔒 Authentication Setup

This application uses password-based authentication to protect the dashboard. **You must configure the password before running the app.**

### Quick Setup

1. Create a `.env` file in the root directory:

```bash
cp .env.example .env  # or create manually
```

2. Add these required environment variables:

```env
DATABASE_URL="file:./prisma/db.sqlite"
AUTH_SECRET="your-generated-secret-here"
DASHBOARD_PASSWORD="your-secure-password-here"
OPENAI_API_KEY="your-openai-key-here"
NODE_ENV="development"
```

3. Generate a secure AUTH_SECRET:

```bash
openssl rand -base64 32
```

4. Choose a strong password for `DASHBOARD_PASSWORD` (minimum 8 characters)

📖 **For detailed authentication setup instructions, see [AUTH_SETUP.md](./AUTH_SETUP.md)**

## Getting Started

```bash
# Install dependencies
pnpm install

# Run database migrations
pnpm db:push

# Start development server
pnpm dev
```

Visit `http://localhost:3000/login` to access the dashboard.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
