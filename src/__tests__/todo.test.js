// src/__tests__/todo.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from '../pages/todo'; // Adjust the path if necessary

describe('Todo Component', () => {
  test('renders the Todo page title', () => {
    // Render the component
    render(<Todo />);

    // Check if the title text is rendered
    expect(screen.getByText(/To Do List/i)).toBeInTheDocument();
  });

  test('renders input fields', () => {
    // Render the component
    render(<Todo />);

    // Check if the Title input is rendered
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();

    // Check if the Description input is rendered
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
  });

  test('allows adding a new task', () => {
    // Render the component
    render(<Todo />);

    // Simulate entering a task title
    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    expect(titleInput.value).toBe('New Task');

    // Simulate clicking the "Add Task" button
    const addButton = screen.getByText(/Add Task/i);
    fireEvent.click(addButton);

    // Check if the new task appears in the task list
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });
});
