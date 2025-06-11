'use server';

import { formatSuccess } from '@/utils/response-formatter';
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
    const { auth } = await createClient();
    await auth.signOut();
};

export const getCurrentUser = async () => {
    const supabaseClient = await createClient();

    const {
        data: { user },
        error,
    } = await supabaseClient.auth.getUser();

    if (!user || error) throw new Error(error?.message);

    return formatSuccess({ data: user });
};
