import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

const AUTH_ROUTES = ['/auth/login', '/auth/callback'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const { supabase, response } = await updateSession(request);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user && !AUTH_ROUTES.includes(pathname))
        return NextResponse.redirect(new URL('/auth/login', request.nextUrl));

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
