import React from "react";
import CarFormAdd from "./form-add";
import {Card} from "react-bootstrap";
import $ from "jquery";

class CardFormWrapperCars extends React.Component {
    handleClick = (e) => {
        $(e.target.nextElementSibling).slideToggle();
        $("#i-angle").toggleClass("rotate-open");
    }

    fromFormToParent = (action, data) => {
        switch (action) {
            case "REQUEST DATA":
                this.props.fromWrapperToParent("REQUEST DATA", data)
                break
            case "TRANSFER DATA":
                this.props.fromWrapperToParent("TRANSFER DATA", data)
                break
            default:
                break
        }
    }

    render() {
        return(
            <Card>
                <i id="i-angle" className="rotate-open">
                </i>
                <h5 className="card-header" onClick={this.handleClick} style={{cursor: "pointer"}}>&nbsp;&nbsp;&nbsp;&nbsp;Add a new car record</h5>
                <Card.Body>
                    <CarFormAdd
                        editingData={this.props.editingData}
                        fromFormToParent={(action, data) => this.fromFormToParent(action, data)}
                    >
                    </CarFormAdd>
                </Card.Body>
            </Card>
        )
    }
}

export default CardFormWrapperCars;