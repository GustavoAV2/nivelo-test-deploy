import { createServerClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({
                        request
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                }
            }
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (isUserNotLogged(user) && isAccessingExclusiveLoggedRoute(request)) {
        return redirectToLogin(request);
    }

    if (isUserLogged(user) && isAcessingExclusiveNotLoggedRoute(request)) {
        return redirectToHome(request);
    }

    return supabaseResponse;
}

function isUserLogged(user: User | null) {
    return user != null;
}

function isUserNotLogged(user: User | null) {
    return user == null;
}

function isAccessingExclusiveLoggedRoute(request: NextRequest) {
    return (
        request.nextUrl.pathname.startsWith("/app") ||
        request.nextUrl.pathname.startsWith("/recovery/conclusion")
    );
}

function isAcessingExclusiveNotLoggedRoute(request: NextRequest) {
    return (
        request.nextUrl.pathname.startsWith("/login") ||
        request.nextUrl.pathname.startsWith("/sign-up") ||
        request.nextUrl.pathname.startsWith("/recovery/send-email") ||
        request.nextUrl.pathname.startsWith("/recovery/confirmation")
    );
}

function redirectToLogin(request: NextRequest) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";

    return NextResponse.redirect(url);
}

function redirectToHome(request: NextRequest) {
    const url = request.nextUrl.clone();
    url.pathname = "/app/home";

    return NextResponse.redirect(url);
}
