import { NextRequest, NextResponse } from 'next/server';

// Liste des routes protégées
const protectedRoutes = ['/dashboard'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token');

  // Redirige l'utilisateur déjà authentifié qui tente d'accéder à /login ou /register
  if ((pathname.startsWith('/login') || pathname.startsWith('/register')) && token) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Vérifie si la route est protégée
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      // Redirige vers la page de login si non authentifié
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Laisse passer la requête sinon
  return NextResponse.next();
}

// Applique le middleware à toutes les routes
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
