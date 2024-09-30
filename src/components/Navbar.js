import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-200 p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/" className="bg-gray-700 text-white p-3 rounded-lg">Home</Link>
                </li>
                <li>
                    <Link to="/login" className="text-gray border-b-2 p-2 hover:border-sky-600">Login</Link>
                </li>
                <li>
                    <Link to="/todo" className="text-gray border-b-2 p-2 hover:border-sky-600">To Do</Link>
                </li>
                <li>
                    <Link to="/completed" className="text-gray border-b-2 p-2 hover:border-sky-600">Completed</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;