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
            productsName: [],
            servicesName: [],
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
            userInput: [],
            selectedItems:{
                "products": [],
                "services": []
            },
            isDisableButton: false,
            isVAT: false,
            gross: 0,
            VAT: 0,
            total: 0
        }
    }

    componentDidMount() {
        let oriProductsName = ["product 1", "product 2", "product 3", "product 4", "product 5"]
        let oriServicesName = ["service 1", "service 2", "service 3", "service 4", "service 5", "service 6", "service 7"]
        this.setState({productsName: oriProductsName, servicesName: oriServicesName})
    }

    rollBackArray = (name, value) => {
        let arr
        switch (name) {
            case "products":
                arr = this.state.productsName
                arr.push(value)
                arr = arr.sort()
                this.setState({productsName: arr})
                break;
            case "services":
                arr = this.state.servicesName
                arr.push(value)
                arr = arr.sort()
                this.setState({servicesName: arr})
                break;
            default:
                break;
        }
    }

    // todo: add the item into name array when user select other items
    filterTheArray = (name, value) => {
        let arr
        let {productsName, servicesName, type} = this.state
        switch (name) {
            case "products":
                arr = productsName.filter(name => name !== value)
                if (arr.length === 0) {
                    this.setState({type: type.filter(name => name !== "products")})
                }
                this.setState({productsName: arr})
                break;
            case "services":
                arr = servicesName.filter(name => name !== value)
                if (arr.length === 0) {
                    this.setState({type: type.filter(name => name !== "services")})
                }
                this.setState({servicesName: arr})
                break;
            default:
                break;
        }
        if ((productsName.length === 1 && servicesName.length === 0) || (productsName.length === 0 && servicesName.length === 1)) {
            this.setState({
                isDisableButton: true
            })
        }
    }

    handleClick = () => {
        let {userInput, productsName, servicesName, products, services} = this.state
        let name
        let value
        let price
        if (productsName.length !== 0) {
            name = "products"
            value = productsName[0]
            price = products[value][0]
        } else if (servicesName.length !== 0) {
            name = "services"
            value = servicesName[0]
            price = services[value][0]
        } else {
            return
        }
        userInput.push([name, value, price, 1, price])
        this.filterTheArray(name, value)
        let arr = this.calculateTotalPrice(userInput, this.state.isVAT)
        this.setState({
            userInput: userInput,
            gross: arr[0],
            VAT: arr[1],
            total: arr[2]
        })
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

    transferMsg = (preMsg, newMsg, idx) => {
        let {userInput} = this.state
        userInput[idx] = newMsg
        // roll back
        this.rollBackArray(preMsg[0], preMsg[1])
        // filter
        this.filterTheArray(newMsg[0], newMsg[1])
        let arr = this.calculateTotalPrice(userInput, this.state.isVAT)
        this.setState({
            userInput: userInput,
            gross: arr[0],
            VAT: arr[1],
            total: arr[2]
        })
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
        let {userInput, gross, VAT, total, isDisableButton} = this.state
        return (
            <div>
                <Table hover responsive>
                    <thead>
                    <tr className="thead-dark">
                        {
                            this.state.fields.map(
                                (item, idx) => (
                                    <th key={idx} style={{width: "20%"}}>{item}</th>
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
                                               transferMsg={(preMsg, newMsg, idx) => this.transferMsg(preMsg, newMsg, idx)}
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
                <button type="button" className="btn btn-primary" disabled={isDisableButton} onClick={this.handleClick}>Add a new row</button>
            </div>
        )
    }
}