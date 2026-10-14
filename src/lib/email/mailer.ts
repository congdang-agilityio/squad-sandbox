// Server-side helper: do not import from client components.
import { randomUUID } from 'node:crypto';
import { mkdir, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import nodemailer from 'nodemailer';

export type MailMessage = { to: string; subject: string; text: string };

// One address, no whitespace or control characters (blocks header injection).
const ADDRESS_SHAPE = /^[^\s@]+@[^\s@]+$/;
const ADDRESS_MAX_LENGTH = 254;
const SUBJECT_MAX_LENGTH = 998;

function validate({ to, subject, text }: MailMessage): void {
  const validTo =
    typeof to === 'string' && to.length <= ADDRESS_MAX_LENGTH && ADDRESS_SHAPE.test(to);
  const validSubject =
    typeof subject === 'string' &&
    subject.trim() !== '' &&
    subject.length <= SUBJECT_MAX_LENGTH &&
    !/[\r\n]/.test(subject);
  if (!validTo || !validSubject || typeof text !== 'string') {
    throw new Error(
      'Invalid email message: needs one recipient address, a one-line subject and text',
    );
  }
}

/**
 * Sends one plain-text email. SMTP_URL set: sends through SMTP from MAIL_FROM. Otherwise
 * MAIL_OUTBOX_DIR set: writes the message as a JSON file there (tests and e2e). Neither set:
 * throws, so a message is never dropped silently. Send errors reach the caller. Message bodies
 * may hold secrets (reset links) and are never logged.
 */
export async function sendMail(message: MailMessage): Promise<void> {
  validate(message);
  const { to, subject, text } = message;
  const smtpUrl = process.env.SMTP_URL;
  const from = process.env.MAIL_FROM ?? '';
  const outboxDir = process.env.MAIL_OUTBOX_DIR;

  if (smtpUrl) {
    if (!from) throw new Error('MAIL_FROM must be set when SMTP_URL is set');
    await nodemailer.createTransport(smtpUrl).sendMail({ from, to, subject, text });
    return;
  }

  if (outboxDir) {
    await mkdir(outboxDir, { recursive: true });
    const name = `${Date.now()}-${randomUUID()}`;
    const body = JSON.stringify({ to, from, subject, text, sentAt: new Date().toISOString() });
    // Write then rename, so a reader never sees a half-written file.
    await writeFile(join(outboxDir, `${name}.tmp`), body, 'utf8');
    await rename(join(outboxDir, `${name}.tmp`), join(outboxDir, `${name}.json`));
    return;
  }

  throw new Error('Email is not configured: set SMTP_URL (with MAIL_FROM) or MAIL_OUTBOX_DIR');
}
