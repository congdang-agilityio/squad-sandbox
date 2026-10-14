import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { expect } from '@playwright/test';

type OutboxMessage = { to: string; subject: string; text: string; sentAt: string };

const RESET_LINK = /https?:\/\/\S+\/reset-password\?token=[A-Za-z0-9_-]+/;

async function newestMessageTo(address: string): Promise<OutboxMessage | undefined> {
  const dir = process.env.MAIL_OUTBOX_DIR;
  if (!dir) throw new Error('MAIL_OUTBOX_DIR is not set (see playwright.config.ts)');
  const names = await readdir(dir).catch(() => [] as string[]);
  const messages = await Promise.all(
    names
      .filter((name) => name.endsWith('.json'))
      .map(async (name) => JSON.parse(await readFile(join(dir, name), 'utf8')) as OutboxMessage),
  );
  return messages
    .filter((message) => message.to === address)
    .sort((a, b) => b.sentAt.localeCompare(a.sentAt))[0];
}

/** Waits for the newest email to `address` holding a reset link newer than `after`, returns the link. */
export async function waitForResetLink(address: string, after?: string): Promise<string> {
  let link: string | undefined;
  await expect
    .poll(async () => {
      link = (await newestMessageTo(address))?.text.match(RESET_LINK)?.[0];
      return link !== undefined && link !== after;
    })
    .toBe(true);
  return link!;
}
