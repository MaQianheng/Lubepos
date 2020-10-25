import React from "react";
import {Table} from "react-bootstrap";
import PreRowContent from "./preRowContent";
import MyAlert from "../common/my-alert";
import {requestItemsQuery, requestSalesInsert} from "../../api";
import MySpinner from "../common/my-spinner";

export default class TableAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: ["Type", "Item", "Unit Price", "Amount", "Remaining Amount", "Total", "Action"],
            type: ["products", "services"],
            productsName: [],
            servicesName: [],
            // {name: [price, stock]}
            products: {},
            services: {},
            userInput: [],
            isLoading: false,
            isDisableButton: false,
            isVAT: false,
            gross: 0,
            VAT: 0,
            totalPrice: 0,
            alert: {
                type: "success",
                value: "success",
                timeStamp: Date.now()
            }
        }
    }

    componentDidMount() {
        this.setState({isLoading: true})
        requestItemsQuery({currentPageCount: 0}).then((r) => {
            let {data} = r
            if (data.err_code === 0) {
                let {products, services, productsName, servicesName} = this.state
                for (let i = 0; i < data.items.length; i++) {
                    if (data.items[i].type === "products") {
                        productsName.push(data.items[i].name)
                        products[data.items[i].name] = {
                            amount: data.items[i].amount,
                            id: data.items[i]._id,
                            brand: data.items[i].brand,
                            price: data.items[i].price
                        }
                    } else {
                        servicesName.push(data.items[i].name)
                        services[data.items[i].name] = {
                            amount: data.items[i].amount,
                            id: data.items[i]._id,
                            brand: data.items[i].brand,
                            price: data.items[i].price
                        }
                    }
                }
                this.setState({
                    products: products,
                    services: services,
                    productsName: productsName,
                    servicesName: servicesName,
                    isLoading: false
                })
            }
        }).catch((err) => {
            this.informAlert(`Request data fail ${err}`, "danger")
            this.setState({
                isDisableButton: true,
                isLoading: false
            })
            console.log(err)
        })
    }

    rollBackArray = (name, value) => {
        let itemsArr
        if (this.state.productsName.length === 0 && this.state.servicesName.length === 0) {
            this.setState({isDisableButton: false})
        }
        switch (name) {
            case "products":
                itemsArr = this.state.productsName
                if (itemsArr.length === 0) {
                    let {type} = this.state
                    type.unshift("products")
                }
                itemsArr.push(value)
                itemsArr = itemsArr.sort()
                this.setState({productsName: itemsArr})
                break;
            case "services":
                itemsArr = this.state.servicesName
                if (itemsArr.length === 0) {
                    let {type} = this.state
                    type.push("services")
                }
                itemsArr.push(value)
                itemsArr = itemsArr.sort()
                this.setState({servicesName: itemsArr})
                break;
            default:
                break;
        }
    }

    filterTheArray = (name, value) => {
        let arr
        let {productsName, servicesName, type} = this.state
        switch (name) {
            case "products":
                arr = productsName.filter(name => name !== value)
                if (arr.length === 0) {
                    this.setState({type: type.filter(name => name !== "products")})
                }
                if (type.length === 1 && servicesName.length !== 0) {
                    type.push("services")
                    this.setState({type: type})
                }
                this.setState({productsName: arr})
                break;
            case "services":
                arr = servicesName.filter(name => name !== value)
                if (arr.length === 0) {
                    this.setState({type: type.filter(name => name !== "services")})
                }
                if (type.length === 1 && productsName.length !== 0) {
                    type.unshift("products")
                    this.setState({type: type})
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
        let type

        let name
        let remainingAmount
        let price
        if (productsName.length !== 0) {
            type = "products"
            name = productsName[0] ? productsName[0] : ""
            remainingAmount = products[name].amount ? products[name].amount : 0
            price = products[name].price ? products[name].price : 0
        } else if (servicesName.length !== 0) {
            type = "services"
            name = servicesName[0] ? servicesName[0] : ""
            remainingAmount = services[name].amount ? services[name].amount : 0
            price = services[name].price ? services[name].price : 0
        } else {
            return
        }

        userInput.push([type, name, price, 0, remainingAmount, price * 0])
        this.filterTheArray(type, name)
        let arr = this.calculateTotalPrice(userInput, this.state.isVAT)
        this.setState({
            userInput: userInput,
            gross: arr[0],
            VAT: arr[1],
            totalPrice: arr[2]
        })
    }

    handleSubmit = () => {
        let itemsId = "",
            amount = "",
            remainingAmount = ""
        let {userInput, products, services, totalPrice} = this.state
        if (userInput.length === 0) {
            this.informAlert("The form is empty")
            return
        }
        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i][3] === 0) {
                this.informAlert("The amount should be at least 1")
                return
            }
            switch (userInput[i][0]) {
                case "products":
                    console.log(products[userInput[i][1]].id)
                    itemsId += `${products[userInput[i][1]].id},`
                    break
                case "services":
                    itemsId += `${services[userInput[i][1]].id},`
                    break
                default:
                    this.informAlert("Please check your data")
                    return
                    break
            }
            amount += `${[userInput[i][3]]},`
            remainingAmount += `${[userInput[i][4]]},`
        }
        itemsId = itemsId.substring(0, itemsId.length - 1)
        remainingAmount = remainingAmount.substring(0, remainingAmount.length - 1)
        amount = amount.substring(0, amount.length - 1)
        let sales = {
            itemsId, amount, remainingAmount, totalPrice
        }
        console.log(sales)
        this.setState({isLoading: true})
        requestSalesInsert(sales).then((r) => {
            if (r.data.err_code === 0) {
                this.informAlert("Insert success", "success")
                let {userInput} = this.state
                for (let i=0;i<userInput.length;i++) {
                    this.rollBackArray(userInput[i][0], userInput[i][1])
                }
                userInput.splice(0, userInput.length)
                this.setState({userInput: userInput, gross: 0, VAT: 0, totalPrice: 0,})
            } else {
                // 服务器返回错误
                this.informAlert("Insert fail", "danger")
            }
            this.setState({isLoading: false})
        }).catch((err) => {
            this.informAlert(`Insert fail ${err}`, "danger")
            this.setState({isLoading: false})
            console.log(err)
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
            tmp["totalPrice"] = arr[2]
            return tmp;
        })
    }

    informAlert = (value, type) => {
        let {alert} = this.state
        alert.type = type ? type : "warning"
        alert.value = value ? value : "Error"
        alert.timeStamp = Date.now()
        this.setState({alert: alert})
    }

    transferMsg = (preMsg, newMsg, idx) => {
        let {userInput, products, services} = this.state
        let type = newMsg[0]
        let name = newMsg[1]
        let item
        switch (type) {
            case "products":
                item = products
                break
            case "services":
                item = services
                break
            default:
                break
        }
        // 接收type和name更新对应的userInput[idx]
        // 情况一：数量值更新
        userInput[idx][0] = newMsg[0]
        userInput[idx][1] = newMsg[1]
        if (preMsg[0] === newMsg[0] && preMsg[1] === newMsg[1]) {
            console.log(newMsg)
            userInput[idx][2] = newMsg[2]
            userInput[idx][3] = newMsg[3]
            userInput[idx][4] = newMsg[4]
            userInput[idx][5] = newMsg[5]
        } else {
            // 情况二：下拉更新
            // Unit Price	Amount	Remaining Amount	Total
            userInput[idx][2] = item[newMsg[1]].price
            userInput[idx][3] = 0
            userInput[idx][4] = item[newMsg[1]].amount
            userInput[idx][5] = item[newMsg[1]].price * 0
            // roll back
            this.rollBackArray(preMsg[0], preMsg[1])
            // filter
            this.filterTheArray(newMsg[0], newMsg[1])
        }
        let arr = this.calculateTotalPrice(userInput, this.state.isVAT)
        this.setState({
            userInput: userInput,
            gross: arr[0],
            VAT: arr[1],
            totalPrice: arr[2]
        })
    }

    fromPreRowContentToParent = (idx) => {
        let {userInput} = this.state
        this.rollBackArray(userInput[idx][0], userInput[idx][1])
        userInput.splice(idx, 1)
        if (userInput.length === 0) {
            this.setState({gross: 0, VAT: 0, totalPrice: 0,})
        }
        this.setState({userInput: userInput})
    }

    calculateTotalPrice = (arr, isVAT) => {
        let totalPrice = 0;
        let VAT;
        arr.map((item) => {
            totalPrice += parseFloat(item[5])
        })
        if (isVAT) {
            VAT = (totalPrice / 107) * 7
            return [(totalPrice - VAT).toFixed(2), VAT.toFixed(2), totalPrice.toFixed(2)]
        }
        return [totalPrice.toFixed(2), 0, totalPrice.toFixed(2)]
    }

    render() {
        let {userInput, gross, VAT, totalPrice, isDisableButton, isLoading, alert} = this.state
        return (
            <div>
                <MySpinner isLoading={isLoading}></MySpinner>
                <div className="text-right">
                    <button type="button" className="btn btn-light" style={{marginRight: "20px"}}>SAVE&PRINT</button>
                    <button className="btn btn-dark" type="submit" style={{position: "relative"}}
                            disabled={isLoading ? true : false}
                            onClick={this.handleSubmit}>
                            <span className={`spinner-border spinner-border-sm fade ${isLoading ? "show" : "d-none"}`}
                                  role="status" aria-hidden="true" style={{right: "5px", position: "relative"}}></span>
                        {
                            isLoading ? "Loading..." : "SAVE"
                        }
                    </button>
                </div>
                <br/>
                <Table hover responsive>
                    <thead>
                    <tr className="thead-dark">
                        {
                            this.state.fields.map(
                                (item, idx) => (
                                    <th key={idx} style={{width: "14.2%"}}>{item}</th>
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
                                               fromPreRowContentToParent={(idx) => this.fromPreRowContentToParent(idx)}
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
                        <td colSpan="6" className="text-right">Gross:</td>
                        <td>{gross}</td>
                    </tr>
                    <tr className="table-secondary">
                        <td colSpan="6" className="text-right">
                            <input type="checkbox" style={{marginRight: "10px"}} onChange={this.handleChange}/>
                            VAT:
                        </td>
                        <td>{VAT}</td>
                    </tr>
                    <tr className="table-secondary">
                        <td colSpan="6" className="text-right">Total Price:</td>
                        <td>{totalPrice}</td>
                    </tr>
                    </tbody>
                </Table>
                <div>
                    <button type="button" className="btn btn-primary" disabled={isDisableButton}
                        onClick={this.handleClick}>Add a new row
                </button>
                </div>
                <br/>
                <div>
                    <MyAlert type={alert.type} value={alert.value} timeStamp={alert.timeStamp}></MyAlert>
                </div>
            </div>
        )
    }
}