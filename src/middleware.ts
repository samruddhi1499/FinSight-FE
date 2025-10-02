import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
const publicRoutes = ['/', '/login', '/register']
const protectedRoutes = ['/dashboard', '/onboarding']
export function middleware(request: NextRequest) {
 const { pathname } = request.nextUrl
 if (publicRoutes.some(route => pathname === route)) {
  return NextResponse.next()
  }
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
  if (!isProtected) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }
  const token = request.cookies.get('jwt_token')?.value
  const onboardingRequired = request.cookies.get('onboarding_required')?.value === "true"

console.log('Pathname:', pathname, 'Token:', token, 'Onboarding:', onboardingRequired);

  // Block /dashboard if onboarding required, force /onboarding access
  if (pathname.startsWith('/dashboard') && onboardingRequired) {
    return NextResponse.redirect(new URL('/onboarding', request.url))
  }
  // Block /onboarding if onboarding not required
  if (pathname.startsWith('/onboarding') && !onboardingRequired) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}
export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/onboarding', '/onboarding/:path*'],
}
