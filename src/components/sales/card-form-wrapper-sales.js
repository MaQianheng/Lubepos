import React from "react";
import {Card} from "react-bootstrap";
import $ from "jquery";
import TableAdd from "./table-add";

export default class CardFormWrapperSales extends React.Component {

    handleClick = (e) => {
        $(e.target.nextElementSibling).slideToggle();
        $("#i-angle").toggleClass("rotate-open");
    }

    render() {
        return (
            <Card>
                <i id="i-angle" className="rotate-open"/>
                <h5 className="card-header" onClick={this.handleClick}
                    style={{cursor: "pointer"}}>&nbsp;&nbsp;&nbsp;&nbsp;Add a new sales record</h5>
                <Card.Body>
                    <TableAdd/>
                </Card.Body>
            </Card>
        );
    }
}