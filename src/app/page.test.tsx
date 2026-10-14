import Home from './page';

vi.mock('next/navigation', () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT ${url}`);
  }),
}));

const { redirect } = await import('next/navigation');

describe('Home page', () => {
  it('sends the user to the task list', () => {
    expect(() => Home()).toThrow('NEXT_REDIRECT /tasks');
    expect(redirect).toHaveBeenCalledWith('/tasks');
  });
});
