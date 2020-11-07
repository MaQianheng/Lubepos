import React from "react";
import {Table, Col, Image} from "react-bootstrap";

export default class ComponentToPrint extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let display = this.props.display
        console.log(display)
        console.log(this.props.userInput)
        let {userInput, gross, VAT, totalPrice} = this.props
        return (
            <div className={`container-fluid`} style={{padding: "30px"}}>
                <div className="row">
                    <Col xs={2} md={2}>
                        <Image src="https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg"
                               style={{width: "200px", height: "150px"}}/>
                    </Col>
                    <div className="col-10">
                        <p>row1</p>
                        <p>row2</p>
                        <p>row3</p>
                        <p>row4</p>
                    </div>
                </div>
                <h1 style={{textAlign: "center"}}>Title</h1>
                <div className="row" style={{margin: "20px 0px"}}>
                    <span className="col-4" style={{padding: "0px"}}>xxx: xxx</span>
                    <span className="col-4" style={{textAlign: "center", padding: "0px"}}>xxx: xxx</span>
                    <span className="col-4" style={{textAlign: "center", padding: "0px"}}>xxx: xxx</span>
                </div>
                <p style={{margin: "20px 0px"}}>xx: </p>
                <p style={{margin: "20px 0px"}}>xx: </p>
                <div className="row" style={{margin: "20px 0px"}}>
                    <span className="col-4" style={{padding: "0px"}}>xxx: xxx</span>
                    <span className="col-4" style={{textAlign: "center", padding: "0px"}}>xxx: xxx</span>
                    <span className="col-4" style={{textAlign: "center", padding: "0px"}}>xxx: xxx</span>
                </div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Unit Price</th>
                        <th>Unit</th>
                        <th>????</th>
                        <th>Total Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        userInput.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item[1].value}</td>
                                <td>{item[2]}</td>
                                <td>{item[3]}</td>
                                <td></td>
                                <td>{item[5]}</td>
                            </tr>
                        ))
                    }

                    < tr>
                        < td colSpan={4}>Gross</td>
                        <td>{gross}</td>
                    </tr>
                    <tr>
                        <td colSpan={4}>7%</td>
                        <td>{VAT}</td>
                    </tr>
                    <tr>
                        <td colSpan={4}>Total Price</td>
                        <td>{totalPrice}</td>
                    </tr>
                    </tbody>
                </Table>
                <div className="row" style={{marginTop: "20px"}}>
                    <span className="col-5" style={{margin: "10px 20px"}}>xxx</span>
                    <span className="col-5" style={{margin: "10px 20px"}}>xxx</span>
                </div>
            </div>
        );
    }
}

// class Example extends React.Component {
//     render() {
//         return (
//             <div>
//                 <ReactToPrint
//                     trigger={() => <a href="#">Print this out!</a>}
//                     content={() => this.componentRef}
//                 />
//                 <ComponentToPrint ref={el => (this.componentRef = el)}/>
//             </div>
//         );
//     }
// }

// export default Example;
