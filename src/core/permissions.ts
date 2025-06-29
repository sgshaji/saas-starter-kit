export const Roles = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MEMBER: 'member',
} as const;

export type Role = typeof Roles[keyof typeof Roles];

export const Permissions = {
  MANAGE_BILLING: 'manage_billing',
  MANAGE_TEAM: 'manage_team',
  VIEW_DASHBOARD: 'view_dashboard',
  EDIT_TODO: 'edit_todo',
} as const;

export type Permission = typeof Permissions[keyof typeof Permissions];

const rolePermissions: Record<Role, Permission[]> = {
  owner: [
    Permissions.MANAGE_BILLING,
    Permissions.MANAGE_TEAM,
    Permissions.VIEW_DASHBOARD,
    Permissions.EDIT_TODO,
  ],
  admin: [
    Permissions.MANAGE_TEAM,
    Permissions.VIEW_DASHBOARD,
    Permissions.EDIT_TODO,
  ],
  member: [Permissions.VIEW_DASHBOARD, Permissions.EDIT_TODO],
};

export function can(role: Role, permission: Permission) {
  return rolePermissions[role].includes(permission);
}
