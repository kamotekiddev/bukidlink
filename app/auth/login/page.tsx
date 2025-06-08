import React from 'react';
import LoginForm from '@/app/auth/login/components/LoginForm';

async function LoginPage() {
    return (
        <main className="grid h-screen place-items-center">
            <LoginForm className="w-full max-w-sm" />
        </main>
    );
}

export default LoginPage;
