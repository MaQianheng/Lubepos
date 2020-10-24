import React from "react";
import {Button, Form} from "react-bootstrap";
import {MyDropdown} from "../common/my-dropdown";
import "../common/my-dropdown.css";
import jsonData from "../../car_brand_model.json";
import ImageUploader from 'react-images-upload';
import MyAlert from "../common/my-alert";
import {requestCustomersQuery, requestCarInsert} from "../../api";

class CardFormAdd extends React.Component {
    constructor(props) {
        super(props);
        let brandPreContent = [];
        Object.keys(jsonData).map((v, i) => {
            brandPreContent.push(v)
        });
        let myDate = new Date();
        let modelPreContent = jsonData[brandPreContent[0]];
        this.state = {
            colorPreContent: ["WHITE", "BLACK", "PURPLE", "BLUE", "NAVY", "GREEN", "YELLOW", "ORANGE", "RED", "เทา"],
            ownersId: [],
            ownersName: [],
            ownersCount: 0,
            brandPreContent: brandPreContent,
            modelPreContent: modelPreContent,
            userInput: {
                plateNumber: "",
                year: myDate.getFullYear(),
                color: "WHITE",
                owner: "",
                ownerId: "",
                brand: brandPreContent[0],
                model: modelPreContent[0],
                carImages: ""
            },
            alert: {
                type: "success",
                value: "success",
                timeStamp: Date.now()
            }
        }
    }

    transferMsg = (msg, label, dataId) => {
        let key = ""
        let {userInput} = this.state
        switch (label) {
            case "color":
                key = "color";
                break;
            case "owner":
                key = "owner";
                userInput.ownerId = dataId
                this.setState({...this.state, userInput: userInput})
                break;
            case "brand":
                key = "brand";
                let tmp = jsonData[msg]
                userInput["model"] = tmp[0]
                let {state} = this
                state.userInput = userInput
                state.modelPreContent = tmp
                this.setState(state)
                break;
            case "model":
                key = "model";
                break;
            default:
                break;
        }
        userInput[key] = msg
        this.setState({...this.state, userInput: userInput})
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
        this.setState(prevState => {
            let userInput = Object.assign({}, prevState.userInput);
            userInput[key] = value
            return {userInput};
        })
    }

    handleClick = (e) => {
        e.preventDefault();
        let {userInput} = this.state
        if (!userInput.plateNumber || !userInput.year || !userInput.color || !userInput.owner || !userInput.brand || !userInput.model) {
            this.informAlert("One or more required fields are empty")
            return
        }
        this.setState({isLoading: true})
        requestCarInsert(userInput).then((r) => {
            if (r.data.err_code === 0) {
                this.props.fromFormToParent(r.data.car)
                let date = new Date()
                userInput.plateNumber = ""
                userInput.year = date.getFullYear()
                userInput.color = "WHITE"
                userInput.owner = ""
                userInput.ownerId = ""
                // userInput.brand = this.brandPreContent[0]
                // userInput.model = this.modelPreContent[0]
                userInput.carImages = ""
                let domCloseIcon = document.getElementsByClassName("deleteImage")
                for (let i = 0; i < domCloseIcon.length; i++) {
                    domCloseIcon[i].click()
                }
                this.informAlert("Insert success", "success")
                this.setState({...this.state, userInput: userInput})
            } else {
                // 服务器返回错误
                this.informAlert("Insert fail", "danger")
                // this.setState({...this.state, isLoading: false})
            }
            this.setState({...this.state, isLoading: false})
            console.log(this.state)
        }).catch((err) => {
            // 请求返回错误
            this.informAlert(`Insert fail ${err}`, "danger")
            this.setState({...this.state, isLoading: false})
            console.log(err)
        })
        // this.setState(prevState => {
        //     let alert = Object.assign({}, prevState.alert);
        //     alert["type"] = "success"
        //     alert["value"] = "success"
        //     alert["timeStamp"] = Date.now()
        //     return {alert};
        // })
        // console.log(this.state);
    }

    onDrop = (picture) => {
        let {userInput} = this.state
        // userInput.carImages = userInput.carImages.concat(picture)
        userInput.carImages = picture
        this.setState({...this.state, userInput: userInput});
    }

    requestData = (pageCount) => {
        this.setState({isLoading: true})
        requestCustomersQuery({}).then((r) => {
            if (r.data.err_code === 0) {
                let {ownersId, ownersName} = this.state
                for (let i = 0; i < r.data.customers.length; i++) {
                    ownersId.push(r.data.customers[i]._id)
                    ownersName.push(r.data.customers[i].name)
                }
                console.log(ownersId)
                this.setState({
                    ownersId: ownersId,
                    ownersName: ownersName,
                    ownersCount: r.data.customersCount,
                    isLoading: false
                })
            } else {
            }
        }).catch((err) => {
            // this.informAlert("Insert success", "success")
            // this.setState({...this.state, userInput: userInput})
        })
        // 0: {name: "Qianheng Ma", phone: "0999999999", email: "lll@gmail.com"}
        // 1: {name: "customer2", phone: "0999999999", email: "customer2@gamil.com"}
        // 2: {name: "customer3", phone: "0992222222", email: "customer3@gmail.com"}
        // 3: {name: "customer4", phone: "0999999999", email: "customer3@gmail.com"}

    }

    componentDidMount() {
        this.requestData()
    }

    render() {
        console.log(this.state)
        const {userInput, colorPreContent, ownersId, ownersName, brandPreContent, modelPreContent, isLoading, alert} = this.state
        return (
            <Form>
                <div className="row">
                    <div className="col-6 col-md-3">
                        <Form.Label>Plate Number</Form.Label>
                        <input type="text" className="form-control" style={{textAlign: "left"}}
                               onChange={this.handleChange} name="plateNumber" value={userInput.plateNumber}></input>
                    </div>

                    <div className="col-6 col-md-3">
                        <Form.Label>Year</Form.Label>
                        <input type="number" className="form-control" style={{textAlign: "left"}}
                               onChange={this.handleChange} name="year" value={userInput.year}></input>
                    </div>
                    <MyDropdown transferMsg={(msg, label) => this.transferMsg(msg, label)} data={colorPreContent}
                                label="color" value={userInput.color}></MyDropdown>
                    <MyDropdown transferMsg={(msg, label, dataId) => this.transferMsg(msg, label, dataId)}
                                data={ownersName} dataId={ownersId}
                                label="owner" value={userInput.owner}></MyDropdown>
                    <MyDropdown transferMsg={(msg, label) => this.transferMsg(msg, label)} data={brandPreContent}
                                label="brand" value={userInput.brand}></MyDropdown>
                    <MyDropdown transferMsg={(msg, label) => this.transferMsg(msg, label)} data={modelPreContent}
                                label="model" value={userInput.model}></MyDropdown>
                    <div className="col-6 col-md-3">
                    </div>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', 'jpeg', '.gif', '.png']}
                        label="Max file size: 5mb, accepted: jpg|jpeg|gif|png"
                        maxFileSize={5242880}
                        withPreview={true}
                    />
                </div>
                <br/>
                <Form.Row>
                    <div className="col-6 col-md-1">
                        <Button variant="primary" type="submit" style={{position: "relative"}}
                                disabled={isLoading ? true : false}
                                onClick={this.handleClick}>
                            <span className={`spinner-border spinner-border-sm fade ${isLoading ? "show" : "d-none"}`}
                                  role="status" aria-hidden="true" style={{right: "5px", position: "relative"}}></span>
                            {
                                isLoading ? "Loading..." : "Submit"
                            }
                        </Button>
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

export default CardFormAdd;