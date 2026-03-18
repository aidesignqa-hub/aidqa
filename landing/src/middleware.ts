import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? ''
  const { pathname } = req.nextUrl

  // Route lp.aidesignqa.com to /lp internally
  if (host.startsWith('lp.') && !pathname.startsWith('/lp')) {
    const url = req.nextUrl.clone()
    url.pathname = '/lp' + (pathname === '/' ? '' : pathname)
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
}
