import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Todo from '../Todo';
import { taskService } from '../services/taskService';
import { SessionService } from '../services/SessionService';
import { taskListService } from '../services/TaskListService';

// Mock services
jest.mock('../services/taskService');
jest.mock('../services/SessionService');
jest.mock('../services/TaskListService');

describe('Todo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock localStorage for tests
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
  });

  test('renders component with initial state', () => {
    localStorage.getItem.mockReturnValueOnce(JSON.stringify({ email: 'testuser@example.com' })); // Mock user
    localStorage.getItem.mockReturnValueOnce(JSON.stringify([])); // Mock lists

    render(
      <MemoryRouter>
        <Todo />
      </MemoryRouter>
    );

    // Check if title renders correctly
    expect(screen.getByText(/testuser@example.com To Do List/i)).toBeInTheDocument();

    // Check if form inputs are rendered
    expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Due Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Add task/i)).toBeInTheDocument();
  });

  test('allows adding a new task', async () => {
    taskService.createTask.mockResolvedValueOnce({
      _id: '123',
      title: 'Test Task',
      description: 'Test Description',
      dueDate: '2024-11-30',
      priority: 'Medium',
      completed: false,
    });

    localStorage.getItem.mockReturnValueOnce(JSON.stringify({ email: 'testuser@example.com' }));
    localStorage.getItem.mockReturnValueOnce(JSON.stringify([{ _id: 'list1', title: 'Test List', tasks: [] }]));

    render(
      <MemoryRouter>
        <Todo />
      </MemoryRouter>
    );

    // Simulate adding a new task
    fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByPlaceholderText(/Due Date/i), { target: { value: '2024-11-30' } });
    fireEvent.click(screen.getByText(/Add task/i));

    await waitFor(() => {
      // Check if the task appears in the task list
      expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
    });
  });

  test('filters tasks by priority', async () => {
    localStorage.getItem.mockReturnValueOnce(JSON.stringify({ email: 'testuser@example.com' }));
    localStorage.getItem.mockReturnValueOnce(JSON.stringify([{ _id: 'list1', title: 'Test List', tasks: [] }]));
    taskService.getTasks.mockResolvedValueOnce([
      { _id: '1', title: 'High Task', priority: 'High', dueDate: '2024-12-01', completed: false },
      { _id: '2', title: 'Medium Task', priority: 'Medium', dueDate: '2024-12-02', completed: false },
    ]);

    render(
      <MemoryRouter>
        <Todo />
      </MemoryRouter>
    );

    // Simulate filtering by priority
    fireEvent.change(screen.getByLabelText(/Filter by Priority/i), { target: { value: 'High' } });

    await waitFor(() => {
      // Verify only high-priority tasks are shown
      expect(screen.getByText(/High Task/i)).toBeInTheDocument();
      expect(screen.queryByText(/Medium Task/i)).not.toBeInTheDocument();
    });
  });

  test('allows marking a task as complete', async () => {
    localStorage.getItem.mockReturnValueOnce(JSON.stringify({ email: 'testuser@example.com' }));
    localStorage.getItem.mockReturnValueOnce(JSON.stringify([{ _id: 'list1', title: 'Test List', tasks: [] }]));
    taskService.getTasks.mockResolvedValueOnce([
      { _id: '1', title: 'Incomplete Task', priority: 'Medium', dueDate: '2024-12-01', completed: false },
    ]);

    render(
      <MemoryRouter>
        <Todo />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/Incomplete Task/i)).toBeInTheDocument());

    // Simulate marking the task as complete
    fireEvent.click(screen.getByText(/Complete/i));

    await waitFor(() => {
      // Verify the task is no longer displayed
      expect(screen.queryByText(/Incomplete Task/i)).not.toBeInTheDocument();
    });
  });

  test('handles creating a new list', async () => {
    taskListService.createTaskList.mockResolvedValueOnce({ listId: 'newList1' });

    render(
      <MemoryRouter>
        <Todo />
      </MemoryRouter>
    );

    // Simulate creating a new list
    fireEvent.change(screen.getByPlaceholderText(/Enter new list title/i), { target: { value: 'My New List' } });
    fireEvent.click(screen.getByText(/Create New List/i));

    await waitFor(() => {
      // Verify the new list appears in the dropdown
      expect(screen.getByText(/My New List/i)).toBeInTheDocument();
    });
  });
});
