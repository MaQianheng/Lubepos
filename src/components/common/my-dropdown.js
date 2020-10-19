import React from "react";
import {Form} from "react-bootstrap";
import $ from 'jquery';

class MyDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }

    handleDropDownClick = (event) => {
        event.preventDefault();
        $(event.target.nextElementSibling).slideToggle();
    }

    handleDropDownItemClick = (event) => {
        const userInput = event.target.innerText
        if (userInput !== this.state.value) {
            this.props.transferMsg(userInput, this.props.label)
            this.setState({value: userInput})
        }
        $(event.target.parentElement).slideToggle();
    }

    render() {
        const {data, label, value, control, invisibleLabel} = this.props;
        return (
            <div className={control ? "dropdown" : "col-6 col-md-3 dropdown"}>
                {invisibleLabel ? null : <Form.Label>{label}</Form.Label>}
                <button className="btn btn-primary dropdown-toggle form-control" id={invisibleLabel ? "invisible-label-button-after" : ""} onClick={this.handleDropDownClick}>{value}</button>
                <ul className="dropdown-menu" id={invisibleLabel ? "invisible-label-ul" : null} style={{height: data.length>=5 ? 180 : data.length * 40}}>
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