import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const Todo = () => {
    const navigate = useNavigate();

    // Initialize to do's with the default to do's so bootstrap grid doesn't look weird
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: "To do 1",
            description: "I need to add some things to this page",
            dueDate: "2024-10-10",
            priority: "High",
        },
        { id: 2, title: "To do 2", description: "Text", dueDate: "2024-11-05", priority: "Low" },
        { id: 3, title: "To do 3", description: "Text", dueDate: "2024-12-01", priority: "Medium" },
        { id: 4, title: "To do 4", description: "Text", dueDate: "2024-10-15", priority: "High" },
        { id: 5, title: "To do 5", description: "Text", dueDate: "2024-10-25", priority: "Low" },
        { id: 6, title: "To do 6", description: "Text", dueDate: "2024-11-10", priority: "Medium" },
        { id: 7, title: "To do 7", description: "Text", dueDate: "2024-11-20", priority: "Low" },
        { id: 8, title: "To do 8", description: "Text", dueDate: "2024-12-01", priority: "High" },
    ]);

    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [newTodoDescription, setNewTodoDescription] = useState("");
    const [newTodoDueDate, setNewTodoDueDate] = useState("");
    const [newTodoPriority, setNewTodoPriority] = useState("");
    const [showForm, setShowForm] = useState(false); // To toggle the form visibility

    // Function to add a new to do
    const buttonAddToDo = (e) => {
        e.preventDefault();
        if (newTodoTitle && newTodoDescription && newTodoDueDate && newTodoPriority) {
            const newTodo = {
                id: todos.length + 1, // add an id for the to do
                title: newTodoTitle,
                description: newTodoDescription,
                dueDate: newTodoDueDate,  // Add due date
                priority: newTodoPriority, // Add priority level
            };
            // Update the to do's list by adding the new to do and reset the input fields
            setTodos([...todos, newTodo]);
            setNewTodoTitle(""); // Reset input field
            setNewTodoDescription(""); // Reset input field
            setNewTodoDueDate(""); // Reset due date field
            setNewTodoPriority(""); // Reset priority field
        }
    };

    // Function to delete a to do by its id
    const handleDelete = (id) => {
        // Filter out the to do with the matching ID and update the to do's list
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const viewDetails = (id) => {
        navigate(`/detail/${id}`);
    };

    return (
        <div>
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
            <div className="container-fluid bg-black rounded-pill">
                <br></br>
                <div className="row justify-content-center align-items-center text-center">
                    <div className="col"></div>
                    <div className="col">
                        <div className="underline p-2">
                            <h2 className="tx-pro">To do List</h2>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
                <br></br>
            </div>
            <br></br>

            {/* Button to toggle form */}
            <div className="container text-center">
                <button
                    className="btn btn-outline-success"
                    onClick={() => setShowForm(!showForm)} // Toggle the form visibility state
                >
                    {showForm ? "Hide Form" : "Add to do"} {/* Change button text based on form visibility */}
                </button>
            </div>
            <br />

            {/* Form for to do input */}
            {showForm && (
                <div className="container-xl">
                    <div className="row justify-content-center align-items-center text-center">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <form onSubmit={buttonAddToDo}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Todo Title"
                                        value={newTodoTitle}
                                        onChange={(e) => setNewTodoTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Todo Description"
                                        value={newTodoDescription}
                                        onChange={(e) => setNewTodoDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Due Date"
                                        value={newTodoDueDate}
                                        onChange={(e) => setNewTodoDueDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <select
                                        className="form-control"
                                        value={newTodoPriority}
                                        onChange={(e) => setNewTodoPriority(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-outline-success">
                                    Add Todo
                                </button>
                            </form>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>
            )}

            <br />

            {/* Displaying the list of to do's */}
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center g-2">
                    {todos.map((todo) => (
                        <div key={todo.id} className="col-3">
                            <div className="card border-5">
                                <br />
                                <div className="card-body custom-card">
                                    <h4 className="card-title">{todo.title}</h4>
                                    <p className="card-text">{todo.description}</p>
                                    {/* Task detail for the to do */}
                                    <p className="card-text">
                                        <small className="text-muted">Task ID: {todo.id}</small> {/* Displaying the task ID */}
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">Due Date: {todo.dueDate}</small> {/* Display due date */}
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">Priority: {todo.priority}</small> {/* Display priority */}
                                    </p>
                                    {/* Delete button */}
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => handleDelete(todo.id)} // Delete the to do by its ID
                                    >
                                        Delete
                                    </button>
                                    <br/>
                                    <button onClick={() => viewDetails(todo.id)} className="btn btn-outline-secondary">
                                        Edit
                                    </button>
                                </div>
                                <br />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Todo;
