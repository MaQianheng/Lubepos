import React from 'react';
import CardFormWrapperCars from "./card-form-wrapper-cars";
import CardDetailCars from "./card-detail-cars";
import SearchField from "./search-field";


// add a search box, the search keyword can be Licence plate number, owner's name,
// also add filter of brands / models / color

class PageCars extends React.Component {

    render() {
        return (
            <div style={{padding: "30px"}}>
                <CardFormWrapperCars></CardFormWrapperCars>
                <br/>
                {/*<MyTable data={*/}
                {/*    {*/}
                {/*        fields: ["Plate Number", "Brand", "Model", "Color", "Owner", "Year"],*/}
                {/*        content: [*/}
                {/*            ["1", "2", "3", "4", "5", "6"],*/}
                {/*            ["1", "Audi", "200", "White", "0", "2018"],*/}
                {/*            ["1", "2", "3", "4", "5", "6"],*/}
                {/*            ["1", "2", "3", "4", "5", "6"]*/}
                {/*        ]*/}
                {/*    }*/}
                {/*}></MyTable>*/}
                <div className="sticky-top" style={{marginBottom: "20px"}}>
                    <SearchField></SearchField>
                </div>
                <div className="row row-cols-1 row-cols-md-6">
                    <CardDetailCars></CardDetailCars>
                    <CardDetailCars></CardDetailCars>
                    <CardDetailCars></CardDetailCars>
                    <CardDetailCars></CardDetailCars>
                    <CardDetailCars></CardDetailCars>
                    <CardDetailCars></CardDetailCars>
                    <CardDetailCars></CardDetailCars>
                </div>
            </div>
        );
    }
}

export default PageCars;