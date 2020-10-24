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
            let arrayCopy = ["All", ...jsonData[key]];
            carPreContent[key] = arrayCopy;
        }
        this.state = {
            colorPreContent: ["All", "WHITE", "BLACK", "PURPLE", "BLUE", "NAVY", "GREEN", "YELLOW", "ORANGE", "RED", "เทา"],
            ownerPreContent: [],
            carPreContent: carPreContent,
            brandPreContent: brandPreContent,
            modelPreContent: carPreContent["All"],
            userInput: {
                // year: myDate.getFullYear(),
                searchField: "Plate Number",
                searchText: "",
                color: "All",
                brand: "All",
                model: "All"
            }
        }
    }

    transferMsg = (msg, label) => {
        let key = ""
        switch (label) {
            case "color":
                key = "color";
                break;
            case "owner":
                key = "owner";
                break;
            case "brand":
                key = "brand";
                this.setState({...this.state, modelPreContent: this.state.carPreContent[msg]});
                this.setState(prevState => {
                    let userInput = Object.assign({}, prevState.userInput);
                    userInput["model"] = this.state.carPreContent[msg][0]
                    return {userInput};
                })
                break;
            case "model":
                key = "model";
                break;
            case "search-field":
                key = "searchField"
                break;
            case "search-text":
                key = "searchText"
                break;
            default:
                break;
        }
        this.setState(prevState => {
            let userInput = Object.assign({}, prevState.userInput);
            if (label === "search-text") {
                this.props.fromSearchFieldToParent(userInput)
            }
            userInput[key] = msg
            return {userInput};
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="card">
                <div className="card-body row">
                    <MyDropdown transferMsg={(msg, label) => this.transferMsg(msg, label)}
                                data={this.state.colorPreContent} label="color"
                                value={this.state.userInput.color}></MyDropdown>
                    <MyDropdown transferMsg={(msg, label) => this.transferMsg(msg, label)}
                                data={this.state.brandPreContent} label="brand"
                                value={this.state.userInput.brand}></MyDropdown>
                    <MyDropdown transferMsg={(msg, label) => this.transferMsg(msg, label)}
                                data={this.state.modelPreContent} label="model"
                                value={this.state.userInput.model}></MyDropdown>
                    <MySearchBar transferMsg={(msg, label) => this.transferMsg(msg, label)} label="search-field"
                                 fields={this.state.userInput.searchField}
                                 data={["Plate Number", "Owner"]}></MySearchBar>
                </div>
            </div>
        )
    }
}

export default SearchField;