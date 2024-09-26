import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Convertir la requête `Request` en `NextRequest`
  const nextReq = req as NextRequest;

  // Utiliser `getAuth` avec `NextRequest`
  const { userId } = getAuth(nextReq);

  // Vérifier si l'utilisateur est authentifié
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Log du `userId` sur le serveur
  console.log('Logged in User ID:', userId);

  // Renvoyer la réponse avec le `userId`
  return NextResponse.json({ userId }, { status: 200 });
}
