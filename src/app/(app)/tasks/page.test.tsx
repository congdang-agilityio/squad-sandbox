import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '../../../../messages/en.json';
import vi from '../../../../messages/vi.json';
import TasksPage from './page';

describe('Task list page', () => {
  it.each([
    ['vi', vi],
    ['en', en],
  ] as const)('shows the %s heading and the empty state', (locale, messages) => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <TasksPage />
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: messages.tasks.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(messages.tasks.empty)).toBeInTheDocument();
  });

  it('shows "My tasks" in English', () => {
    expect(en.tasks.title).toBe('My tasks');
  });

  it('has the same non-empty tasks keys in Vietnamese and English', () => {
    expect(Object.keys(vi.tasks).sort()).toEqual(Object.keys(en.tasks).sort());
    for (const messages of [vi.tasks, en.tasks]) {
      for (const text of Object.values(messages)) {
        expect(text.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
