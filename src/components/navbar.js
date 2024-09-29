import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-200 p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/" className="text-gray hover:text-gray-300">Home</Link>
                </li>
                <li>
                    <Link to="/login" className="text-gray border-b hover:border-b">Login</Link>
                </li>
                <li>
                    <Link to="/todo" className="text-gray hover:text-gray-300">To Do</Link>
                </li>
                <li>
                    <Link to="/detail" className="text-gray hover:text-gray-300">Detail</Link>
                </li>
                <li>
                    <Link to="/completed" className="text-gray hover:text-gray-300">Completed</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;