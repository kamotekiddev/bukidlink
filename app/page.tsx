import React from 'react';
import { Button } from '@/components/ui/button';

import { logout } from '@/actions/auth';
import { createClient } from '@/utils/supabase/server';

async function Home() {
    const supbase = await createClient();

    const {
        data: { user },
    } = await supbase.auth.getUser();

    console.log(user);

    return (
        <div className="grid min-h-screen place-items-center p-4">
            <Button onClick={logout}>Login with Google</Button>
        </div>
    );
}

export default Home;
