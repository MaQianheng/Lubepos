import React from "react";
import {Table} from "react-bootstrap";
import PreRowContent from "./preRowContent";
import MyAlert from "../common/my-alert";
import {requestItemsQuery, requestSalesInsert, requestCustomersQuery, requestCarsQuery} from "../../api";
import MySpinner from "../common/my-spinner";
import {connect} from 'react-redux'
import {initItemsData} from "../../redux/action";
import {MyDropdown} from "../common/my-dropdown";

class TableAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: ["Type", "Item", "Unit Price", "Amount", "Remaining Amount", "Total", "Action"],
            type: ["products", "services"],
            productsName: [],
            servicesName: [],
            customersName: [""],
            customersId: [""],
            plateNumber: [""],
            products: {},
            services: {},
            // customers: {customerId: customerName}
            customers: {},
            remainingLoad: 3,
            submitIsLoading: false,
            userInput: [],
            currentCustomer: {
                id: "",
                name: "",
                plateNumber: "",
                brand: "",
                model: ""
            },
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

    organisingItems = () => {
        requestItemsQuery({currentPageCount: 0}).then((r) => {
            let {data} = r
            if (data.err_code === 0) {
                // let {products, services, productsName, servicesName} = this.state
                let products = {}, services = {}, productsName = [], servicesName = []
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
                // this.props.initItemsData({
                //     products: products,
                //     services: services,
                //     productsName: productsName,
                //     servicesName: servicesName
                // })
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

    organisingCustomers = () => {
        requestCustomersQuery({currentPageCount: 0}).then(async (r) => {
            let {data} = r
            if (data.err_code === 0) {
                let {customers} = data
                let customersName = []
                let customersId = []
                let _customers = {}
                for (let key in customers) {
                    customersName.push(customers[key].name)
                    customersId.push(customers[key]._id)
                }
                for (let i = 0; i < customers.length; i++) {
                    let obj = customers[i]
                    _customers[obj._id] = {
                        "name": obj.name
                    }
                }
                console.log(customersName)
                console.log(customersId)
                let {remainingLoad} = this.state
                await this.setState({
                    remainingLoad: remainingLoad - 1,
                    customers: _customers,
                    customersName,
                    customersId
                })
                this.organisingCars()
            } else {
                this.requestFail(data.message)
            }
        }).catch((err) => {
            this.requestFail(err)
            console.log(err)
        })
    }

    organisingCars = () => {
        requestCarsQuery({currentPageCount: 0}).then((r) => {
            let {data} = r
            // customers: {
            //     "customerId1": {
            //         "name": "xxx",
            //         "carPlate1": {
            //             "brand": "xx",
            //             "model": "xx",
            //         },
            //         "carPlate2": {
            //             "brand": "xx",
            //             "model": "xx",
            //         }
            //     },
            //     "customerId2": {
            //         "name": "xxx",
            //         "carPlate3": {
            //             "brand": "xx",
            //             "model": "xx",
            //         },
            //         "carPlate4": {
            //             "brand": "xx",
            //             "model": "xx",
            //         }
            //     },
            // },
            if (data.err_code === 0) {
                let {cars} = data
                // let customers = {}
                let {remainingLoad, customersId, customers} = this.state
                // 如果有customers
                if (customersId.length > 0) {
                    // 整理customers对象
                    for (let i = 0; i < cars.length; i++) {
                        let obj = cars[i]
                        // if (!(obj.owner._id in customers)) {
                        //     customers[obj.owner._id] = {}
                        // }
                        // customers[obj.owner._id]["name"] = obj.owner.name
                        customers[obj.owner._id][obj.plateNumber] = {
                            "brand": obj.brand,
                            "model": obj.model
                        }
                    }
                    let plateNumber = this.handleNameChange(customersId[0], customers)
                    this.setState({
                        remainingLoad: remainingLoad - 1,
                        customers,
                        plateNumber
                    })
                    console.log(customers, plateNumber)
                } else {
                    this.setState({
                        remainingLoad: remainingLoad - 1
                    })
                }
            } else {
                this.requestFail(data.message)
            }
        }).catch((err) => {
            this.requestFail(err)
            console.log(err)
        })
    }

    // setstate异步执行，所以要传入customers
    handleNameChange = (customerId, customers) => {
        let plateNumber = []
        // 判断该customer是否有car
        let currentCustomerCars = customers[customerId]
        for (let key in currentCustomerCars) {
            if (key !== "name") {
                plateNumber.push(key)
            }
        }
        if (plateNumber.length === 0) {
            plateNumber.push("")
        }
        let {currentCustomer} = this.state
        currentCustomer.id = customerId
        currentCustomer.name = customers[customerId].name
        currentCustomer.plateNumber = plateNumber[0]
        if (plateNumber[0] !== "") {
            currentCustomer.brand = customers[customerId][plateNumber[0]].brand
            currentCustomer.model = customers[customerId][plateNumber[0]].model
        } else {
            currentCustomer.brand = ""
            currentCustomer.model = ""
        }
        this.setState({currentCustomer})
        return plateNumber
    }

    handlePlateChange = (plateNumber) => {
        // customers: {
        //     "customerId1": {
        //         "name": "xxx",
        //         "carPlate1": {
        //             "brand": "xx",
        //             "model": "xx",
        //         },
        //         "carPlate2": {
        //             "brand": "xx",
        //             "model": "xx",
        //         }
        //     },
        //     "customerId2": {
        //         "name": "xxx",
        //         "carPlate3": {
        //             "brand": "xx",
        //             "model": "xx",
        //         },
        //         "carPlate4": {
        //             "brand": "xx",
        //             "model": "xx",
        //         }
        //     },
        // },

        // currentCustomer: {
        //     id: "",
        //     name: "",
        //     plateNumber: "",
        //     carBrand: "",
        //     carModel: ""
        // }
        let {currentCustomer, customers} = this.state
        let customerId = currentCustomer.id
        let customer = customers[customerId]
        console.log(customer, plateNumber, currentCustomer)
        currentCustomer.plateNumber = plateNumber
        currentCustomer.brand = customer[plateNumber].brand
        currentCustomer.model = customer[plateNumber].model
        this.setState({currentCustomer})
    }

    requestFail = (message) => {
        this.informAlert(`Request data fail ${message}`, "danger")
        let {remainingLoad} = this.state
        this.setState({
            isDisableButton: true,
            remainingLoad: remainingLoad - 1
        })
    }

    componentDidMount() {
        // this.setState({remainingLoad: 3})
        this.organisingItems()
        this.organisingCustomers()
        // this.organisingCars()
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
        };
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
        // 6: totalAmount
        userInput.push([type, name, price, 0, remainingAmount, price * 0, remainingAmount])
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
            itemsName = "",
            amount = "",
            unitPrice = "",
            price = "",
            remainingAmount = ""
        let {userInput, products, services, totalPrice, currentCustomer} = this.state
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
                    itemsId += `${products[userInput[i][1]].id},`
                    itemsName += `${userInput[i][1]},`
                    break
                case "services":
                    itemsId += `${services[userInput[i][1]].id},`
                    itemsName += `${userInput[i][1]},`
                    break
                default:
                    this.informAlert("Please check your data")
                    return
            }
            unitPrice += `${userInput[i][2]},`
            amount += `${[userInput[i][3]]},`
            remainingAmount += `${[userInput[i][4]]},`
            price += `${userInput[i][5]},`
        }
        if (!currentCustomer.name) {
            this.informAlert("The customer name is empty")
            return
        }
        itemsId = itemsId.substring(0, itemsId.length - 1)
        itemsName = itemsName.substring(0, itemsName.length - 1)
        remainingAmount = remainingAmount.substring(0, remainingAmount.length - 1)
        amount = amount.substring(0, amount.length - 1)
        unitPrice = unitPrice.substring(0, unitPrice.length - 1)
        price = price.substr(0, price.length - 1)
        let sales = {
            itemsId, itemsName, amount, remainingAmount, unitPrice, price, totalPrice, ...currentCustomer
        }
        console.log(sales)
        this.setState({remainingLoad: 3})
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
        // let name = newMsg[1]
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
            userInput[idx][2] = newMsg[2]
            userInput[idx][3] = newMsg[3]
            userInput[idx][4] = newMsg[4]
            userInput[idx][5] = newMsg[5]
            userInput[idx][6] = newMsg[6]
        } else {
            // 情况二：下拉更新
            // Unit Price	Amount	Remaining Amount	Total
            userInput[idx][2] = item[newMsg[1]].price
            userInput[idx][3] = 0
            userInput[idx][4] = item[newMsg[1]].amount
            userInput[idx][5] = item[newMsg[1]].price * 0
            userInput[idx][6] = item[newMsg[1]].amount
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

    handleDropDownChange = (msg, label, id) => {
        let {customers} = this.state
        switch (label) {
            case "customer name":
                let plateNumber = this.handleNameChange(id, customers)
                this.setState({plateNumber})
                break
            case "plate number":
                this.handlePlateChange(msg)
                break
            default:
                break
        }
    }

    fromPreRowContentToParent = (idx) => {
        let {userInput} = this.state
        this.rollBackArray(userInput[idx][0], userInput[idx][1])
        userInput.splice(idx, 1)
        console.log(userInput)
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
        let {userInput, gross, VAT, totalPrice, isDisableButton, remainingLoad, alert, currentCustomer, customersId, customersName, carsName, modelsName, plateNumber} = this.state
        return (
            <div>
                <MySpinner isLoading={remainingLoad === 0 ? false : true}></MySpinner>
                <div className="row">
                    <div className="col-xl-3">
                        <MyDropdown transferMsg={(msg, label, id) => this.handleDropDownChange(msg, label, id)}
                                    dataId={customersId}
                                    data={customersName} label="customer name" value={currentCustomer.name}
                                    control={true}></MyDropdown>
                    </div>
                    <div className="col-xl-3">
                        <MyDropdown transferMsg={(msg, label) => this.handleDropDownChange(msg, label)}
                                    data={plateNumber} label="plate number" value={currentCustomer.plateNumber}
                                    control={true}></MyDropdown>
                    </div>
                    <div className="col-xl-3">
                        <MyDropdown transferMsg={(msg, label) => this.handleDropDownChange(msg, label)}
                                    data={["a", "b"]} label="car brand" value={currentCustomer.brand} control={true}
                                    disabled={true}></MyDropdown>
                    </div>
                    <div className="col-xl-3">
                        <MyDropdown transferMsg={(msg, label) => this.handleDropDownChange(msg, label)}
                                    data={["a", "b"]} label="car model" value={currentCustomer.model}
                                    control={true} disabled={true}></MyDropdown>
                    </div>
                </div>
                <br/>
                <div className="text-right">
                    <button type="button" className="btn btn-light" style={{marginRight: "20px"}}>SAVE&PRINT
                    </button>
                    <button className="btn btn-dark" type="submit" style={{position: "relative"}}
                            disabled={remainingLoad === 0 ? false : true}
                            onClick={this.handleSubmit}>
                            <span
                                className={`spinner-border spinner-border-sm fade ${remainingLoad === 0 ? "d-none" : "show"}`}
                                role="status" aria-hidden="true" style={{right: "5px", position: "relative"}}></span>
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
                    <MyAlert type={alert.type} value={alert.value} timeStamp={alert.timeStamp}
                             alertId="alert-table-add"></MyAlert>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({items: state.items}),
    {initItemsData}
)(TableAdd)