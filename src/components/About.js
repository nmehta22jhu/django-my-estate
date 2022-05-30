import React from 'react';
import { Container } from 'react-bootstrap';
import './About.css'

class About extends React.Component {
    render() {
        return (
            <Container style={{'width': '110%', 'marginTop': '3%'}}>
                {/*Header Image*/}
                <div className="head-text">
                    <div className="head-image">
                        <img src={process.env.PUBLIC_URL + `/images/aboutus.png`} alt=""
                             style={{'height': '400px', 'width': '100%', 'objectFit': 'cover'}}/>
                    </div>
                    {/*Header Image Textbox*/}
                    <div className='text-on-image'>
                        <h1 style={{'fontSize': '42px'}}> About Us </h1>
                        <hr style={{width: '30%', margin: 'auto'}}></hr>
                        <p style={{'fontWeight': 'normal', 'fontSize': '18px'}}> Helping you find your dream home </p>
                    </div>
                </div>

                <br/>
                <br/>
                <div className="container" style={{'textAlign': 'left', 'fontSize': '18px', 'width': '85%'}}>
                    <p style={{'textAlign': 'center', 'fontSize': '28px'}}>
                        Welcome to <b>myEstate</b>
                    </p>
                    <p style={{'textAlign': 'center'}}>
                        We are the premier real estate website for personalized real estate recommendations!
                    </p>
                    <br></br>
                    <p>
                        <b>myEstate</b> is a web-based platform that provides you with accurate housing recommendations
                        using a combination of traditional (beds, square footage, etc) and non-traditional factors
                        (parks, coffee shops, supermarkets, etc).
                    </p>
                    <p>
                        All you need to provide are your preferences for your dream home and we'll take care of the
                        rest!
                    </p>
                    <p>
                        What separates us from our competitors is our groundbreaking, state-of-the-art recommender
                        system that provides properties tailored to the needs and wishes of our customer. We connect
                        people to the properties they desire!
                    </p>
                </div>
                <br/><br/><br/><br/>
                <h1 style={{'textAlign': 'left', 'marginLeft': '5%'}}> Contact Us</h1>
                <div className="container" style={{'textAlign': 'left', 'width': '85%'}}>
                        Abdullah Al Armouti <br></br>
                        Anish Kulkarni <br></br>
                        Jamie Huang<br></br>
                        Lambert Kober<br></br>
                        Neel Mehta<br></br>
                        Ryunosuke Saito<br></br>
                        <br></br>

                    {/*Location/Email/Phone*/}
                    <div>
                        <a href="tel:400-600-800">
                            +1 400-600-800
                        </a>
                        &nbsp; &nbsp;— &nbsp;
                        <a href="myEstateDevelopers@gmail.com">
                            myEstateDevelopers@gmail.com
                        </a>
                        &nbsp; &nbsp;— &nbsp;
                        3510 North Charles Street &nbsp;— &nbsp;
                        <a href="https://github.com/jhu-oose/2021-fall-group-group1">Project Link</a>
                    </div>
                </div>
            </Container>)
    }
}

export default About;
