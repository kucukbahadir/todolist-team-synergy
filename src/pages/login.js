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
            localStorage.setItem("tasksUser", JSON.stringify(tasksJimmy));
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
