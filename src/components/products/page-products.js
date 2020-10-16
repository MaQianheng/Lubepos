import React from "react";
import CardFormWrapperProducts from "./card-form-wrapper-products";
import {MyTable} from "../common/my-table";

class PageProducts extends React.Component {
    render() {
        return(
            <div  style={{padding: "30px"}}>
                <CardFormWrapperProducts></CardFormWrapperProducts>
                <br/>
                <MyTable  data={
                    {
                        fields: ["Name", "Type", "Brand", "Amount", "Price"],
                        content: [
                            ["1", "services", "3", "23", "200"],
                            ["1", "services", "200@gmail.com", "23", "200"],
                            ["1", "services", "3", "23", "200"],
                            ["1", "products", "3", "23", "200"]
                        ]
                    }
                }></MyTable>
            </div>
        )
    }
}

export default PageProducts;