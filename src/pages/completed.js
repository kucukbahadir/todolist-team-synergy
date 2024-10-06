import React, {useEffect, useState} from "react";

// Due to the router being nested in "App-main", it also takes its CSS, found in "App.css"
const Completed = () => {

    const [todos, setTodos] = useState([]);

    const sampleTodos = [
        {
            id: 1,
            title: "Task 1",
            description: "Description 1",
            dueDate: new Date(),
            priority: "High",
            completed: true
        },
        {
            id: 2,
            title: "Task 2",
            description: "Description 2",
            dueDate: new Date(),
            priority: "Low",
            completed: true
        },
        {
            id: 3,
            title: "Task 3",
            description: "Description 3",
            dueDate: new Date(),
            priority: "Medium",
            completed: true
        },
        {
            id: 4,
            title: "Task 4",
            description: "Description 4",
            dueDate: new Date(),
            priority: "High",
            completed: true
        },
        {
            id: 5,
            title: "Task 5",
            description: "Description 5",
            dueDate: new Date(),
            priority: "Low",
            completed: true
        },
        {
            id: 6,
            title: "Task 6",
            description: "Description 6",
            dueDate: new Date(),
            priority: "Medium",
            completed: true
        },
        {
            id: 7,
            title: "Task 7",
            description: "Description 7",
            dueDate: new Date(),
            priority: "High",
            completed: true
        },
        {
            id: 8,
            title: "Task 8",
            description: "Description 8",
            dueDate: new Date(),
            priority: "Low",
            completed: true
        },
        {
            id: 9,
            title: "Task 9",
            description: "Description 9",
            dueDate: new Date(),
            priority: "Medium",
            completed: true
        },
        ];

    useEffect(() => {
        // This will run when the component is first mounted (or the page is reloaded)
        // let jsonString = localStorage.getItem("tasksUser");
        // let jsonArray = []
        //
        // if (jsonString){
        //     jsonArray = JSON.parse(jsonString).filter((todo) => todo.completed === true);
        //     setTodos(jsonArray);
        // }
        setTodos(sampleTodos);
    }, [sampleTodos]);

    return (
        <div>
            <div>
                <h1 className={"drop-shadow-[5px_5px_0_rgba(0,0,0,0.25)] text-white font-bold sm:text-4xl text-2xl self-center p-5"}>
                    Completed Tasks
                </h1>
            </div>
            <div className={"flex flex-row flex-wrap space-x-3 space-y-3 justify-center"}>
                {todos.map((todo) => (
                    <div key={todo.id}>
                        <div className="card border-5">
                            <div className="card-body custom-card">
                                <h4 className="card-title">{todo.title}</h4>
                                <p className="card-text text-ellipsis">{todo.description}</p>
                                <p className="card-text">
                                    <small className="text-muted">Task
                                        ID: {todo.id}</small> {/* Displaying the task ID */}
                                </p>
                                <p className="card-text">
                                    <small className={todo.dueDate < new Date() ? ("text-danger") : ("text-muted")}
                                           style={{color: "red"}}>
                                        Due
                                        Date: {todo.dueDate < new Date() ? ("Overdue") : new Date(todo.dueDate).toDateString()}
                                    </small> {/* Display due date */}
                                </p>
                                <p className="card-text">
                                    <small
                                        className="text-muted">Priority: {todo.priority}</small> {/* Display priority */}
                                </p>
                                <div>
                                    <button className={"btn btn-outline-danger"}>Incomplete</button>
                                    <button className={"btn btn-outline-danger"}>Delete</button>
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