import React from "react";
import icon from '../icons/icon.svg';
import './NavBar.css';
import ViewMoreModal from './SearchViewMore'
import {useState, useEffect} from 'react';
import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";
import LoginModal from "./LoginModal";
import SaveModal from "./SearchSave";
import httpClient from "./HttpsClient";
const BASE_URL = `https://my-estate-backend.herokuapp.com`


var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});
//function to delete property
async function deleteProperty(address) {
    await httpClient.get(`${BASE_URL}/unsaved/?address=${address}`)
    window.location.reload();
}

function SearchCardSave(props) {



    const [user, setUser] = useState(null);

    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow2, setModalShow2] = React.useState(false);


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
        <Card style={{'margin': '60px 20px -20px 20px', 'text-align': 'left'}}>
            {/*images from zillow*/}
            <Card.Img variant="top"
                      src={process.env.PUBLIC_URL + `/images/image_${Math.trunc(props.i + props.res.beds + props.res.baths + 1) % 38}.png`}
                      style={{'height': '320px', 'objectFit': 'cover'}}/>

            <Card.Body>
                <Card.Title style={{'fontWeight': 'bold'}}>{props.res.address}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"
                               style={{ 'font-size': '20px' }}>&nbsp;&nbsp;&nbsp;{formatter.format(props.res.price)}&nbsp;&nbsp;&nbsp;&nbsp; MyValue: {formatter.format(props.res.value)}</Card.Subtitle>

                <ListGroup className="list-group-flush">
                    <ListGroupItem><b>{props.res.sqft}</b> Sq Ft &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <b>{props.res.beds}</b> Beds &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <b>{props.res.baths}</b> Baths &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <b>{props.res.status}</b>
                    </ListGroupItem>
                    <ListGroupItem style={{
                        "display": "flex",
                        "flexDirection": "row",
                        "justify-content": "space-between"}}>
                        <div>Parks:</div>
                        <div>{"★".repeat(props.res.park)}</div>
                    </ListGroupItem>
                    <ListGroupItem style={{
                        "display": "flex",
                        "flexDirection": "row",
                        "justify-content": "space-between"}}>
                        <div>Coffee Shops:</div>
                        <div>{"★".repeat(props.res.starbucks)}</div>
                    </ListGroupItem>
                    <ListGroupItem style={{
                        "display": "flex",
                        "flex-direction": "row",
                        "justifyContent": "space-between"}}>
                        <div>Supermarkets:</div>
                        <div>{"★".repeat(props.res.supermarket)}</div>
                    </ListGroupItem>
                    <ListGroupItem style={{
                        "display": "flex",
                        "flex-direction": "row",
                        "justifyContent": "space-between"}}>
                        <div>Socioeconomic Value:</div>
                        <div>{"★".repeat(props.res.socioecon)}</div>
                    </ListGroupItem>

                </ListGroup>
                <Card.Body>
                    <div style={{
                        "display": "flex",
                        "flex-direction": "row",
                        "justifyContent": "space-between"}}>
                        <div>
                            <Button variant="link" onClick={() => setModalShow(true)}>
                                View More
                            </Button>
                            <ViewMoreModal show={modalShow} res = {props.res} onHide={() => setModalShow(false)}/>
                        </div>
                        <div>
                            {user &&
                            <div>
                                <Button variant="primary" onClick={() => {
                                    deleteProperty(props.res.address)
                                }}> Unsave Posting</Button>
                            </div>
                            }
                            <SaveModal show={modalShow2} res = {props.res} onHide={() => setModalShow2(false)}/>
                            {console.log(props.res)}
                        </div>
                    </div>
                </Card.Body>
            </Card.Body>
        </Card>
    );
}

export default SearchCardSave;
