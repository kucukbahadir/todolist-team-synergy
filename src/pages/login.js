import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tasksJimmy = [
    {   id: 1,
        title: "To do 1", 
        description: "Text",
        dueDate: new Date(),
        priority: "Low" 
    },
];

function Login() {
    const [name, setName] = useState("");
    const nav = useNavigate();

    function handleLogin(event) {
        event.preventDefault();  // Prevent reloading the page
        
        if (name === "Jimmy") {
            // sets the user's name in the session storage
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
