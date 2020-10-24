import React from "react";
import {Form, Button} from "react-bootstrap";
import {MyDropdown} from "../common/my-dropdown";
import MyAlert from "../common/my-alert";
import {requestItemInsert} from "../../api";

class FormAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: {
                name: "",
                type: "products",
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

    handleChange = (e) => {
        let {value} = e.target
        const key = e.target.getAttribute('name');
        let tmp = this.state.userInput
        tmp[key] = value
        this.setState({...this.state, userInput: tmp})
    }

    handleClick = (e) => {
        e.preventDefault();
        // const {name, type, brand, amount, price} = this.state.userInput
        const {userInput, alert} = this.state
        let validation = false
        switch (userInput.type) {
            case "products":
                if (userInput.name===""||userInput.type===""||userInput.brand===""||userInput.amount===""||userInput.price==="") {
                    validation = false
                } else {
                    validation = true
                }
                break
            case "services":
                if (userInput.name===""||userInput.type===""||userInput.price==="") {
                    validation = false
                } else {
                    validation = true
                }
                break
            default:
                break
        }

        if (!validation) {
            let {alert} = this.state
            alert.type = "warning"
            alert.value = "One or more required fields are empty"
            alert.timeStamp = Date.now()
            this.setState({...this.state, alert: alert})
            return
        }
        this.setState({isLoading: true})
        requestItemInsert(this.state.userInput).then(r => {
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
                userInput.amount = ""
                userInput.price = ""
                alert.type = "success"
                alert.value = "Insert success"
                alert.timeStamp = Date.now()
                this.setState({...this.state, userInput: userInput, isLoading: false, alert: alert})
            } else {
                alert.type = "danger"
                alert.value = "Insert fail"
                alert.timeStamp = Date.now()
                this.setState({...this.state, isLoading: false, alert: alert})
            }
            console.log(this.state)
            console.log(r)
        })
    }

    transferMsg = (msg, label) => {
        let tmp = this.state.userInput
        tmp[label] = msg
        if (msg === "services") {
            tmp["brand"] = ""
            tmp["amount"] = -1
        }
        this.setState({...this.state, userInput: tmp})
    }

    render() {
        const {isLoading, userInput, alert} = this.state
        return (
            <Form>
                <Form.Row>
                    <div className="col-6 col-md-3">
                        <Form.Label>Name</Form.Label>
                        <input type="text" className="form-control" style={{textAlign: "left"}}
                               onChange={this.handleChange} name="name" value={userInput.name}></input>
                    </div>

                    <MyDropdown transferMsg={(msg, label) => this.transferMsg(msg, label)}
                                data={["products", "services"]} label="type" value={userInput.type}></MyDropdown>

                    <div className="col-6 col-md-3">
                        <Form.Label>Brand</Form.Label>
                        <fieldset disabled={userInput.type === "products" ? false : true}>
                            <input type="text" className="form-control"
                                   style={{textAlign: "left", transition: "all .3s"}} onChange={this.handleChange}
                                   name="brand" value={userInput.brand}></input>
                        </fieldset>
                    </div>

                    <div className="col-6 col-md-3">
                        <Form.Label>Amount</Form.Label>
                        <fieldset disabled={userInput.type === "products" ? false : true}>
                            <input type="number" className="form-control"
                                   style={{textAlign: "left", transition: "all .3s"}} onChange={this.handleChange}
                                   name="amount" value={userInput.amount}></input>
                        </fieldset>
                    </div>

                    <div className="col-6 col-md-3">
                        <Form.Label>Price</Form.Label>
                        <input type="number" className="form-control" style={{textAlign: "left"}}
                               onChange={this.handleChange} name="price" value={userInput.price}></input>
                    </div>

                    <div className="col-6 col-md-1">
                        <Button variant="primary" type="submit" style={{top: "30px", position: "relative"}}
                                disabled={isLoading ? true : false}
                                onClick={this.handleClick}>
                            <span className={`spinner-border spinner-border-sm fade ${isLoading ? "show" : "d-none"}`} role="status" aria-hidden="true" style={{right: "5px", position: "relative"}}></span>
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
                    <MyAlert type={alert.type} value={alert.value} timeStamp={alert.timeStamp}></MyAlert>
                </Form.Row>
            </Form>
        )
    }
}

export default FormAdd;