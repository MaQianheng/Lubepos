import React from 'react';
import CustomerCard from "./card-customers";
// import {CarTable} from './table'
import {MyTable} from "../common/my-table";

class PageCustomer extends React.Component {
    render() {
        return (
            <div style={{padding: "30px"}}>
                <CustomerCard></CustomerCard>
                <br/>
                <MyTable data={
                    {
                        fields: ["Name", "Phone", "Email"],
                        content: [
                            ["1", "2", "3"],
                            ["1", "0999999999", "200@gmail.com"],
                            ["1", "2", "3"],
                            ["1", "2", "3"]
                        ]
                    }
                }></MyTable>
            </div>
        );
    }
}

export default PageCustomer;