import React from "react";
import {MyDropdown} from "../common/my-dropdown";
import {connect} from 'react-redux'

class PreRowContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // idx: this.props.rowIdx,
            // oriAmount: parseInt(this.props.userInput[4]),
            // userInput: this.props.userInput
        }
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

    handleChange = (e) => {
        let {value} = e.target
        if (value < 0) {
            return
        }
        if (!value) {
            return
        }
        let preMsg = [...this.props.userInput]
        const key = e.target.getAttribute('name');
        let {userInput} = this.props
        if (value > userInput[6] && userInput[0] === "products") {
            return
        }
        switch (key) {
            case "amount":
                userInput[3] = value
                if (userInput[0]==="products") {
                    // 这里要用原剩余数量减
                    userInput[4] = parseInt(userInput[6])- parseInt(userInput[3])
                }
                break
            default:
                break
        }
        userInput[5] = parseInt(userInput[2]) * parseInt(userInput[3])
        this.props.transferMsg(preMsg, userInput, this.props.rowIdx)
    }

    handleClick = () => {
        this.props.fromPreRowContentToParent(this.props.rowIdx)
    }

    render() {
        let {type, productsName, servicesName} = this.props
        let {userInput} = this.props
        return(
            <tr>
                <td>
                    <MyDropdown transferMsg={(msg, label) => this.handleDropDownChange(msg, label)} data={type} label="type" value={userInput[0]} invisibleLabel={true} control={true}></MyDropdown>
                </td>
                <td>
                    <MyDropdown transferMsg={(msg, label) => this.handleDropDownChange(msg, label)} data={userInput[0] === "products" ? productsName : servicesName} label="items" value={userInput[1]} invisibleLabel={true} control={true}></MyDropdown>
                </td>
                <td>
                    {userInput[2]}
                </td>
                <td>
                    <input type="number" className="form-control" style={{textAlign: "left"}} onChange={this.handleChange} name="amount" value={userInput[3]}></input>
                </td>
                <td>
                    {userInput[4]}
                    {/*<span name="remainingAmount">*/}
                    {/*    */}
                    {/*</span>*/}
                </td>
                <td>
                    {userInput[5]}
                </td>
                <td>
                    <button type="button" className="btn btn-outline-warning" onClick={this.handleClick}>Remove</button>
                </td>
            </tr>
        )
    }
}

export default connect(
    state => ({items: state.items}),
    {}
)(PreRowContent)