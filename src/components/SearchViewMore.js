import React, {useState} from 'react'
import {Button, Form, ListGroup, ListGroupItem, Modal} from 'react-bootstrap'
import httpClient from "./HttpsClient"
import './SearchViewMore.css'


var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});


function ViewMoreModal(props) {

    return (
        <Modal{...props}>
            <div className="modal-header" id="modal-header">
                <h4 className="modal-title" id="modal-title"><b>{props.res.address}</b></h4>
                <button type="button" className="btn " onClick={() => props.onHide()}>✕</button>
            </div>
            <Modal.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>
                        <div style={{marginTop:"-10px",marginBottom:"2px"}}>
                            <b>{formatter.format(props.res.price)}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <b>{props.res.sqft}</b> Sq Ft &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div style={{marginBottom:"5px"}}>
                            <b>{props.res.beds}</b> Beds &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <b>{props.res.baths}</b> Baths &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <b>{props.res.status}</b>
                        </div>
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
                    <ListGroupItem style={{
                        "display": "flex",
                        "flex-direction": "row",
                        "justifyContent": "space-between"}}>
                        <div>Shopping:</div>
                        <div>{"★".repeat(props.res.shopping)}</div>
                    </ListGroupItem>
                    <ListGroupItem style={{
                        "display": "flex",
                        "flex-direction": "row",
                        "justifyContent": "space-between"}}>
                        <div>Convenience:</div>
                        <div>{"★".repeat(props.res.convenience)}</div>
                    </ListGroupItem>
                    <ListGroupItem style={{
                        "display": "flex",
                        "flex-direction": "row",
                        "justifyContent": "space-between"}}>
                        <div>Hospitals:</div>
                        <div>{"★".repeat(props.res.hospital)}</div>
                    </ListGroupItem>
                    <ListGroupItem style={{
                        "display": "flex",
                        "flex-direction": "row",
                        "justifyContent": "space-between"}}>
                        <div>Healthcare:</div>
                        <div>{"★".repeat(props.res.doctor)}</div>
                    </ListGroupItem>

                </ListGroup>
                <Button variant="link" style={{margin:'4px'}} target="_tab" and rel="noopener noreferrer" href="/ratings">
                    Learn more about our ratings
                </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => props.onHide()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ViewMoreModal;
