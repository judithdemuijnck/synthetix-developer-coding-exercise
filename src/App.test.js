import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('initial render', () => {
  render(<App />);
  const linkElement = screen.getByText(/synthetix/i);
  expect(linkElement).toBeInTheDocument();
});

test("input value updates on change", () => {
  render(<App />);
  const searchInputField = screen.getByRole('searchbox', { name: /type your questions here/i })
  expect(searchInputField.value).toBe("")

  userEvent.type(searchInputField, "test")
  expect(searchInputField.value).toBe("test")
})



// SearchBox component --> searchTerm changes on type
// searchResults displayed after searchbtn clicked --> expect to be 3 (bassed on mock data)
// article displayed after view article link clicked