import { auth, currentUser } from '@clerk/nextjs/server';

export function getAuth() {
  return auth();
}

export async function getCurrentUser() {
  return currentUser();
}
