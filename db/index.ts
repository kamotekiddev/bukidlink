import { drizzle } from 'drizzle-orm/postgres-js';

export * from './schema';
export const db = drizzle(process.env.DATABASE_URL!);
