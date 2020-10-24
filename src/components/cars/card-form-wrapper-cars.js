import React from "react";
import CarFormAdd from "./form-add";
import {Card} from "react-bootstrap";
import $ from "jquery";
import MyAlert from "../common/my-alert";

class CardFormWrapperCars extends React.Component {
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
                <h5 className="card-header" onClick={this.handleClick} style={{cursor: "pointer"}}>&nbsp;&nbsp;&nbsp;&nbsp;Add a new car record</h5>
                <Card.Body>
                    <CarFormAdd fromFormToParent={(data) => this.fromFormToParent(data)}></CarFormAdd>
                </Card.Body>
            </Card>
        )
    }
}

export default CardFormWrapperCars;