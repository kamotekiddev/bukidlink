import { userHasProfile } from '@/utils/actions/user';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

const CREATE_PROFILE_PATH = '/profile/create';

async function Layout({ children }: PropsWithChildren) {
    const headerList = await headers();
    const hasProfile = await userHasProfile();

    const pathname = headerList.get('x-current-path') as string;

    if (!hasProfile && !pathname.includes(CREATE_PROFILE_PATH))
        return redirect(CREATE_PROFILE_PATH);

    return <>{children}</>;
}

export default Layout;
