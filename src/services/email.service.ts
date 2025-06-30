import { sendEmail } from '@/lib/email';

// Thin anti-corruption layer around lib/email so UI never imports it directly.
export const EmailService = {
  send: sendEmail,
};
