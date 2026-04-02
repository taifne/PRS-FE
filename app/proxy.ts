// proxy.ts (or wherever your proxy file is located)
import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    // Look for refresh_token (snake_case) - matches what you're setting
    const refreshToken = request.cookies.get('refresh_token')?.value;
    const userId = request.cookies.get('userId')?.value;
    const { pathname, search } = request.nextUrl;

    const isPublic = pathname.startsWith('/login') || pathname.startsWith('/register');

    // Debug logging
    console.log('=== PROXY DEBUG ===');
    console.log('Pathname:', pathname);
    console.log('Has refresh_token:', !!refreshToken);
    console.log('Has userId:', !!userId);

    // Not logged in → redirect to login with intended path
    if (!refreshToken && !isPublic) {
        console.log('No refresh token, redirecting to login');
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname + search);
        return NextResponse.redirect(loginUrl);
    }

    // Logged in → prevent going to login/register
    if (refreshToken && isPublic) {
        console.log('Has refresh token on public page, redirecting to dashboard');
        const redirectTo = request.nextUrl.searchParams.get('redirect') || '/';
        return NextResponse.redirect(new URL(redirectTo, request.url));
    }

    console.log('Allowing access to:', pathname);
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.(png|jpg|jpeg|svg|ico|webp)$).*)'],
};