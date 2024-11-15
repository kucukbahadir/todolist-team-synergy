import React, {useEffect, useState} from 'react';
import {SessionService} from '../services/SessionService';

const Todo = () => {
    const [tasks, setTasks] = useState([]); // State to hold tasks
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [form, setForm] = useState({title: '', description: '', dueDate: '', priority: 'Medium'}); // Form state
    const [editingTask, setEditingTask] = useState(null); // Editing task state
    const [assignUserId, setAssignUserId] = useState(''); // State for assigning user to task

    // Fetch tasks from the backend
    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/tasks', {
                headers: {Authorization: SessionService.getToken()},
            });
            if (!response.ok) throw new Error('Failed to fetch tasks');
            const data = await response.json();
            setTasks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Create or Update Task
    const handleSave = async (e) => {
        e.preventDefault();

        const url = editingTask
            ? `http://localhost:5000/api/tasks/${editingTask._id}`
            : 'http://localhost:5000/api/tasks';
        const method = editingTask ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: SessionService.getToken(),
                },
                body: JSON.stringify(form),
            });
            if (!response.ok) throw new Error(`Failed to ${editingTask ? 'update' : 'create'} task`);

            fetchTasks(); // Refresh tasks list
            setForm({title: '', description: '', dueDate: '', priority: 'Medium'}); // Reset form
            setEditingTask(null); // Clear editing state
        } catch (err) {
            console.error(err);
        }
    };

    // Delete Task
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {Authorization: SessionService.getToken()},
            });
            if (!response.ok) throw new Error('Failed to delete task');
            fetchTasks(); // Refresh tasks list
        } catch (err) {
            console.error(err);
        }
    };

    // Assign Task to User
    const handleAssign = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${id}/assign`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: SessionService.getToken(),
                },
                body: JSON.stringify({userId: assignUserId}),
            });
            if (!response.ok) throw new Error('Failed to assign user to task');
            fetchTasks(); // Refresh tasks list
            setAssignUserId(''); // Clear assign input
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">To Do List</h1>
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">{editingTask ? 'Update Task' : 'Create Task'}</h5>
                    <form onSubmit={handleSave}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Title"
                                value={form.title}
                                onChange={(e) => setForm({...form, title: e.target.value})}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                placeholder="Description"
                                value={form.description}
                                onChange={(e) => setForm({...form, description: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="date"
                                className="form-control"
                                value={form.dueDate}
                                onChange={(e) => setForm({...form, dueDate: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <select
                                className="form-select"
                                value={form.priority}
                                onChange={(e) => setForm({...form, priority: e.target.value})}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary me-2">
                            {editingTask ? 'Update Task' : 'Create Task'}
                        </button>
                        {editingTask && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setEditingTask(null)}
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                </div>
            </div>

            <div className="row">
                {tasks.map((task) => (
                    <div key={task._id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{task.title}</h5>
                                <p className="card-text">{task.description}</p>
                                <p>
                                    <strong>Due Date:</strong>{' '}
                                    {new Date(task.dueDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Priority:</strong> {task.priority}
                                </p>
                                <p>
                                    <strong>Status:</strong>{' '}
                                    {task.completed ? 'Completed' : 'Pending'}
                                </p>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Assign User ID"
                                        value={assignUserId}
                                        onChange={(e) => setAssignUserId(e.target.value)}
                                    />
                                </div>
                                <button
                                    className="btn btn-success me-2"
                                    onClick={() => setEditingTask(task)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger me-2"
                                    onClick={() => handleDelete(task._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => handleAssign(task._id)}
                                >
                                    Assign
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Todo;
