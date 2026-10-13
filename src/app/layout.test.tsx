import { isValidElement, type ReactElement, type ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('next-intl/server', () => ({
  getLocale: vi.fn(async () => 'vi'),
  getMessages: vi.fn(async () => ({ common: { appName: 'TodoNow' } })),
}));

const { default: RootLayout } = await import('./layout');

type Props = { lang?: string; children?: ReactNode; messages?: unknown };

describe('RootLayout', () => {
  it('sets <html lang> to the resolved locale and provides messages to client components', async () => {
    const html = (await RootLayout({ children: <p>child</p> })) as ReactElement<Props>;
    expect(html.type).toBe('html');
    expect(html.props.lang).toBe('vi');

    const body = html.props.children as ReactElement<Props>;
    const provider = body.props.children as ReactElement<Props>;
    expect(isValidElement(provider)).toBe(true);
    expect(provider.type).toBe(NextIntlClientProvider);
    expect(provider.props.messages).toEqual({ common: { appName: 'TodoNow' } });
  });
});
