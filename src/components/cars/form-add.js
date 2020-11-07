import React from "react";
import {Button, Form} from "react-bootstrap";
import "../common/my-dropdown.css";
import jsonData from "../../car_brand_model.json";
import ImageUploader from 'react-images-upload';
import MyAlert from "../common/my-alert";
import {requestCustomersQuery, requestCarInsert} from "../../api";
import Select from "react-select";

class CardFormAdd extends React.Component {
    constructor(props) {
        super(props);
        let brandPreContent = [];
        Object.keys(jsonData).map((v, i) => {
            brandPreContent.push({value: v, label: v})
        });
        let myDate = new Date();
        let modelPreContent = this.handleModelPreContent(brandPreContent[0].value)

        this.state = {
            colorPreContent: [
                {value: "WHITE", label: "WHITE"},
                {value: "BLACK", label: "BLACK"},
                {value: "PURPLE", label: "PURPLE"},
                {value: "BLUE", label: "BLUE"},
                {value: "NAVY", label: "NAVY"},
                {value: "GREEN", label: "GREEN"},
                {value: "YELLOW", label: "YELLOW"},
                {value: "ORANGE", label: "ORANGE"},
                {value: "RED", label: "RED"},
                {value: "เทา", label: "เทา"}
            ],
            // ownersCount: 0,
            brandPreContent: brandPreContent,
            modelPreContent: modelPreContent,
            ownerPreContent: [],
            userInput: {
                plateNumber: "",
                year: myDate.getFullYear(),
                color: "",
                owner: "",
                brand: brandPreContent[0],
                model: modelPreContent[0],
                oldCarImagesURLs: [],
                carImages: ""
            },
            isLoading: false,
            alert: {
                type: "success",
                value: "success",
                timeStamp: Date.now()
            }
        }
    }

    // componentWillReceiveProps(nextProps, nextContext) {
    //     console.log(nextProps)
    // }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log(prevProps)
    // }

