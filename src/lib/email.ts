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
}: EmailParams): Promise<void> {
  if (!from || !process.env.RESEND_API_KEY) {
    // Skip silently in non-configured environments (e.g. local dev).
    console.warn('Email not sent – missing from address or RESEND_API_KEY');
    return;
  }

  try {
    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
    }

    // done
  } catch (error) {
    console.error('Email send failed:', error);
  }
}
