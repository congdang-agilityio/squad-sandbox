import { render, screen, within } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { TaskView } from '@/lib/tasks/tasks';
import en from '../../../../messages/en.json';
import viMessages from '../../../../messages/vi.json';
import { TaskList } from './task-list';

const withTime: TaskView = {
  id: 't1',
  title: 'Pay the electricity bill',
  dueDate: '2026-11-05',
  dueTime: '09:30',
  priority: 'NORMAL',
};
const withoutTime: TaskView = {
  id: 't2',
  title: 'Buy rice',
  dueDate: '2026-01-01',
  dueTime: null,
  priority: 'HIGH',
};
const low: TaskView = {
  id: 't3',
  title: 'Water the plants',
  dueDate: '2026-12-31',
  dueTime: null,
  priority: 'LOW',
};

function renderList(tasks: TaskView[], locale: 'en' | 'vi' = 'en') {
  render(
    <NextIntlClientProvider
      locale={locale}
      messages={locale === 'en' ? en : viMessages}
      timeZone="UTC"
    >
      <TaskList tasks={tasks} />
    </NextIntlClientProvider>,
  );
}

function item(title: string) {
  return screen.getByText(title).closest('li') as HTMLElement;
}

describe('TaskList', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it.each([
    ['en', en],
    ['vi', viMessages],
  ] as const)('shows the %s empty message when there are no tasks', (locale, messages) => {
    renderList([], locale);

    expect(screen.getByText(messages.tasks.empty)).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('shows one list item per task with its title, in the given order', () => {
    renderList([withTime, withoutTime, low]);

    const items = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent(withTime.title);
    expect(items[1]).toHaveTextContent(withoutTime.title);
    expect(items[2]).toHaveTextContent(low.title);
    expect(screen.queryByText(en.tasks.empty)).not.toBeInTheDocument();
  });

  it('shows the due date as DD/MM/YYYY and the due time in Vietnamese', () => {
    renderList([withTime], 'vi');

    expect(item(withTime.title)).toHaveTextContent('05/11/2026');
    expect(item(withTime.title)).toHaveTextContent('09:30');
  });

  it('shows a readable due date and the due time in English', () => {
    renderList([withTime], 'en');

    expect(item(withTime.title)).toHaveTextContent('Nov 5, 2026');
    expect(item(withTime.title)).toHaveTextContent('09:30');
  });

  it('shows no due time when the task has none', () => {
    renderList([withoutTime], 'vi');

    const text = item(withoutTime.title).textContent ?? '';
    expect(text).toContain('01/01/2026');
    expect(text).not.toMatch(/\d{2}:\d{2}/);
  });

  it('never shifts the due date by the time zone', () => {
    vi.stubEnv('TZ', 'America/Los_Angeles');
    renderList([withoutTime, low], 'en');

    expect(item(withoutTime.title)).toHaveTextContent('Jan 1, 2026');
    expect(item(low.title)).toHaveTextContent('Dec 31, 2026');
  });

  it.each([
    ['en', en, 'High', 'Normal', 'Low'],
    ['vi', viMessages, 'Cao', 'Bình thường', 'Thấp'],
  ] as const)('shows the %s priority label', (locale, messages, high, normal, low_) => {
    renderList([withTime, withoutTime, low], locale);

    expect(messages.tasks.priorityHigh).toBe(high);
    expect(messages.tasks.priorityNormal).toBe(normal);
    expect(messages.tasks.priorityLow).toBe(low_);
    expect(item(withoutTime.title)).toHaveTextContent(high);
    expect(item(withTime.title)).toHaveTextContent(normal);
    expect(item(low.title)).toHaveTextContent(low_);
  });
});
