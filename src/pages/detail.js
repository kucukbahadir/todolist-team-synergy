import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate, useParams} from "react-router-dom";

const Detail = () => {

    const navigate = useNavigate();
    const {listID, taskID} = useParams();

    const [oldTodo, setOldTodo] = useState({});
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        completed:  false
    });
    const [oldLists, setOldLists] = useState([]);
    const [oldList, setOldList] = useState([]);

    // Load todos from localStorage
    useEffect(() => {
        // This will run when the component is first mounted (or the page is reloaded)
        const jsonLists = localStorage.getItem("tasklistsUser");
        let jsonArray = [];
        let list = [];
        let task;

        if (jsonLists){
            jsonArray = JSON.parse(jsonLists);

            // Find correct list by id
            jsonArray.forEach(_list => {
                if (_list.id == listID) {
                    list = _list;
                }
            });

            // Find correct task by id
            list.tasks.forEach(_task => {
                if (_task.id == taskID) {
                    task = _task;
                }
            });

            setOldTodo(task);
            setNewTask(task);

            setOldList(list);
            setOldLists(jsonArray);
        }
    }, []);

    const onSave = () => {
        //console.log("List", oldList)
        //console.log("Lists", oldLists)
        console.log("Updated task: ", newTask);

        // Attempt 1
        //let newList = oldList.tasks.map(tsk => (tsk.id == newTask.id ? newTask : tsk));
        //let newLists = oldLists.map(lst => (lst.id == newList.id ? newList : lst));

        // Attempt 2
        /* // Step 1: Update the specific Task in the List
        let updatedList = oldList
            .find(lst => lst.id === listID) // Find the specific List
            .tasks.map(task => (task.id === taskID ? newTask : task)); // Update the task if IDs match

        // Create the new List with updated tasks
        let newList = {
            ...oldLists.find(lst => lst.id === listID),
            tasks: updatedList
        };

        // Step 2: Update the Lists array with the modified List
        let newLists = oldLists.map(lst => (lst.id === listID ? newList : lst)); */

        // Attempt 3
        let newTasks = oldList.tasks.map(tsk => (tsk.id == newTask.id ? newTask : tsk));
        const newList = { ...oldList, tasks: newTasks };
        let newLists = oldLists.map(lst => { return lst.id == newList.id ? newList : lst});

        //console.log("New List: ", newList);
        //console.log("New Lists: ", newLists);

        // Doesn't set the oldTodos to newTodos because user gets navigated of the page anyway
        localStorage.setItem("tasklistsUser", JSON.stringify(newLists))

        navigate("/todo");
    };

    const onReset = () => {
        setNewTask(oldTodo);
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
                            value={newTask.title}
                            onChange={(e) => setNewTask({
                                ...newTask,
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
                            value={newTask.description}
                            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                        />
                    </div>

                    <div className={"flex flex-col p-3"}>
                        <label className={"text-sm align-self-start"} htmlFor={"dueDate"}>Due Date</label>
                        <input
                            type="date"
                            className="border-2 border-gray-200"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                        />
                    </div>

                    <div className={"flex flex-col p-3"}>
                        <label className={"text-sm align-self-start"} htmlFor={"priority"}>Priority</label>
                        <select
                            value={newTask.priority}
                            className="border-2 border-gray-200"
                            onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
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
