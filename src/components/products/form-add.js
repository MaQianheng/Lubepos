import React from "react";
import {Form,Button} from "react-bootstrap";
import $ from "jquery";

class FormAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            name: "",
            phone: "",
            email: ""
        };
    }

    handleChange = (e) => {
        let {value} = e.target
        const key = e.target.getAttribute('name');
        if (key == "phone") {
            let re = /^[0-9]*$/;
            if (!re.test(value)){
                return
            }
        }
        this.setState(prevState => {
            let tmp = Object.assign({}, prevState.userInput);
            tmp[key] = value
            return tmp;
        })
    }
    handleClick = (e) => {
        e.preventDefault();
        let rePhone = /^(09)\d{8}$/;
        if (!this.state.name) {
            $("#div-alert").html("Name is empty").fadeIn(100)
            return
        }
        if (!rePhone.test(this.state.phone)) {
            $("#div-alert").html("Phone format does not match").fadeIn(100)
            return
        }
        let reEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!reEmail.test(this.state.email)) {
            $("#div-alert").html("Email format does not match").fadeIn(100)
            return
        }
        $("#div-alert").fadeOut(100)
        console.log(this.state)
    }

    render () {
        return(
            <Form>
                <Form.Row>
                    <div className="col-6 col-md-3">
                        <Form.Label>Name</Form.Label>
                        <input type="text" className="form-control" style={{textAlign:"left"}} onChange={this.handleChange} name="name" value={this.state.name}></input>
                    </div>

                    <div className="col-6 col-md-3">
                        <Form.Label>Phone</Form.Label>
                        <input type="text" className="form-control" style={{textAlign:"left"}} onChange={this.handleChange} name="phone" value={this.state.phone}></input>
                    </div>

                    <div className="col-6 col-md-3">
                        <Form.Label>Email</Form.Label>
                        <input type="email" className="form-control" style={{textAlign:"left"}} onChange={this.handleChange} name="email" value={this.state.email}></input>
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
                <br/>
                <Form.Row>

                </Form.Row>
                <br/>


            </Form>
        )
    }
}

export default FormAdd;