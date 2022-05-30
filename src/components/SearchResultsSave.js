import React from 'react';
import './Homepage.css';
import SearchCardSave from './SearchCardSave'
const BASE_URL = `https://my-estate-backend.herokuapp.com`



class ResultsSave extends React.Component {

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
                        <SearchCardSave res = {res} i = {i}/>
                    )}
                </div>
            </div>
        )
    }
}

export default ResultsSave;
