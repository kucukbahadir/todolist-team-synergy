import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../main.css';
import {SessionService} from '../services/SessionService';
import Notifications from "./Notifications";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(SessionService.isAuthenticated());
    } , [
        SessionService.isAuthenticated()
    ]);

    const handleSignOut = () => {
        SessionService.signOut();
        setIsLoggedIn(false);
    };

    return (
        <nav className="bg-gray-200 p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/" className="bg-gray-700 text-white p-3 rounded-lg">Home</Link>
                </li>
                <li>
                    {isLoggedIn ? (
                        <Link onClick={handleSignOut} className="text-gray border-b-2 m-0 pb-2 hover:border-sky-600">
                            Sign Out
                        </Link>
                    ) : (
                        <Link to="/login" className="text-gray border-b-2 p-2 hover:border-sky-600">Login</Link>
                    )}
                </li>
                <li>
                    <Link to="/todo" className="text-gray border-b-2 p-2 hover:border-sky-600">To Do</Link>
                </li>
                <li>
                    <Link to="/completed" className="text-gray border-b-2 p-2 hover:border-sky-600">Completed</Link>
                </li>
                <li>
                    <Notifications/>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
