'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

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
