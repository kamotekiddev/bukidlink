import { db } from '@/db';
import { ProfileTable, insertProfileSchema } from '@/db/user';
import { CreateProfilePayload } from '@/typings/user';
import { getCurrentUser } from '@/utils/actions/auth';
import { formatError, formatSuccess } from '@/utils/response-formatter';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
    try {
        const { data: user } = await getCurrentUser();
        const body: CreateProfilePayload = await request.json();

        if (!user)
            return Response.json(formatSuccess({ message: 'Unauthorized' }), {
                status: 401,
            });

        const userAlreadyExists = await db.query.ProfileTable.findFirst({
            where: eq(ProfileTable.user_id, user.id),
        });

        console.log(userAlreadyExists);

        if (userAlreadyExists)
            return Response.json(
                formatError({
                    message: 'User already has a profile',
                }),
                { status: 400 }
            );

        // Validate the request body using the schema
        const result = await insertProfileSchema.safeParseAsync(body);

        if (!result.success)
            return Response.json(
                formatError({
                    message: 'Invalid request body',
                    error: result.error,
                }),
                { status: 400 }
            );

        const [profile] = await db
            .insert(ProfileTable)
            .values({ ...body, user_id: user.id })
            .returning();

        return Response.json(
            formatSuccess({
                data: profile,
                message: 'Profile created successfully',
            })
        );
    } catch (error) {
        return Response.json(
            formatError({ message: 'Internal server error', error }),
            { status: 500 }
        );
    }
}
