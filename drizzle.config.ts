import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './db/schema.ts',
    dialect: 'postgresql',
    schemaFilter: ['public'],
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
