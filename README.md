This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Before running the Next.js, The databases needs to be set.
Hobby Plan is good enough for the start.

### Upstash

Upstash is used for caching the OCAPI Token in Redis.

- Create an account in [Upstash](https://www.upstash.com/) and create a database.
- Fill `.env` file via referring `.env.example` file

### Supabase

- Create an account in [Supabase](https://supabase.com/) and create a database.
- Fill `.env.example` file
- Fill `config.ts` (especially `from` & `to` dates)
- Create table with below SQL Command
```sql
CREATE TABLE daily_usage (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    "createdSandboxes" INT NOT NULL,
    "activeSandboxes" INT NOT NULL,
    "deletedSandboxes" INT NOT NULL,
    "sandboxSeconds" INT NOT NULL,
    "minutesUpByProfile" JSON,
    "minutesUp" INT NOT NULL,
    "minutesDown" INT NOT NULL
  );
```
- Run `npm run seed` (This might take so long.)

When the seed script is running, Run the development server:

```bash
npm install
npm run dev
# or
yarn
yarn dev
# or
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
