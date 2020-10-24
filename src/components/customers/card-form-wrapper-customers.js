import React from "react";
import FormAdd from "./form-add";
import {Card} from "react-bootstrap";
import $ from "jquery"

class CardFormWrapperCustomers extends React.Component {

    handleClick = (e) => {
        $(e.target.nextElementSibling).slideToggle();
        $("#i-angle").toggleClass("rotate-open");
    }

    fromFormToParent = (data) => {
        this.props.fromWrapperToParent(data)
    }

    render() {
        return(
            <Card>
                <i id="i-angle" className="rotate-open"></i>
                <h5 className="card-header" onClick={this.handleClick} style={{cursor: "pointer"}}>&nbsp;&nbsp;&nbsp;&nbsp;Add a new customer record</h5>
                <Card.Body>
                    <FormAdd fromFormToParent={(data) => {this.fromFormToParent(data)}}></FormAdd>
                </Card.Body>
            </Card>
        )
    }
}

export default CardFormWrapperCustomers;