'use server';

import { formatResponse } from '@/utils/response-formatter';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const login = async () => {
    const { auth } = await createClient();
    const { get } = await headers();

    const { data } = await auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${get('origin')}/auth/callback`,
        },
    });

    if (data.url) redirect(data?.url);
};

export const logout = async () => {
    try {
        const { auth } = await createClient();
        await auth.signOut();
        return formatResponse({ isSuccess: true, message: 'User Logged Out' });
    } catch (error) {
        return formatResponse({
            isSuccess: false,
            message: 'Something went wrong',
            data: error,
        });
    }
};

export const getCurrentUser = async () => {
    const supabaseClient = await createClient();
    const {
        data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) return null;
    return user;
};
