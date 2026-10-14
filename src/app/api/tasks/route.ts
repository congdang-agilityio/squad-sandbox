import { getCurrentUser } from '@/lib/auth/current-user';
import { createTask } from '@/lib/tasks/tasks';

function invalidInput(): Response {
  return Response.json({ error: 'INVALID_INPUT' }, { status: 400 });
}

type TaskBody = { title?: unknown; dueDate?: unknown; dueTime?: unknown };

/** A missing field (undefined or null) is left to `createTask`; any other value must be a string. */
function isOptionalString(value: unknown): value is string | null | undefined {
  return value === undefined || value === null || typeof value === 'string';
}

function isTaskBody(body: unknown): body is TaskBody {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) return false;
  const { title, dueDate, dueTime } = body as Record<string, unknown>;
  return isOptionalString(title) && isOptionalString(dueDate) && isOptionalString(dueTime);
}

/**
 * Create-task endpoint (S-05). The middleware does not cover `/api/*`, so the session is
 * checked here. Business rules and lengths live in `createTask`; the owner is always the
 * logged-in user, so any `ownerId` or `priority` in the body is ignored.
 */
export async function POST(request: Request): Promise<Response> {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: 'UNAUTHORIZED' }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return invalidInput();
  }
  if (!isTaskBody(body)) return invalidInput();

  const result = await createTask(user.id, {
    title: body.title as string,
    dueDate: body.dueDate as string,
    dueTime: body.dueTime as string | null | undefined,
  });

  if (result.ok) return Response.json(result.task, { status: 201 });
  if (result.errors.includes('INVALID_INPUT')) return invalidInput();
  return Response.json({ error: 'VALIDATION', errors: result.errors }, { status: 400 });
}
