import React, {useEffect, useState} from "react";

const Completed = () => {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        let jsonString = localStorage.getItem("tasksUser");
        let jsonArray = [];

        if (jsonString) {
            // Filter out the completed tasks
            jsonArray = JSON.parse(jsonString).filter((todo) => todo.completed === true);
            setTodos(jsonArray);
        }
    }, [todos]);

    const onIncomplete = (id) => {
        let jsonString = localStorage.getItem("tasksUser");
        let jsonArray = []

        if (jsonString){
            jsonArray = JSON.parse(jsonString).map((todo) => {
                if (todo.id === id){
                    todo.completed = false;
                }
                return todo;
            });
            localStorage.setItem("tasksUser", JSON.stringify(jsonArray));
            setTodos(jsonArray);
        }
    }

    const onDelete = (id) => {
        let jsonString = localStorage.getItem("tasksUser");
        let jsonArray = []

        if (jsonString){
            jsonArray = JSON.parse(jsonString).filter((todo) => todo.id !== id);
            localStorage.setItem("tasksUser", JSON.stringify(jsonArray));
            setTodos(jsonArray);
        }
    }

    return (
        <div className={"h-lvh"}>
            <div>
                <h1 className={"drop-shadow-[5px_5px_0_rgba(0,0,0,0.25)] text-white font-bold text-4xl self-center p-5"}>
                    Completed Tasks
                </h1>
            </div>
            <div className={"flex flex-row flex-wrap gap-3 justify-center"}>
                {todos.map((todo) => (
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
                                    <button className={"btn btn-outline-danger"} onClick={
                                        () => onDelete(todo.id)
                                    }>Delete</button>
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