import { z } from 'zod/dist/types/v4';
import { insertProfileSchema, ProfileTable } from '@/db/user';

export type CreateProfilePayload = z.infer<typeof insertProfileSchema>;
export type Profile = typeof ProfileTable.$inferSelect;
