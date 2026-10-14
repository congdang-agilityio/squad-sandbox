// Server-side helper: do not import from client components.
import type { TaskPriority } from '@prisma/client';
import { db } from '@/lib/db';

export type CreateTaskInput = {
  title: string;
  /** Calendar date `YYYY-MM-DD`, without a time zone. */
  dueDate: string;
  /** `HH:MM` 24-hour; null, empty or missing means no time. */
  dueTime?: string | null;
};

export type CreateTaskError = 'TITLE_REQUIRED' | 'DUE_DATE_REQUIRED' | 'INVALID_INPUT';

export type TaskView = {
  id: string;
  title: string;
  /** Calendar date `YYYY-MM-DD`. */
  dueDate: string;
  dueTime: string | null;
  priority: TaskPriority;
};

export type CreateTaskResult =
  { ok: true; task: TaskView } | { ok: false; errors: CreateTaskError[] };

// Technical cap for a public endpoint, like the display name cap in the sign-up route.
const MAX_TITLE = 200;
const DATE_SHAPE = /^(\d{4})-(\d{2})-(\d{2})$/;
const TIME_SHAPE = /^([01]\d|2[0-3]):[0-5]\d$/;

const TASK_VIEW_SELECT = {
  id: true,
  title: true,
  dueDate: true,
  dueTime: true,
  priority: true,
} as const;

/**
 * Converts `YYYY-MM-DD` to UTC midnight of that calendar day, or null when it is not a real
 * date. Always UTC: the server's local time zone must never shift the day.
 */
function parseCalendarDate(value: string): Date | null {
  const match = DATE_SHAPE.exec(value);
  if (!match) return null;
  const [year, month, day] = match.slice(1).map(Number);
  if (year < 1) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  if (
    Number.isNaN(date.getTime()) ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() + 1 !== month ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return date;
}

function isMissing(value: unknown): boolean {
  return (
    value === undefined || value === null || (typeof value === 'string' && value.trim() === '')
  );
}

function toView(task: {
  id: string;
  title: string;
  dueDate: Date;
  dueTime: string | null;
  priority: TaskPriority;
}): TaskView {
  return { ...task, dueDate: task.dueDate.toISOString().slice(0, 10) };
}

/**
 * Creates a task owned by `ownerId` (S-05). Malformed input (wrong type, title over the cap,
 * date or time in the wrong format) is `INVALID_INPUT`; otherwise a missing title and/or due
 * date are reported together. Priority is always `NORMAL` for now (BR-03). Nothing is saved
 * on any error.
 */
export async function createTask(
  ownerId: string,
  input: CreateTaskInput,
): Promise<CreateTaskResult> {
  if (typeof input !== 'object' || input === null) return { ok: false, errors: ['INVALID_INPUT'] };
  const { title, dueDate, dueTime } = input as Record<string, unknown>;

  const titleMissing = isMissing(title);
  const dueDateMissing = isMissing(dueDate);
  const timeMissing = isMissing(dueTime);

  const trimmedTitle = typeof title === 'string' ? title.trim() : '';
  const parsedDate = typeof dueDate === 'string' ? parseCalendarDate(dueDate) : null;
  if (
    (!titleMissing && (typeof title !== 'string' || trimmedTitle.length > MAX_TITLE)) ||
    (!dueDateMissing && parsedDate === null) ||
    (!timeMissing && (typeof dueTime !== 'string' || !TIME_SHAPE.test(dueTime)))
  ) {
    return { ok: false, errors: ['INVALID_INPUT'] };
  }

  const errors: CreateTaskError[] = [];
  if (titleMissing) errors.push('TITLE_REQUIRED');
  if (dueDateMissing) errors.push('DUE_DATE_REQUIRED');
  if (errors.length > 0 || parsedDate === null) return { ok: false, errors };

  const task = await db.task.create({
    data: {
      ownerId,
      title: trimmedTitle,
      dueDate: parsedDate,
      dueTime: timeMissing ? null : (dueTime as string),
      priority: 'NORMAL',
    },
    select: TASK_VIEW_SELECT,
  });
  return { ok: true, task: toView(task) };
}

/**
 * The owner's tasks by due date, then due time (tasks without a time after those with one),
 * then creation time. Placeholder order until S-06 defines priority ordering (BR-23).
 */
export async function listTasks(ownerId: string): Promise<TaskView[]> {
  const tasks = await db.task.findMany({
    where: { ownerId },
    orderBy: [
      { dueDate: 'asc' },
      { dueTime: { sort: 'asc', nulls: 'last' } },
      { createdAt: 'asc' },
      { id: 'asc' },
    ],
    select: TASK_VIEW_SELECT,
  });
  return tasks.map(toView);
}
