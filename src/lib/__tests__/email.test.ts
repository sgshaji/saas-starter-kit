// src/lib/__tests__/email.test.ts

import { Resend } from 'resend';
import { describe, expect, it, vi } from 'vitest';

import { sendEmail } from '../email';

vi.mock('resend', () => {
  const send = vi.fn().mockResolvedValue({ id: 'email_test_123' });
  return {
    Resend: vi.fn().mockImplementation(() => ({
      emails: {
        send,
      },
    })),
  };
});

describe('sendEmail', () => {
  it('should call Resend with correct params', async () => {
    const result = await sendEmail({
      to: 'user@example.com',
      subject: 'Test Subject',
      html: '<p>Hello world</p>',
    });

    expect(result).toEqual({ id: 'email_test_123' });

    const resendInstance = new Resend('fake');

    expect(resendInstance.emails.send).toHaveBeenCalledWith({
      from: process.env.EMAIL_FROM,
      to: 'user@example.com',
      subject: 'Test Subject',
      html: '<p>Hello world</p>',
    });
  });
});
