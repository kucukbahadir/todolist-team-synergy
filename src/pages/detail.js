import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate, useParams} from "react-router-dom";
import { taskService } from "../services/taskService";
import { SessionService } from "../services/SessionService";

const Detail = () => {

    const navigate = useNavigate();
    const {listID, taskID} = useParams();

    const [oldTask, setOldTask] = useState({});
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        completed:  false,
        updatedAt: new Date(),
        assignedToUser: ""
    });
    const [newUser, setNewUser] = useState();
    //const [oldLists, setOldLists] = useState([]);
    //const [oldList, setOldList] = useState([]);

    // Load todos from localStorage
    useEffect(() => {
        async function getTask(taskID) {
            let task = await taskService.getTaskById(taskID);
            //console.log("Task", task);

            setNewTask(task);
            setOldTask(task);

            setNewUser(JSON.parse(localStorage.getItem("user")).email)
        }

        getTask(taskID)
    }, []);

    async function onSave(mail) {
        console.log("Updated task: ", newTask);

        // Verify new user
        let u = await SessionService.getUserbyMail(mail);
        console.log("u", u)

        if (u) {
            //setNewTask({...newTask, assignedToUser: u._id})
            let temp = newTask;
            temp.assignedToUser = u._id;
            console.log("Updated temp: ", temp);

            taskService.updateTask(temp._id, temp);
        }

        //taskService.updateTask(newTask._id, newTask);

        // Attempt 3
        //let newTasks = oldList.tasks.map(tsk => (tsk.id == newTask.id ? newTask : tsk));
        //const newList = { ...oldList, tasks: newTasks };
        //let newLists = oldLists.map(lst => { return lst.id == newList.id ? newList : lst});

        // Doesn't set the oldTodos to newTodos because user gets navigated of the page anyway
        //localStorage.setItem("tasklistsUser", JSON.stringify(newLists))

        navigate("/todo");
    };

    const onReset = () => {
        setNewTask(oldTask);
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

                    <div className={"flex flex-col p-3"}>
                        <label className={"text-sm align-self-start"} htmlFor={"assigned"}>Assigned</label>
                        <input
                            type="text"
                            className="card-text border-2 border-gray-200"
                            placeholder="user"
                            //value={JSON.parse(localStorage.getItem("user")).email}
                            //value={setNewUser(JSON.parse(localStorage.getItem("user")).email)}
                            value={newUser}
                            onChange={(e) => setNewUser(e.target.value)}
                            //value={newTask.assignedToUser}
                            //onChange={(e) => setNewTask({...newTask, assignedToUser: e.target.value})}
                        />
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
                            () => onSave(newUser)
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
