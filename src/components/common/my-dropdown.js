import React from "react";
import {Form} from "react-bootstrap";
import $ from 'jquery';

class MyDropdown extends React.Component {
    handleDropDownClick = (event) => {
        event.preventDefault();
        $(event.target.nextElementSibling).slideToggle();
    }

    handleDropDownItemClick = (event) => {
        const userInput = event.target.innerText
        this.props.transferMsg(userInput, this.props.label)
        $(event.target.parentElement).slideToggle();
    }

    render() {
        const {data, label, value} = this.props;
        return (
            <div className="col-6 col-md-3 dropdown">
                <Form.Label>{label}</Form.Label>
                <button className="btn btn-primary dropdown-toggle form-control" style={{textAlign:"left"}} onClick={this.handleDropDownClick}>{value}</button>
                <ul className="dropdown-menu" style={{height: data.length>5 ? 200 : data.length * 30}}>
                    {
                        data.map((item, idx) => (
                            <li className="dropdown-item" style={{cursor:"pointer"}} key={idx} onClick={this.handleDropDownItemClick}>{item}</li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export {MyDropdown};