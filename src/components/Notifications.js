import React, {useEffect, useState} from 'react';
import '../main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Notifications = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        setNotifications(
            [
                'New task assigned',
                'Task completed',
                'Task deleted'
                ]
        )
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        // If clicked on anywhere on the page, the dropdown will close
        <div className="relative">
            <button onClick={toggleDropdown} className="text-gray-600 hover:text-gray-800 text-xl justify-self-center">
                <FontAwesomeIcon icon={faBell} >
                    <span className="text-sm text-white bg-red-500 rounded-full px-2 py-1">
                        {notifications.length}
                    </span>
                </FontAwesomeIcon>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg">
                    {notifications.length > 0 ? (
                        <ul className="p-2">
                            {notifications.map((notification, index) => (
                                <li key={index} className="p-2 border-b border-gray-200">
                                    {notification}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-4 text-gray-500">No notifications</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Notifications;
