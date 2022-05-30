import React, {useState} from 'react'
import { Button,Modal, Form } from 'react-bootstrap'
import httpClient from "./HttpsClient"

function SignUpModal(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Handles signup -> does signup + login
    const handleSubmit = async () => {
        try {
            await httpClient.post("https://my-estate-backend.herokuapp.com/register", {
                email,
                password,
            });

            await httpClient.post("https://my-estate-backend.herokuapp.com/login", {
                email,
                password,
            });
            window.location.reload();
        }
        catch (e) {
            console.log("Invalid")
            alert("Username Already Exists") //no
        }
    };

    return (
        <Modal{...props}>
            <div className="modal-header" id="modal-header">
                <h4 className="modal-title" id="modal-title">Sign Up</h4>
                <button type="button" className="btn " onClick={() => props.onHide()}>✕</button>
            </div>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                                      onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <button type="button" className="btn btn-primary w-100 my-3 shadow" onClick={handleSubmit}>
                        Sign Up
                    </button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.onHide()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SignUpModal;
