import React from "react";
import {MyDropdown} from "../common/my-dropdown";
import {requestCustomersQuery, requestCarsQuery} from "../../api";
import MyAlert from "../common/my-alert";
import Select from "react-select";
import {compare} from "../../utils/normalUtils";

export default class CustomerInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            cars: [],
            customersName: [],
            customersId: [],
            plateNumber: [],
            currentCustomer: {
                customer: [],
                plateNumber: [],
                brand: {value: "", label: ""},
                model: {value: "", label: ""}
            },
            alert: {
                type: "success",
                value: "success",
                timeStamp: Date.now()
            }
        }
    }

    componentDidMount() {
        this.organisingCars()
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {};
    }

    requestFail = (message) => {
        this.informAlert(`Request data fail ${message}`, "danger")
        this.setState({
            isDisableButton: true,
            // remainingLoad: remainingLoad - 1
        })
    }

    informAlert = (value, type) => {
        let {alert} = this.state
        alert.type = type ? type : "warning"
        alert.value = value ? value : "Error"
        alert.timeStamp = Date.now()
        this.setState({alert: alert})
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
                let _cars = {}
                for (let i = 0; i < cars.length; i++) {
                    let obj = cars[i]
                    if (!(obj.owner._id in _cars)) {
                        _cars[obj.owner._id] = {}
                    }
                    _cars[obj.owner._id][obj.plateNumber] = {
                        "brand": obj.brand,
                        "model": obj.model
                    }
                }
                this.setState({cars: _cars})
                this.organisingCustomers()
            } else {
                this.requestFail(data.message)
            }
        }).catch((err) => {
            this.requestFail(err)
        })
    }

    organisingCustomers = () => {
        requestCustomersQuery({currentPageCount: 0}).then(async (r) => {
            let {data} = r
            if (data.err_code === 0) {
                let {customers} = data
                let _customers = []
                for (let i = 0; i < customers.length; i++) {
                    _customers.push({value: customers[i]._id, label: customers[i].name})
                }
                _customers.sort(compare("label"))
                this.setState({
                    customers: _customers,
                })
            } else {
                this.requestFail(data.message)
            }
        }).catch((err) => {
            this.requestFail(err)
        })
    }

    handleNameDropDownChange = (v) => {
        let {currentCustomer, plateNumber, cars} = this.state
        currentCustomer.customer = v
        currentCustomer.plateNumber = []
        currentCustomer.brand = {value: "", label: ""}
        currentCustomer.model = {value: "", label: ""}
        plateNumber = []
        if (v.value in cars) {
            Object.keys(cars[v.value]).forEach((item, idx) => {
                plateNumber.push({value: item, label: item})
            })
        }
        this.props.fromCustomerInfoTransferMsgToParent(currentCustomer)
        this.setState({currentCustomer, plateNumber})
    }

    handlePlateDropDownChange = (v) => {
        let {currentCustomer, cars} = this.state
        currentCustomer.plateNumber = v
        let id = currentCustomer.customer.value
        let objCar = cars[id]
        let {brand, model} = objCar[v.value]
        currentCustomer.brand = {value: brand, label: brand}
        currentCustomer.model = {value: model, label: model}
        this.props.fromCustomerInfoTransferMsgToParent(currentCustomer)
        this.setState({currentCustomer})
    }

    // // setstate异步执行，所以要传入customers
    // handleNameChange = (customerId, customers) => {
    //     let plateNumber = []
    //     // 判断该customer是否有car
    //     let currentCustomerCars = customers[customerId]
    //     for (let key in currentCustomerCars) {
    //         if (key !== "name") {
    //             plateNumber.push(key)
    //         }
    //     }
    //     if (plateNumber.length === 0) {
    //         plateNumber.push("")
    //     }
    //     let {currentCustomer} = this.state
    //     currentCustomer.id = customerId
    //     currentCustomer.name = customers[customerId].name
    //     currentCustomer.plateNumber = plateNumber[0]
    //     if (plateNumber[0] !== "") {
    //         currentCustomer.brand = customers[customerId][plateNumber[0]].brand
    //         currentCustomer.model = customers[customerId][plateNumber[0]].model
    //     } else {
    //         currentCustomer.brand = ""
    //         currentCustomer.model = ""
    //     }
    //     this.setState({currentCustomer})
    //     return plateNumber
    // }
    //
    // handlePlateChange = (value) => {
    //     let {customers, plateNumber, currentCustomer} = this.state
    //     console.log(value)
    //     currentCustomer.plateNumber = ""
    //     currentCustomer.brand = ""
    //     currentCustomer.model = ""
    //     plateNumber = []
    //     if (value.cars) {
    //         Object.keys(value.cars).forEach((item, idx) => {
    //             plateNumber.push({value: item, label: item})
    //         })
    //     }
    //     this.setState({currentCustomer, plateNumber})
    // }

    render() {
        let {customersId, customers, currentCustomer, plateNumber, alert} = this.state
        return (
            <div className="row">
                <div className="col-xl-3">
                    <label>Customer name</label>
                    <Select onChange={this.handleNameDropDownChange} value={currentCustomer.customer}
                            options={customers}/>
                    {/*<MyDropdown transferMsg={(msg, label, id) => this.handleDropDownChange(msg, label, id)}*/}
                    {/*            dataId={customersId}*/}
                    {/*            data={customersName} label="customer name" value={currentCustomer.name}*/}
                    {/*            control={true}></MyDropdown>*/}
                </div>
                <div className="col-xl-3">
                    <label>Plate number</label>
                    <Select onChange={this.handlePlateDropDownChange} value={currentCustomer.plateNumber}
                            options={plateNumber}/>
                    {/*<MyDropdown transferMsg={(msg, label) => this.handleDropDownChange(msg, label)}*/}
                    {/*            data={plateNumber} label="plate number" value={currentCustomer.plateNumber}*/}
                    {/*            control={true}></MyDropdown>*/}
                </div>
                <div className="col-xl-3">
                    <label>Car brand</label>
                    <Select isDisabled={true} value={currentCustomer.brand}/>
                    {/*<MyDropdown transferMsg={(msg, label) => this.handleDropDownChange(msg, label)}*/}
                    {/*            data={["a", "b"]} label="car brand" value={currentCustomer.brand} control={true}*/}
                    {/*            disabled={true}></MyDropdown>*/}
                </div>
                <div className="col-xl-3">
                    <label>Car model</label>
                    <Select isDisabled={true} value={currentCustomer.model}/>
                    {/*<MyDropdown transferMsg={(msg, label) => this.handleDropDownChange(msg, label)}*/}
                    {/*            data={["a", "b"]} label="car model" value={currentCustomer.model}*/}
                    {/*            control={true} disabled={true}></MyDropdown>*/}
                </div>
                <div className="col">
                    <MyAlert type={alert.type} value={alert.value} timeStamp={alert.timeStamp}
                             alertId="alert-request-customer-info"></MyAlert>
                </div>
            </div>
        );
    }
}