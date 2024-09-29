import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/todo">Todo</Link>
                </li>
                <li>
                    <Link to="/detail">Detail</Link>
                </li>
                <li>
                    <Link to="/completed">Completed</Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;