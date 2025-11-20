import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Admin rotalarını koru
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Burada auth kontrolü yapmıyoruz, sayfa içinde yapacağız
    // Çünkü middleware'de Supabase auth karmaşık oluyor
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}