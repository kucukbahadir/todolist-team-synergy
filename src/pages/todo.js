import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { taskService } from "../services/taskService";
import { SessionService } from "../services/SessionService";
import { taskListService } from "../services/TaskListService";

//const {ObjectId} = require('mongodb');

const Todo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [taskLists, setTaskLists] = useState(location.state?.taskLists || []);

    const [name, setName] = useState("");
    const [newListTitle, setNewListTitle] = useState(""); 
    const [lists, setLists] = useState([]);     // Contains the all task_list Objects
    const [list, setList] = useState();         // Contains the selected task_list Object
    const [tasks, setTasks] = useState([]);     // Contains the task Objects
    
    //const [listTodos, setListTodos] = useState([]);
    //const [todos, setTodos] = useState([]);

    // Load todos from localStorage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setName(user.email);

        // TODO:
        const _lists = JSON.parse(localStorage.getItem("lists"))
        console.log("Lists", _lists)
        setLists(_lists);
    }, []);

    async function handleSetList(id) {
        let _list;
        lists.forEach(element => {
            if (element._id == id) {
                _list = element
                setList(element);
                //break;
            }
        });

        // TODO: Get lists task from db
        console.log("List", _list);
        const taskIDs = _list.tasks.join(",");
        //console.log("IDs", taskIDs);

        let tasks = await taskService.getTasks(taskIDs);
        setTasks(tasks);
    }

    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [newTodoDescription, setNewTodoDescription] = useState("");
    const [newTodoDueDate, setNewTodoDueDate] = useState("");
    const [newTodoPriority, setNewTodoPriority] = useState("");
    const [showForm, setShowForm] = useState(false); // To toggle the form visibility
    const [sortCriteria, setSortCriteria] = useState("");
    const [sortOrder, setSortOrder] = useState("asc"); //Ascending sort order
    const [priorityFilter, setPriorityFilter] = useState("");

    // Function to add a new to do
    async function buttonAddToDo(e) {
        e.preventDefault();

        if (list == null) {
            alert("Please select a list");
            return;
        }

        if (newTodoTitle && newTodoDescription && newTodoDueDate && newTodoPriority) {
            const newTask = {
                //_id: new ObjectId(),
                title: newTodoTitle,
                description: newTodoDescription,
                dueDate: new Date(newTodoDueDate),
                priority: newTodoPriority,
                completed: false
            };

            let insertedTask = await taskService.createTask(newTask);
            console.log("Inserted", insertedTask);

            let updatedTasks = [...tasks, insertedTask];
            setTasks(updatedTasks);

            let updatedListTasks = list
            updatedListTasks.tasks.push(insertedTask._id)
            //console.log(updatedListTasks._id, insertedTask._id)
            taskListService.updateTaskList(updatedListTasks._id, insertedTask._id)
            setList(updatedListTasks);

            // Reset input fields
            //setNewTodoTitle(""); 
            //setNewTodoDescription("");
            //setNewTodoDueDate("");
            //setNewTodoPriority("");
        }
    };

    // Function to delete a to do by its id
    const handleDelete = (id) => {
        const updatedTasks = tasks.filter((todo) => todo._id !== id);
        setTasks(updatedTasks);

        taskService.deleteTask(id);
    };

    //Function to sort Todos
    const sortedAndFilteredTodos = () => {
        let filteredTodos = tasks ? tasks : []; // Safer initialization

    
        if (priorityFilter) {
            filteredTodos = filteredTodos.filter((todo) => todo.priority === priorityFilter);
        }
    
        if (sortCriteria === "id") {
            filteredTodos.sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));
        } else if (sortCriteria === "dueDate") {
            filteredTodos.sort((a, b) => {
                const dateA = new Date(a.dueDate);
                const dateB = new Date(b.dueDate);
                return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            });
        } else if (sortCriteria === "priority") {
            const priorityOrder = { High: 3, Medium: 2, Low: 1 };
            filteredTodos.sort((a, b) => {
                return sortOrder === "asc"
                    ? priorityOrder[a.priority] - priorityOrder[b.priority]
                    : priorityOrder[b.priority] - priorityOrder[a.priority];
            });
        }
        
        return filteredTodos;
    };

    const viewDetails = (todo) => {
        // TODO: list._id is pointless
        //navigate(`/detail/${todo._id}`);
        navigate(`/detail/${list._id}/${todo._id}`)
    };


    async function completeTask(todo) {
        let updatedTask = todo;
        updatedTask.completed = true;
        console.log("Updated Task", updatedTask)
        // Update task in db
        let update = await taskService.updateTask(updatedTask._id, updatedTask);

        // Update the task in the tasks useState
        const updatedTasks = tasks.map(task => {
            // Can be replaced for a teriary operator
            if (task._id === todo._id) {
                return { ...task, completed: true };
            }
            return task;
        });        
        
        console.log("Updated tasks", updatedTasks);
        setTasks(updatedTasks);

        // Update list with the
        /* const updatedList = { ...list, tasks: updatedTasks };
        console.log("Updated List", updatedList);
        setList(updatedList); */

        /* let updatedLists = lists.map(lst => { return lst.id == updatedList.id ? updatedList : lst});
        setLists(updatedLists); */

        //localStorage.setItem("tasklistsUser", JSON.stringify(updatedLists));
    };


    useEffect(() => {
        if (!taskLists.length) {
            async function fetchTaskLists() {
                 try {
                     const lists = await SessionService.getUserLists();
                    setTaskLists(lists);
                } catch (error) {
                    console.error("Failed to fetch task lists: ", error);
                }
            }
            fetchTaskLists();
        }
    });

    const handleCreateList = async () => {
        if (!newListTitle) {
            alert("Please enter a title for the task list." );
            return;
        }

        try {
            const newList = {
                title: newListTitle,
                tasks: [],
                sharedWith: [],
            };

            const createdList = await taskListService.createTaskList(newList);

            //Update the lists state
            setLists((prevLists) => [...prevLists, createdList]);        
            setNewListTitle("");

            alert ("New task list created!")
        } catch (error) {
            console.error("Error creating task list: ", error)
            alert("Failed to create a new task list.")
        }
    };
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
                            <h2 className="tx-pro">{name} To do List</h2>
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
                        <option className="text-danger" value="High">High</option>
                        <option className="text-primary" value="Medium">Medium</option>
                        <option className="text-success" value="Low">Low</option>
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
                                <div className="col-mb-3 p-2 m-1">
                                    <p>Title:</p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Todo Title"
                                        value={newTodoTitle}
                                        onChange={(e) => setNewTodoTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-mb-3 p-2 m-1">
                                    <p>Description:</p>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Todo Description"
                                        value={newTodoDescription}
                                        onChange={(e) => setNewTodoDescription(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-mb-3 p-2 m-1">
                                    <p>Date:</p>
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Due Date"
                                        value={newTodoDueDate}
                                        onChange={(e) => setNewTodoDueDate(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="col-mb-3 p-2 m-1">
                                    <p>Priority:</p>
                                    <select
                                        className="form-control"
                                        value={newTodoPriority}
                                        onChange={(e) => setNewTodoPriority(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Priority</option>
                                        <option className="text-danger" value="High">High</option>
                                        <option className="text-primary" value="Medium">Medium</option>
                                        <option className="text-success" value="Low">Low</option>
                                    </select>
                                </div>
                                <br></br>
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
            <div className="container my-3">
                <input
                    type="text"
                    className="form=control"
                    placeholder="Enter a title"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                />
                <br></br>
                <button
                    className="btn btn-outline-success"
                    onClick={handleCreateList}
                >
                    Create New Task List
                </button>
            </div>
            

            {/* Display the list of task lists */}
            <div>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <select onChange={(e) => handleSetList(e.target.value)} defaultValue="">
                        <option value="" disabled>Select a list</option>
                        {lists.map((task) => (
                        <option key={task._id} value={task._id}>{task.title}</option>
                        ))}
                    </select>
                </form>
            </div>
            {/* Displaying the list of to do's */}
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center g-2">
                    {sortedAndFilteredTodos().map((sortedTasks) => {if (!sortedTasks.completed) { return (
                        <div key={sortedTasks.id} className="col-3">
                            <div className="card border-5">
                                <br />
                                <div className="card-body custom-card">
                                    <h4 className="card-title">{sortedTasks.title}</h4>
                                    {/* Maybe use string.slice() to only show a set amount of characters in case of giant descriptions
                                    https://www.w3schools.com/jsref/jsref_slice_string.asp */}
                                    <p className="card-text">{sortedTasks.description}</p>
                                    {/* Task detail for the to do */}
                                    <p className="card-text">
                                        <small className="text-muted">Task
                                            ID: {sortedTasks._id}</small> {/* Displaying the task ID */}
                                    </p>
                                    <p className="card-text">
                                        {/*
                                            Under here is a ternary operator. A ternary operator consist out of 2 parts: The condition in front of the ?, and options behind the ?, seperated by the :.
                                            If the condition is true, the first option will be return.
                                            If the condition is false, the second option gets returned.
                                        */}
                                        <small className={new Date(sortedTasks.dueDate) < new Date() ? ("text-danger") : ("text-muted")}>
                                            Due Date: {new Date(sortedTasks.dueDate) <= new Date() ? ("Overdue") : new Date(sortedTasks.dueDate).toDateString()}
                                        </small> {/* Display due date */}
                                    </p>
                                    <p className="card-text">
                                        <small className={
                                            (() => {
                                                switch(sortedTasks.priority) {
                                                    case "High":    return "text-danger";
                                                    case "Medium":  return "text-primary";
                                                    case "Low":     return "text-success";
                                                    default:        return "text-warning";
                                                }
                                            })() // <- Immediately call the function
                                            }>Priority: {sortedTasks.priority}</small> {/* Display priority */}
                                    </p>
                                    {/* Delete button */}
                                    <button
                                        className="btn btn-outline-danger p-2 m-1"
                                        onClick={() => handleDelete(sortedTasks._id)} // Delete the to do by its ID
                                    >
                                        Delete
                                    </button>
                                    <button onClick={() => viewDetails(sortedTasks)} className="btn btn-outline-secondary p-2 m-1">
                                        Edit
                                    </button>
                                    <button onClick={() => completeTask(sortedTasks)} className="btn btn-outline-success p-2 m-1">
                                        Complete
                                    </button>
                                </div>
                                <br/>
                            </div>
                        </div>
                    )}})}
                </div>
            </div>
        </div>
    );
};

export default Todo;
