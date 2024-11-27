// __tests__/Completed.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Completed from '../src/pages/completed'; // Adjust the path as needed
import { taskService } from '../src/services/taskService';
import { BrowserRouter } from 'react-router-dom'; // For handling <Navigate>
import '@testing-library/jest-dom';

jest.mock('../src/services/taskService.js'); // Mock the task service

describe('Completed Component', () => {
    const mockTasks = [
        {
            _id: '673f20c6978f5452f334fba4',
            title: 'Test Task 1',
            description: 'Description 1',
            dueDate: '2024-12-01T00:00:00.000Z',
            completed: true,
            priority: 'High',
        },
        {
            _id: '673f20c6978f5452f334fba5',
            title: 'Test Task 2',
            description: 'Description 2',
            dueDate: '2024-12-02T00:00:00.000Z',
            completed: true,
            priority: 'Medium',
        },
    ];

    beforeEach(() => {
        // Clear previous mocks before each test
        taskService.getTasks.mockClear();
        taskService.updateTask.mockClear();
        // Set up the getTasks mock to return mockTasks
        taskService.getTasks.mockResolvedValue(mockTasks);
    });

    it('renders completed tasks on load', async () => {
        render(
            <BrowserRouter> {/* Needed for useNavigate */}
                <Completed />
            </BrowserRouter>
        );

        // Check if "Completed Tasks" header appears
        expect(screen.getByText(/Completed Tasks/i)).toBeInTheDocument();

        // Wait for tasks to load
        await waitFor(() => expect(taskService.getTasks).toHaveBeenCalled());

        // Check if task titles are rendered
        mockTasks.forEach(task => {
            expect(screen.getByText(task.title)).toBeInTheDocument();
        });
    });

    /* it('handles incomplete button click', async () => {
        render(
            <BrowserRouter>
                <Completed />
            </BrowserRouter>
        );

        // Wait for tasks to load
        await waitFor(() => expect(taskService.getTasks).toHaveBeenCalled());

        // Simulate clicking "Set Incomplete" on the first task
        const incompleteButton = screen.getAllByText(/Set Incomplete/i)[0];
        fireEvent.click(incompleteButton);

        // Verify the updateTask function was called with the correct ID and data
        expect(taskService.updateTask).toHaveBeenCalledWith(mockTasks[0]._id, { completed: false });

        // Optionally, check if the task was removed from the UI
        await waitFor(() => expect(screen.queryByText(mockTasks[0].title)).not.toBeInTheDocument());
    });

    it('shows a message when no completed tasks exist', async () => {
        // Set the getTasks mock to return an empty array
        taskService.getTasks.mockResolvedValue([]);

        render(
            <BrowserRouter>
                <Completed />
            </BrowserRouter>
        );

        // Wait for tasks to load
        await waitFor(() => expect(taskService.getTasks).toHaveBeenCalled());

        // Check if the "No tasks completed yet" message appears
        expect(screen.getByText(/No tasks completed yet/i)).toBeInTheDocument();
    }); */
});