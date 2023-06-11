This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Before running the Next.js, The database needs to be set;

- Create an account in [Planetscale](https://planetscale.com/) and create a database.
- Fill `.env.example` file
- Fill `config.ts` (especially `from` & `to` dates)
- Run `npm run createTables`
- Run `npm run seed` (This might take so long.)


When the seed script is running, Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
