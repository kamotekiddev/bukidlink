'use server';

import { eq } from 'drizzle-orm';
import { createClient } from '@/utils/supabase/server';
import { db, schema } from '@/db';

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
