import React from "react";
import icon from '../icons/icon.svg';
import './NavBar.css';
import {useState, useEffect} from 'react';
import httpClient from "./HttpsClient";
import LoginModal from "./LoginModal.js";
import SignUpModal from "./SignUpModal.js";

function NavBar() {
    const [user, setUser] = useState(null);

    const [modalShow, setModalShow] = React.useState(false);
    const [modalSignUpShow, setModalSignUpShow] = React.useState(false);

    const logoutUser = async () => {
        await httpClient.get("https://my-estate-backend.herokuapp.com/logout/", {withCredentials: true})
        setUser(null);
        window.location.href = "/";
    };

    /*Checks for login*/
    useEffect(() => {
        (async () => {
            try {
                const resp = await httpClient.get("https://my-estate-backend.herokuapp.com/@me");
                setUser(resp.data);
            } catch (error) {
                setUser("");
                console.log("Not authenticated");
            }
        })();
    }, []);

    return (
        <div>
        {user != null &&
            <body>
            <nav className="color-nav navbar navbar-expand-md navbar-dark ">
                <div className="container-fluid">
                    <div className="navbar-collapse collapse w-100 order-md-0 ">
                        <ul className="navbar-nav">
                            {/*HOME*/}
                            <li className="nav-item">
                                <a className="navbar-brand" href="/" style={{'paddingRight': '20px'}}>
                                    <img src={(icon)} alt = "" width="30" height="30" className="icon"/>
                                </a>
                            </li>

                            {/*RECOMMENDED PROPERTIES*/}
                            <li className="nav-item">
                                <a className="nav-link " href="recommendedProperties">Recommended Properties</a>
                            </li>

                            {/*MY LISTINGS*/}
                            {(user && // IF LOGGED IN, REDIRECT
                            <li className="nav-item">
                                <a className="nav-link " href="myhouses">My Listings</a>
                            </li>)
                            || // IF NOT LOGGED IN, OPEN MODAL
                            <li className="nav-item">
                                <a className="nav-link " href="/#" onClick={() => setModalShow(true)}>
                                    My Listings
                                </a>
                                <LoginModal show={modalShow} onHide={() => setModalShow(false)}/>
                            </li>}

                            {/*SAVED HOUSES*/}
                            {(user && // IF LOGGED IN, REDIRECT
                            <li className="nav-item">
                                <a className="nav-link " href="savedListings">Saved Properties</a>
                            </li>)
                            || // IF NOT LOGGED IN, OPEN MODAL
                            <li className="nav-item">

                                <a className="nav-link " href="/#" onClick={() => setModalShow(true)}>
                                    Saved Properties
                                </a>
                                <LoginModal show={modalShow} onHide={() => setModalShow(false)}/>
                            </li>}

                            {/*ABOUT US*/}
                            <li className="nav-item">
                                <a className="nav-link " href="aboutUs">About Us</a>
                            </li>
                        </ul>
                    </div>

                    {/*TITLE*/}
                    <div className="mx-auto order-0">
                        <a className="navbar-brand mx-auto" href="/">
                            MyEstate
                        </a>
                    </div>

                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                        { //IF NOT LOGGED IN:
                            (!user &&
                                <ul className="navbar-nav ms-auto">
                                    <li className="nav-item" style={{'marginRight': '3px'}}>
                                        <a className="nav-link " href="/#" onClick={() => setModalShow(true)}>
                                            Log In
                                        </a>
                                        <LoginModal show={modalShow} onHide={() => setModalShow(false)}/>
                                    </li>
                                    <li className="nav-item px-2">
                                        <a className="nav-link btn btn-outline-warning" href="/#"
                                           onClick={() => setModalSignUpShow(true)}>
                                            Sign Up
                                        </a>
                                        <SignUpModal show={modalSignUpShow}
                                                     onHide={() => setModalSignUpShow(false)}/>
                                    </li>
                                </ul>
                            )
                            || //IF LOGGED IN:
                            (
                                <ul className="navbar-nav ms-auto">
                                    <li className="nav-item">
                                        <a className="nav-link " style={{'paddingLeft': '20px'}} href="myhouses">My
                                            Account</a>
                                    </li>
                                    <li className="nav-item" style={{'marginRight': '3px'}}>
                                        <a className="nav-link " href="/#" onClick={() => logoutUser()}>
                                            Log Out
                                        </a>
                                    </li>
                                </ul>
                            )
                        }
                    </div>
                </div>

            </nav>
            </body>}
        </div>
    );
}

export default NavBar;
