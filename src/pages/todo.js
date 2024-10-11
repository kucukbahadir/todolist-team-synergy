import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Todo = () => {
    const navigate = useNavigate();
    let [todos, setTodos] = useState([]);

    // Load todos from localStorage
    useEffect(() => {
        // This will run when the component is first mounted (or the page is reloaded)
        let jsonString = localStorage.getItem("tasksUser");

        if (jsonString) {
            let jsonArray = JSON.parse(jsonString).filter((todo) => !todo.completed); // Filter out completed to do's
            setTodos(jsonArray);
        }

    }, []);

    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [newTodoDescription, setNewTodoDescription] = useState("");
    const [newTodoDueDate, setNewTodoDueDate] = useState("");
    const [newTodoPriority, setNewTodoPriority] = useState("");
    const [showForm, setShowForm] = useState(false); // To toggle the form visibility
    const [sortCriteria, setSortCriteria] = useState("");
    const [sortOrder, setSortOrder] = useState("asc"); //Ascending sort order
    const [priorityFilter, setPriorityFilter] = useState("");

    // Function to add a new to do
    const buttonAddToDo = (e) => {
        e.preventDefault();
        if (newTodoTitle && newTodoDescription && newTodoDueDate && newTodoPriority) {
            const newTodo = {
                id: todos.length + 1, // add an id for the to do
                title: newTodoTitle,
                description: newTodoDescription,
                dueDate: new Date(newTodoDueDate),
                priority: newTodoPriority,
                completed: false
            };
            // Update the to do's list by adding the new to do and reset the input fields
            let updatedTodos = [...todos, newTodo];
            setTodos(updatedTodos);

            // Set the new todos into the localStorage
            localStorage.setItem("tasksUser", JSON.stringify(updatedTodos)); 

            // Reset input fields
            setNewTodoTitle(""); 
            setNewTodoDescription("");
            setNewTodoDueDate("");
            setNewTodoPriority("");

        }
    };

    // Function to delete a to do by its id
    const handleDelete = (id) => {
        // Filter out the to do with the matching ID and update the to do's list
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);

        localStorage.setItem("tasksUser", JSON.stringify(updatedTodos)); // Set the new todos into the localStorage
    };

    //Function to sort Todos
    const sortedAndFilteredTodos = () =>   {
        let filteredTodos = todos;

        if (priorityFilter) {
            filteredTodos = todos.filter((todo) => todo.priority === priorityFilter);
        }

        if (sortCriteria === "id") {
            filteredTodos.sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));
        } else if (sortCriteria == "dueDate") {
            filteredTodos.sort((a, b) => {
                const dateA = new Date(a.dueDate);
                const dateB = new Date(b.dueDate);
                return sortOrder == "asc" ? dateA - dateB : dateB - dateA;
            });
        } else if(sortCriteria === "priority") {
            const priorityOrder = {High: 3, Medium: 2, Low: 1};
            filteredTodos.sort((a, b) => {
                return sortOrder === "asc" ? priorityOrder[a.priority] - priorityOrder[b.priority] : priorityOrder[b.priority] - priorityOrder[a.priority]
            });
        }

        return filteredTodos
    };

    const viewDetails = (todo) => {
        // Temporary solution to access this to-do item in the detail page
        //localStorage.setItem(todo.id, JSON.stringify(todo));

        navigate(`/detail/${todo.id}`);
    };

    const completeTask = (todo) => {

        // Get all tasks from localStorage
        let jsonString = localStorage.getItem("tasksUser");
        let allTodos = [];

        if (jsonString) {
            allTodos = JSON.parse(jsonString);
        }

        // Set the completed status of the task to the opposite of what it was
        const updatedTodos = allTodos.map((t) => {
            if (t.id === todo.id) {
                t.completed = !t.completed; // Toggle de voltooide status
            }
            return t;
        });

        // Update the localStorage with the updated tasks
        localStorage.setItem("tasksUser", JSON.stringify(updatedTodos));

        // Filter out the completed tasks
        setTodos(updatedTodos.filter((t) => !t.completed));
    }

    return (
        <div className="container-fluid">
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

            <div className="row">
                {/* Priority Filter */}
                <div className="col-4 fluid">
                    <label>Filter by Priority: </label>
                    <select
                        className="form-control"
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

            {/* Sort Criteria */}
            <div className="col-4 fluid">
                    <label>Sort by: </label>
                    <select
                        className="form-control"
                        value={sortCriteria}
                        onChange={(e) => setSortCriteria(e.target.value)}
                    >
                        <option value="">None</option>
                        <option value="id">ID</option>
                        <option value="dueDate">Due Date</option>
                        <option value="priority">Priority</option>
                    </select>
                </div>

                {/* Sort Order */}
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
                                <div className="col-mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Todo Title"
                                        value={newTodoTitle}
                                        onChange={(e) => setNewTodoTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <br></br>
                                <div className="col-mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Todo Description"
                                        value={newTodoDescription}
                                        onChange={(e) => setNewTodoDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <br></br>
                                <div className="col-mb-3">
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Due Date"
                                        value={newTodoDueDate}
                                        onChange={(e) => setNewTodoDueDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <br></br>
                                <div className="col-mb-3">
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
                                    Add To do
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
                    {sortedAndFilteredTodos().map((todo) => (
                        <div key={todo.id} className="col-3">
                            <div className="card border-5">
                                <br />
                                <div className="card-body custom-card">
                                    <h4 className="card-title">{todo.title}</h4>
                                    {/* Maybe use string.slice() to only show a set amount of characters in case of giant descriptions
                                    https://www.w3schools.com/jsref/jsref_slice_string.asp */}
                                    <p className="card-text">{todo.description}</p>
                                    {/* Task detail for the to do */}
                                    <p className="card-text">
                                        <small className="text-muted">Task
                                            ID: {todo.id}</small> {/* Displaying the task ID */}
                                    </p>
                                    <p className="card-text">
                                        {/*
                                            Under here is a ternary operator. A ternary operator consist out of 2 parts: The condition in front of the ?, and options behind the ?, seperated by the :.
                                            If the condition is true, the first option will be return.
                                            If the condition is false, the second option gets returned.
                                        */}
                                        <small className={new Date(todo.dueDate) < new Date() ? ("text-danger") : ("text-muted")}>
                                            Due Date: {new Date(todo.dueDate) <= new Date() ? ("Overdue") : new Date(todo.dueDate).toDateString()}
                                        </small> {/* Display due date */}
                                    </p>
                                    <p className="card-text">
                                        <small
                                            className="text-muted">Priority: {todo.priority}</small> {/* Display priority */}
                                    </p>
                                    {/* Delete button */}
                                    <button
                                        className="btn btn-outline-danger p-2 m-1"
                                        onClick={() => handleDelete(todo.id)} // Delete the to do by its ID
                                    >
                                        Delete
                                    </button>
                                    <button onClick={() => viewDetails(todo)} className="btn btn-outline-secondary p-2 m-1">
                                        Edit
                                    </button>
                                    <button onClick={() => completeTask(todo)} className="btn btn-outline-success p-2 m-1">
                                        Complete
                                    </button>
                                </div>
                                <br/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Todo;
