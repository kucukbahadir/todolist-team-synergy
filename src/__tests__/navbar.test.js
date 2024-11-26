import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { SessionService } from '../services/SessionService';
import { BrowserRouter } from 'react-router-dom';


jest.mock('../services/SessionService', () => ({
    isAuthenticated: jest.fn(),
    signOut: jest.fn(),
}));

describe('Navbar Component', () => {
    test('renders Home, Login, ToDo, and Completed links when user is not logged in', () => {
        // Mock
        SessionService.isAuthenticated.mockReturnValue(false);

        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );


        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('To Do')).toBeInTheDocument();
        expect(screen.getByText('Completed')).toBeInTheDocument();
    });

    test('renders Sign Out link when user is logged in', () => {
        SessionService.isAuthenticated.mockReturnValue(true);

        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        // Controleer
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
        expect(screen.getByText('Sign Out')).toBeInTheDocument();
    });

    test('calls signOut when Sign Out link is clicked', () => {

        SessionService.isAuthenticated.mockReturnValue(true);

        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        const signOutLink = screen.getByText('Sign Out');
        fireEvent.click(signOutLink);

        // Controleer
        expect(SessionService.signOut).toHaveBeenCalledTimes(1);
    });
});
