# Role-Based Access Control (RBAC) Model

We use a `roles` table and `user_roles` join table.
Permissions are defined in `src/core/permissions.ts`.
To add new roles:
- Update DB seeds
- Add `can(user, 'action')` check in modules
- Optionally: wrap in Zod for API guards
