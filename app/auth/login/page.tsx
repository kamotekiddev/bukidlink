import LoginForm from '@/app/auth/login/components/LoginForm';
import React from 'react';

async function LoginPage() {
    return (
        <main className="grid h-screen place-items-center">
            <LoginForm className="w-full max-w-sm" />
        </main>
    );
}

export default LoginPage;
