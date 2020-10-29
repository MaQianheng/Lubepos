import React from "react";
import {Card} from "react-bootstrap";
import $ from "jquery";
import LineChart from "./line-chart";
import BarChart from "./bar-chart";

export default class CardCharts extends React.Component {
    handleClick = (e) => {
        $(e.target.nextElementSibling).slideToggle();
        $("#i-angle").toggleClass("rotate-open");
    }

    render() {
        let {flag} = this.props
        return (
            <Card>
                <i id="i-angle" className="rotate-open"></i>
                <h5 className="card-header" onClick={this.handleClick}
                    style={{cursor: "pointer"}}>&nbsp;&nbsp;&nbsp;&nbsp;Charts</h5>
                <div className="row row-cols-1 row-cols-md-2" style={{padding: "30px"}}>
                    <div className="col mb-4">
                        <div className="card">
                            <LineChart flag={flag} data={this.props.lineChartData}></LineChart>
                        </div>
                    </div>
                    <div className="col mb-4">
                        <div className="card">
                            <BarChart flag={flag} data={this.props.barChartData}></BarChart>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}
