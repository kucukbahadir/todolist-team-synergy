import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Todo from '../pages/todo';

describe('Todo Component', () => {
  beforeEach(() => {
    // Mock localStorage data
    localStorage.setItem(
      'user',
      JSON.stringify({ email: 'test@example.com' })
    );
    localStorage.setItem(
      'lists',
      JSON.stringify([{ id: 1, title: 'Sample List', tasks: [] }])
    );
  });

  afterEach(() => {
    // Clear localStorage after each test
    localStorage.clear();
  });

  const renderWithRouter = (component) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  test('renders the Todo page title', () => {
    renderWithRouter(<Todo />);
    expect(screen.getByText(/To Do List/i)).toBeInTheDocument();
  });

  test('renders input fields', () => {
    renderWithRouter(<Todo />);
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
  });

  test('allows adding a new task', async () => {
    renderWithRouter(<Todo />);
    const titleInput = screen.getByPlaceholderText('Title');
    const addButton = screen.getByText(/add task/i);
  
    // Simulate user input
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    fireEvent.click(addButton);
  
    // Wait for the task to render
    const newTask = await screen.findByText((content) => content.includes('New Task'));
  
    // Assert the new task is displayed
    expect(newTask).toBeInTheDocument();
  });
  
});
