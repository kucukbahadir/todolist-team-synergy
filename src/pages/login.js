import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tasksJimmy = [
    {
        taskName: "Task 1",
        taskDescription: "Description for Task 1"
    },
    {
        taskName: "Task 2",
        taskDescription: "Description for Task 2"
    },
    {
        taskName: "Task 3",
        taskDescription: "Description for Task 3"
    }
];

//const tasksJSON = JSON.stringify(tasksJimmy);

function Login() {
    const [name, setName] = useState("");
    const nav = useNavigate();

    function handleLogin(event) {
        event.preventDefault();  // Prevent reloading the page
        
        if (name === "Jimmy") {
            // sets the user's name in the session storage
            // TODO: replace the second name with actual data
            console.log(name);
            sessionStorage.setItem("nameUser", name);
            console.log(tasksJimmy);
            sessionStorage.setItem("tasksUser", tasksJimmy);
            // TODO: when Christian merges add-tasks, change todo to work with dynamic url
            //nav("/todo/${name}");
            nav("/todo");
        } else { 
            alert("Invalid"); 
        }
    }

    return (
        <form method="get" onSubmit={handleLogin}>
            <input 
                type="text" 
                name="name" 
                value={name} 
                placeholder="Name?"
                onChange={(e) => setName(e.target.value)} // Update useState of "name" when input changes
            />
        </form>
    );
}
 
export default Login;
