import React from "react";
import {Form, Button} from "react-bootstrap";
import MyAlert from "../common/my-alert";
import {requestCustomerInsert} from "../../api";

class FormAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: {
                name: "",
                phone: "",
                email: ""
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
        this.setState({...this.state, alert: alert})
    }

    handleChange = (e) => {
        let {value} = e.target
        const key = e.target.getAttribute('name');
        if (key === "phone") {
            let re = /^[0-9]*$/;
            if (!re.test(value)) {
                return
            }
        }
        let {userInput} = this.state
        userInput[key] = value
        this.setState({...this.state, userInput: userInput})
    }

    handleClick = (e) => {
        e.preventDefault();
        const {userInput} = this.state
        if (!userInput.name) {
            this.informAlert("Name is empty")
            return
        }
        let rePhone = /^(09)\d{8}$/;
        if (!rePhone.test(userInput.phone)) {
            this.informAlert("Phone number format is not correct")
            return
        }
        let reEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!reEmail.test(userInput.email)) {
            this.informAlert("Email format is not correct")
            return
        }
        this.setState({isLoading: true})
        requestCustomerInsert(userInput).then((r) => {
            if (r.data.err_code === 0) {
                this.props.fromFormToParent(userInput)
                userInput.name = ""
                userInput.phone = ""
                userInput.email = ""
                this.informAlert("Insert success", "success")
                this.setState({...this.state, userInput: userInput})
            } else {
                // 服务器返回错误
                this.informAlert("Insert fail", "danger")
                // this.setState({...this.state, isLoading: false})
            }
            this.setState({...this.state, isLoading: false})
        }).catch((err) => {
            // 请求返回错误
            this.informAlert(`Insert fail ${err}`, "danger")
            this.setState({...this.state, isLoading: false})
            console.log(err)
        })
    }

    render() {
        const {userInput, isLoading, alert} = this.state
        return (
            <Form>
                <Form.Row>
                    <div className="col-6 col-md-3">
                        <Form.Label>Name</Form.Label>
                        <input type="text" className="form-control" style={{textAlign: "left"}}
                               onChange={this.handleChange} name="name" value={userInput.name}></input>
                    </div>

                    <div className="col-6 col-md-3">
                        <Form.Label>Phone</Form.Label>
                        <input type="text" className="form-control" style={{textAlign: "left"}}
                               onChange={this.handleChange} name="phone" value={userInput.phone}></input>
                    </div>

                    <div className="col-6 col-md-3">
                        <Form.Label>Email</Form.Label>
                        <input type="email" className="form-control" style={{textAlign: "left"}}
                               onChange={this.handleChange} name="email" value={userInput.email}></input>
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
                    </div>
                    {/*<div className="col-6 col-md-2">*/}
                    {/*    <div className="alert alert-danger" role="alert" id="div-alert"*/}
                    {/*         style={{position: "relative", top: "20px", display: "none"}}></div>*/}
                    {/*</div>*/}
                </Form.Row>
                <br/>
                <Form.Row>
                    <MyAlert type={alert.type} value={alert.value} timeStamp={alert.timeStamp} alertId="alert-customers-form"></MyAlert>
                </Form.Row>

            </Form>
        )
    }
}

export default FormAdd;