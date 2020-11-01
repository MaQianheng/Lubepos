import React from "react";
import {Form, Button} from "react-bootstrap";
import MyAlert from "../common/my-alert";
import {requestItemInsert} from "../../api";
import Select from 'react-select'

class FormAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: {
                name: "",
                type: {value: "products", label: "products"},
                brand: "",
                amount: "",
                price: ""
            },
            isLoading: false,
            alert: {
                type: "success",
                value: "success",
                timeStamp: Date.now()
            }
        };
    }

    informAlert = (value, type) => {
        let {alert} = this.state
        alert.type = type ? type : "warning"
        alert.value = value ? value : "Error"
        alert.timeStamp = Date.now()
        this.setState({alert: alert})
    }

    handleChange = (e) => {
        let {value} = e.target
        const key = e.target.getAttribute('name');
        let tmp = this.state.userInput
        tmp[key] = value
        this.setState({...this.state, userInput: tmp})
    }

    handleSelectChange = (value) => {
        let tmp = this.state.userInput
        tmp.type = value
        if (value.value === "services") {
            tmp["brand"] = ""
            tmp["amount"] = -1
        }
        if (value.value === "products") {
            tmp["amount"] = ""
        }
        this.setState({userInput: tmp})
        console.log(value)
    }

    handleClick = (e) => {
        e.preventDefault();
        // const {name, type, brand, amount, price} = this.state.userInput
        let {userInput, alert} = this.state
        for (let key in userInput) {
            if (key === "brand" && userInput.type.value === "services") {
                continue
            }
            if (!userInput[key]) {
                this.informAlert("One or more required fields are empty")
                return
            }
        }
        userInput = {...userInput, type: userInput.type.value}
        this.setState({isLoading: true})
        requestItemInsert(userInput).then(r => {
            this.setState({isLoading: false})
            // insert suc
            if (r.data.err_code === 0) {
                // amount: -1
                // brand: ""
                // name: "ubkhi"
                // price: 130
                // type: "services"
                // __v: 0
                // _id: "5f919134bf5afef228ea252b"
                this.props.fromFormToParent(userInput)
                userInput.name = ""
                userInput.brand = ""
                if (userInput.type === "services") {
                    userInput.amount = "-1"
                } else {
                    userInput.amount = ""
                }
                userInput.price = ""
                alert.type = "success"
                alert.value = "Insert success"
                alert.timeStamp = Date.now()
                this.setState({...this.state, userInput: userInput, isLoading: false, alert: alert})
            } else {
                alert.type = "danger"
                alert.value = `Insert fail ${r.data.message}`
                alert.timeStamp = Date.now()
                this.setState({...this.state, isLoading: false, alert: alert})
            }
            console.log(this.state)
            console.log(r)
        })
    }

    // transferMsg = (msg, label) => {
    //     let tmp = this.state.userInput
    //     tmp[label] = msg
    //     if (msg === "services") {
    //         tmp["brand"] = ""
    //         tmp["amount"] = -1
    //     }
    //     if (msg === "products") {
    //         tmp["amount"] = ""
    //     }
    //     this.setState({...this.state, userInput: tmp})
    // }

    render() {
        const {isLoading, userInput, alert} = this.state
        return (
            <Form>
                <Form.Row>
                    <div className="col-6 col-md-3">
                        <Form.Label>Name</Form.Label>
                        <input type="text" className="form-control" style={{textAlign: "left"}}
                               onChange={this.handleChange} name="name" value={userInput.name} disabled={isLoading}></input>
                    </div>

                    <div className="col-6 col-md-3">
                        <Form.Label>Type</Form.Label>
                        <Select
                            value={userInput.type}
                            options={[
                                {value: 'products', label: 'products'},
                                {value: 'services', label: 'services'}
                            ]}
                            isDisabled={isLoading}
                            onChange={this.handleSelectChange}
                        />
                    </div>

                    {/*<MyDropdown transferMsg={(msg, label) => this.transferMsg(msg, label)}*/}
                    {/*            data={["products", "services"]} label="type" value={userInput.type}></MyDropdown>*/}

                    <div className="col-6 col-md-3">
                        <Form.Label>Brand</Form.Label>
                        <fieldset disabled={(userInput.type.value === "products" ? false : true) || isLoading}>
                            <input type="text" className="form-control"
                                   style={{textAlign: "left", transition: "all .3s"}} onChange={this.handleChange}
                                   name="brand" value={userInput.brand}></input>
                        </fieldset>
                    </div>

                    <div className="col-6 col-md-3">
                        <Form.Label>Amount</Form.Label>
                        <fieldset disabled={(userInput.type.value === "products" ?  false : true) || isLoading}>
                            <input type="number" className="form-control"
                                   style={{textAlign: "left", transition: "all .3s"}} onChange={this.handleChange}
                                   name="amount" value={userInput.amount}></input>
                        </fieldset>
                    </div>

                    <div className="col-6 col-md-3">
                        <Form.Label>Price</Form.Label>
                        <input type="number" className="form-control" style={{textAlign: "left"}}
                               onChange={this.handleChange} name="price" value={userInput.price} disabled={isLoading}></input>
                    </div>

                    <div className="col-6 col-md-1">
                        <Button variant="primary" type="submit" style={{top: "30px", position: "relative"}}
                                disabled={isLoading ? true : false}
                                onClick={this.handleClick}>
                            <span className={`spinner-border spinner-border-sm fade ${isLoading ? "show" : "d-none"}`}
                                  role="status" aria-hidden="true" style={{right: "5px", position: "relative"}}></span>
                            {
                                isLoading ? "Loading..." : "Submit"
                            }
                        </Button>
                        {/*<button className="btn btn-primary" type="button" disabled>*/}
                        {/*    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>*/}
                        {/*    Loading...*/}
                        {/*</button>*/}
                    </div>
                </Form.Row>
                <br/>
                <Form.Row>
                    <MyAlert type={alert.type} value={alert.value} timeStamp={alert.timeStamp}
                             alertId="alert-items-form"></MyAlert>
                </Form.Row>
            </Form>
        )
    }
}

export default FormAdd;