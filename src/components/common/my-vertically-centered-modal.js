import {Button, Modal, ListGroup} from "react-bootstrap";
import Select from "react-select";
import ImageUploader from 'react-images-upload';
import React from "react";
import jsonData from "../../car_brand_model.json";
import {requestCarUpdate} from "../../api";
import MyAlert from "./my-alert";

export default class MyVerticallyCenteredModal extends React.Component {
    constructor(props) {
        super(props);

        let brandPreContent = [];
        Object.keys(jsonData).map((v, i) => {
            brandPreContent.push({value: v, label: v})
        });
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
            isLoading: false,
            brandPreContent: brandPreContent,
            modelPreContent: modelPreContent,
            ownerPreContent: [],
            editingData: {
                brand: "",
                color: "",
                model: "",
                imageURLs: [],
                carImages: [],
                owner: "",
                plateNumber: "",
                year: "",
                _id: ""
            },
            alert: {
                type: "success",
                value: "success",
                timeStamp: Date.now()
            }
        }
        // console.log(data)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps)
        let {editingData, modelPreContent} = this.state
        editingData = {...nextProps.editingdata}
        if (editingData.brand) {
            modelPreContent = this.handleModelPreContent(editingData.brand)
        } else {
            modelPreContent = []
        }
        editingData.brand = {value: editingData.brand, label: editingData.brand}
        editingData.color = {value: editingData.color, label: editingData.color}
        editingData.model = {value: editingData.model, label: editingData.model}
        editingData.owner = {value: editingData.owner._id, label: editingData.owner.name}
        editingData.carImages = []
        this.setState({editingData, modelPreContent, ownerPreContent: nextProps.ownerprecontent})
    }

    handleModelPreContent = (key) => {
        let modelPreContent = []
        for (let i = 0; i < jsonData[key].length; i++) {
            let tmp = jsonData[key][i]
            modelPreContent.push({value: tmp, label: tmp})
        }
        return modelPreContent
    }

    onDrop = (picture) => {
        let {editingData} = this.state
        editingData.carImages = picture
        this.setState({editingData: editingData});
    }

    informAlert = (value, type) => {
        let {alert} = this.state
        alert.type = type ? type : "warning"
        alert.value = value ? value : "Error"
        alert.timeStamp = Date.now()
        this.setState({alert: alert})
    }

    handleOwnerChange = (v) => {
        let {editingData} = this.state
        editingData.owner = v
        this.setState({editingData})
    }

    handlePlateChange = (e) => {
        let {editingData} = this.state
        editingData.plateNumber = e.target.value
        this.setState({editingData})
    }

    handleYearChange = (e) => {
        let {editingData} = this.state
        editingData.year = e.target.value
        this.setState({editingData})
    }

    handleColorChange = (v) => {
        let {editingData} = this.state
        editingData.color = v
        this.setState({editingData})
    }

    handleBrandChange = (v) => {
        let {editingData, modelPreContent} = this.state
        editingData.brand = v
        modelPreContent = this.handleModelPreContent(editingData.brand.value)
        editingData.model = modelPreContent[0]
        this.setState({editingData, modelPreContent})
    }

    handleModelChange = (v) => {
        let {editingData} = this.state
        editingData.model = v
        this.setState({editingData})
    }

    handleImageCloseCLick = (e) => {
        let {editingData} = this.state
        let idx = e.target.getAttribute("idx")
        editingData.imageURLs.splice(parseInt(idx), 1)
        this.setState({editingData})
    }

    handleUpdate = () => {
        // brand: {value: "Avanti", label: "Avanti"}
        // color: {value: "BLACK", label: "BLACK"}
        // imageURLs: (2) ["4414ba7cee277ccd34c5899eb6b37e7a.jpeg", "e313903b8cb3c17cb07fc4342a8b681f.jpeg"]
        // model: {value: "Coupe", label: "Coupe"}
        // newImages: [File]
        // owner: {value: "5f9aeb34b680344055bc4156", label: "3"}
        // plateNumber: "214522"
        // year: "2015"
        // _id: "5f9b7bb8bdf6ca4b7d11a3fe"
        let {editingData} = this.state
        let tmp = {...editingData, imageURLs: editingData.imageURLs.join(","), brand: editingData.brand.value, model: editingData.model.value, color: editingData.color.value, owner: editingData.owner.value}
        this.setState({isLoading: true})
        requestCarUpdate(tmp).then((r) => {
            if (r.data.err_code === 0) {
                this.props.onHide()
                this.props.fromModalToParent("REQUEST DATA", r.data.car)
            } else {
                this.informAlert(`Update fail ${r.data.message}`, "danger")
            }
            this.setState({isLoading: false})
        }).catch((err) => {
            this.setState({isLoading: false})
            this.informAlert(`Update fail ${err}`, "danger")
        })
    }


    render() {
        let {editingData, ownerPreContent, colorPreContent, brandPreContent, modelPreContent, isLoading, alert} = this.state
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="row">
                    </Modal.Title>
                </Modal.Header>
                <h5>
                    <li className="list-group-item list-group-item-info">
                        Owner:
                        <Select options={ownerPreContent} value={editingData.owner}
                                onChange={this.handleOwnerChange}
                        />
                    </li>
                </h5>
                <Modal.Body>
                    <div className="row-cols-2">
                        {
                            editingData.imageURLs
                                ?
                                editingData.imageURLs.map((item, idx) => (
                                    <div className="col" style={{display: "inline-block"}} key={idx}>
                                        <img src={`http://127.0.0.1:4000/images/${item}`} alt=""
                                             className="img-thumbnail"
                                             style={{width: "-webkit-fill-available"}}
                                        />
                                        <button type="button" className="close" aria-label="Close" style={{
                                            position: "absolute",
                                            top: "10px",
                                            right: "30px"
                                        }}
                                            // onClick={}
                                        >
                                            <span aria-hidden="true" idx={idx}
                                                  onClick={this.handleImageCloseCLick}>&times;</span>
                                        </button>
                                    </div>
                                ))
                                :
                                null
                        }
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
                    <h4>Car info:</h4>
                    <ListGroup.Item action variant="light">
                        Plate Number:
                        <input type="text" className="form-control" value={editingData.plateNumber}
                               onChange={this.handlePlateChange}/>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="light">
                        Year:
                        <input type="number" className="form-control" value={editingData.year}
                               onChange={this.handleYearChange}/>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="light">
                        Color:
                        <Select options={colorPreContent} value={editingData.color} onChange={this.handleColorChange}/>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="light">
                        Car Brand:
                        <Select options={brandPreContent} value={editingData.brand} onChange={this.handleBrandChange}/>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="light">
                        Car Model:
                        <Select options={modelPreContent} value={editingData.model} onChange={this.handleModelChange}/>
                    </ListGroup.Item>
                </Modal.Body>
                <MyAlert type={alert.type} value={alert.value} timeStamp={alert.timeStamp}
                             alertId="alert-cars-modal"/>
                <Modal.Footer>
                    <Button variant="primary" type="submit" style={{position: "relative"}}
                            disabled={!!isLoading}
                            onClick={this.handleUpdate}>
                            <span className={`spinner-border spinner-border-sm fade ${isLoading ? "show" : "d-none"}`}
                                  role="status" aria-hidden="true" style={{right: "5px", position: "relative"}}/>
                        {
                            isLoading ? "Loading..." : "Update"
                        }
                    </Button>
                    {/*<Button>Close</Button>*/}
                    {/*<Button onClick={this.props.onHide}>Close</Button>*/}
                </Modal.Footer>
            </Modal>
        );
    }
}