import { ProfileTable, insertProfileSchema } from '@/db/user';
import { z } from 'zod/dist/types/v4';

export type CreateProfilePayload = z.infer<typeof insertProfileSchema>;
export type Profile = typeof ProfileTable.$inferSelect;
