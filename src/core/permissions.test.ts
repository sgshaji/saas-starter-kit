import { describe, expect, it } from 'vitest';

import { can, Permissions, Roles } from './permissions';

describe('permissions.can', () => {
  it('owner has all permissions', () => {
    expect(can(Roles.OWNER, Permissions.MANAGE_BILLING)).toBe(true);
    expect(can(Roles.OWNER, Permissions.MANAGE_TEAM)).toBe(true);
  });

  it('member lacks manage_billing', () => {
    expect(can(Roles.MEMBER, Permissions.MANAGE_BILLING)).toBe(false);
  });

  it('admin lacks manage_billing', () => {
    expect(can(Roles.ADMIN, Permissions.MANAGE_BILLING)).toBe(false);
  });

  it('member can edit todo but cannot manage team', () => {
    expect(can(Roles.MEMBER, Permissions.EDIT_TODO)).toBe(true);
    expect(can(Roles.MEMBER, Permissions.MANAGE_TEAM)).toBe(false);
  });
});
