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

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = req.cookies.get('admin_token')?.value
    const password = process.env.ADMIN_PASSWORD
    if (!password || token !== password) {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
}
