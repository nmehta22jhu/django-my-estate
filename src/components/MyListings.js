import React from "react";
import "./MyListings.css";
import { Container, Button, Modal, Col, Row, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import SubmitModal from "./SubmitModal.js"
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Select from 'react-select';
import httpClient from './HttpsClient'

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

class MyListings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            loading: true,
            value: "",
            username: "",
            arr_MyListings: []
        };
    }

    //If component mounts, read user information from backend and place listings into 'arr'
    async componentWillMount() {
        await httpClient.get(`https://my-estate-backend.herokuapp.com/myprops/`)
            .then(response => {
                var i;
                var arr = [];
                for (i = 0; i < response.data.results.length; i++) {
                    arr.push({
                        address: response.data.results[i].address,
                        city: response.data.results[i].city,
                        state_or_province: response.data.results[i].state_or_province,
                        zip_code: response.data.results[i].zip_or_postal,
                        baths: response.data.results[i].baths,
                        beds: response.data.results[i].beds,
                        sqft: response.data.results[i].sqft,
                        price: response.data.results[i].price,
                        status: response.data.results[i].status
                    })
                }
                this.setState({arr_MyListings: arr})
            }
            );
        //check for login
        const resp = await httpClient.get("https://my-estate-backend.herokuapp.com/@me/");
        this.setState({ username: resp.data.email })
    }

    //function to edit property
    async editProperty(address, city, state, zip_code, baths, beds, sqft, price, event) {
        await axios.get(`https://my-estate-backend.herokuapp.com/edit/?address=${address}&city=${city}&state_or_province=${state}&zip_or_postal=${zip_code}&price=${price}&sqft=${sqft}&beds=${beds}&baths=${baths}&status=${event.value}`)
        window.location.reload();
    }

    setShowModal = (setShowModal) => {
        this.setState({ showModal: setShowModal });
    }

    //function to delete property
    async deleteProperty(address) {
        await httpClient.get(`https://my-estate-backend.herokuapp.com/delete/?address=${address}`)
        window.location.reload();
    }

    //mappings of property status to key
    Mapping = {
        "Active": 0,
        "Sold": 1,
        // "Inactive": 2,
    }

    render() {
        //if array is not loaded in yet
        if (this.state.arr_MyListings === null) {
            return (
                <Container style={{ 'width': '100%', 'marginTop': '3%' }}>
                    <h1 style={{ 'textAlign': 'left' }}>My Listings</h1>
                    <div style={{
                        "display": "flex",
                        "flexDirection": "row",
                        "justifyContent": "space-between",
                    }}>

                        <h5 style={{ 'textAlign': 'left', 'color': 'grey' }}>~ Properties</h5>
                        <h5 style={{ 'textAlign': 'left', 'color': 'grey' }}>{this.state.username}</h5>
                    </div>
                    <hr />

                    {this.state.arr_MyListings == null && (<div>
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    </div>)}

                </Container>
            )
        }

        const statusList = [
            { value: 'Active', label: 'Active' },
            { value: 'Sold', label: 'Sold' },
            // { value: 'Inactive', label: 'Inactive' },
        ]

        //Storing list of properties (property cards)
        const listProperties =
            <div className="wrappa">
                {this.state.arr_MyListings.map(d =>
                    <Card style={{ 'margin': '60px 20px -20px 20px', 'textAlign': 'left' }}>
                        <Card.Body>
                            <Card.Title style={{ 'fontWeight': 'bold' }}>{d.address}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"
                                style={{ 'fontSize': '20px' }}>&nbsp;&nbsp;&nbsp;{formatter.format(d.price)}</Card.Subtitle>
                            <ListGroup className="list-group-flush">

                                <ListGroupItem style={{
                                    "display": "flex",
                                    "flexDirection": "row",
                                }}>
                                    <div>Sqft: {d.sqft}</div>
                                </ListGroupItem>

                                <ListGroupItem style={{
                                    "display": "flex",
                                    "flexDirection": "row",
                                }}>
                                    <div>Beds: {d.beds}</div>
                                </ListGroupItem>

                                <ListGroupItem style={{
                                    "display": "flex",
                                    "flexDirection": "row",
                                }}>
                                    <div>Baths: {d.baths}</div>
                                </ListGroupItem>

                                <ListGroupItem style={{
                                    "display": "flex",
                                    "flexDirection": "row",
                                }}>
                                    <div style={{ display: 'inline-block', marginTop: '4px', marginRight: '8px' }}>Status:
                                    </div>
                                    <Select style={{ display: 'inline-block', 'width': '50%' }  }
                                        defaultValue={statusList[this.Mapping[d.status]]} 
                                        options={statusList}
                                        onChange={(e) => this.editProperty(d.address, d.city, d.state, d.zip_code, d.baths, d.beds, d.sqft, d.price, e)} />
                                </ListGroupItem>

                            </ListGroup>
                            <Button style={{ marginLeft: '15px', marginTop: '5px' }} variant="primary" onClick={() => this.deleteProperty(d.address)}>
                                Delete
                            </Button>
                        </Card.Body>

                    </Card>
                )
                }
            </div>


        const validateValues = Yup.object().shape({
            zip_code: Yup.string()
                .matches(/^\d{5}$/, "Invalid Zip Code")
                .required('Required'),
            state_or_province: Yup.string()
                .required('Required'),
            status: Yup.string()
                .required('Required'),
            address: Yup.string()
                .required('Required'),
            city: Yup.string()
                .required('Required'),
            price: Yup
                .number("Invalid Price")
                .positive("Invalid Price")
                .typeError('Must be a number')
                .required('Required'),
            sqft: Yup
                .number("Invalid Value")
                .positive("Invalid Value")
                .typeError('Must be a number')
                .required('Required'),
            beds: Yup
                .number("Invalid Value")
                .positive("Invalid Value")
                .typeError('Required')
                .required('Required'),
            baths: Yup
                .number("Invalid Value")
                .positive("Invalid Value")
                .typeError('Required')
                .required('Required'),
        });

        return (
            <Container style={{ 'width': '100%', 'marginTop': '3%' }}>
                <h1 style={{ 'textAlign': 'left' }}>My Listings</h1>
                <div style={{
                    "display": "flex",
                    "flexDirection": "row",
                    "justifyContent": "space-between",
                }}>
                    <h5 style={{ 'textAlign': 'left', 'color': 'grey' }}>{this.state.arr_MyListings.length} Properties</h5>
                    <h5 style={{ 'textAlign': 'left', 'color': 'grey' }}>{this.state.username}</h5>
                </div>

                <hr />
                <div className="list-properties">
                    <div className="list-properties-content">
                        <Modal show={this.state.showModal} onHide={() => this.setShowModal(false)}>
                            <div className="modal-header" id="modal-header">
                                <h4 className="modal-title" id="modal-title">Add a Property</h4>
                                <button type="button" className="btn " onClick={() => this.setShowModal(false)}>✕
                                </button>
                            </div>
                            <Modal.Body>
                                {/*Create a new property Form*/}
                                <Formik
                                    initialValues={{
                                        address: '',
                                        city: '',
                                        state_or_province: '',
                                        zip_code: '',
                                        price: '',
                                        sqft: '',
                                        beds: '',
                                        baths: '',
                                        status: ''
                                    }}
                                    validationSchema={validateValues}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(async () => {
                                            await httpClient.get(`https://my-estate-backend.herokuapp.com/post/?address=${values.address}&city=${values.city}&state_or_province=${values.state_or_province}&zip_or_postal=${values.zip_code}&price=${values.price}&sqft=${values.sqft}&beds=${values.beds}&baths=${values.baths}&status=${values.status}`);
                                            this.setState({ showModal: false, loading: false })
                                            window.location.reload();
                                            setSubmitting(false);
                                        }, 1000);
                                    }}>

                                    {({ isSubmitting, errors, touched }) => (
                                        <div>
                                            <Form style={{ padding: '20px' }}>
                                                <div style={{ textAlign: 'left' }}>

                                                    {/*ADDRESS*/}
                                                    <Row>
                                                        <Col>
                                                            <label htmlFor="address"
                                                                style={{ marginRight: '10px' }}>Address</label>
                                                            <div>
                                                                <Field name="address" className="form-control"
                                                                    type="address" />
                                                                {touched.address && errors.address &&
                                                                    <errorMsg>{errors.address}</errorMsg>}
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col>
                                                            <label htmlFor="city"
                                                                style={{ marginRight: '10px' }}>City</label>
                                                            <div>
                                                                <Field name="city" className="form-control"
                                                                    type="city" />
                                                                {touched.city && errors.city &&
                                                                    <errorMsg>{errors.city}</errorMsg>}
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col>
                                                            <label htmlFor="state_or_province"
                                                                style={{ marginRight: '10px' }}>State or
                                                                Province</label>
                                                            <div>
                                                            {/* <Field as="select" className="form-control" name="beds">
                                                                <option selected>Select Beds</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4+</option>
                                                            </Field> */}
                                                                <Field name="state_or_province"
                                                                    className="form-control"
                                                                    type="state_or_province" />
                                                                {touched.state_or_province && errors.state_or_province &&
                                                                    <errorMsg>{errors.state_or_province}</errorMsg>}
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    {/*ZIP*/}
                                                    <Row>
                                                        <Col>
                                                            <label htmlFor="zip_code" style={{ marginRight: '10px' }}>Zip
                                                                Code</label>
                                                            <div>
                                                                <Field name="zip_code" className="form-control"
                                                                    type="zip_code" />
                                                                {touched.zip_code && errors.zip_code &&
                                                                    <errorMsg>{errors.zip_code}</errorMsg>}
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    {/*PRICE*/}
                                                    <Row>
                                                        <Col>
                                                            <label htmlFor="price"
                                                                style={{ marginRight: '10px' }}>Price</label>
                                                            <div>
                                                                <Field name="price" className="form-control"
                                                                    type="text" />
                                                                {touched.price && errors.price &&
                                                                    <errorMsg>{errors.price}</errorMsg>}
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    {/*SQUARE FEET*/}
                                                    <Row>
                                                        <Col>
                                                            <label htmlFor="sqft" style={{ marginRight: '10px' }}>Square
                                                                Feet</label>
                                                            <div>
                                                                <Field name="sqft" className="form-control"
                                                                    type="text" />
                                                                {touched.sqft && <errorMsg>{errors.sqft}</errorMsg>}
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col>
                                                            {/*BEDS*/}
                                                            <label htmlFor="beds"
                                                                style={{ marginRight: '10px' }}>Beds</label>
                                                            <Field as="select" className="form-control" name="beds">
                                                                <option selected>Select Beds</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4+</option>
                                                            </Field>
                                                            {touched.beds && errors.beds &&
                                                                <errorMsg>{errors.beds}</errorMsg>}
                                                        </Col>
                                                        <Col>
                                                            {/*BATHS*/}
                                                            <label htmlFor="baths"
                                                                style={{ marginRight: '10px' }}>Baths</label>
                                                            <Field as="select" className="form-control"
                                                                name="baths">
                                                                <option selected>Select Baths</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4+</option>
                                                            </Field>
                                                            {touched.baths && errors.baths &&
                                                                <errorMsg>{errors.baths}</errorMsg>}
                                                        </Col>
                                                        <Col>
                                                            {/*STATUS*/}
                                                            <label htmlFor="status"
                                                                style={{ marginRight: '10px' }}>Status</label>
                                                            <Field as="select" className="form-control"
                                                                name="status">
                                                                <option selected>Select Status</option>
                                                                <option value="Active">Active</option>
                                                                <option value="Sold">Sold</option>
                                                            </Field>
                                                            {touched.status && errors.status &&
                                                                <errorMsg>{errors.status}</errorMsg>}
                                                        </Col>
                                                    </Row>
                                                </div>

                                                <br />
                                                <div className="form-group" style={{ 'textAlign': 'left' }}>
                                                    <button type="submit"
                                                        className="btn btn-primary" disabled={isSubmitting}>
                                                        {isSubmitting ? "Creating..." : "Create"}</button>
                                                    {this.state.modal_open && <SubmitModal>...</SubmitModal>}
                                                </div>
                                            </Form>
                                        </div>
                                    )}
                                </Formik>
                            </Modal.Body>
                        </Modal>
                    </div>

                    <div className="add-properties">

                        <Button style={{ 'marginLeft': '50px', 'marginTop': '-50px' }}
                            variant="primary"
                            onClick={() =>
                                this.setShowModal(true)
                            }>
                        </Button>
                    </div>
                </div>

                <div>
                    <div className="list-properties-content" style={{ 'textAlign:': 'left' }}>
                        {listProperties}
                    </div>
                </div>

                <div>
                    {this.state.arr_MyListings.length === 0 && (
                        <div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></div>)}
                </div>
            </Container >
        );
    }
}
export default MyListings;
