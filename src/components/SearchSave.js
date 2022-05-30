import React, {useState} from 'react'
import {Button, Form, ListGroup, ListGroupItem, Modal} from 'react-bootstrap'
import httpClient from "./HttpsClient"
import './SearchViewMore.css'

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});


function SaveModal(props) {

    return (
        <Modal{...props}>
            <div className="modal-header" id="modal-header">
                <h4 className="modal-title" id="modal-title"><b>Successfully Saved! </b></h4>
                <button type="button" className="btn " onClick={() => props.onHide()}>✕</button>
            </div>
            <Modal.Body>
                    <p className=" m-0">Please review the change under the Saved Listings tab. </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => props.onHide()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SaveModal;
