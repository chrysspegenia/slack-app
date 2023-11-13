import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders App Component', () => {
  render(<App />);
  const appTitle = screen.getByText(/Slack/i);
  expect(appTitle).toBeInTheDocument();
});
