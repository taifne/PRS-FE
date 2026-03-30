import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const { pathname, search } = request.nextUrl;

    const isPublic = pathname.startsWith('/login') || pathname.startsWith('/register');

    // Not logged in → redirect to login with intended path
    if (!refreshToken && !isPublic) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname + search);
        return NextResponse.redirect(loginUrl);
    }

    // Logged in → prevent going to login/register
    if (refreshToken && isPublic) {
        const redirectTo = request.nextUrl.searchParams.get('redirect') || '/';
        return NextResponse.redirect(new URL(redirectTo, request.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.(png|jpg|jpeg|svg|ico|webp)$).*)'],
};