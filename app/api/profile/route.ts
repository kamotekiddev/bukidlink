import { insertProfileSchema, ProfileTable } from '@/db/user';
import { ResponseHandler } from '@/utils/response-handler';
import { getCurrentUser } from '@/utils/actions/auth';
import { db } from '@/db';

export async function POST(request: Request) {
    try {
        const { data: user } = await getCurrentUser();
        const body = await request.json();

        if (!user)
            return Response.json(
                ResponseHandler.error({ message: 'Unauthorized' }),
                { status: 401 }
            );

        // Validate the request body using the schema
        const result = await insertProfileSchema.safeParseAsync(body);

        if (!result.success) {
            return Response.json(
                ResponseHandler.error({
                    message: 'Invalid request body',
                    error: result.error,
                }),
                { status: 400 }
            );
        }

        const [profile] = await db
            .insert(ProfileTable)
            .values({ ...body, user_id: user.id })
            .returning();

        return Response.json(
            ResponseHandler.success({
                data: profile,
                message: 'Profile created successfully',
            })
        );
    } catch (error) {
        return Response.json(
            ResponseHandler.error({ message: 'Internal server error', error }),
            { status: 500 }
        );
    }
}
