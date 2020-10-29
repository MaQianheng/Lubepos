import React from "react";

import {Line} from "react-chartjs-2";

export default class LineChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Sep", "Dec"],
            datasets: [
                {
                    label: "Monthly sales",
                    data: this.props.data,
                    fill: false,
                    borderColor: "#742774"
                }
            ]
        }
        return (
            <Line key={this.props.flag} data={data}/>
        );
    }
}