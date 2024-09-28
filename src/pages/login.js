import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [name, setName] = useState("");
    const nav = useNavigate();

    function handleLogin(event) {
        event.preventDefault();  // Prevent reloading the page
        
        if (name === "Jimmy") {
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
