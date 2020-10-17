import React from "react";
import {Button, Form} from "react-bootstrap";
import {MyDropdown} from "../common/my-dropdown";
import "../common/my-dropdown.css";
import jsonData from "../../car_brand_model.json";
import ImageUploader from 'react-images-upload';

class CardFormAdd extends React.Component {
    constructor(props) {
        super(props);
        let brandPreContent = [];
        Object.keys(jsonData).map((v,i)=>{
            brandPreContent.push(v)
        });
        let myDate = new Date();
        let modelPreContent = jsonData[brandPreContent[0]];
        this.state = {
            colorPreContent: ["WHITE", "BLACK", "PURPLE", "BLUE", "NAVY", "GREEN", "YELLOW", "ORANGE", "RED", "เทา"],
            ownerPreContent: [],
            brandPreContent: brandPreContent,
            modelPreContent: modelPreContent,
            pictures: "",
            userInput: {
                plateNumber: "",
                year: myDate.getFullYear(),
                color: "WHITE",
                owner: "",
                brand: brandPreContent[0],
                model: modelPreContent[0]
            }
        }
    }

    transferMsg = (msg, label) => {
        // switch (label) {
        //     case "Brand":
        //         this.setState(prevState => {
        //             let inputFields = Object.assign({}, prevState.inputFields);
        //             inputFields[4].userInput = msg;
        //             inputFields[5].preContent = jsonData[msg]
        //             return { inputFields };
        //         })
        //         break;
        //     default:
        //         break;
        // }
        let key = ""
        switch (label) {
            case "Color":
                key = "color";
                break;
            case "Owner":
                key = "owner";
                break;
            case "Brand":
                key = "brand";
                this.setState({...this.state, modelPreContent: jsonData[msg]});
                this.setState(prevState => {
                    let userInput = Object.assign({}, prevState.userInput);
                    userInput["model"] = jsonData[msg][0]
                    return {userInput};
                })
                break;
            case "Model":
                key = "model";
                break;
            default:
                break;
        }
        this.setState(prevState => {
            let userInput = Object.assign({}, prevState.userInput);
            userInput[key] = msg
            return {userInput};
        })
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
        console.log(this.state);
    }

    onDrop = (picture) => {
        this.setState({
            pictures: picture
            // pictures: this.state.pictures.concat(picture)
        });
    }

    render() {
        console.log(this.state)
        // console.log(jsonData)
        return(
            <Form>
                <Form.Row>
                    <div className="col-6 col-md-3">
                        <Form.Label>Plate Number</Form.Label>
                        <input type="text" className="form-control" style={{textAlign:"left"}} onChange={this.handleChange} name="plateNumber" value={this.state.userInput.plateNumber}></input>
                    </div>

                    <div className="col-6 col-md-3">
                        <Form.Label>Year</Form.Label>
                        <input type="number" className="form-control" style={{textAlign:"left"}} onChange={this.handleChange} name="year" value={this.state.userInput.year}></input>
                    </div>
                    <MyDropdown transferMsg = {(msg, label) => this.transferMsg(msg, label)} data={this.state.colorPreContent} label="Color" value={this.state.userInput.color}></MyDropdown>
                    <MyDropdown transferMsg = {(msg, label) => this.transferMsg(msg, label)} data={this.state.ownerPreContent} label="Owner" value={this.state.userInput.owner}></MyDropdown>
                    <MyDropdown transferMsg = {(msg, label) => this.transferMsg(msg, label)} data={this.state.brandPreContent} label="Brand" value={this.state.userInput.brand}></MyDropdown>
                    <MyDropdown transferMsg = {(msg, label) => this.transferMsg(msg, label)} data={this.state.modelPreContent} label="Model" value={this.state.userInput.model}></MyDropdown>
                    <div className="col-6 col-md-3">
                    </div>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        withPreview={true}
                    />
                </Form.Row>
                <br/>
                <Form.Row>
                    <Button variant="primary" type="submit" onClick={this.handleClick}>
                        Submit
                    </Button>
                </Form.Row>

            </Form>
        )
    }
}

export default CardFormAdd;