import React, {useState, useEffect} from "react";

const Todo = () => {
    // Initialize to do's from localStorage or sessionStorage if available, else use default to do's
    const [todos, setTodos] = useState(() => {
        // First try to retrieve stored to do's from localStorage
        const storedLocalTodos = localStorage.getItem("todos");
        if (storedLocalTodos) {
            return JSON.parse(storedLocalTodos);
        }

        // Retrieve stored to do's from sessionStorage, or use the default list if not found
        // Default to do's so that the grid bootstrap doesn't look weird
        const storedSessionTodos = sessionStorage.getItem("todos");
        return storedSessionTodos ? JSON.parse(storedSessionTodos) : [
            {id: 1, title: "To do 1", description: "I need to add some things to this page"},
            {id: 2, title: "To do 2", description: "Text"},
            {id: 3, title: "To do 3", description: "Text"},
            {id: 4, title: "To do 4", description: "Text"},
            {id: 5, title: "To do 5", description: "Text"},
            {id: 6, title: "To do 6", description: "Text"},
            {id: 7, title: "To do 7", description: "Text"},
            {id: 8, title: "To do 8", description: "Text"},
        ];
    });

    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [newTodoDescription, setNewTodoDescription] = useState("");
    const [showForm, setShowForm] = useState(false); // To toggle the form visibility

    // Function to update to do's in sessionStorage and localStorage whenever the to do's array changes
    useEffect(() => {
        // Save the current todos list to sessionStorage and localStorage whenever todos state changes
        sessionStorage.setItem("todos", JSON.stringify(todos));  // Save in sessionStorage
        localStorage.setItem("todos", JSON.stringify(todos));    // Save in localStorage
    }, [todos]);

    // Function to add a new to do
    const buttonAddToDo = (e) => {
        e.preventDefault();
        if (newTodoTitle && newTodoDescription) {
            const newTodo = {
                id: todos.length + 1, // add a id for the to do
                title: newTodoTitle,
                description: newTodoDescription,
            };
            // Update the to do's list by adding the new to do and reset the input fields
            setTodos([...todos, newTodo]);
            setNewTodoTitle(""); // Reset input field
            setNewTodoDescription(""); // Reset input field
        }
    };

    // Function to delete a to do by its id
    const handleDelete = (id) => {
        // Filter out the to do with the matching ID and update the to do's list
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    return (
        <div>
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
                    {showForm ? "Hide Form" : "add to do"} {/* Change button text based on form visibility */}
                </button>
            </div>
            <br/>

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
                                <button type="submit" className="btn btn-outline-success">
                                    Add Todo
                                </button>
                            </form>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>
            )}

            <br/>

            {/* Displaying the list of to do's */}
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center g-2">
                    {todos.map((todo) => (
                        <div key={todo.id} className="col-3">
                            <div className="card rounded-pill">
                                <div className="card-body">
                                    <h4 className="card-title">{todo.title}</h4>
                                    <p className="card-text">{todo.description}</p>
                                    {/* Delete button */}
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => handleDelete(todo.id)} // Delete the to do by its ID
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Todo;
