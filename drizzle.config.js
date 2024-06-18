/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:Dgsc5Of1IRlT@ep-soft-wood-a57l06mh.us-east-2.aws.neon.tech/db_prepwise?sslmode=require',
    }
  };    