'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/utils/actions/auth';
import { useRouter } from 'next/navigation';
import React from 'react';

function Navbar() {
    const router = useRouter();
    const handleLogout = async () => {
        const res = await logout();
        if (res.isSuccess) router.refresh();
    };

    return (
        <nav>
            <Button onClick={handleLogout}>Signout</Button>
        </nav>
    );
}

export default Navbar;
