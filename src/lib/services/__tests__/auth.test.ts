import { clerkClient } from '@clerk/nextjs/server';
import { describe, expect, it, vi } from 'vitest';

import { createGetUserEmail } from '@/application/user/get-user-email.usecase';
import { ClerkUserRepository } from '@/application/user/user.repository';

const getUserEmail = createGetUserEmail(new ClerkUserRepository());

vi.mock('@clerk/nextjs/server', async () => {
  const actual = await vi.importActual<typeof import('@clerk/nextjs/server')>(
    '@clerk/nextjs/server',
  );
  return {
    ...actual,
    clerkClient: {
      users: {
        getUser: vi.fn().mockResolvedValue({
          emailAddresses: [{ emailAddress: 'test@example.com' }],
        }),
      },
    },
  };
});

describe('getUserEmail', () => {
  it('returns primary email from Clerk', async () => {
    const email = await getUserEmail('user_123');

    expect(email).toBe('test@example.com');
    expect((clerkClient as any).users.getUser).toHaveBeenCalledWith('user_123');
  });

  it('returns null if no email found', async () => {
    ((clerkClient as any).users.getUser as any).mockResolvedValueOnce({ emailAddresses: [] });
    const email = await getUserEmail('user_456');

    expect(email).toBeNull();
  });
});
