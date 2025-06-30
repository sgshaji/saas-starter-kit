import { db } from '@/libs/DB';
import { auditLogSchema } from '@/models/Schema';

// @ts-nocheck

export type AuditEntry = {
  actorId: string;
  action: string;
  entity: string;
  metadata?: Record<string, unknown> | string;
};

export async function logAudit(entry: AuditEntry) {
  // @ts-expect-error - db is initialized in runtime singleton
  await db.insert(auditLogSchema).values({
    actorId: entry.actorId,
    action: entry.action,
    entity: entry.entity,
    metadata:
      typeof entry.metadata === 'string'
        ? entry.metadata
        : JSON.stringify(entry.metadata ?? {}),
  }).execute();
}
