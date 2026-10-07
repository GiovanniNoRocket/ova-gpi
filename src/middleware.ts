import { NextResponse } from 'next/server'

import { auth } from '@/auth.edge'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth
  const isLoggedIn = !!session?.user
  const role = session?.user?.role

  if (pathname.startsWith('/dashboard')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    if (role !== 'TEACHER' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  if (pathname.startsWith('/course')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    if (role !== 'STUDENT' && role !== 'TEACHER' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    if (role !== 'TEACHER' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/dashboard/:path*', '/course/:path*', '/admin/:path*'],
}
