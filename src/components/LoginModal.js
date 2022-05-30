import React, {useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import httpClient from "./HttpsClient"

function LoginModal(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            //Login
            await httpClient.post("https://my-estate-backend.herokuapp.com/login", {
                email,
                password,
            });
            //Check for cookie
            await httpClient.get("https://my-estate-backend.herokuapp.com/@me/", {withCredentials: true})
            window.location.reload();
        }
        catch (e) {
            console.log("Invalid Credentials")
            alert("Invalid credentials")
        }
    };

    return (
        <Modal{...props}>
            <div className="modal-header" id="modal-header">
                <h4 className="modal-title" id="modal-title">Login</h4>
                <button type="button" className="btn " onClick={() => props.onHide()}>✕</button>
            </div>
            <Modal.Body>
                {/*Form to read user login*/}
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
                    <div className=" form-check w-100" align="right">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input"/> Remember Me
                        </label>
                    </div>

                    <button type="button" className="btn btn-primary w-100 my-3 shadow" onClick={handleSubmit}>
                        Login
                    </button>

                    <a className="m-0" href="/#">Not yet registered</a>
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

export default LoginModal;
