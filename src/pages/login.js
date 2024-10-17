import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultTasks = [
    {   id: 1,
        title: "Sample Title", 
        description: "Sample Text",
        dueDate: new Date(),
        priority: "Low" 
    },
]

function Login() {
    // Temporarly save all signed up users here, the array does get cleared upon reload of page
    const [users, setUsers] = useState([]);

    const [name, setName] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const nav = useNavigate();

    function handleLogin(event) {
        event.preventDefault();  // Prevent reloading the page

        // Empty string check
        if (!name) {
            alert("Please enter a valid name");
            return;
        }
            
        // Get index of the user
        const userIndex = users.findIndex((element) => {return element.name == name})
        if (userIndex < 0) {
            alert("User not found. Please sign up.");
        return;
        }

        localStorage.setItem("nameUser", name);
        localStorage.setItem("tasksUser", JSON.stringify(users[userIndex].tasks));

        nav("/todo");
    }

    function handleSignUp(event){
        event.preventDefault();

        if (!name) {
            alert("Please enter a valid name");
            return;
        }

        if (users.includes(name)) {
            alert("User already exists! Please login.");
            return;
        }

        users[name] = {
            tasks: defaultTasks,
        };
        // TODO: Test this
        setUsers(prevUsers => [
            ...prevUsers,
            { name: name, tasks: defaultTasks }
        ]);

        //localStorage.setItem("users", JSON.stringify(users));
        alert("User created! You can now login.");
        setIsSignUp(false);
    }

    return (
        <div>
            <form method="get" onSubmit={isSignUp ? handleSignUp : handleLogin}>
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
                    {isSignUp ? "Sign Up" : "Login"}
                </button>

                <div>
                    {isSignUp ? (
                        <p>
                            Already have an account?
                            <span
                                className="text-primary"
                                style={{ cursor: "pointer"}}
                                onClick={() => setIsSignUp(false)}
                            >
                                {" "}Log in here
                            </span>
                        </p>
                    ) : (
                        <p>
                            Don't have an account?
                            <span
                                className="text-primary"
                                style={{ cursor: "pointer"}}
                                onClick={() => setIsSignUp(true)}
                            >
                                {" "}Sign in here
                            </span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}
 
export default Login;
