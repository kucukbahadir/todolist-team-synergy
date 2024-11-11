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

    const [email, setEmail] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const nav = useNavigate();
    const closeModal = () => setShowModal(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [resendMessage, setResendMessage] = useState("");

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
            nav("/todo");
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
                                {" "}Sign up here
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
