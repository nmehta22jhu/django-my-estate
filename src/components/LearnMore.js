import React from 'react';
import { Container } from 'react-bootstrap';
import './About.css'

class LearnMore extends React.Component {
    render() {
        return (
            <Container style={{'width': '110%', 'marginTop': '3%'}}>
                {/*Header Image*/}
                <div className="head-text">
                    <div className="head-image">
                        <img src={process.env.PUBLIC_URL + `/images/learnmore.png`} alt=""
                             style={{'height': '400px', 'width': '100%', 'objectFit': 'cover'}}/>
                    </div>
                    {/*Header Image Textbox*/}
                    <div className='text-on-image'>
                        <h1 style={{'fontSize': '42px'}}> My Ratings </h1>
                        <hr style={{width: '30%', margin: 'auto'}}></hr>
                        <p style={{'fontWeight': 'normal', 'fontSize': '18px'}}> Understanding our ratings system </p>
                    </div>
                </div>

                <br/>
                <br/>
                <div className="container" style={{'textAlign': 'left', 'fontSize': '18px', 'width': '85%'}}>
                    <br></br>
                    <p>
                        At <b>myEstate</b> We know that potential home buyers look for much more than traditional factors such as the number of bedrooms, bathrooms, square feet, and price when looking for their next house.
                    </p>
                    <p>
                        MyEstate is unique from all other real estate services because we provide insight into tons of niche factors that home buyers value when purchasing a home. These factors are each rated on a 1-5 star scale with 1 being the lowest score and 5 being the best score.
                    </p>

                    <p>
                        Our physical “non-traditional” factors include:
                    </p>
                    <ul>

                        <li>Parks</li>
                            <li>Coffee Shops</li>
                                <li>Supermarkets</li>
                                    <li>Shopping (ie. Shopping Malls)</li>
                                        <li>Convenience (ie. Convenience Stores)</li>
                                            <li>Hospitals</li>
                                                <li>Healthcare (ie. Doctors office and Urgent Care)</li>
                    </ul>


                    <p>
                        Furthermore, based on where a house is located, we have compiled a general star-rating category called “Socioeconomic Value.”
                    </p>

                </div>
                <br/>

            </Container>)
    }
}

export default LearnMore;
