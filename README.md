This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<!-- Connecting Backend with Drizzle and Neon DB  -->
## Step 1: Install Dependencies
Run the following commands to install necessary packages:
```bash
npm i drizzle-orm
npm i -D drizzle-kit
npm i @neondatabase/serverless
```

## Step 2: Set Up Database Utility
Create Utils Folder: In the root folder of the project, create a utils folder.
Create db.js:
```javascript
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from './schema';

const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL);
export const db = drizzle(sql, { schema });
```
Then Create schema.js:
```javascript
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull()
});

```

 ## Step 3: Configure Environment Variables
Add the following to your **.env.local file:**

 **NEXT_PUBLIC_DRIZZLE_DATABASE_URL = postgresql://neondb_owner:Dgsc5**

# Step 4: Configure Drizzle
Create **drizzle.config.js **in the root folder:

```javascript
/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:D6mh.us-east-2.aws.neon.tech/db_prepwise?sslmode=require',
    }
};
```
**Explanation:** Provide the path to the schema file and the database URL in the configuration file.

###### Step 5: Update package.json
Add the following commands to the scripts section:
**"scripts": {
  "db:push": "npx drizzle-kit push",
  "db:studio": "npx drizzle-kit studio"
}**
**Explanation:** These commands allow you to push database changes and open Drizzle Studio for database management.

###### Summary
**Install Dependencies:** Drizzle ORM, Drizzle Kit, and Neon DB serverless package.
**Set Up Utils Folder:** Create db.js for database configuration and schema.js for schema definition.
**Configure Environment Variables:**Add the database URL in .env.local.
**Configure Drizzle:** Create a drizzle.config.js file with schema path and database credentials.
**Update package.json:** Add commands for pushing database changes and accessing Drizzle Studio.





