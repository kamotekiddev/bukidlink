'use server';

import { db, schema } from '@/db';
import { getCurrentUser } from '@/utils/actions/auth';
import { eq } from 'drizzle-orm';

export const userHasProfile = async () => {
    const { data: user } = await getCurrentUser();

    if (!user) throw new Error('User not found');

    const profile = await db.query.ProfileTable.findFirst({
        where: eq(schema.ProfileTable.user_id, user?.id),
    });

    return !!profile;
};
