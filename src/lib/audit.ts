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
  if (!db) {
    throw new Error('Database not initialized');
  }

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
