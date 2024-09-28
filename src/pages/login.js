import React from "react";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

//import Todo from "./todo"

function Login() {
    const [name, setName] = useState("");
    //const [auth, setAuth] = useState(false);
    const nav = useNavigate();

    function handleLogin(event) {
        event.preventDefault();  // Prevent the default form submission behavior
        
        if (name === "Jimmy") {
            //setAuth(true);
            nav("/todo");
        } else { alert("Invalid"); }
    }

    /* if (auth) {
        return (
            <Todo />
        );
    }*/

    return (
        <form method="get" onSubmit={handleLogin}>
            <input 
                type="text" 
                name="name" 
                value={name} 
                //placeholder={phName} 
                onChange={(e) => setName(e.target.value)} // Update state when input changes
            />
            <button type="submit">Login</button>
        </form>
    );
}
 
export default Login;
