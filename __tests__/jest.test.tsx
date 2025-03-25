import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewPost from '../pages/new'; // Ensure you are importing the correct component
import '@testing-library/jest-dom'; // Import the jest-dom library for custom matchers

// Mock the useCreatePostMutation hook to simulate an error
jest.mock('../store/api', () => ({
  ...jest.requireActual('../store/api'),
  useCreatePostMutation: () => [
    jest.fn().mockRejectedValue(new Error('Simulated error: Failed to create post.')), 
    { isLoading: false, isError: true, error: { message: 'Simulated error: Failed to create post.' } } 
  ]
}));

test('handles API error when creating a post', async () => {
  render(<NewPost />);

  fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Post' } });
  fireEvent.change(screen.getByLabelText('Body'), { target: { value: 'This is a test body' } });
  fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'Test Author' } });

  fireEvent.click(screen.getByText('Create'));

  await waitFor(() => {
    expect(screen.getByText('Error creating post. Please try again.')).toBeInTheDocument();
  });
});
