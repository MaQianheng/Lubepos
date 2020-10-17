import React from "react";
import {Table} from "react-bootstrap";
import PreRowContent from "./preRowContent";

export default class TableAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: ["Type", "Item", "Unit Price", "Amount", "Total"],
            type: ["products", "services"],
            //["name", "price", "in stock"]
            productsName: ["product 1", "product 2", "product 3", "product 4", "product 5"],
            servicesName: ["service 1", "service 2", "service 3", "service 4", "service 5", "service 6", "service 7"],
            // {name: [price, stock]}
            products: {
                "product 1": ["20", "30"],
                "product 2": ["30", "10"],
                "product 3": ["40", "50"],
                "product 4": ["50", "100"],
                "product 5": ["60", "80"]
            },
            services: {
                "service 1": ["10", "-1"],
                "service 2": ["20", "-1"],
                "service 3": ["30", "-1"],
                "service 4": ["10", "-1"],
                "service 5": ["140", "-1"],
                "service 6": ["50", "-1"],
                "service 7": ["90", "-1"]

            },
            preInput: ["products", "product 1", "20", "1", "20"],
            userInput: [
                // ["products", "product 1", "20", "1", "20"]
            ],
            isVAT: false,
            gross: 0,
            VAT: 0,
            total: 0
        }
    }

    handleClick = () => {
        let {userInput} = this.state
        userInput.push(["products", "product 1", "20", "1", "20"])
        let arr = this.calculateTotalPrice(userInput, this.state.isVAT)
        this.setState({
            userInput: userInput,
            gross: arr[0],
            VAT: arr[1],
            total: arr[2]
        })

        // this.setState(prevState => {
        //     let tmp = Object.assign({}, prevState);
        //     tmp["userInput"].push(this.state.preInput)
        //     let arr = this.calculateTotalPrice(tmp["userInput"], this.state.isVAT)
        //     tmp["gross"] = arr[0]
        //     tmp["VAT"] = arr[1]
        //     tmp["total"] = arr[2]
        //     return tmp;
        // })
        // let tmp = this.state.userInput.push(this.state.preInput)
        // this.setState({userInput: tmp})
        // console.log(this.state.userInput)
        // console.log(this.state)
    }

    handleChange = (e) => {
        let isVAT = e.target.checked
        this.setState(prevState => {
            let tmp = Object.assign({}, prevState);
            let arr = this.calculateTotalPrice(tmp["userInput"], isVAT)
            tmp["isVAT"] = isVAT
            tmp["gross"] = arr[0]
            tmp["VAT"] = arr[1]
            tmp["total"] = arr[2]
            return tmp;
        })
    }

    transferMsg = (msg, idx) => {
        let {userInput} = this.state
        userInput[idx] = msg
        let arr = this.calculateTotalPrice(userInput, this.state.isVAT)
        this.setState({
            userInput: userInput,
            gross: arr[0],
            VAT: arr[1],
            total: arr[2]
        })
        // this.setState(prevState => {
        //     let tmp = Object.assign({}, prevState);
        //     tmp.userInput[idx] = msg
        //     let arr = this.calculateTotalPrice(tmp["userInput"], this.state.isVAT)
        //     tmp["gross"] = arr[0]
        //     tmp["VAT"] = arr[1]
        //     tmp["total"] = arr[2]
        //     return tmp;
        // })
    }

    calculateTotalPrice = (arr, isVAT) => {
        let total = 0;
        let VAT;
        arr.map((item) => {
            total += parseFloat(item[4])
        })
        if (isVAT) {
            VAT = (total/107) * 7
            return [(total-VAT).toFixed(2), VAT.toFixed(2), total.toFixed(2)]
        }
        return [total.toFixed(2), 0, total.toFixed(2)]
    }

    render() {
        let {userInput, gross, VAT, total} = this.state
        return (
            // <Form>
            //     <Form.Row>
            //
            //         <MyDropdown transferMsg = {(msg, label) => this.transferMsg(msg, label)} data={this.state.products} label="products" value={this.state.type}></MyDropdown>
            //         <MyDropdown transferMsg = {(msg, label) => this.transferMsg(msg, label)} data={this.state.services} label="services" value={this.state.type}></MyDropdown>
            //     </Form.Row>
            // </Form>
            <div>
                <Table hover responsive>
                    <thead>
                    <tr className="thead-dark">
                        {
                            this.state.fields.map(
                                (item, idx) => (
                                    <th key={idx}>{item}</th>
                                )
                            )
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        userInput.map(
                            (item, idx) => (
                                <PreRowContent key={idx} rowIdx={idx}
                                               transferMsg={(msg, idx) => this.transferMsg(msg, idx)}
                                               type={this.state.type}
                                               productsName={this.state.productsName}
                                               servicesName={this.state.servicesName}
                                               productsItems={this.state.products}
                                               servicesItems={this.state.services}
                                               userInput={item}></PreRowContent>
                            )
                        )
                    }
                    <tr className="table-secondary">
                        <td colSpan="4" className="text-right">Gross:</td>
                        <td>{gross}</td>
                    </tr>
                    <tr className="table-secondary">
                        <td colSpan="4" className="text-right">
                            <input type="checkbox" style={{marginRight: "10px"}} onChange={this.handleChange}/>
                            VAT:
                        </td>
                        <td>{VAT}</td>
                    </tr>
                    <tr className="table-secondary">
                        <td colSpan="4" className="text-right">Total:</td>
                        <td>{total}</td>
                    </tr>
                    </tbody>
                </Table>
                <button type="button" className="btn btn-primary" onClick={this.handleClick}>Add a new row</button>
            </div>
        )
    }
}