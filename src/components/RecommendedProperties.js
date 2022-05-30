import React from 'react';
import './Homepage.css';
import { Container, Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import httpClient from './HttpsClient'
import Results from "./SearchResults";
const BASE_URL = `https://my-estate-backend.herokuapp.com`

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

class RecommendedProperties extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arr_Recommended_Postings: []
        };
    }

    //To scroll into view once items are found
    async componentDidMount() {
        await httpClient.get(`${BASE_URL}/recommended`)
            .then(response => {
                console.log(response)
                var i;
                var arr = [];
                for (i = 0; i < response.data.result.length; i++) {
                    arr.push({
                        address: response.data.result[i].address,
                        price: response.data.result[i].price,
                        baths: response.data.result[i].baths,
                        beds: response.data.result[i].beds,
                        sqft: response.data.result[i].sqft,
                        park: response.data.result[i].park,
                        starbucks: response.data.result[i].starbucks,
                        supermarket: response.data.result[i].supermarket,
                        socioecon: response.data.result[i].socioecon,
                        value: response.data.result[i].value,
                        shopping: response.data.result[i].shopping,
                        convenience: response.data.result[i].convenience,
                        hospital: response.data.result[i].hospital,
                        doctor: response.data.result[i].doctor,
                    })
                }
                this.setState({ arr_Recommended_Postings: arr })
            }
            );
    }

    render() {
        const listProperties =
            <div >
                {
                    // this.state.arr_SavedPostings.map((res, i) =>
                    this.state.arr_Recommended_Postings !== undefined && <Results input={this.state.arr_Recommended_Postings}/>

                    // )
                }
            </div>

        return (
            <Container style={{ 'width': '100%', 'marginTop': '3%' }}>
                <h1 style={{ 'textAlign': 'left' }}>Recommended Properties</h1>
                <div style={{
                    "display": "flex",
                    "flexDirection": "row",
                    "justifyContent": "space-between",
                }}>
                </div>
                <hr />
                <div>
                    <div className="list-properties-content" style={{ 'textAlign:': 'left' }}>
                        {listProperties}
                    </div>
                </div>
            </Container>
        )
    }
}

export default RecommendedProperties;
