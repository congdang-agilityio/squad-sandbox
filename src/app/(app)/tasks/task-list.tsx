import { useLocale, useTranslations } from 'next-intl';
import type { TaskView } from '@/lib/tasks/tasks';

const PRIORITY_KEY = {
  HIGH: 'priorityHigh',
  NORMAL: 'priorityNormal',
  LOW: 'priorityLow',
} as const;

const EN_DATE = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' });

/**
 * Formats a `YYYY-MM-DD` calendar date: `DD/MM/YYYY` in Vietnamese, e.g. `Nov 5, 2026` in
 * English. The date is read as UTC so no time zone can move it to another day.
 */
function formatDueDate(dueDate: string, locale: string): string {
  const [year, month, day] = dueDate.split('-');
  if (locale === 'en') return EN_DATE.format(new Date(`${dueDate}T00:00:00.000Z`));
  return `${day}/${month}/${year}`;
}

/** The given tasks in the given order, or the empty message when there are none. */
export function TaskList({ tasks }: { tasks: TaskView[] }) {
  const t = useTranslations('tasks');
  const locale = useLocale();

  if (tasks.length === 0) return <p>{t('empty')}</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <li key={task.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #ddd' }}>
          <strong>{task.title}</strong>
          <br />
          <span>
            {t('due', { date: formatDueDate(task.dueDate, locale) })}
            {task.dueTime ? ` ${task.dueTime}` : null}
          </span>
          {' · '}
          <span>{t('priority', { priority: t(PRIORITY_KEY[task.priority]) })}</span>
        </li>
      ))}
    </ul>
  );
}
