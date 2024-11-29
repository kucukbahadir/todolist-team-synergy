import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Detail from '../pages/detail';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(() => jest.fn()),
    useParams: jest.fn(() => ({ listID: 'mockListID', taskID: 'mockTaskID' })),
}));

jest.mock('../services/taskService', () => ({
    taskService: {
        getTaskById: jest.fn(() => Promise.resolve({
            title: 'Sample Task',
            description: 'Sample Description',
            dueDate: '2023-11-26',
            priority: 'High',
            completed: false,
            updatedAt: new Date(),
            assignedToUser: 'mockUserID',
        })),
        updateTask: jest.fn(),
    },
}));

jest.mock('../services/SessionService', () => ({
    SessionService: {
        getUserbyMail: jest.fn(() => Promise.resolve({ _id: 'mockUserID' })),
    },
}));

describe('Detail Page', () => {
    it('renders the detail form and allows updates', async () => {
        render(<Detail />);

        // Check that input fields are rendered
        expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();

        // Update fields
        fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Updated Task Title' } });
        fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'Updated Description' } });

        // Click Save button
        fireEvent.click(screen.getByText(/Save/i));

        // Wait for async actions
        await new Promise(setImmediate);

        // Verify updateTask service is called with correct arguments
        expect(require('../services/taskService').taskService.updateTask).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                title: 'Updated Task Title',
                description: 'Updated Description',
            })
        );
    });
});
