import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { taskService } from "../services/taskService";

const Completed = () => {
    //const [lists, setLists] = useState([]);
    //const [todos, setTodos] = useState([]);
    const [completed, setCompleted] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const _lists = JSON.parse(localStorage.getItem("lists")); // Contains the lists objects
                console.log("Lists", _lists);
    
                let totalTasksIDs = [];
    
                _lists.forEach(element => {
                    if (element.tasks.length !== 0) {
                        const ids = element.tasks.join(",");
                        totalTasksIDs.push(ids);
                    }
                });
    
                totalTasksIDs = totalTasksIDs.join(","); // Join all task IDs into a single comma-separated string
                const tasks = await taskService.getTasks(totalTasksIDs); // Await the fetched tasks data
                console.log("Tasks", tasks);
    
                const filterArray = tasks.filter(task => task.completed); // Filter completed tasks directly
                console.log("Completed", filterArray);
                setCompleted(filterArray); // Update state with completed tasks
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
    
        fetchTasks(); // Call the async function
    }, []); // Empty dependency array to run on mount

    const onIncomplete = (id) => {
        taskService.updateTask(id, { completed: false})

        let updatedCompleted = completed.filter(task => (task && task._id != id));
        console.log("Updated", updatedCompleted);
        setCompleted(updatedCompleted);
        }
    

    // Broken
    // const onDelete = (id) => {
    //     let jsonString = localStorage.getItem("tasksUser");
    //     let jsonArray = []

    //     if (jsonString){
    //         jsonArray = JSON.parse(jsonString).filter((todo) => todo.id !== id);
    //         localStorage.setItem("tasksUser", JSON.stringify(jsonArray));
    //         //setTodos(jsonArray);
    //     }
    // }

    return (
        <div className={"h-lvh"}>
            <div>
                <h1 className={"drop-shadow-[5px_5px_0_rgba(0,0,0,0.25)] text-white font-bold text-4xl self-center p-5"}>
                    Completed Tasks
                </h1>
            </div>
            {completed.length === 0 &&
                <div className={"flex flex-col gap-3 justify-center items-center"}>
                    <h1 className={"text-2xl font-bold text-white"}>No tasks completed yet</h1>
                    <button className={"btn btn-outline-info"} onClick={() => navigate("/todo")}>Add Task</button>
                </div>
            }
            <div className={"flex flex-row flex-wrap gap-3 justify-center"}>
                {completed.map((todo) => (
                    <div key={todo._id}>
                        <div className="card border-5 p-3 w-80 h-100">
                            <div className="card-body custom-card flex flex-col justify-content-between">
                                <h4 className="card-title text-ellipsis overflow-hidden whitespace-nowrap">
                                    {todo.title}
                                </h4>
                                <p className="card-text text-ellipsis overflow-hidden whitespace-nowrap">
                                    {todo.description}
                                </p>
                                <p className="card-text">
                                    <small className="text-muted">
                                        Task ID: {todo._id}
                                    </small>
                                </p>
                                <p className="card-text">
                                    <small className={todo.dueDate < new Date() ? "text-red-500" : "text-muted"}>
                                        Due Date: {new Date(todo.dueDate).toDateString()}
                                    </small>
                                </p>
                                <p className="card-text">
                                    <small
                                        className="text-muted">Priority: {todo.priority}
                                    </small>
                                </p>
                                <div className={"flex justify-center gap-2 mt-2"}>
                                    <button className={"btn btn-outline-info"} onClick={
                                        () => onIncomplete(todo._id)
                                    }>Set Incomplete</button>
                                    {/* Broken */}
                                    {/* <button className={"btn btn-outline-danger"} onClick={
                                        () => onDelete(todo.id)
                                    }>Delete</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Completed;