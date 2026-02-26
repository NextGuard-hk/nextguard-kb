import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow API routes, static assets, login page, and non-KB pages
  if (
    !pathname.startsWith('/kb') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check for kb_auth cookie (accepts both 'true' and 'authenticated')
  const authCookie = request.cookies.get('kb_auth')
  if (authCookie?.value === 'true' || authCookie?.value === 'authenticated') {
    return NextResponse.next()
  }

  // Not authenticated - redirect to login page
  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('from', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: [
    /*
     * Match KB routes only
     */
    '/kb/:path*',
  ],
}
