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

const defaultTasks = [
    {   id: 1,
        title: "Sample Title", 
        description: "Sample Text",
        dueDate: new Date(),
        priority: "Low" 
    },
]

function Login() {
    const [name, setName] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const nav = useNavigate();

    function handleLogin(event) {
        event.preventDefault();  // Prevent reloading the page
        let users = JSON.parse(localStorage.getItem("users")) || {};
        
        if (name === "Jimmy") {
            // sets the user's name in the session storage
            console.log(name);
            sessionStorage.setItem("nameUser", name);

            console.log(tasksJimmy);
            localStorage.setItem("tasksUser", JSON.stringify(tasksJimmy));
            // TODO: when Christian merges add-tasks, change todo to work with dynamic url
            //nav("/todo/${name}");
            nav("/todo");
        } else { 
            alert("Invalid"); 
        }

        if (isSignUp) {
            if (!name) {
                alert("Please enter a valid name");
                return;
            }

            if (users[name]) {
                alert("User already exists! Please login.")
            }

            users[name] = {
                tasks: defaultTasks,
            };
            localStorage.setItem("users", JSON.stringify(users));
            alert("User created! You can now login.");
        } else {
            if (!users[name])
                alert("User not found. Please sign up.")
            return;
        }

        sessionStorage.setItem("nameUser", name);
        localStorage.setItem("tasksUser", JSON.stringify(users[name].tasks));

        nav("/todo");
    }

    return (
        <div>
            <form method="get" onSubmit={handleLogin}>
                <input 
                    className="form-control"
                    type="text" 
                    name="name" 
                    value={name} 
                    placeholder="Name?"
                    onChange={(e) => setName(e.target.value)} // Update useState of "name" when input changes
                />

                <button type="sumbit" className="btn btn-primary">
                    {/* Button that will switch Sign Up and Login */}
                </button>
            </form>
        </div>
    );
}
 
export default Login;
