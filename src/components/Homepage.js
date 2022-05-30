import React from 'react';
import './Homepage.css';
import {Container} from 'react-bootstrap';
import FormSearch from '../forms/FormSearch.js';
import MapContainer from './GoogleMaps.js';
import Results from './SearchResults.js'


class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: undefined,
            scrolled: false,
        };
    }

    render() {
        return (
            <Container style={{'width': '110%', 'marginTop': '3%'}}>
                <h1 style={{'textAlign': 'left'}}>Search For Houses</h1>
                <div className="flex-container">
                    {/*Outputting results from search (from endpoint call)*/}
                    <div className="flex-child">
                        <FormSearch changeData={result => {
                            this.setState({result});}}/>
                    </div>
                    {/*Google maps inputting data (from endpoint call)*/}
                    <div className="flex-child">
                        <br/>
                        <MapContainer array={this.state.result}></MapContainer>
                    </div>
                </div>


                {this.state.result !== undefined && <Results input={this.state.result}/>}
                <div style={{'paddingBottom': '15.5%'}}></div>
            </Container>);
    }
}

export default Homepage;
