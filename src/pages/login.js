import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultTasks1 = [
    {   id: 1,
        title: "Sample Title 1", 
        description: "Sample Text 1",
        dueDate: new Date(),
        priority: "High" 
    },
    {   id: 2,
        title: "Sample Title 2", 
        description: "Sample Text 2",
        dueDate: new Date(),
        priority: "Medium" 
    },
    {   id: 3,
        title: "Sample Title 3", 
        description: "Sample Text 3 ",
        dueDate: new Date(),
        priority: "Low" 
    },
]

const defaultTasks2 = [
    {   id: 1,
        title: "Sample Title 10", 
        description: "Sample Text 10",
        dueDate: new Date(),
        priority: "High" 
    },
    {   id: 2,
        title: "Sample Title 20", 
        description: "Sample Text 20",
        dueDate: new Date(),
        priority: "Medium" 
    },
    {   id: 3,
        title: "Sample Title 30", 
        description: "Sample Text 30",
        dueDate: new Date(),
        priority: "Low" 
    },
]

const defaultTaskList1 = 
    {
        id: 1,
        nameTaskList : "Task List1",
        tasks: defaultTasks1
    };

const defaultTaskList2 = 
    {
        id: 2,
        nameTaskList : "Task List2",
        tasks: defaultTasks2
    };

const defaultUser = 
    {
        name: "Jimmy",
        tasks: defaultTasks1,
        tasklists: [defaultTaskList1, defaultTaskList2]
    }

function Login() {
    // Temporarly save all signed up users here, the array does get cleared upon reload of page
    const [users, setUsers] = useState([defaultUser]);

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

        localStorage.setItem("nameUser", users[userIndex].name);
        localStorage.setItem("tasksUser", JSON.stringify(users[userIndex].tasks));
        localStorage.setItem("tasklistsUser", JSON.stringify(users[userIndex].tasklists));

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

        //users[name] = {
            //tasks: defaultTasks1,
        //};
        // TODO: Test this
        setUsers(prevUsers => [
            ...prevUsers,
            { name: name, tasks: defaultTasks2 }
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
