import React from "react";
import "./my-search-bar.css";
import $ from "jquery";

class MySearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            fields: this.props.fields
        }
    }

    // handleClick = () => {
    //     $("#div-dropdown-menu").slideToggle()
    // }

    handleDropDownClick = (event) => {
        event.preventDefault();
        $(event.target.nextElementSibling).slideToggle();
    }

    handleDropDownItemClick = (event) => {
        const userInput = event.target.innerText
        if (userInput !== this.state.fields) {
            this.props.transferMsg(userInput, this.props.label)
            this.setState({fields: userInput, value: ""})
        }
        $(event.target.parentElement).slideToggle();
    }

    handleChange = (e) => {
        let {value} = this.state
        value = e.target.value
        this.setState({...this.state, value})
    }

    enterTriggerSearch = (e) => {
        if(e.keyCode === 13) {
            this.props.transferMsg(this.state.value, "search-text")
            // search-text
        }
    }

    clickTriggerSearch = () => {
        this.props.transferMsg(this.state.value, "search-text")
    }

    render() {
        const {data, fields} = this.props
        return (
            <div className="input-group input-field col-12 col-md-3">
                <div className="input-group-prepend" style={{height: "38px"}}>
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                            onClick={this.handleDropDownClick}>
                        {fields}
                    </button>
                    <div className="dropdown-menu" id="div-dropdown-menu">
                        {
                            data.map((item, idx) => (
                                <li className="dropdown-item" style={{cursor: "pointer"}} key={idx}
                                    onClick={this.handleDropDownItemClick}>{item}</li>
                            ))
                        }
                        {/*<a className="dropdown-item" href="#">Another action</a>*/}
                        {/*<a className="dropdown-item" href="#">Something else here</a>*/}
                        {/*<div role="separator" className="dropdown-divider"></div>*/}
                        {/*<a className="dropdown-item" href="#">Separated link</a>*/}
                    </div>
                </div>
                <input type="text" className="input-search-bar form-control"
                       aria-label="Text input with dropdown button"
                       name="search-text"
                       value={this.state.value}
                       onChange={this.handleChange}
                       onKeyUp={this.enterTriggerSearch}
                />
                <i onClick={this.clickTriggerSearch}></i>
            </div>
        )
    }
}

export default MySearchBar;