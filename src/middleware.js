import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/shared/constants/ulrList';

export const middleware = async (request) => {
    try {
        const route = request?.nextUrl?.pathname;
        // Skip middleware for static files
        if (route.startsWith('/_next')) {
            return NextResponse.next();
        }

        const url = request?.nextUrl?.clone();
        url?.searchParams?.set("route", route);

        if (!request?.url?.includes("/admin")) {
            return NextResponse.rewrite(url);
        }

        const token = await request.cookies.get("adminAuthToken")?.value || null;

        if (route === '/admin/signin') {
            // Allow unauthenticated access to signin page
            if (!token) {
                return NextResponse.next();
            }

            const res = await fetch(`${BACKEND_URL}/admin/auth/check-token`, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            const data = await res?.json();
            if (data.verified) {
                return NextResponse.redirect(new URL('/admin/news', request.url));
            }

            return NextResponse.next();
        }

        if (token) {
            const res = await fetch(`${BACKEND_URL}/admin/auth/check-token`, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                if (data.verified) {
                    return NextResponse.next();
                }
            }
        }

    } catch (error) {
        console.error("Error in middleware ==>", error);
    }

    return NextResponse.redirect(new URL('/admin/signin', request.url));
};


export const config = {
    matcher: ['/:path*'],
};
