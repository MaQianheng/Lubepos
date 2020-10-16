import React from 'react';
import CardCars from "./card-cars";
import {MyTable} from '../common/my-table'

class PageCars extends React.Component {
    render() {
        return (
            <div style={{padding: "30px"}}>
                <CardCars></CardCars>
                <br/>
                <MyTable data={
                    {
                        fields: ["Plate Number", "Brand", "Model", "Color", "Owner", "Year"],
                        content: [
                            ["1", "2", "3", "4", "5", "6"],
                            ["1", "Audi", "200", "White", "0", "2018"],
                            ["1", "2", "3", "4", "5", "6"],
                            ["1", "2", "3", "4", "5", "6"]
                        ]
                    }
                }></MyTable>
            </div>
        );
    }
}

export default PageCars;