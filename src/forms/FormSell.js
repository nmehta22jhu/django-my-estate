import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Row, Col} from 'react-bootstrap';
import "./Form.css"
import SubmitModal from "../components/SubmitModal.js"
import * as Yup from 'yup';
import httpClient from "../components/HttpsClient";

//Formik+Yup Validation
const validateValues = Yup.object().shape({
    address: Yup.string()
        .required('Required'),
    zip_code: Yup.string()
        .matches(/^\d{5}$/, "Invalid Zip Code")
        .required('Required'),
    city: Yup.string()
        .required('Required'),
    state: Yup.string()
        .required('Required'),
    price: Yup
        .number("Invalid Price")
        .positive("Invalid Price")
        .typeError("Invalid Value")
        .required('Required'),
    sqft: Yup
        .number("Invalid Value")
        .positive("Invalid Value")
        .typeError("Invalid Value")
        .required('Required'),
    beds: Yup
        .number("Invalid Value")
        .positive("Invalid Value")
        .typeError("Required")
        .required('Required'),
    baths: Yup
        .number("Invalid Value")
        .positive("Invalid Value")
        .typeError("Required")
        .required('Required'),
});

class FormSell extends React.Component {
    constructor() {
        super();
        this.state = {
            modal_open : false
        };
    }


    handle_modal= () =>{
        this.setState({ modal_open: true });
    }

    render() {
        return (
            <Formik
                initialValues={{address:'', zip_code: '', price: '', sqft: '', beds: '', baths: ''}}
                validationSchema={validateValues}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(async () => {
                        httpClient.get(`https://my-estate-backend.herokuapp.com/post/?address=${values.address}&city=${values.city}&state_or_province=${values.state_or_province}&zip_or_postal=${values.zip_code}&price=${values.price}&sqft=${values.sqft}&beds=${values.beds}&baths=${values.baths}&status=open`);
                        setSubmitting(false);
                    }, 1000);
                }}>

                {({ isSubmitting , errors, touched}) => (
                    <Form style={{width:'50%',padding:'40px',paddingLeft:'80px'}} >
                        <div  style={{textAlign:'left'}}>

                            {/*ADDRESS*/}
                            <Row>
                                <Col>
                            <label htmlFor="address" style={{marginRight: '10px'}}>Address</label>
                            <div>
                                <Field name="address" className="form-control" type="zip_code" />
                                {touched.address && errors.address && <errorMsg>{errors.address}</errorMsg>}
                            </div>
                            </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <label htmlFor="city" style={{marginRight: '10px'}}>City</label>
                                    <div>
                                        <Field name="city" className="form-control" type="city" />
                                        {touched.city && errors.city && <errorMsg>{errors.city}</errorMsg>}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor="state" style={{marginRight: '10px'}}>State or Province</label>
                                    <div>
                                        <Field name="state" className="form-control" type="state" />
                                        {touched.state && errors.state && <errorMsg>{errors.state}</errorMsg>}
                                    </div>
                                </Col>
                            </Row>

                            {/*ZIP*/}
                            <Row>
                                <Col>
                            <label htmlFor="zip_code" style={{marginRight: '10px'}}>Zip Code</label>
                            <div>
                                <Field name="zip_code" className="form-control" type="zip_code" />
                                {touched.zip_code && errors.zip_code && <errorMsg>{errors.zip_code}</errorMsg>}
                            </div>
                            </Col>
                            </Row>


                            {/*PRICE*/}
                            <Row>
                                <Col>
                                    <label htmlFor="price" style={{marginRight: '10px'}}>Price</label>
                                    <div>
                                        <Field name="price" className="form-control" type="text" />
                                        {touched.price && errors.price && <errorMsg>{errors.price}</errorMsg>}
                                    </div>
                                </Col>
                            </Row>

                            {/*SQUARE FEET*/}
                            <Row>
                                <Col>
                                    <label htmlFor="sqft" style={{marginRight: '10px'}}>Square Feet</label>
                                    <div>
                                        <Field name="sqft" className="form-control" type="text" />
                                        {touched.sqft && errors.sqft && <errorMsg>{errors.sqft}</errorMsg>}
                                    </div>
                                </Col>
                            </Row>


                            <Row>
                                <Col>
                                    {/*BEDS*/}
                                    <label htmlFor="beds" style={{marginRight: '10px'}}>Beds</label>
                                    <Field as="select" className="form-control" name="beds">
                                        <option selected>Select Beds</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4+</option>
                                    </Field>
                                    {touched.beds && errors.beds && <errorMsg>{errors.beds}</errorMsg>}
                                </Col>
                                <Col>
                                    {/*BATHS*/}
                                    <label htmlFor="baths" style={{marginRight: '10px'}}>Baths</label>
                                    <Field as="select" className="form-control" name="baths">
                                        <option selected>Select Baths</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4+</option>
                                    </Field>
                                    {touched.baths && errors.baths && <errorMsg>{errors.baths}</errorMsg>}

                                </Col>
                            </Row>


                        </div>

                        <br/>
                        <div className="form-group" style = {{'text-align':'left'}}>
                            <button type="submit" onClick={this.handle_modal} className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create"}</button>
                            {this.state.modal_open && <SubmitModal>...</SubmitModal>}
                        </div>

                        <div><br/><br/><br/><br/></div>
                    </Form>
                )}
            </Formik>);
    }
}
export default FormSell;
