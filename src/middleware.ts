import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Only protect /kb routes
  const { pathname } = request.nextUrl

  // Allow API routes, static assets, and non-KB pages
  if (
    !pathname.startsWith('/kb') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check for kb_auth cookie (set by /api/kb-auth POST with value 'true')
  const authCookie = request.cookies.get('kb_auth')
  if (authCookie?.value === 'true') {
    return NextResponse.next()
  }

  // Not authenticated - let the page load (KBAuthWrapper will show login form)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match KB routes only
     */
    '/kb/:path*',
  ],
}
