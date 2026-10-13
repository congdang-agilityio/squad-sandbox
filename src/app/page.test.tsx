import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home page', () => {
  it('shows the TodoNow name', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1, name: 'TodoNow' })).toBeInTheDocument();
  });
});
