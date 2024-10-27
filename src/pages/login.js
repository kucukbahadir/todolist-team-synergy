import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionService } from "../services/SessionService";
import { Modal, Button, Form } from "react-bootstrap";

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
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const nav = useNavigate();
    const closeModal = () => setShowModal(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [resendMessage, setResendMessage] = useState("");

    async function handleLogin(event) {

        event.preventDefault();

        let res = await SessionService.requestCode(name);

        if (res.status === 200) {
            setShowModal(true);
        } else {
            alert("User not found");
        }
    }

    async function handleVerificationSubmit() {
        let user = await SessionService.verifyCode(name, verificationCode);

        if (user) {
            alert("Login successful!");
            nav("/todo");
        } else {
            alert("Invalid verification code. Please try again");
        }

        closeModal();
    }

    async function handleResendCode() {
        let res = await SessionService.requestCode(name);

        if (res.status === 200) {
            setResendMessage("A new verification code has been sent!");
        } else {
            setResendMessage("Failed to resend code. Please try again.");
        }
    }

    function handleSignUp(event){
        event.preventDefault();

        

        // event.preventDefault();
        //
        // if (!name) {
        //     alert("Please enter a valid name");
        //     return;
        // }
        //
        // if (users.includes(name)) {
        //     alert("User already exists! Please login.");
        //     return;
        // }
        //
        // users[name] = {
        //     tasks: defaultTasks,
        // };
        // // TODO: Test this
        // setUsers(prevUsers => [
        //     ...prevUsers,
        //     { name: name, tasks: defaultTasks }
        // ]);
        //
        // //localStorage.setItem("users", JSON.stringify(users));
        // alert("User created! You can now login.");
        // setIsSignUp(false);
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
