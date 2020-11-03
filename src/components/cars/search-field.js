import React from "react";
import {Form} from "react-bootstrap";
import Select from "react-select";
import MySearchBar from "../common/my-search-bar";
import jsonData from "../../car_brand_model.json";

class SearchField extends React.Component {
    constructor(props) {
        super(props);
        let brandPreContent = [{value: "All", label: "All"}]
        Object.keys(jsonData).map((v, i) => {
            brandPreContent.push({value: v, label: v})
        });
        let modelPreContent = this.handleModelPreContent(brandPreContent[0].value)
        this.state = {
            colorPreContent: [
                {value: "All", label: "All"},
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
            brandPreContent: brandPreContent,
            modelPreContent: modelPreContent,
            userInput: {
                // year: myDate.getFullYear(),
                searchField: "Plate Number",
                searchText: "",
                color: {value: "All", label: "All"},
                brand: {value: "All", label: "All"},
                model: {value: "All", label: "All"}
            }
        }
    }

    handleModelPreContent = (key) => {
        let modelPreContent = [{value: "All", label: "All"}]
        if (key === "All") {
            return modelPreContent
        }
        for (let i = 0; i < jsonData[key].length; i++) {
            let tmp = jsonData[key][i]
            modelPreContent.push({value: tmp, label: tmp})
        }
        return modelPreContent
    }

    handleColorChange = (v) => {
        let {userInput} = this.state
        if (userInput.color.value === v.value) {
            return
        }
        userInput.color = v
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

    transferMsg = (msg, label) => {
        let {userInput} = this.state
        if (label === "SEARCH FIELD") {
            userInput.searchField = msg
            this.setState({userInput})
        }
        if (label === "TRIGGER SEARCH") {
            let tmp = {}
            tmp.color = userInput.color.value
            tmp.brand = userInput.brand.value
            tmp.model = userInput.model.value
            tmp.searchField = userInput.searchField
            tmp.searchText = msg
            this.props.fromSearchFieldToParent(tmp)
        }
    }

    render() {

        let {userInput, colorPreContent, brandPreContent, modelPreContent} = this.state
        return (
            <div className="card">
                <div className="card-body row">
                    <div className="col-6 col-md-3">
                        <Form.Label>Color</Form.Label>
                        <Select defaultValue={{value: "All", label: "All"}} options={colorPreContent}
                                onChange={this.handleColorChange}/>
                    </div>

                    <div className="col-6 col-md-3">
                        <Form.Label>Brand</Form.Label>
                        <Select value={userInput.brand} options={brandPreContent} onChange={this.handleBrandChange}/>
                    </div>

                    <div className="col-6 col-md-3">
                        <Form.Label>Model</Form.Label>
                        <Select value={userInput.model} options={modelPreContent} onChange={this.handleModelChange}/>
                    </div>

                    <MySearchBar transferMsg={(msg, label) => this.transferMsg(msg, label)} label="search-field"
                                 fields={userInput.searchField}
                                 data={["Plate Number", "Owner"]}></MySearchBar>
                </div>
            </div>
        )
    }
}

export default SearchField;