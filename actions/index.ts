'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export const login = async () => {
    const supabase = await createClient();
    const { get } = await headers();

    console.log(`${get('origin')}/auth/callback`);

    const { data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${get('origin')}/auth/callback`,
        },
    });

    if (data.url) redirect(data?.url);
};

export const logout = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
};
