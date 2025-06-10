'use server';

import { eq } from 'drizzle-orm';
import { db, schema } from '@/db';
import {
    CreateProfilePayload,
    insertProfileSchema,
    ProfileTable,
} from '@/db/schema';
import { getCurrentUser } from '@/utils/actions/auth';
import { ResponseHandler } from '../response-handler';

export const userHasProfile = async () => {
    const { data: user } = await getCurrentUser();

    if (!user) throw new Error('User not found');

    const profile = await db.query.ProfileTable.findFirst({
        where: eq(schema.ProfileTable.user_id, user?.id),
    });

    return !!profile;
};

export const setupProfile = async (profileInfo: CreateProfilePayload) => {
    const { data: user } = await getCurrentUser();

    const { error } = await insertProfileSchema.safeParseAsync(profileInfo);
    if (error) return ResponseHandler.error({ message: error.message });
    if (!user) return;

    const profile = await db
        .insert(ProfileTable)
        .values({ ...profileInfo, user_id: user.id })
        .returning();

    return ResponseHandler.success({ data: profile });
};
