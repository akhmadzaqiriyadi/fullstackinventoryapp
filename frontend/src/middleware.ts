import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Cek jika token ada di localStorage atau cookie
  const token = req.cookies.get('token'); // Bisa juga pakai localStorage jika aplikasi di-browser

  if (!token) {
    // Jika tidak ada token, redirect ke halaman login
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Jika ada token, lanjutkan ke halaman yang diminta
  return NextResponse.next();
}

// Tentukan path yang memerlukan middleware, misalnya hanya path '/dashboard'
export const config = {
  matcher: ['/admin/:path*'],
};