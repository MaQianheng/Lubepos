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
                    {/*<div className="col-6 col-md-3">*/}
                        {/*<div class="input-group-prepend">*/}
                        {/*    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>*/}
                        {/*    <div class="dropdown-menu">*/}
                        {/*        <a class="dropdown-item" href="#">Action</a>*/}
                        {/*        <a class="dropdown-item" href="#">Another action</a>*/}
                        {/*        <a class="dropdown-item" href="#">Something else here</a>*/}
                        {/*        <div role="separator" class="dropdown-divider"></div>*/}
                        {/*        <a class="dropdown-item" href="#">Separated link</a>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<MySearchBar placeHolder="Search by plate number or owner name"></MySearchBar>*/}
                    {/*</div>*/}
                    <MySearchBar placeHolder="Search by plate number or owner name"></MySearchBar>
                </div>
            </div>
        )
    }
}

export default SearchField;