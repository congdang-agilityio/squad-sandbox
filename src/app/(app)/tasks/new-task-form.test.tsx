import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '../../../../messages/en.json';
import viMessages from '../../../../messages/vi.json';
import { NewTaskForm } from './new-task-form';

const refresh = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ refresh }) }));

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  refresh.mockReset();
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function respond(status: number, body: unknown) {
  fetchMock.mockResolvedValueOnce(
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    }),
  );
}

function renderForm(locale: 'en' | 'vi' = 'en') {
  render(
    <NextIntlClientProvider locale={locale} messages={locale === 'en' ? en : viMessages}>
      <NewTaskForm />
    </NextIntlClientProvider>,
  );
}

const t = en.newTask;

function fillIn({ title = 'Pay the bill', dueDate = '2026-11-05', dueTime = '' } = {}) {
  fireEvent.change(screen.getByLabelText(t.titleLabel), { target: { value: title } });
  fireEvent.change(screen.getByLabelText(t.dueDateLabel), { target: { value: dueDate } });
  fireEvent.change(screen.getByLabelText(t.dueTimeLabel), { target: { value: dueTime } });
}

function submit() {
  fireEvent.click(screen.getByRole('button', { name: t.submit }));
}

const created = {
  id: 't1',
  title: 'Pay the bill',
  dueDate: '2026-11-05',
  dueTime: null,
  priority: 'NORMAL',
};

describe('NewTaskForm', () => {
  it.each([
    ['en', en],
    ['vi', viMessages],
  ] as const)('renders the title, date and time fields and no priority in %s', (locale, m) => {
    renderForm(locale);

    expect(screen.getByLabelText(m.newTask.titleLabel)).toHaveAttribute('name', 'title');
    expect(screen.getByLabelText(m.newTask.dueDateLabel)).toHaveAttribute('type', 'date');
    expect(screen.getByLabelText(m.newTask.dueTimeLabel)).toHaveAttribute('type', 'time');
    expect(screen.queryByLabelText(/priority|ưu tiên/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: m.newTask.submit })).toBeEnabled();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: m.newTask.submit }).closest('form')).toHaveAttribute(
      'novalidate',
    );
  });

  it('posts title and date without a time, clears the fields and refreshes on 201', async () => {
    respond(201, created);
    renderForm();
    fillIn();
    submit();

    await waitFor(() => expect(refresh).toHaveBeenCalledTimes(1));
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/tasks');
    expect(init.method).toBe('POST');
    expect(init.headers).toEqual({ 'Content-Type': 'application/json' });
    expect(JSON.parse(init.body)).toEqual({
      title: 'Pay the bill',
      dueDate: '2026-11-05',
      dueTime: null,
    });
    expect(screen.getByLabelText(t.titleLabel)).toHaveValue('');
    expect(screen.getByLabelText(t.dueDateLabel)).toHaveValue('');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: t.submit })).toBeEnabled();
  });

  it('posts the due time when one is entered and clears it on 201', async () => {
    respond(201, { ...created, dueTime: '18:30' });
    renderForm();
    fillIn({ dueTime: '18:30' });
    submit();

    await waitFor(() => expect(refresh).toHaveBeenCalledTimes(1));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).dueTime).toBe('18:30');
    expect(screen.getByLabelText(t.dueTimeLabel)).toHaveValue('');
  });

  it.each([
    [['TITLE_REQUIRED'], [t.errorTitleRequired]],
    [['DUE_DATE_REQUIRED'], [t.errorDueDateRequired]],
    [
      ['TITLE_REQUIRED', 'DUE_DATE_REQUIRED'],
      [t.errorTitleRequired, t.errorDueDateRequired],
    ],
  ])('on VALIDATION %j shows %j and keeps the typed values', async (errors, messages) => {
    respond(400, { error: 'VALIDATION', errors });
    renderForm();
    fillIn({ title: 'Typed', dueDate: '2026-12-01', dueTime: '07:15' });
    submit();

    const alert = await screen.findByRole('alert');
    expect(
      within(alert)
        .getAllByText(/./)
        .map((node) => node.textContent),
    ).toEqual(messages);
    expect(refresh).not.toHaveBeenCalled();
    expect(screen.getByLabelText(t.titleLabel)).toHaveValue('Typed');
    expect(screen.getByLabelText(t.dueDateLabel)).toHaveValue('2026-12-01');
    expect(screen.getByLabelText(t.dueTimeLabel)).toHaveValue('07:15');
  });

  it.each([
    [400, { error: 'INVALID_INPUT' }],
    [401, { error: 'UNAUTHORIZED' }],
    [500, { error: 'boom' }],
    [400, { error: 'VALIDATION', errors: ['toString'] }],
    [400, { error: 'VALIDATION', errors: 'TITLE_REQUIRED' }],
    [400, { error: 'VALIDATION' }],
    [400, null],
  ])('on %i %j shows the generic message and keeps the typed values', async (status, body) => {
    respond(status, body);
    renderForm();
    fillIn();
    submit();

    expect(await screen.findByRole('alert')).toHaveTextContent(t.errorUnexpected);
    expect(refresh).not.toHaveBeenCalled();
    expect(screen.getByLabelText(t.titleLabel)).toHaveValue('Pay the bill');
    expect(screen.getByLabelText(t.dueDateLabel)).toHaveValue('2026-11-05');
  });

  it('shows the generic message when the network fails', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    renderForm();
    fillIn();
    submit();

    expect(await screen.findByRole('alert')).toHaveTextContent(t.errorUnexpected);
  });

  it('shows the errors in Vietnamese', async () => {
    respond(400, { error: 'VALIDATION', errors: ['TITLE_REQUIRED', 'DUE_DATE_REQUIRED'] });
    renderForm('vi');
    fireEvent.click(screen.getByRole('button', { name: viMessages.newTask.submit }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(viMessages.newTask.errorTitleRequired);
    expect(alert).toHaveTextContent(viMessages.newTask.errorDueDateRequired);
  });

  it('disables the button while sending and clears an old error on the next success', async () => {
    respond(400, { error: 'VALIDATION', errors: ['TITLE_REQUIRED'] });
    renderForm();
    submit();
    expect(await screen.findByRole('alert')).toHaveTextContent(t.errorTitleRequired);

    let resolve!: (response: Response) => void;
    fetchMock.mockReturnValueOnce(new Promise<Response>((r) => (resolve = r)));
    fillIn();
    submit();
    expect(screen.getByRole('button', { name: t.submit })).toBeDisabled();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    await act(async () => resolve(new Response(JSON.stringify(created), { status: 201 })));
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: t.submit })).toBeEnabled();
  });

  it('has the same non-empty newTask keys in Vietnamese and English', () => {
    expect(Object.keys(viMessages.newTask).sort()).toEqual(Object.keys(en.newTask).sort());
    for (const messages of [viMessages.newTask, en.newTask]) {
      for (const text of Object.values(messages)) expect(text.trim().length).toBeGreaterThan(0);
    }
    expect(en.newTask.errorTitleRequired).toBe('A title is required');
    expect(en.newTask.errorDueDateRequired).toBe('A due date is required');
  });
});
