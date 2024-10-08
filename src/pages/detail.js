import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate, useParams} from "react-router-dom";

const Detail = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    const [oldTodo, setOldTodo] = useState({});
    const [newTodo, setNewTodo] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: ""
    });
    const [oldTodos, setOldTodos] = useState([]);

    // Load todos from localStorage
    useEffect(() => {
        // This will run when the component is first mounted (or the page is reloaded)
        let jsonString = localStorage.getItem("tasksUser");
        let jsonArray = []

        if (jsonString){
            jsonArray = JSON.parse(jsonString);
            setOldTodos(jsonArray);

            // Looks through jsonArray to find todo with specified id
            console.log("id: " + id);
            jsonArray.forEach(e => {
                console.log("e.id: " + e.id)
                if (e.id == id){
                    console.log("HIT")
                    setOldTodo(e);
                    setNewTodo(e);
                }
            });
        }
    }, [id]);

    const onSave = () => {
        let newTodos = oldTodos
        let counter = 0

        oldTodos.forEach(e => {
            if (e.id == id){
                newTodos[counter] = newTodo;
            }
            counter++;
        })

        // Doesn't set the oldTodos to newTodos because user gets navigated of the page anyway
        localStorage.setItem("tasksUser", JSON.stringify(newTodos))

        navigate("/todo");
    };

    const onReset = () => {
        setNewTodo(oldTodo);
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
                            value={newTodo.title}
                            onChange={(e) => setNewTodo({
                                ...newTodo,
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
                            value={newTodo.description}
                            onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                        />
                    </div>

                    <div className={"flex flex-col p-3"}>
                        <label className={"text-sm align-self-start"} htmlFor={"dueDate"}>Due Date</label>
                        <input
                            type="date"
                            className="border-2 border-gray-200"
                            value={newTodo.dueDate}
                            onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
                        />
                    </div>

                    <div className={"flex flex-col p-3"}>
                        <label className={"text-sm align-self-start"} htmlFor={"priority"}>Priority</label>
                        <select
                            value={newTodo.priority}
                            className="border-2 border-gray-200"
                            onChange={(e) => setNewTodo({...newTodo, priority: e.target.value})}
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
