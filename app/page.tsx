import React from 'react';
import { Button } from '@/components/ui/button';

import { logout } from '@/actions';

function Home() {
    return (
        <div className="grid min-h-screen place-items-center p-4">
            <Button onClick={logout}>Login with Google</Button>
        </div>
    );
}

export default Home;
