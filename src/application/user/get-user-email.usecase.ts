import type { IUserRepository } from './user.repository';

export const createGetUserEmail = (repo: IUserRepository) => async (userId: string): Promise<string | null> => {
  const user = await repo.getById(userId);
  return user?.email ?? null;
};
