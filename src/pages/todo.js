import React, {useEffect, useState} from 'react';
import {SessionService} from '../services/SessionService';
import { taskService } from '../services/taskService';

const Todo = () => {
    const [tasks, setTasks] = useState([]); // State to hold tasks
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [form, setForm] = useState({ title: '', description: '', dueDate: '', priority: 'Medium'}); // Form state
    const [editingTask, setEditingTask] = useState(null); // Editing task state
    const [assignUserId, setAssignUserId] = useState(''); // State for assigning user to task

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const data = await taskService.getAllTasks();
            setTasks(data || []);
        } catch (err) {
            setError('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingTask) {
                await taskService.updateTask(editingTask._id, form);
            } else {
                await taskService.createTask(form);
            }
            fetchTasks();
            setForm({ title: '', description: '', dueDate: '', priority: 'Medium' });
            setEditingTask(null);
        } catch (err) {
            setError(`Failed to ${editingTask ? 'update' : 'create'} task`);
        }
    };

    const handleDelete = async (id) => {
        try {
            await taskService.deleteTask(id);
            fetchTasks();
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    const handleAssign = async (id) => {
        try {
            await taskService.assignUserToTask(id, assignUserId);
            fetchTasks();
            setAssignUserId('');
        } catch (err) {
            setError('Failed to assign user to task');
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
                                <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                                <p><strong>Priority:</strong> {task.priority}</p>
                                <p><strong>Status:</strong> {task.completed ? 'Completed' : 'Pending'}</p>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Assign User ID"
                                        value={assignUserId}
                                        onChange={(e) => setAssignUserId(e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-success me-2" onClick={() => setEditingTask(task)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger me-2" onClick={() => handleDelete(task._id)}>
                                    Delete
                                </button>
                                <button className="btn btn-secondary" onClick={() => handleAssign(task._id)}>
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
