import React from "react";
import {Form,Button} from "react-bootstrap";
import {MyDropdown} from "../common/my-dropdown";

class FormAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            name: "",
            type: "products",
            brand: "",
            amount: "",
            price: ""
        };
    }

    handleChange = (e) => {
        let {value} = e.target
        const key = e.target.getAttribute('name');
        this.setState(prevState => {
            let tmp = Object.assign({}, prevState);
            tmp[key] = value
            return tmp;
        })
    }

    handleClick = (e) => {
        e.preventDefault();
        console.log(this.state)
    }

    transferMsg = (msg, label) => {
        // this.setState({type: msg})
        this.setState(prevState => {
            let tmp = Object.assign({}, prevState);
            tmp[label] = msg
            if (msg === "services") {
                tmp["brand"] = ""
                tmp["amount"] = ""
            }
            return tmp;
        })
    }

    render () {
        return(
            <Form>
                <Form.Row>
                    <div className="col-6 col-md-3">
                        <Form.Label>Name</Form.Label>
                        <input type="text" className="form-control" style={{textAlign:"left"}} onChange={this.handleChange} name="name" value={this.state.name}></input>
                    </div>

                    <MyDropdown transferMsg = {(msg, label) => this.transferMsg(msg, label)} data={["products", "services"]} label="type" value={this.state.type}></MyDropdown>

                    <div className="col-6 col-md-3">
                        <Form.Label>Brand</Form.Label>
                        <fieldset disabled={this.state.type === "products" ? false : true}>
                            <input type="text" className="form-control" style={{textAlign:"left", transition: "all .3s"}} onChange={this.handleChange} name="brand" value={this.state.brand}></input>
                        </fieldset>
                    </div>

                    <div className="col-6 col-md-3">
                        <Form.Label>Amount</Form.Label>
                        <fieldset disabled={this.state.type === "products" ? false : true}>
                            <input type="number" className="form-control" style={{textAlign:"left", transition: "all .3s"}} onChange={this.handleChange} name="amount" value={this.state.amount}></input>
                        </fieldset>
                    </div>

                    <div className="col-6 col-md-3">
                        <Form.Label>Price</Form.Label>
                        <input type="number" className="form-control" style={{textAlign:"left"}} onChange={this.handleChange} name="price" value={this.state.price}></input>
                    </div>

                    <div className="col-6 col-md-1">
                        <Button variant="primary" type="submit" style={{top: "30px",position: "relative"}} onClick={this.handleClick}>
                            Submit
                        </Button>
                    </div>

                    <div className="col-6 col-md-2">
                        <div className="alert alert-danger" role="alert" id="div-alert" style={{position: "relative",top: "20px", display: "none"}}></div>
                    </div>
                </Form.Row>
            </Form>
        )
    }
}

export default FormAdd;