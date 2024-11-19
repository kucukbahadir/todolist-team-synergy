import React, {useEffect, useState} from 'react';
//import {SessionService} from '../services/SessionService';
import {taskService} from '../services/taskService';
import { useNavigate } from 'react-router-dom';
import {taskListService} from '../services/TaskListService'
import { SessionService } from '../services/SessionService';

const Todo = () => {
    // State for storing tasks, loading status, error message, form data and more
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [lists, setLists] = useState([]);     // Contains the all task_list Objects
    const [list, setList] = useState();         // Contains the selected task_list Object
    const [tasks, setTasks] = useState([]);     // Contains the task Objects
    
    //const [error, setError] = useState(null);
    const [form, setForm] = useState({title: '', description: '', dueDate: '', priority: 'Medium'});
    //const [editingTask, setEditingTask] = useState(null);
    const [assignUserMail, setAssignUserMail] = useState('');

    // Filtering and Sorting State
    const [priorityFilter, setPriorityFilter] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    // Function to fetch tasks from the backend using taskService
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
        console.log("IDs", taskIDs);

        let _tasks = await taskService.getTasks(taskIDs);
        //console.log(_tasks)
        //setTasks(_tasks);

        if (_tasks && _tasks.length > 0) {
            // Fetch users associated with each task
            for (let i = 0; i < _tasks.length; i++) {
                try {
                    console.log("task user:", _tasks[i].assignedToUser)
                    const _user = await SessionService.getUserbyID(_tasks[i].assignedToUser);
        
                    if (_user) {
                        console.log(`User data for task ${i}:`, _user);
                        _tasks[i].mail = _user.email;
                    } else {
                        console.warn(`No user found for task ${i} with user ID:`, _tasks[i].assignedToUser);
                    }
                } catch (error) {
                    console.error(`Error fetching user for task ${i}:`, error);
                }
            }
            setTasks(_tasks);
        } else {
            // If no tasks were retrieved or tasks is null
            console.warn("No tasks retrieved.");
            setTasks([]);
        }
        console.log("tasks", tasks)
    }

    async function handleShareList(assignUserMail) {
        const _user = await SessionService.getUserbyMail(assignUserMail)
        console.log("user", _user);

        if (_user) {
            // Add list to _user "sharedLists"
            console.log("Updating user sharedLists");
            _user.sharedLists.push(list._id);

            // Add _user to list "sharedWith"
            console.log("updating list sharedWith");
            let _list = list;
            _list.sharedWith.push(_user._id);

            // Update db
            console.log("updating db")
            console.log("_list", _list)
            taskListService.updateTaskList2(_list._id, _list);
            console.log("_user", _user);
            SessionService.updateUser(_user.id, _user);

            // Update useStates / localStorage
            localStorage.setItem("user", _user)
            setList(_list);
        } else {
            alert("Failed")
            console.log(`Error fetching user: ${assignUserMail}`)
        }
    }

    // Function to handle saving a new or edited task
    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            let insertedTask = await taskService.createTask(form);
            console.log("Inserted", insertedTask);

            let updatedTasks = [...tasks, insertedTask];
            setTasks(updatedTasks);

            let updatedListTasks = list
            updatedListTasks.tasks.push(insertedTask._id)
            //console.log(updatedListTasks._id, insertedTask._id)
            taskListService.updateTaskList(updatedListTasks._id, insertedTask._id)
            setList(updatedListTasks);


            setForm({title: '', description: '', dueDate: '', priority: 'Medium'});
        } catch (err) {
            //setError(`Failed to ${editingTask ? 'update' : 'create'} task`); // Set error if save fails
            console.log(err);
        }
    };

    // Function to delete a to do by its id
    const handleDelete = (id) => {
        const updatedTasks = tasks.filter((todo) => todo._id !== id);
        setTasks(updatedTasks);

        taskService.deleteTask(id);
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

    /* const handleToggleStatus = async (id, currentStatus) => {
        try {
            // Toggle the task completion status
            await taskService.updateTask(id, {completed: !currentStatus});
            //fetchTasks(); // Fetch updated task list
        } catch (err) {
            //setError('Failed to update task status');
            console.log(err);
        }
    }; */


    // Display loading state or error message if applicable
    //if (loading) return <div>Loading tasks...</div>;
    //if (error) return <div>Error: {error}</div>;

    return (<div className="container-fluid">
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
            <h2 className="todo-title text-white">{name} To Do List</h2>
        </div>

        {/* Form for Adding or Editing Tasks */}
        <form onSubmit={handleAddTask} className="mb-4">
            <div className="row mb-3">
                {/* Title input field */}
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={form.title}
                        onChange={(e) => setForm({...form, title: e.target.value})}
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
                        onChange={(e) => setForm({...form, description: e.target.value})}
                    />
                </div>
                {/* Due date input field */}
                <div className="col-md-2">
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Due Date"
                        value={form.dueDate}
                        onChange={(e) => setForm({...form, dueDate: e.target.value})}
                        required
                    />
                </div>
                {/* Priority selection field */}
                <div className="col-md-2">
                    <select
                        className="form-control"
                        value={form.priority}
                        onChange={(e) => setForm({...form, priority: e.target.value})}
                    >
                        <option value="Medium">Medium</option>
                        <option value="High" className="text-danger">High</option>
                        <option value="Low" className="text-success">Low</option>
                    </select>
                </div>
                {/* Submit button to either add or update a task */}
                <div className="col-md-2">
                    <button type="submit" className="btn btn-outline-success w-100">
                        {/*editingTask ? 'Update Task' : 'Add Task'*/}
                        Add task
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

        {/* Display the list of task lists */}
        <div className='row'>
            <div className='col-6'>
            <form onSubmit={(e) => { e.preventDefault(); }}>
                <select onChange={(e) => handleSetList(e.target.value)} defaultValue="">
                    <option value="" disabled>Select a list</option>
                    {lists.map((task) => (
                        <option key={task._id} value={task._id}>{task.title}</option>
                    ))}
                </select>
            </form>
            </div>

            <div className='col-3'>
            <input
                type="text"
                className="form-control"
                placeholder="Share current Task List with:"
                value={assignUserMail}
                onChange={(e) => setAssignUserMail(e.target.value)}
            /> </div>
            <div className='col-3'>
            <button
                className="btn btn-outline-success"
                onClick={() => handleShareList(assignUserMail)}
            >
                Share Task List
            </button>            
            </div>
        </div>

        {/* Displaying the tasks */}
        <div className="row">
            {filteredAndSortedTasks.map((task) => {
                // Define classes for overdue tasks and task priorities
                const dueDateClass = new Date(task.dueDate) < new Date() ? "text-danger" : "text-muted";
                const priorityClass = task.priority === "High" ? "text-danger" : task.priority === "Medium" ? "text-primary" : "text-success";

                if( task.completed) { return (null); }

                return (<div key={task._id} className="col-md-4 mb-4">
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
                                <p><strong>Assigned to: </strong>{task.mail}</p>
                                {/*<p><strong>Status: </strong>{task.completed ? 'Completed' : 'Pending'}</p>
                                {/* User assignment */}
                                {/* Status Toggle Button */}
                                {/* <button
                                    className={`btn ${task.completed ? 'btn-outline-warning' : 'btn-outline-info'} m-2`}
                                    onClick={() => handleToggleStatus(task._id, task.completed)}
                                >
                                    {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                                </button> */}
                                {/* Buttons for editing, deleting, and assigning users */}
                                
                                <button className="btn btn-outline-success me-2"
                                        onClick={() => viewDetails(task)}>Edit
                                </button>
                                <button className="btn btn-outline-danger me-2"
                                        onClick={() => handleDelete(task._id)}>Delete
                                </button>
                                <button onClick={() => completeTask(task)} className="btn btn-outline-success p-2 m-1">
                                        Complete
                                    </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>);
};

export default Todo;