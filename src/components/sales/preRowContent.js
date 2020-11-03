import React from "react";
import {connect} from 'react-redux'
import Select from "react-select";

class PreRowContent extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDropDownChange = (msg, label) => {
        let index
        let {userInput} = this.props
        let preMsg = [...this.props.userInput]
        switch (label) {
            case "type":
                index = 0
                break
            case "items":
                index = 1
                break
            default:
                break
        }
        userInput[index] = msg
        if (index === 0 && msg !== preMsg[0]) {
            if (msg === "products") {
                userInput[1] = this.props.productsName[0]
            } else {
                userInput[1] = this.props.servicesName[0]
            }
        }
        this.props.transferMsg(preMsg, userInput, this.props.rowIdx)
    }

    handleTypeChange = (v) => {
        this.props.fromPreRowContentTransferMsgToParent("CHANGE TYPE", v, this.props.rowIdx)
    }

    handleItemChange = (v) => {
        this.props.fromPreRowContentTransferMsgToParent("CHANGE ITEM", v, this.props.rowIdx)
    }

    handleAmountChange = (e) => {
        let {value} = e.target
        if (value < 0) {
            return
        }
        if (!value) {
            return
        }
        let {userInput} = this.props
        if (value > userInput[6] && userInput[0] === "products") {
            return
        }
        userInput[3] = value
        // 这里要用原剩余数量减
        userInput[4] = parseInt(userInput[6])- parseInt(userInput[3])
        userInput[5] = parseInt(userInput[2]) * parseInt(userInput[3])
        this.props.fromPreRowContentTransferMsgToParent("UPDATE AMOUNT", userInput, this.props.rowIdx)
    }

    handleRemoveClick = () => {
        this.props.fromPreRowContentTransferMsgToParent("REMOVE ROW", "", this.props.rowIdx)
    }

    render() {
        let {type, productsName, servicesName} = this.props
        let {userInput} = this.props
        return(
            <tr>
                <td>
                    <Select options={type} value={userInput[0]} onChange={this.handleTypeChange}/>
                    {/*<MyDropdown transferMsg={(msg, label) => this.handleDropDownChange(msg, label)} data={type} label="type" value={userInput[0]} invisibleLabel={true} control={true}></MyDropdown>*/}
                </td>
                <td>
                    <Select options={userInput[0].value === "products" ? productsName : servicesName} value={userInput[1]} onChange={this.handleItemChange}/>
                    {/*<MyDropdown transferMsg={(msg, label) => this.handleDropDownChange(msg, label)} data={userInput[0] === "products" ? productsName : servicesName} label="items" value={userInput[1]} invisibleLabel={true} control={true}></MyDropdown>*/}
                </td>
                <td>
                    {userInput[2]}
                </td>
                <td>
                    <input type="number" className="form-control" style={{textAlign: "left"}} onChange={this.handleAmountChange} name="amount" value={userInput[3]}></input>
                </td>
                <td>
                    {userInput[4]}
                </td>
                <td>
                    {userInput[5]}
                </td>
                <td>
                    <button type="button" className="btn btn-outline-warning" onClick={this.handleRemoveClick}>Remove</button>
                </td>
            </tr>
        )
    }
}

export default connect(
    state => ({items: state.items}),
    {}
)(PreRowContent)