import React from "react";
import FormAdd from "./form-add";
import {Card} from "react-bootstrap";
import $ from "jquery";

class CardFormWrapperItems extends React.Component {

    handleClick = (e) => {
        $(e.target.nextElementSibling).slideToggle();
        $("#i-angle").toggleClass("rotate-open");
    }

    fromFormToParent = (item) => {
        this.props.fromWrapperToParent(item)
    }

    render() {
        return(
            <Card>
                <i id="i-angle" className="rotate-open"></i>
                <h5 className="card-header" onClick={this.handleClick} style={{cursor: "pointer"}}>&nbsp;&nbsp;&nbsp;&nbsp;Add a new products/services record</h5>
                <Card.Body>
                    <FormAdd fromFormToParent={(item) => this.fromFormToParent(item)}></FormAdd>
                </Card.Body>
            </Card>
        )
    }
}

export default CardFormWrapperItems;