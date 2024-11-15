import React, {useEffect, useState} from 'react';
import {SessionService} from '../services/SessionService';
import {taskService} from '../services/taskService';

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({title: '', description: '', dueDate: '', priority: 'Medium'});
    const [editingTask, setEditingTask] = useState(null);
    const [assignUserId, setAssignUserId] = useState('');

    // New state variables for filtering and sorting
    const [priorityFilter, setPriorityFilter] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

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
            setForm({title: '', description: '', dueDate: '', priority: 'Medium'});
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

    // Filter and sort tasks based on selected criteria
    const filteredAndSortedTasks = tasks
        .filter((task) => {
            if (!priorityFilter) return true;
            return task.priority === priorityFilter;
        })
        .sort((a, b) => {
            if (!sortCriteria) return 0;
            const fieldA = a[sortCriteria];
            const fieldB = b[sortCriteria];
            if (sortOrder === 'asc') {
                return fieldA > fieldB ? 1 : -1;
            } else {
                return fieldA < fieldB ? 1 : -1;
            }
        });

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>Error: {error}</div>;

    return (<div className="container-fluid">
            <style>
                {`
                    .custom-card {
                        transition: transform 0.3s;
                    }
                    .custom-card:hover {
                        transform: scale(1.05);
                    }
                `}
            </style>
        <br/><br/>
            <div className="container-fluid bg-black rounded-pill">
                <br/>
                <div className="row justify-content-center align-items-center text-center">
                    <div className="col"></div>
                    <div className="col">
                        <div className="underline p-2">
                            <h2 className="tx-pro">To Do List</h2>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
                <br/>
            </div>
            <br/>

            {/* Filter and Sort Controls */}
            <div className="row">
                <div className="col-4 fluid">
                    <label>Filter by Priority: </label>
                    <select
                        className="form-control"
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option className="text-danger" value="High">High</option>
                        <option className="text-primary" value="Medium">Medium</option>
                        <option className="text-success" value="Low">Low</option>
                    </select>
                </div>

                <div className="col-4 fluid">
                    <label>Sort by: </label>
                    <select
                        className="form-control"
                        value={sortCriteria}
                        onChange={(e) => setSortCriteria(e.target.value)}
                    >
                        <option value="">None</option>
                        <option value="title">Title</option>
                        <option value="dueDate">Due Date</option>
                        <option value="priority">Priority</option>
                    </select>
                </div>

                <div className="col-4 fluid">
                    <label>Order: </label>
                    <select
                        className="form-control"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            <br/><br/>
            <div className="row">
                {filteredAndSortedTasks.map((task) => (<div key={task._id} className="col-md-4 mb-4">
                        <div className="card custom-card">
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
                    </div>))}
            </div>
        </div>);
};

export default Todo;
