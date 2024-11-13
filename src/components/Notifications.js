import React, { useEffect, useState, useRef } from 'react';
import '../main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from "../services/SessionService";
import { NotificationAdaptor } from "../services/NotificationAdaptor";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Notifications = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Ref to keep track of the dropdown
    const userId = SessionService.getUserId();

    useEffect( () => {
        const init = async () => {
            if (userId) {
                await fetchNotifications();
            }
        };

        // Call init function
        init().then(async () => {
            await NotificationAdaptor.subscribe(`notifications-${userId}`, fetchNotifications);

            // Show the last notification as a toast
            await NotificationAdaptor.subscribe(`notifications-${userId}`, showToast);
        });

        // Cleanup: unsubscribe when the component unmounts or userId changes
        return () => {
            if (userId) {
                 NotificationAdaptor.unsubscribe(`notifications-${userId}`, fetchNotifications);
            }
        };
    }, [userId]);

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

    async function fetchNotifications() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notifications/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (response.ok) {
                await response.json().then((data) => {
                    const sortedNotifications = data.sort((a, b) => {

                        if (a.read === b.read) {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        }
                        return a.read ? 1 : -1;
                    });

                    setNotifications(sortedNotifications);
                });
            } else {
                console.error('Failed to fetch notifications', response.status);
            }
        } catch (error) {
            console.error('Failed to fetch notifications', error);
        }
    }

    const markNotificationAsRead = async (notification) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notifications/read/${userId}/${notification._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (response.ok) {
                await fetchNotifications();
                if (notification.link) {
                    navigate(notification.link);
                }
            } else {
                console.error('Failed to mark notification as read', response.status);
            }
        } catch (error) {
            console.error('Failed to mark notification as read', error);
        }
    }

    const showToast = () => {

        const notification = notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

        Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: notification.title,
            text: notification.message,
            showConfirmButton: false,
            timer: 4000,
            toast: true,
            background: '#343a40',
            color: '#ffffff',
            footer: `<a href="${notification.link}" target="_blank" class="swal-toast-link">Go to link</a>`
        });
    }


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell icon with notification length upper right */}
            <button onClick={toggleDropdown} className="relative">
                <FontAwesomeIcon icon={faBell} size="lg" className="text-gray-600 hover:text-gray-800" />
                {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 px-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                        {/*Shows amount of unread notifications if any*/}
                        {notifications.filter(notification => !notification.read).length > 0 ? notifications.filter(notification => !notification.read).length : ''}
                    </span>
                )}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg">
                    {notifications.length > 0 ? (
                        <ul className="p-2 max-h-60 overflow-y-auto">
                            {notifications.map((notification, index) => (
                                <li key={index}
                                    className="border-b border-gray-100 p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => markNotificationAsRead(notification)}>
                                    <h3 className={notification.read ? "text-sm" : "font-bold text-sm"}>{notification.title}</h3>
                                    <p className={notification.read ? "text-sm" : "font-bold text-sm"}>{notification.message}</p>
                                    <small
                                        className="text-gray-500 text-xs">{new Date(notification.createdAt).toLocaleString()}</small>
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