    handleModelPreContent = (key) => {
        let modelPreContent = []
        for (let i = 0; i < jsonData[key].length; i++) {
            let tmp = jsonData[key][i]
            modelPreContent.push({value: tmp, label: tmp})
        }
        return modelPreContent
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

    handleColorChange = (v) => {
        let {userInput} = this.state
        if (userInput.color === v.value) {
            return
        }
        userInput.color = v.value
        this.setState({userInput})
    }

    handleBrandChange = (v) => {
        let {userInput, modelPreContent} = this.state
        if (userInput.brand.value === v.value) {
            return
        }
        modelPreContent = this.handleModelPreContent(v.value)
        userInput.brand = v
        userInput.model = modelPreContent[0]
        this.setState({userInput, modelPreContent})
    }

    handleModelChange = (v) => {
        let {userInput} = this.state
        if (userInput.model.value === v.value) {
            return
        }
        userInput.model = v
        this.setState({userInput})
    }

    handleOwnerChange = (v) => {
        let {userInput} = this.state
        if (userInput.owner === v.value) {
            return
        }
        userInput.owner = v.value
        this.setState({userInput})
    }


    handleClick = (e) => {
        e.preventDefault();
        let {userInput} = this.state
        if (!userInput.plateNumber || !userInput.year || !userInput.color || !userInput.owner || !userInput.brand || !userInput.model) {
            this.informAlert("One or more required fields are empty")
            return
        }
        this.setState({isLoading: true})
        userInput.brand = userInput.brand.value
        userInput.model = userInput.model.value
        console.log(userInput)
        requestCarInsert(userInput).then((r) => {
            if (r.data.err_code === 0) {
                this.props.fromFormToParent("REQUEST DATA", r.data.car)
                let date = new Date()
                userInput.plateNumber = ""
                userInput.year = date.getFullYear()
                // userInput.color = []
                // userInput.owner = []
                // userInput.brand = []
                // userInput.model = []
                userInput.carImages = ""
                let domCloseIcon = document.getElementsByClassName("deleteImage")
                for (let i = 0; i < domCloseIcon.length; i++) {
                    domCloseIcon[i].click()
                }
                this.informAlert("Insert success", "success")
                this.setState({userInput: userInput})
            } else {
                // 服务器返回错误
                this.informAlert(`Insert fail ${r.data.message}`, "danger")
                // this.setState({...this.state, isLoading: false})
            }
            this.setState({isLoading: false})
        }).catch((err) => {
            // 请求返回错误
            this.informAlert(`Insert fail ${err}`, "danger")
            this.setState({isLoading: false})
            console.log(err)
        })
    }

    onDrop = (picture) => {
        let {userInput} = this.state
        // userInput.carImages = userInput.carImages.concat(picture)
        userInput.carImages = picture
        this.setState({userInput: userInput});
    }

    requestData = (currentPageCount) => {
        this.setState({isLoading: true})
        requestCustomersQuery({currentPageCount}).then((r) => {
            if (r.data.err_code === 0) {
                let {ownerPreContent} = this.state
                for (let i = 0; i < r.data.customers.length; i++) {
                    ownerPreContent.push({value: r.data.customers[i]._id, label: r.data.customers[i].name})
                }
                // console.log(ownerPreContent)
                this.props.fromFormToParent("TRANSFER DATA", ownerPreContent)
                this.setState({
                    ownerPreContent,
                    // ownersCount: r.data.customersCount,
                    isLoading: false
                })
            } else {
                this.informAlert(`Request customer data fail ${r.data.message}`, "danger")
            }
        }).catch((err) => {
            this.informAlert(`Request customer data fail ${err}`, "danger")
            this.setState({isLoading: false})
            console.log(err)
        })
    }

    componentDidMount() {
        this.requestData(0)
    }

    render() {
        const {userInput, colorPreContent, brandPreContent, modelPreContent, ownerPreContent, isLoading, alert} = this.state
        return (
            <Form>
                <div className="row">
                    <div className="col-6 col-md-3">
                        <Form.Label>Plate Number</Form.Label>
                        <input type="text" className="form-control" style={{textAlign: "left"}}
                               onChange={this.handleChange} name="plateNumber" value={userInput.plateNumber}/>
                    </div>

                    <div className="col-6 col-md-3">
                        <Form.Label>Year</Form.Label>
                        <input type="number" className="form-control" style={{textAlign: "left"}}
                               onChange={this.handleChange} name="year" value={userInput.year}/>
                    </div>
                    <div className="col-6 col-md-3">
                        <Form.Label>Color</Form.Label>
                        <Select options={colorPreContent} onChange={this.handleColorChange}/>
                    </div>
                    <div className="col-6 col-md-3">
                        <Form.Label>Brand</Form.Label>
                        <Select value={userInput.brand} options={brandPreContent} onChange={this.handleBrandChange}/>
                    </div>
                    <div className="col-6 col-md-3">
                        <Form.Label>Model</Form.Label>
                        <Select value={userInput.model} options={modelPreContent} onChange={this.handleModelChange}/>
                    </div>
                    <div className="col-6 col-md-3">
                        <Form.Label>Owner</Form.Label>
                        <Select options={ownerPreContent} onChange={this.handleOwnerChange}/>
                    </div>
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
                    <div className="row-cols-2">
                        {/*{*/}
                        {/*    data.imageURLs*/}
                        {/*        ?*/}
                        {/*        data.imageURLs.map((item, idx) => (*/}
                        {/*            <div className="col" style={{display: "inline-block"}} key={idx}>*/}
                        {/*                <img src={`http://127.0.0.1:4000/images/${item}`} alt=""*/}
                        {/*                     className="img-thumbnail"*/}
                        {/*                     style={{width: "-webkit-fill-available"}}*/}
                        {/*                />*/}
                        {/*                <button type="button" className="close" aria-label="Close" style={{*/}
                        {/*                    position: "absolute",*/}
                        {/*                    top: "10px",*/}
                        {/*                    right: "30px"*/}
                        {/*                }}>*/}
                        {/*                    <span aria-hidden="true">&times;</span>*/}
                        {/*                </button>*/}
                        {/*            </div>*/}
                        {/*        ))*/}
                        {/*        :*/}
                        {/*        null*/}
                        {/*}*/}
                    </div>
                </div>
                <br/>
                <Form.Row>
                    <div className="col-6 col-md-1">
                        <Button variant="primary" type="submit" style={{position: "relative"}}
                                disabled={!!isLoading}
                                onClick={this.handleClick}>
                            <span className={`spinner-border spinner-border-sm fade ${isLoading ? "show" : "d-none"}`}
                                  role="status" aria-hidden="true" style={{right: "5px", position: "relative"}}/>
                            {
                                isLoading ? "Loading..." : "Save"
                            }
                        </Button>
                    </div>
                </Form.Row>
                <br/>
                <Form.Row>
                    <MyAlert type={alert.type} value={alert.value} timeStamp={alert.timeStamp}
                             alertId="alert-cars-form"/>
                </Form.Row>

            </Form>
        )
    }
}

export default CardFormAdd;