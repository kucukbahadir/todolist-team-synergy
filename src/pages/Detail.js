import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";

const Detail = () => {

    const navigate = useNavigate();

    const [todo, setTodo] = useState({
        id: 0,
        title: "",
        description: "",
        dueDate: "",
        priority: ""
    });

    // Temporary solution to access the to-do item on this page
    useEffect(() => {
        const storedTodo = localStorage.getItem("todo");
        if (storedTodo) {
            // Parse the stored to-do item and set it as the current to-do item
            setTodo(JSON.parse(storedTodo));
        }
    }, []);

    const onSave = () => {
        localStorage.setItem("todo", JSON.stringify(todo));

        navigate("/todo");
    };

    const onReset = () => {
        setTodo(JSON.parse(localStorage.getItem("todo")))
    };

    const onCancel = () => {
        navigate("/todo");
    };

    return (
        <div className="flex">
            <div className="card border-5">
                <div className="flex flex-col card-body custom-card">
                    <label className={"font-bold text-2xl"}>Edit Task</label>

                    <div className={"flex flex-col p-3"}>
                        <label className={"text-sm align-self-start"} htmlFor={"title"}>Title</label>
                        <input
                            id={"title"}
                            type="text"
                            className="card-title border-2 border-gray-200"
                            placeholder="Title"
                            value={todo.title}
                            onChange={(e) => setTodo({
                                ...todo,
                                title: e.target.value
                            })}
                        />
                    </div>


                    <div className={"flex flex-col p-3"}>
                        <label className={"text-sm align-self-start"} htmlFor={"description"}>Description</label>
                        <input
                            type="text"
                            className="card-text border-2 border-gray-200"
                            placeholder="Description"
                            value={todo.description}
                            onChange={(e) => setTodo({...todo, description: e.target.value})}
                        />
                    </div>

                    <div className={"flex flex-col p-3"}>
                        <label className={"text-sm align-self-start"} htmlFor={"dueDate"}>Due Date</label>
                        <input
                            type="date"
                            className="border-2 border-gray-200"
                            value={todo.dueDate}
                            onChange={(e) => setTodo({...todo, dueDate: e.target.value})}
                        />
                    </div>

                    <div className={"flex flex-col p-3"}>
                        <label className={"text-sm align-self-start"} htmlFor={"priority"}>Priority</label>
                        <select
                            value={todo.priority}
                            className="border-2 border-gray-200"
                            onChange={(e) => setTodo({...todo, priority: e.target.value})}
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div className={"flex flex-row justify-around pt-3"}>
                        <button className="btn btn-outline-secondary" onClick={
                            () => onCancel()
                        }>
                            Cancel
                        </button>
                        <button className="btn btn-outline-danger" onClick={
                            () => onReset()
                        }>
                            Reset Changes
                        </button>
                        <button className="btn btn-outline-success" onClick={
                            () => onSave()
                        }>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
