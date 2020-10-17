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
                <i id="i-angle" className="rotate-open"></i>
                <h5 className="card-header" onClick={this.handleClick} style={{cursor: "pointer"}}>&nbsp;&nbsp;&nbsp;&nbsp;Add a new sales record</h5>
                <Card.Body>
                    <div className="text-right">
                        <button type="button" className="btn btn-light" style={{marginRight: "20px"}}>SAVE&PRINT</button>
                        <button type="button" className="btn btn-dark">SAVE</button>
                    </div>
                    <br/>
                    <TableAdd></TableAdd>
                </Card.Body>
            </Card>
        );
    }
}