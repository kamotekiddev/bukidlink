import CreateProfileForm from '@/app/(main)/components/CreateProfileForm';
import MainLayout from '@/layouts/MainLayout';
import { userHasProfile } from '@/utils/actions/user';
import React, { PropsWithChildren } from 'react';

async function Layout({ children }: PropsWithChildren) {
    const hasProfile = await userHasProfile();

    if (!hasProfile)
        return (
            <div className="h-screen grid place-items-center">
                <CreateProfileForm />
            </div>
        );

    return <MainLayout>{children}</MainLayout>;
}

export default Layout;
