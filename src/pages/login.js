import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const tasksJimmy = [
    {   id: 2,
        title: "To do 2", 
        description: "Text", 
        dueDate: new Date(), 
        priority: "Low" 
    }
];

//const tasksJSON = JSON.stringify(tasksJimmy);
var rendercount = 0;

function Login() {
    const [name, setName] = useState("");
    const [taskCreated, setDate] = useState("");
    const nav = useNavigate();

    console.log(tasksJimmy[0]);
    useEffect(() => {
        // Ensure tasksJimmy is defined and has the expected structure
        if (tasksJimmy && tasksJimmy.length > 0) {
            setDate((tasksJimmy[0].dueDate).toDateString());  // Only set this on initial mount or when tasksJimmy changes
        }
    }, [tasksJimmy]);  // This effect runs when tasksJimmy changes or on component mount

    

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
        <div>
        <form method="get" onSubmit={handleLogin}>
            <input 
                type="text" 
                name="name" 
                value={name} 
                placeholder="Name?"
                onChange={(e) => setName(e.target.value)} // Update useState of "name" when input changes
            />
        </form>
        <p>Temp: {taskCreated}</p>
        </div>
    );
}
 
export default Login;
