import React from "react";
import {MyDropdown} from "../common/my-dropdown";
import MySearchBar from "../common/my-search-bar";
import jsonData from "../../car_brand_model.json";

class SearchField extends React.Component {
    constructor(props) {
        super(props);
        // let carPreContent = {
        //     "All": ["All"]
        // };
        // let brandPreContent = []
        // Object.keys(jsonData).map((v,i)=>{
        //     brandPreContent.push(v)
        //     carPreContent[v] = jsonData[v]
        //     carPreContent[v].unshift("All")
        // });
        // console.log(carPreContent)
        let brandPreContent = ["All"]
        let carPreContent = {
            "All": ["All"]
        }
        for (let key in jsonData) {
            brandPreContent.push(key);
            let arrayCopy = [...jsonData[key]];
            arrayCopy.unshift("All");
            carPreContent[key] = arrayCopy;
        }
        this.state = {
            colorPreContent: ["WHITE", "BLACK", "PURPLE", "BLUE", "NAVY", "GREEN", "YELLOW", "ORANGE", "RED", "เทา"],
            ownerPreContent: [],
            carPreContent: carPreContent,
            brandPreContent: brandPreContent,
            modelPreContent: carPreContent["All"],
            userInput: {
                // year: myDate.getFullYear(),
                searchText: "",
                color: "WHITE",
                brand: "All",
                model: "All"
            }
        }
    }

    transferMsg = (msg, label) => {
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
                this.setState({...this.state, modelPreContent: this.state.carPreContent[msg]});
                this.setState(prevState => {
                    let userInput = Object.assign({}, prevState.userInput);
                    userInput["model"] = this.state.carPreContent[msg][0]
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

    render() {
        console.log(this.state)
        return(
            <div className="card">
                <div className="card-body row">
                    <MyDropdown transferMsg = {(msg, label) => this.transferMsg(msg, label)} data={this.state.colorPreContent} label="Color" value={this.state.userInput.color}></MyDropdown>
                    <MyDropdown transferMsg = {(msg, label) => this.transferMsg(msg, label)} data={this.state.brandPreContent} label="Brand" value={this.state.userInput.brand}></MyDropdown>
                    <MyDropdown transferMsg = {(msg, label) => this.transferMsg(msg, label)} data={this.state.modelPreContent} label="Model" value={this.state.userInput.model}></MyDropdown>
                    <MySearchBar className="col-6 col-md-5" placeHolder="Search by plate number or owner name"></MySearchBar>
                </div>
            </div>
        )
    }
}

export default SearchField;