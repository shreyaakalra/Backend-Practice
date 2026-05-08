// Acts like the bouncer - checks for cookies before allowing /dashboard access

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
    // check if the users browser has the VIP stamp
    const hasCookie = request.cookies.has('admin-session');

    // if they dont have the stamp kick them to the login page
    if(!hasCookie){
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // if they do have the stamp let them in
    return NextResponse.next();
}


export const config = {
    matcher: [
        '/dashboard/:path*',
        '/edit/:path*'
    ]
}