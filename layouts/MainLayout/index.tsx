import React, { PropsWithChildren } from 'react';

import Navbar from './Navbar';

function MainLayout({ children }: PropsWithChildren) {
    return (
        <main>
            <Navbar />
            {children}
        </main>
    );
}

export default MainLayout;
