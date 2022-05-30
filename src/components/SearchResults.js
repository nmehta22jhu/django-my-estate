import React from 'react';
import './Homepage.css';
import SearchCard from './SearchCard'
const BASE_URL = `https://my-estate-backend.herokuapp.com`



class Results extends React.Component {

    //To scroll into view once items are found
    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'smooth' });
    }


    render() {
        return (
            <div ref={el => {
                this.el = el;}}>
                <div className="wrapper">
                    {console.log(this.props.input)}
                    {this.props.input.map((res, i) =>
                        <SearchCard res = {res} i = {i}/>
                    )}
                </div>
            </div>
        )
    }
}

export default Results;
