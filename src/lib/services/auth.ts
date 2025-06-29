import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';

export function getAuth() {
  return auth();
}

export async function getCurrentUser() {
  return currentUser();
}

// Returns the primary email address for the given Clerk user ID or null if none found.
export async function getUserEmail(userId: string): Promise<string | null> {
  const user = await (clerkClient as any).users.getUser(userId);

  return user?.emailAddresses?.[0]?.emailAddress ?? null;
}
