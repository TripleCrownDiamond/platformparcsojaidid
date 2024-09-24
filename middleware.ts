import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Définir le matcher pour les routes protégées
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
})

export const config = {
  matcher: [
    // Ignorer les fichiers internes de Next.js et tous les fichiers statiques
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Toujours s'exécuter pour les routes API
    '/(api|trpc)(.*)',
  ],
};
