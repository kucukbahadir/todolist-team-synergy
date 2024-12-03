import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Detail from '../pages/detail.js';
import { BrowserRouter } from 'react-router-dom'; // For handling <Navigate>
import '@testing-library/jest-dom';



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

beforeEach(() => {
    // Mock the localstorage
    //localStorage.setItem("lists", JSON.stringify([{ tasks: [{_id: 'id1', tasks: ["673f20c6978f5452f334fba4", "673f20c6978f5452f334fba5"]}] }]));
    localStorage.setItem("user", JSON.stringify({ email: "mock@jest.test"}))

    
    // Set up the getTasks mock to return mockTasks
    //taskService.getTasks.mockResolvedValue(mockTasks);
});

afterEach(() => {
    localStorage.clear();
})

describe('Detail Page', () => {
    it('renders the detail form and allows updates', async () => {
        render(
            //<BrowserRouter> {/* Needed for useNavigate */}
                <Detail />
            //</BrowserRouter>
        );
        console.log(screen);
        expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();

        fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Updated Task Title' } });
        fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'Updated Description' } });
        fireEvent.click(screen.getByText(/Save/i));

        // Cant this better be done with waitFor??
        await new Promise(setImmediate);
        expect(require('../services/taskService').taskService.updateTask).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                title: 'Updated Task Title',
                description: 'Updated Description',
            })
        );
    });
});