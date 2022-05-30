import React from 'react';
import './Homepage.css';
import { Container, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import httpClient from './HttpsClient'
import ResultsSave from "./SearchResultsSave";

// var arr_SavedPostings = null;
const BASE_URL = `https://my-estate-backend.herokuapp.com`

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});


class SavedListings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr_SavedPostings: []
        };
    }

    //function to delete property
    async deleteProperty(address) {
        await httpClient.get(`${BASE_URL}/unsaved/?address=${address}`)
        window.location.reload();
    }

    //if mounted, check for login and input values into arr_SavedPostings
    async componentDidMount() {
        await httpClient.get(`${BASE_URL}/mysaved`)
            .then(response => {
                console.log(response)
                var i;
                var arr = [];
                for (i = 0; i < response.data.results.length; i++) {
                    var j;
                    var alreadyExists = false;
                    for (j = 0; j < arr.length; j++) {
                        if (response.data.results[i].address === arr[j].address) {
                            alreadyExists = true;
                            break;
                        }
                    }
                    if (!alreadyExists) {
                        arr.push({
                            address: response.data.results[i].address,
                            baths: response.data.results[i].baths,
                            beds: response.data.results[i].beds,
                            sqft: response.data.results[i].sqft,
                            price: response.data.results[i].price,
                            value: response.data.results[i].value,
                            status: response.data.results[i].status,
                            park: response.data.results[i].park,
                            supermarket: response.data.results[i].supermarket,
                            starbucks: response.data.results[i].starbucks,
                            socioecon: response.data.results[i].socioecon,
                            shopping: response.data.results[i].shopping,
                            convenience: response.data.results[i].convenience,
                            hospital: response.data.results[i].hospital,
                            doctor: response.data.results[i].doctor,
                        })
                    }
                }
                this.setState({ arr_SavedPostings: arr })
            }
            );
    }

    render() {
        const listProperties =
            <div>
                {
                    // this.state.arr_SavedPostings.map((res, i) =>
                        this.state.arr_SavedPostings !== undefined && <ResultsSave input={this.state.arr_SavedPostings}/>

                    // )
                }

                    </div>

        return (
            <Container style={{ 'width': '100%', 'marginTop': '3%' }}>
                <h1 style={{ 'textAlign': 'left' }}>Saved Properties</h1>
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

export default SavedListings;
