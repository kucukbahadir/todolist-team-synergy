import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionService } from "../services/SessionService";
import { Modal, Button, Form } from "react-bootstrap";

const defaultTasks1 = [
    {   id: 1,
        title: "Sample Title 1", 
        description: "Sample Text 1",
        dueDate: new Date(),
        priority: "High",
        completed: false
    },
    {   id: 2,
        title: "Sample Title 2", 
        description: "Sample Text 2",
        dueDate: new Date(),
        priority: "Medium" ,
        completed: false
    },
    {   id: 3,
        title: "Sample Title 3", 
        description: "Sample Text 3 ",
        dueDate: new Date(),
        priority: "Low" ,
        completed: false
    },
]

const defaultTasks2 = [
    {   id: 1,
        title: "Sample Title 10", 
        description: "Sample Text 10",
        dueDate: new Date(),
        priority: "High" ,
        completed: false
    },
    {   id: 2,
        title: "Sample Title 20", 
        description: "Sample Text 20",
        dueDate: new Date(),
        priority: "Medium" ,
        completed: false
    },
    {   id: 3,
        title: "Sample Title 30", 
        description: "Sample Text 30",
        dueDate: new Date(),
        priority: "Low" ,
        completed: false
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
        //tasks: defaultTasks1,
        tasklists: [defaultTaskList1, defaultTaskList2]
    }

function Login() {
    // Temporarly save all signed up users here, the array does get cleared upon reload of page
    const [users, setUsers] = useState([defaultUser]);

    const [email, setEmail] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const nav = useNavigate();
    const closeModal = () => setShowModal(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [resendMessage, setResendMessage] = useState("");

    //localStorage.setItem("nameUser", users[userIndex].name);
    //localStorage.setItem("tasksUser", JSON.stringify(users[userIndex].tasks));
    //localStorage.setItem("tasklistsUser", JSON.stringify(users[userIndex].tasklists));

    async function handleLogin(event) {

        event.preventDefault();

        let res = await SessionService.requestCode(email);

        if (res.status === 200) {
            setShowModal(true);
        } else {
            alert("User not found");
        }
    }

    async function handleVerificationSubmit() {
        let user = await SessionService.verifyCode(email, verificationCode);

        if (user) {
            alert("Login successful!");
            closeModal();

            try {
                // Fetch task lists for the loggin in user
                const taskLists = await SessionService.getUserLists();
                nav("/todo", {state: { taskLists }}); 
            } catch (error) {
                console.error("Error fetching task lists: ", error); //Pass tasklist to todo page
                alert("Failed to load task lists.");
            }
        } else {
            alert("Invalid verification code. Please try again");
        }
    }

    async function handleResendCode() {
        let res = await SessionService.requestCode(email);

        if (res.status === 200) {
            setResendMessage("A new verification code has been sent!");
        } else {
            setResendMessage("Failed to resend code. Please try again.");
        }
    }

    async function handleSignUp(event) {
        event.preventDefault();

        let res = await SessionService.registerUser(email);

        if (res.status === 200) {
            setShowModal(true);
        } else if (res.status === 409) {
            alert("User already exists! Please login.");
        } else {
            alert("Failed to sign up. Please try again.");
        }
    }

    return (
        <div>
            <form method="get" onSubmit={isSignUp ? handleSignUp : handleLogin}>
                <input
                    className="form-control"
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)} // Update useState of "name" when input changes
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

            {/* Modal for verification */}
            <Modal show={showModal} onHide={closeModal} centered backdrop={"static"}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Verification Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="verificationCode">
                        <Form.Label>A verification code has been sent to your email.</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                    </Form.Group>
                    {/* Display resend message if any */}
                    {resendMessage && <p className="text-success mt-2">{resendMessage}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleVerificationSubmit}>
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>

                    <div className="ml-auto">
                        <Button variant="link" onClick={handleResendCode}>
                            Resend Code
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Login;
