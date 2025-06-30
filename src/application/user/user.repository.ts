import { clerkClient } from '@clerk/nextjs/server';

import { UserEntity } from '@/domain/user/user.entity';

export type IUserRepository = {
  getById: (id: string) => Promise<UserEntity | null>;
};

export class ClerkUserRepository implements IUserRepository {
  getById = async (id: string): Promise<UserEntity | null> => {
    try {
      const user = await (clerkClient as any).users.getUser(id);
      return new UserEntity({ id: user.id, email: user.emailAddresses[0]?.emailAddress ?? null });
    } catch {
      return null;
    }
  };
}
