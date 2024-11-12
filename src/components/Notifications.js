import React, { useEffect, useState, useRef } from 'react';
import '../main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from "../services/SessionService";
import { NotificationAdaptor } from "../services/NotificationAdaptor";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Ref to keep track of the dropdown

    useEffect(() => {
        fetchNotifications().then(() => console.log("Notifications fetched"));
        // Uncomment if needed for real-time updates
        // NotificationAdaptor.subscribe(`notification-${SessionService.getUserId()}`, fetchNotifications);
        // return () => {
        //     NotificationAdaptor.unsubscribe(`notification-${SessionService.getUserId()}`, fetchNotifications);
        // }
    }, []);

    useEffect(() => {
        // Function to handle clicks outside the dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchNotifications = async () => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Credentials': 'include'
                }
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notifications/${SessionService.getUserId()}`, options);
            if (response.ok) {
                const data = await response.json();
                setNotifications(data.map(notification => notification));
            } else {
                console.error('Failed to fetch notifications');
            }
        } catch (error) {
            console.error('Failed to fetch notifications', error);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigate = (link) => () => {
        navigate(link);
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell icon with notification length upper right */}
            <button onClick={toggleDropdown} className="relative">
                <FontAwesomeIcon icon={faBell} size="lg" className="text-gray-600 hover:text-gray-800" />
                {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 px-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                        {notifications.length}
                    </span>
                )}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg">
                    {notifications.length > 0 ? (
                        <ul className="p-2 ">
                            {notifications.map((notification, index) => (
                                <li key={index} className="border-b border-gray-100 p-2 hover:bg-gray-100 cursor-pointer" onClick={handleNavigate(notification.link)}>
                                    <h3 className={notification.read ? "" : "font-bold"}>{notification.title}</h3>
                                    <p className={notification.read ? "" : "font-bold"}>{notification.message}</p>
                                    <small className="text-gray-500">{new Date(notification.createdAt).toLocaleString()}</small>
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
