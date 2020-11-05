import React from "react";
import CardFormWrapperSales from "./card-form-wrapper-sales";
// import {PDFDownloadLink, PDFViewer} from '@react-pdf/renderer'
// import {MyDocument} from "./component-to-pdf";
// import ReactToPrint from 'react-to-print';
// import ComponentToPrint from "./component-to-print";



export default class PageSales extends React.Component {
    // handleClick = () => {
    //     console.log(1)
    // }

    render() {
        return (
            <div style={{padding: "30px"}}>
                <CardFormWrapperSales/>
                {/*<PDFDownloadLink document={MyDocument(1)} fileName="somename.pdf">*/}
                {/*    {({blob, url, loading, error}) => (loading ? 'Loading document...' : 'Download now!')}*/}
                {/*</PDFDownloadLink>*/}
                {/*<PDFViewer width="100%" height="1000px">*/}
                {/*    <MyDocument/>*/}
                {/*</PDFViewer>*/}
                {/*<div>*/}
                {/*    <ReactToPrint*/}
                {/*        onBeforePrint={() => {*/}
                {/*            this.handleClick()*/}
                {/*        }}*/}
                {/*        trigger={() => {*/}
                {/*            return <button onClick={this.handleClick}>Print this out!</button>;*/}
                {/*        }}*/}
                {/*        content={() => this.componentRef}*/}
                {/*    />*/}
                {/*    <ComponentToPrint style={{marginTop: "1000px"}} data={[1,2,3]} ref={el => (this.componentRef = el)}/>*/}
                {/*</div>*/}
            </div>
        )
    }
}