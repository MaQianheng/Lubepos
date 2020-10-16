import React from "react";
import CarFormAdd from "./form-add";
import {Card} from "react-bootstrap";
import $ from "jquery";

class ProductsCars extends React.Component {
    handleClick = (e) => {
        $(e.target.nextElementSibling).slideToggle();
        $("#i-angle").toggleClass("rotate-open");
    }

    render() {
        return(
            <Card>
                <i id="i-angle" className="rotate-open"></i>
                <h5 className="card-header" onClick={this.handleClick} style={{cursor: "pointer"}}>&nbsp;&nbsp;&nbsp;&nbsp;Add a new car record</h5>
                <Card.Body>
                    <CarFormAdd></CarFormAdd>
                </Card.Body>
            </Card>
        )
    }
}

export default ProductsCars;