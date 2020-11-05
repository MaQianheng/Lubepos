import React from "react";
import {Table} from "react-bootstrap";
import PreRowContent from "./preRowContent";
import MyAlert from "../common/my-alert";
import {requestItemsQuery, requestSalesInsert} from "../../api";
import MySpinner from "../common/my-spinner";
import {connect} from 'react-redux'
import {initItemsData} from "../../redux/action";
import CustomerInfo from "./customer-info";
import {compare} from "../../utils/normalUtils";
import ReactToPrint from 'react-to-print';
import ComponentToPrint from "./component-to-print";

class TableAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: ["Type", "Item", "Unit Price", "Amount", "Remaining Amount", "Total", "Action"],
            type: [
                {value: "products", label: "products"},
                {value: "services", label: "services"}
            ],
            productsName: [],
            servicesName: [],
            products: {},
            services: {},
            customerInfo: {
                customer: "",
                plateNumber: "",
                brand: "",
                model: ""
            },
            remainingLoad: 1,
            submitIsLoading: false,
            userInput: [],
            tmpUserInput: [],
            isDisableButton: false,
            isVAT: false,
            gross: 0,
            VAT: 0,
            totalPrice: 0,
            componentToPrintIsDisplay: false,
            alert: {
                type: "success",
                value: "success",
                timeStamp: Date.now()
            }
        }
    }

    componentDidMount() {
        this.organisingItems()
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
        };
    }

    organisingItems = () => {
        requestItemsQuery({currentPageCount: 0}).then((r) => {
            let {data} = r
            if (data.err_code === 0) {
                // let {products, services, productsName, servicesName} = this.state
                let products = {}, services = {}, productsName = [], servicesName = []
                for (let i = 0; i < data.items.length; i++) {
                    if (data.items[i].type === "products") {
                        productsName.push({value: data.items[i].name, label: data.items[i].name})
                        productsName = productsName.sort(compare("label"))
                        products[data.items[i].name] = {
                            amount: data.items[i].amount,
                            id: data.items[i]._id,
                            brand: data.items[i].brand,
                            price: data.items[i].price
                        }
                    } else {
                        servicesName.push({value: data.items[i].name, label: data.items[i].name})
                        servicesName = servicesName.sort(compare("label"))
                        services[data.items[i].name] = {
                            amount: data.items[i].amount,
                            id: data.items[i]._id,
                            brand: data.items[i].brand,
                            price: data.items[i].price
                        }
                    }
                }
                let {remainingLoad} = this.state
                this.setState({
                    remainingLoad: remainingLoad - 1,
                    products: products,
                    services: services,
                    productsName: productsName,
                    servicesName: servicesName,
                })
            } else {
                this.requestFail(data.message)
            }
        }).catch((err) => {
            this.requestFail(err)
            console.log(err)
        })
    }

    requestFail = (message) => {
        this.informAlert(`Request data fail ${message}`, "danger")
        let {remainingLoad} = this.state
        this.setState({
            isDisableButton: true,
            remainingLoad: remainingLoad - 1
        })
    }

    rollBackArray = (itemType, obj) => {
        let itemsArr
        if (this.state.productsName.length === 0 && this.state.servicesName.length === 0) {
            this.setState({isDisableButton: false})
        }
        switch (itemType.value) {
            case "products":
                itemsArr = this.state.productsName
                if (itemsArr.length === 0) {
                    let {type} = this.state
                    type.unshift({value: "products", label: "products"})
                    this.setState({type})
                }
                itemsArr.push(obj)
                itemsArr = itemsArr.sort(compare("label"))
                this.setState({productsName: itemsArr})
                break;
            case "services":
                itemsArr = this.state.servicesName
                if (itemsArr.length === 0) {
                    let {type} = this.state
                    type.push({value: "services", label: "services"})
                    this.setState({type})
                }
                itemsArr.push(obj)
                itemsArr = itemsArr.sort(compare("label"))
                this.setState({servicesName: itemsArr})
                break;
            default:
                break;
        }
    }

    // itemType = {}：要过滤的类型
    // obj = {}：要过滤的数据
    filterTheArray = (itemType, obj) => {
        let arr
        let value = obj.value
        let {productsName, servicesName, type} = this.state
        switch (itemType.value) {
            case "products":
                arr = productsName.filter(obj => obj.value !== value)
                if (arr.length === 0) {
                    this.setState({type: type.filter(obj => obj.value !== "products")})
                }
                if (type.length === 1 && servicesName.length !== 0) {
                    type.push({value: "services", label: "services"})
                    this.setState({type})
                }
                this.setState({productsName: arr})
                break;
            case "services":
                console.log(servicesName)
                arr = servicesName.filter(obj => obj.value !== value)
                if (arr.length === 0) {
                    this.setState({type: type.filter(obj => obj.value !== "services")})
                }
                if (type.length === 1 && productsName.length !== 0) {
                    type.unshift({value: "products", label: "products"})
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
            type = {value: "products", label: "products"}
            name = productsName[0].value ? {value: productsName[0].value, label: productsName[0].value} : ""
            remainingAmount = products[name.value].amount ? products[name.value].amount : 0
            price = products[name.value].price ? products[name.value].price : 0
        } else if (servicesName.length !== 0) {
            type = {value: "services", label: "services"}
            name = servicesName[0].value ? {value: servicesName[0].value, label: servicesName[0].value} : ""
            remainingAmount = services[name.value].amount ? services[name.value].amount : 0
            price = services[name.value].price ? services[name.value].price : 0
        } else {
            return
        }
        userInput.push([type, name, price, 0, remainingAmount, price * 0, remainingAmount])
        this.filterTheArray(type, name)
        this.calculateTotalPrice(userInput, this.state.isVAT)
        this.setState({
            userInput: userInput
        })
    }

    handleCheckBoxChange = (e) => {
        let isVAT = e.target.checked
        let {userInput} = this.state
        this.setState({isVAT})
        this.calculateTotalPrice(userInput, isVAT)
    }

    informAlert = (value, type) => {
        let {alert} = this.state
        alert.type = type ? type : "warning"
        alert.value = value ? value : "Error"
        alert.timeStamp = Date.now()
        this.setState({alert: alert})
    }

    fromPreRowContentTransferMsgToParent = (action, newMsg, idx) => {
        let {userInput, productsName, servicesName} = this.state
        let preRow = userInput[idx]
        let newRow = [...preRow]
        let tmp
        switch (action) {
            case "CHANGE TYPE":
                if (newMsg.value === preRow[0].value) {
                    return
                }
                this.rollBackArray(preRow[0], preRow[1])
                newRow[0] = newMsg
                if (newMsg.value === "products") {
                    newRow[1] = productsName[0]
                } else {
                    newRow[1] = servicesName[0]
                }
                this.filterTheArray(newRow[0], newRow[1])
                tmp = this.getItemData(newRow[0], newRow[1])
                newRow[2] = tmp.price
                newRow[3] = 0
                newRow[4] = tmp.amount
                newRow[5] = 0
                newRow[6] = tmp.amount
                userInput[idx] = newRow
                break
            case "CHANGE ITEM":
                if (newMsg.value === preRow[1].value) {
                    return
                }
                newRow[1] = newMsg
                this.rollBackArray(preRow[0], preRow[1])
                this.filterTheArray(preRow[0], newMsg)
                tmp = this.getItemData(newRow[0], newRow[1])
                newRow[2] = tmp.price
                newRow[3] = 0
                newRow[4] = tmp.amount
                newRow[5] = 0
                newRow[6] = tmp.amount
                userInput[idx] = newRow
                break
            case "REMOVE ROW":
                this.rollBackArray(preRow[0], preRow[1])
                userInput.splice(idx, 1)
                break
            case "UPDATE AMOUNT":
                userInput[idx] = newMsg
                break
            default:
                break
        }
        this.setState({userInput})
        this.calculateTotalPrice(userInput, this.state.isVAT)
    }

    fromCustomerInfoTransferMsgToParent = (customerInfo) => {
        this.setState({customerInfo})
    }

    getItemData = (type, item) => {
        switch (type.value) {
            case "products":
                let {products} = this.state
                return products[item.value]
            case "services":
                let {services} = this.state
                return services[item.value]
            default:
                break
        }
    }

    calculateTotalPrice = (arr, isVAT) => {
        let totalPrice = 0;
        let VAT = 0;
        arr.map((item) => {
            totalPrice += parseFloat(item[5])
        })
        if (isVAT) {
            VAT = (totalPrice / 107) * 7
        }
        this.setState({
            gross: (totalPrice - VAT).toFixed(2),
            VAT: VAT.toFixed(2),
            totalPrice: totalPrice.toFixed(2)
        })
    }

    handleSubmit = () => {
        let itemsId = "",
            itemsName = "",
            amount = "",
            unitPrice = "",
            price = ""
        // remainingAmount = ""
        let {userInput, products, services, totalPrice, customerInfo} = this.state
        if (userInput.length === 0) {
            this.informAlert("The form is empty")
            return
        }
        for (let i = 0; i < userInput.length; i++) {
            if (parseInt(userInput[i][3]) === 0) {
                this.informAlert("The amount should be at least 1")
                return
            }
            switch (userInput[i][0].value) {
                case "products":
                    itemsId += `${products[userInput[i][1].value].id},`
                    itemsName += `${userInput[i][1].value},`
                    break
                case "services":
                    itemsId += `${services[userInput[i][1].value].id},`
                    itemsName += `${userInput[i][1].value},`
                    break
                default:
                    this.informAlert("Please check your data")
                    return
            }
            unitPrice += `${userInput[i][2]},`
            amount += `${[userInput[i][3]]},`
            // remainingAmount += `${[userInput[i][4]]},`
            price += `${userInput[i][5]},`
        }
        if (!customerInfo.customer) {
            this.informAlert("The customer name is empty")
            return
        }
        let tmp = {
            id: customerInfo.customer.value,
            name: customerInfo.customer.label,
            plateNumber: customerInfo.plateNumber.value,
            brand: customerInfo.brand.value,
            model: customerInfo.model.value
        }
        itemsId = itemsId.substring(0, itemsId.length - 1)
        itemsName = itemsName.substring(0, itemsName.length - 1)
        amount = amount.substring(0, amount.length - 1)
        unitPrice = unitPrice.substring(0, unitPrice.length - 1)
        price = price.substr(0, price.length - 1)
        let sales = {
            itemsId, itemsName, amount, unitPrice, price, totalPrice, ...tmp
        }
        this.setState({remainingLoad: 1})
        console.log(sales)
        requestSalesInsert(sales).then((r) => {
            if (r.data.err_code === 0) {
                this.informAlert("Insert success", "success")
                let {userInput} = this.state
                for (let i = 0; i < userInput.length; i++) {
                    this.rollBackArray(userInput[i][0], userInput[i][1])
                }
                userInput.splice(0, userInput.length)
                this.setState({userInput: userInput, gross: 0, VAT: 0, totalPrice: 0,})
            } else {
                // 服务器返回错误
                this.requestFail(r.data.message)
            }
            this.componentDidMount()
            // this.setState({isLoading: false})
        }).catch((err) => {
            this.requestFail(err)
        })
    }

    test = () => {
        console.log(1)
    }

    render() {
        let {userInput, tmpUserInput, gross, VAT, totalPrice, isDisableButton, remainingLoad, alert, componentToPrintIsDisplay} = this.state
        return (
            <div>
                <MySpinner isLoading={remainingLoad !== 0}/>
                <CustomerInfo
                    fromCustomerInfoTransferMsgToParent={(customerInfo) => this.fromCustomerInfoTransferMsgToParent(customerInfo)}/>
                <br/>
                <div className="text-right">
                    <ReactToPrint
                        onBeforePrint={() => {
                            this.handleSubmit()
                            // tmpUserInput = [...userInput]
                            // componentToPrintIsDisplay = true
                        }}
                        onAfterPrint={() => {
                            // componentToPrintIsDisplay = false
                        }}
                        trigger={() => (
                            <button type="button" className="btn btn-light" style={{marginRight: "20px"}}
                                    disabled={remainingLoad !== 0}
                            >
                            <span
                                className={`spinner-border spinner-border-sm fade ${remainingLoad === 0 ? "d-none" : "show"}`}
                                role="status" aria-hidden="true" style={{right: "5px", position: "relative"}}/>
                                {
                                    remainingLoad === 0 ? "SAVE&PRINT" : "Loading..."
                                }
                            </button>
                        )}
                        content={() => this.componentRef}
                    />
                    <button className="btn btn-dark" type="submit" style={{position: "relative"}}
                            disabled={remainingLoad !== 0}
                            onClick={this.handleSubmit}>
                            <span
                                className={`spinner-border spinner-border-sm fade ${remainingLoad === 0 ? "d-none" : "show"}`}
                                role="status" aria-hidden="true" style={{right: "5px", position: "relative"}}/>
                        {
                            remainingLoad === 0 ? "SAVE" : "Loading..."
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
                                               fromPreRowContentTransferMsgToParent={(preMsg, newMsg, idx) => this.fromPreRowContentTransferMsgToParent(preMsg, newMsg, idx)}
                                               type={this.state.type}
                                               productsName={this.state.productsName}
                                               servicesName={this.state.servicesName}
                                               productsItems={this.state.products}
                                               servicesItems={this.state.services}
                                               userInput={item}/>
                            )
                        )
                    }
                    <tr className="table-secondary">
                        <td colSpan="6" className="text-right">Gross:</td>
                        <td>{gross}</td>
                    </tr>
                    <tr className="table-secondary">
                        <td colSpan="6" className="text-right">
                            <input type="checkbox" style={{marginRight: "10px"}} onChange={this.handleCheckBoxChange}/>
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
                    <MyAlert type={alert.type} value={alert.value} timeStamp={alert.timeStamp}
                             alertId="alert-table-add"/>
                </div>
                <ComponentToPrint userInput={userInput} gross={gross} VAT={VAT} totalPrice={totalPrice} ref={el => (this.componentRef = el)}/>
            </div>
        )
    }
}

export default connect(
    state => ({items: state.items}),
    {initItemsData}
)(TableAdd)