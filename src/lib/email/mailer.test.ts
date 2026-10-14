// @vitest-environment node
import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const transportSendMail = vi.fn();
const createTransport = vi.fn(() => ({ sendMail: transportSendMail }));

vi.mock('nodemailer', () => ({
  default: { createTransport: (...args: unknown[]) => createTransport(...(args as [])) },
}));

import { sendMail } from './mailer';

const message = { to: 'ana@example.com', subject: 'Reset your password', text: 'Hello Ana' };

describe('sendMail', () => {
  let outbox: string;

  beforeEach(async () => {
    vi.stubEnv('SMTP_URL', '');
    vi.stubEnv('MAIL_FROM', '');
    vi.stubEnv('MAIL_OUTBOX_DIR', '');
    transportSendMail.mockReset();
    createTransport.mockClear();
    outbox = await mkdtemp(join(tmpdir(), 'mailer-test-'));
  });

  afterEach(async () => {
    vi.unstubAllEnvs();
    await rm(outbox, { recursive: true, force: true });
  });

  describe('outbox mode', () => {
    it('writes one JSON file per message with to, from, subject, text and sentAt', async () => {
      vi.stubEnv('MAIL_OUTBOX_DIR', outbox);
      vi.stubEnv('MAIL_FROM', 'TodoNow <no-reply@todonow.test>');

      const before = Date.now();
      await sendMail(message);

      const files = await readdir(outbox);
      expect(files).toHaveLength(1);
      expect(files[0]).toMatch(/\.json$/);
      const written = JSON.parse(await readFile(join(outbox, files[0]), 'utf8'));
      expect(written).toEqual({
        to: 'ana@example.com',
        from: 'TodoNow <no-reply@todonow.test>',
        subject: 'Reset your password',
        text: 'Hello Ana',
        sentAt: expect.any(String),
      });
      expect(Date.parse(written.sentAt)).toBeGreaterThanOrEqual(before - 1000);
      expect(createTransport).not.toHaveBeenCalled();
    });

    it('keeps every message as its own file', async () => {
      vi.stubEnv('MAIL_OUTBOX_DIR', outbox);

      await sendMail(message);
      await sendMail({ ...message, to: 'bao@example.com' });

      expect(await readdir(outbox)).toHaveLength(2);
    });

    it('creates the outbox directory when it does not exist yet', async () => {
      const nested = join(outbox, 'nested', 'outbox');
      vi.stubEnv('MAIL_OUTBOX_DIR', nested);

      await sendMail(message);

      expect(await readdir(nested)).toHaveLength(1);
    });
  });

  describe('not configured', () => {
    it('throws a clear error when neither SMTP_URL nor MAIL_OUTBOX_DIR is set', async () => {
      await expect(sendMail(message)).rejects.toThrow(/email is not configured/i);
      expect(createTransport).not.toHaveBeenCalled();
    });
  });

  describe('SMTP mode', () => {
    it('sends through a nodemailer SMTP transport from MAIL_FROM', async () => {
      vi.stubEnv('SMTP_URL', 'smtp://user:pass@smtp.example.com:587');
      vi.stubEnv('MAIL_FROM', 'TodoNow <no-reply@todonow.app>');
      vi.stubEnv('MAIL_OUTBOX_DIR', outbox);
      transportSendMail.mockResolvedValue({ messageId: 'abc' });

      await sendMail(message);

      expect(createTransport).toHaveBeenCalledWith('smtp://user:pass@smtp.example.com:587');
      expect(transportSendMail).toHaveBeenCalledWith({
        from: 'TodoNow <no-reply@todonow.app>',
        to: 'ana@example.com',
        subject: 'Reset your password',
        text: 'Hello Ana',
      });
      expect(await readdir(outbox)).toHaveLength(0);
    });

    it('requires MAIL_FROM when SMTP_URL is set', async () => {
      vi.stubEnv('SMTP_URL', 'smtp://smtp.example.com:587');

      await expect(sendMail(message)).rejects.toThrow(/MAIL_FROM/);
      expect(transportSendMail).not.toHaveBeenCalled();
    });

    it('surfaces send errors to the caller', async () => {
      vi.stubEnv('SMTP_URL', 'smtp://smtp.example.com:587');
      vi.stubEnv('MAIL_FROM', 'no-reply@todonow.app');
      transportSendMail.mockRejectedValue(new Error('connection refused'));

      await expect(sendMail(message)).rejects.toThrow('connection refused');
    });
  });

  describe('input validation', () => {
    it.each([
      ['an empty recipient', { ...message, to: '' }],
      ['a recipient with a line break', { ...message, to: 'a@example.com\nBcc: x@example.com' }],
      ['a recipient without @', { ...message, to: 'not-an-email' }],
      ['an empty subject', { ...message, subject: '  ' }],
      ['a subject with a line break', { ...message, subject: 'Hi\r\nBcc: x@example.com' }],
      ['a non-string text', { ...message, text: 42 as unknown as string }],
    ])('rejects %s before sending', async (_label, input) => {
      vi.stubEnv('MAIL_OUTBOX_DIR', outbox);

      await expect(sendMail(input)).rejects.toThrow(/invalid email/i);
      expect(await readdir(outbox)).toHaveLength(0);
    });
  });
});
