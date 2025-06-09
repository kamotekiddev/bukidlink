'use server';

import { eq } from 'drizzle-orm';
import { createClient } from '@/utils/supabase/server';
import { db, schema } from '@/db';
import {
    CreateProfilePayload,
    insertProfileSchema,
    ProfileTable,
} from '@/db/schema';

export const getCurrentUser = async () => {
    const supabaseClient = await createClient();
    const {
        data: { user },
        error,
    } = await supabaseClient.auth.getUser();

    return { user, error };
};

export const userHasProfile = async () => {
    const { user, error } = await getCurrentUser();

    if (!user || error) throw error;

    const profile = await db.query.ProfileTable.findFirst({
        where: eq(schema.ProfileTable.user_id, user.id),
    });

    return !!profile;
};

export const setupProfile = async (profileInfo: CreateProfilePayload) => {
    const { user, error } = await getCurrentUser();

    if (!user || error) throw error;

    const res = await insertProfileSchema.safeParseAsync(profileInfo);
    if (res.error)
        return {
            isSuccess: false,
            message: res.error.message,
            data: res.error,
        };

    const profile = await db
        .insert(ProfileTable)
        .values({ ...profileInfo, user_id: user.id });

    return {
        isSuccess: true,
        data: profile,
        message: 'Profile has been created',
    };
};
