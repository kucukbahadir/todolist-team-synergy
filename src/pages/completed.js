import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Completed = () => {
    //const [lists, setLists] = useState([]);
    //const [todos, setTodos] = useState([]);
    const [completed, setCompleted] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const jsonLists = localStorage.getItem("tasklistsUser");

        if (jsonLists) {
            const arrayLists = JSON.parse(jsonLists);
            //console.log("Parsed", arrayLists)

            let filterArray = [];

            arrayLists.forEach(list => {
                list.tasks.forEach(task => {
                    if (task.completed) {
                        filterArray.push(task)
                    }
                });
            });
            
            setCompleted(filterArray);
        }
    }, []);

    // Broken
    const onIncomplete = (id) => {
       const jsonLists = localStorage.getItem("tasklistsUser");

        if (jsonLists) {
            let arrayLists = JSON.parse(jsonLists);

            let listsCounter = 0;
            let tasksCounter = 0;

            let listsFinal = null;
            let tasksFinal = null;

            // This system does not account for duplicate Task id's
            arrayLists.forEach(list => {
                //console.log("List", listsCounter, list)
                list.tasks.forEach(task => {
                    //console.log("Task", tasksCounter, task)
                    if (task.id == id){
                        if (task.completed) {
                            //task.completed = false;
                            listsFinal = listsCounter;
                            tasksFinal = tasksCounter;
                    }}
                    tasksCounter++
                });
                tasksCounter = 0;
                listsCounter++;
            });

            //console.log("List", listsFinal);
            //console.log("Task", tasksFinal);

            // Doesn't work smoothly but it works
            arrayLists[listsFinal].tasks[tasksFinal].completed = false;
            localStorage.setItem("tasklistsUser", JSON.stringify(arrayLists))
            
            //setCompleted(filterArray);
        }
    }

    // Broken
    const onDelete = (id) => {
        let jsonString = localStorage.getItem("tasksUser");
        let jsonArray = []

        if (jsonString){
            jsonArray = JSON.parse(jsonString).filter((todo) => todo.id !== id);
            localStorage.setItem("tasksUser", JSON.stringify(jsonArray));
            //setTodos(jsonArray);
        }
    }

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
                    <div key={todo.id}>
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
                                        Task ID: {todo.id}
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
                                        () => onIncomplete(todo.id)
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