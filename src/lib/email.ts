import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export type EmailParams = {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
};

export async function sendEmail({
  to,
  subject,
  html,
  from = process.env.EMAIL_FROM!,
}: EmailParams): Promise<unknown> {
  if (!from) {
    // Skip silently in non-configured environments (e.g. local dev).
    console.warn('Email not sent – missing from address');
    return;
  }

  try {
    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (result && (result as any).error) {
      console.error('Resend error:', (result as any).error);
    }

    return result;
  } catch (error) {
    console.error('Email send failed:', error);
    throw error;
  }
}
