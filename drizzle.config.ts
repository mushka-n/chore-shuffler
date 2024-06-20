import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.development.local" });

export default defineConfig({
  schema: "./database/schema.ts",
  out: "./database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
