'use server';

import { db, schema } from '@/db';
import { getCurrentUser } from '@/utils/actions/auth';
import { formatResponse } from '@/utils/response-formatter';
import { eq } from 'drizzle-orm';

export const userHasProfile = async () => {
    try {
        const user = await getCurrentUser();

        if (!user) throw new Error('Unauthorized');

        const profile = await db.query.ProfileTable.findFirst({
            where: eq(schema.ProfileTable.user_id, user.id),
        });

        return !!profile;
    } catch (error) {
        console.error(
            formatResponse({
                isSuccess: false,
                message: 'Something went wrong',
                data: error,
            })
        );

        return false;
    }
};
