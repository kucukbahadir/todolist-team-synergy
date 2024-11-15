import React, {useEffect, useState} from 'react';
import {SessionService} from '../services/SessionService';
import {taskService} from '../services/taskService';

const Todo = () => {
    // State for storing tasks, loading status, error message, form data and more
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({ title: '', description: '', dueDate: '', priority: 'Medium' });
    const [editingTask, setEditingTask] = useState(null);
    const [assignUserId, setAssignUserId] = useState('');

    // Filtering and Sorting State
    const [priorityFilter, setPriorityFilter] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    // Function to fetch tasks from the backend using taskService
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

    // useEffect hook to fetch tasks when the component mounts
    useEffect(() => {
        fetchTasks(); // Call fetchTasks on component mount
    }, []);

    // Function to handle saving a new or edited task
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            // If editing, update the existing task; otherwise, create a new task
            if (editingTask) {
                await taskService.updateTask(editingTask._id, form);
            } else {
                await taskService.createTask(form);
            }
            fetchTasks(); // Fetch updated task list
            setForm({ title: '', description: '', dueDate: '', priority: 'Medium' });
            setEditingTask(null); // Clear the editing task
        } catch (err) {
            setError(`Failed to ${editingTask ? 'update' : 'create'} task`); // Set error if save fails
        }
    };

    // Function to handle deleting a task
    const handleDelete = async (id) => {
        try {
            await taskService.deleteTask(id); // Delete the task
            fetchTasks();
        } catch (err) {
            setError('Failed to delete task'); // Set error if deletion fails
        }
    };

    // Function to handle assigning a user to a task
    const handleAssign = async (id) => {
        try {
            await taskService.assignUserToTask(id, assignUserId); // Assign user to the task
            fetchTasks();
            setAssignUserId('');
        } catch (err) {
            setError('Failed to assign user to task'); // Set error if assignment fails
        }
    };

    // Filter and sort tasks based on the user-selected filters and sorting criteria
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
                return fieldA > fieldB ? 1 : -1; // Sort in ascending order
            } else {
                return fieldA < fieldB ? 1 : -1; // Sort in descending order
            }
        });

    // Display loading state or error message if applicable
    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container-fluid">
            {/* Custom styling for cards */}
            <style>
                {`
                    .custom-card { transition: transform 0.3s; }
                    .custom-card:hover { transform: scale(1.05); }
                    .todo-title { font-size: 2rem; font-weight: bold; }
                `}
            </style>
            <br/>
            {/* Title of the Todo List */}
            <div className="container-fluid bg-black text-center rounded-pill p-3 mb-4">
                <h2 className="todo-title text-white">To Do List</h2>
            </div>

            {/* Form for Adding or Editing Tasks */}
            <form onSubmit={handleSave} className="mb-4">
                <div className="row mb-3">
                    {/* Title input field */}
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                        />
                    </div>
                    {/* Description input field */}
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                    </div>
                    {/* Due date input field */}
                    <div className="col-md-2">
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Due Date"
                            value={form.dueDate}
                            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                            required
                        />
                    </div>
                    {/* Priority selection field */}
                    <div className="col-md-2">
                        <select
                            className="form-control"
                            value={form.priority}
                            onChange={(e) => setForm({ ...form, priority: e.target.value })}
                        >
                            <option value="Medium">Medium</option>
                            <option value="High" className="text-danger">High</option>
                            <option value="Low" className="text-success">Low</option>
                        </select>
                    </div>
                    {/* Submit button to either add or update a task */}
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-outline-success w-100">
                            {editingTask ? 'Update Task' : 'Add Task'}
                        </button>
                    </div>
                </div>
            </form>

            {/* Filter and Sort Controls */}
            <div className="row mb-4">
                {/* Priority filter */}
                <div className="col-4">
                    <label>Filter by Priority:</label>
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
                {/* Sort criteria selection */}
                <div className="col-4">
                    <label>Sort by:</label>
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
                {/* Sort order selection */}
                <div className="col-4">
                    <label>Order:</label>
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

            {/* Displaying the tasks */}
            <div className="row">
                {filteredAndSortedTasks.map((task) => {
                    // Define classes for overdue tasks and task priorities
                    const dueDateClass = new Date(task.dueDate) < new Date() ? "text-danger" : "text-muted";
                    const priorityClass =
                        task.priority === "High" ? "text-danger" :
                            task.priority === "Medium" ? "text-primary" :
                                "text-success";

                    return (
                        <div key={task._id} className="col-md-4 mb-4">
                            <div className="card custom-card">
                                <div className="card-body">
                                    {/* Task details */}
                                    <h5 className="card-title">{task.title}</h5>
                                    <p className="card-text">{task.description}</p>
                                    <p><strong>Due Date: </strong>
                                        <span className={dueDateClass}>
                                            {new Date(task.dueDate).toLocaleDateString()}
                                        </span>
                                    </p>
                                    <p><strong>Priority: </strong>
                                        <span className={priorityClass}>{task.priority}</span>
                                    </p>
                                    <p><strong>Status: </strong>{task.completed ? 'Completed' : 'Pending'}</p>
                                    {/* User assignment */}
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        placeholder="Assign User ID"
                                        value={assignUserId}
                                        onChange={(e) => setAssignUserId(e.target.value)}
                                    />
                                    {/* Buttons for editing, deleting, and assigning users */}
                                    <button className="btn btn-outline-success me-2" onClick={() => setEditingTask(task)}>Edit</button>
                                    <button className="btn btn-outline-danger me-2" onClick={() => handleDelete(task._id)}>Delete</button>
                                    <button className="btn btn-outline-secondary" onClick={() => handleAssign(task._id)}>Assign</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Todo;
