import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Detail = () => {

    const [todo, setTodo] = useState({
        id: 0,
        title: "",
        description: "",
        dueDate: "",
        priority: ""
    });

    useEffect(() => {
        const storedTodo = localStorage.getItem("todo");
        if (storedTodo) {
            // Parse de string terug naar een object en update de state
            setTodo(JSON.parse(storedTodo));
        }
    }, []);

    return (
        <div className="flex">
            <div className="card border-5">
                <div className="flex flex-col card-body custom-card">
                    {/* Toon de titel in het invoerveld */}
                    <label className={"font-bold text-2xl"}>Edit Task</label>

                    <div className={"flex flex-col p-3"}>
                        <label className={"text-sm align-self-start"} htmlFor={"title"}>Title</label>
                        <input
                            id={"title"}
                            type="text"
                            className="card-title border-2 border-gray-200"
                            placeholder="Title" // Voeg placeholder toe
                            value={todo.title} // Koppel de waarde aan de state
                            onChange={(e) => setTodo({
                                ...todo,
                                title: e.target.value
                            })} // Maak het invoerveld bewerkbaar
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
                        <button className="btn btn-outline-secondary">
                            Cancel
                        </button>
                        <button className="btn btn-outline-danger">
                            Reset Changes
                        </button>
                        <button className="btn btn-outline-success">
                            Complete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
