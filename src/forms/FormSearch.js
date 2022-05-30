import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Row, Col } from 'react-bootstrap';
import "./Form.css"
import * as Yup from 'yup';
import axios from 'axios';
import "../components/Homepage.css"



//Formik+Yup validation
const validateValues = Yup.object().shape({
    zip_code: Yup.string()
        .matches(/^\d{5}$/, "Invalid Zip Code")
        .required('Required'),
    min_price: Yup
        .number("Invalid Price")
        .typeError('Must be a number')
        .moreThan(-1, "Invalid Price"),
    max_price: Yup
        .number("Invalid Price")
        .typeError('Must be a number')
        .positive("Invalid Price")
        .when("min_price", {
            is: undefined,
            otherwise: Yup.number().min(Yup.ref("min_price"), "Invalid Range"),
         }),
    min_sqft: Yup
        .number("Invalid Value")
        .typeError('Must be a number')
        .moreThan(-1, "Invalid Price"),
    max_sqft: Yup
        .number("Invalid Value")
        .typeError('Must be a number')
        .positive("Invalid Value")
        .when("min_sqft", {
            is: undefined,
            otherwise: Yup.number().min(Yup.ref("min_sqft"), "Invalid Range"),
        }),
    beds: Yup
        .number("Invalid Value")
        .typeError('Must be a number')
        .positive("Invalid Value"),
    baths: Yup
        .number("Invalid Value")
        .typeError('Must be a number')
        .positive("Invalid Value"),
    socioecon: Yup
        .number("Invalid Value")
        .typeError('Must be a number')
        .positive("Invalid Value"),
});

class FormSearch extends React.Component {

    //Constructor to store values
    constructor(props) {
        super(props);
        this.state = {
            result: [{ "address": "", "baths": "", "beds": "", "city": "", "daysonmkt": "", "favorite": "", "hoa_month": "", "interested": "", "latitude": "", "location": "", "longitude": "", "lotsize": "", "mls": "", "openhouse_end": "", "openhouse_start": "", "price": "", "price_per_sqft": "", "propertytype": "", "propsource": "", "propurl": "", "saletype": "", "solddate": "", "sqft": "", "state_or_prov": "MD", "status": "", "yearbuilt": "", "zip_or_postal": "", "socioecon": "" }],
            loading: true,
            submitted: false,
            curr_num: 1,
        };
    }

    render() {
        return (
            <Formik
                initialValues={{ zip_code: '', min_price: '', max_price: '', min_sqft: '', max_sqft: '', beds: '', baths: '', status: '', socioecon: '' }}
                validationSchema={validateValues}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    const res = await axios.get(`https://my-estate-backend.herokuapp.com/properties/?zip_or_postal=${values.zip_code}
                                        &minprice=${values.min_price === "" ? 0 : values.min_price}&maxprice=${values.max_price === "" ? 999999999 : values.max_price}
                                        &minsqft=${values.min_sqft === "" ? 0 : values.min_sqft}&maxsqft=${values.max_sqft === "" ? 999999999 : values.max_sqft}
                                        &beds=${values.beds ==="" ? 1 : values.beds}&baths=${values.baths === "" ? 1 : values.baths}&socioecon=${values.socioecon === "" ? 1 : values.socioecon}`);
                    console.log(res.data.result)
                    this.props.changeData(res.data.result);

                    await new Promise(r => setTimeout(r, 50));
                    setSubmitting(false);
                }}>

                {({ isSubmitting, errors, touched }) => (
                    <div>
                        <Form>
                            <div style={{ textAlign: 'left' }}>

                                {/*ZIP*/}
                                <label htmlFor="zip_code" style={{ marginRight: '10px' }}>Zip Code</label>
                                <div>
                                    <Field name="zip_code" className="form-control" type="zip_code" />
                                    {touched.zip_code && errors.zip_code && <errorMsg>{errors.zip_code}</errorMsg>}
                                </div>


                                {/*PRICE*/}
                                <Row>
                                    <Col>
                                        <label htmlFor="min_price" style={{ marginRight: '10px' }}>Min. Price</label>
                                        <div>
                                            <Field name="min_price" className="form-control" type="text" />
                                            {touched.min_price && errors.min_price && <errorMsg>{errors.min_price}</errorMsg>}
                                        </div>
                                    </Col>
                                    <Col>
                                        <label htmlFor="max_price" style={{ marginRight: '10px' }}>Max Price</label>
                                        <div>
                                            <Field name="max_price" className="form-control" type="text" />
                                            {touched.max_price && errors.max_price && <errorMsg>{errors.max_price}</errorMsg>}
                                        </div>
                                    </Col>
                                </Row>

                                {/*SQUARE FEET*/}
                                <Row>
                                    <Col>
                                        <label htmlFor="min_sqft" style={{ marginRight: '10px' }}>Min. Square Feet</label>
                                        <div>
                                            <Field name="min_sqft" className="form-control" type="text" />
                                            {touched.min_sqft && errors.min_sqft && <errorMsg>{errors.min_sqft}</errorMsg>}
                                        </div>
                                    </Col>
                                    <Col>
                                        <label htmlFor="max_sqft" style={{ marginRight: '10px' }}>Max Square Feet</label>
                                        <div>
                                            <Field name="max_sqft" className="form-control" type="text" />
                                            {touched.max_sqft && errors.max_sqft && <errorMsg>{errors.max_sqft}</errorMsg>}
                                        </div>
                                    </Col>
                                </Row>


                                <Row>
                                    <Col>
                                        {/*BEDS*/}
                                        <label htmlFor="beds" style={{ marginRight: '10px' }}>Beds</label>
                                        <Field as="select" defaultValue = {""} className="form-control" name="beds">
                                            <option value={""}>Select Beds</option>
                                            <option value="1">1+</option>
                                            <option value="2">2+</option>
                                            <option value="3">3+</option>
                                            <option value="4">4+</option>
                                        </Field>
                                        {touched.beds && errors.beds && <errorMsg>{errors.beds}</errorMsg>}
                                    </Col>
                                    <Col>
                                        {/*BATHS*/}
                                        <label htmlFor="baths" style={{ marginRight: '10px' }}>Baths</label>
                                        <Field as="select" defaultValue = {""} className="form-control" name="baths">
                                            <option value={""}>Select Baths</option>
                                            <option value="1">1+</option>
                                            <option value="2">2+</option>
                                            <option value="3">3+</option>
                                            <option value="4">4+</option>
                                        </Field>
                                        {touched.baths && errors.baths && <errorMsg>{errors.baths}</errorMsg>}

                                    </Col>
                                </Row>
                            </div>

                            <br />
                            <div className="form-group" style={{ 'textAlign': 'left' }}>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</button>
                            </div>

                        </Form>
                    </div>
                )}
            </Formik>

        );
    }

}

export default FormSearch;
