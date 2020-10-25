import React from "react";
import {MyDropdown} from "../common/my-dropdown";

export default class PreRowContent extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.userInput)
        this.state = {
            idx: this.props.rowIdx,
            oriAmount: parseInt(this.props.userInput[4]),
            userInput: this.props.userInput
        }
    }

    handleDropDownChange = (msg, label) => {
        let index
        let {userInput} = this.state
        let preMsg = [...this.state.userInput]
        switch (label) {
            case "type":
                index = 0
                break
            case "items":
                index = 1
                // let items
                // if (this.state.userInput[0] === "products") {
                //     items = this.props.productsItems
                // } else {
                //     items = this.props.servicesItems
                // }
                // userInput[2] = items[msg].price ? items[msg].price : 0
                // userInput[3] = 1
                break
            default:
                break
        }
        userInput[index] = msg
        if (index === 0 && msg !== preMsg[0]) {
            if (msg === "products") {
                userInput[1] = this.props.productsName[0]
                // userInput[2] = this.props.productsItems[userInput[1]].price ? this.props.productsItems[userInput[1]].price : 0
                // userInput[3] = this.props.productsItems[userInput[1]].amount
                // console.log(userInput)
            } else {
                userInput[1] = this.props.servicesName[0]
                // userInput[2] = this.props.servicesItems[userInput[1]].price ? this.props.servicesItems[userInput[1]].price : 0
                // console.log(userInput)
            }
        }
        // userInput[3] = 0
        // userInput[4] = this.state.oriAmount
        // userInput[5] = parseInt(userInput[2]) * parseInt(userInput[3])
        // this.setState({
        //     userInput: userInput
        // })
        this.props.transferMsg(preMsg, userInput, this.state.idx)
    }

    handleChange = (e) => {
        let {value} = e.target
        if (value < 0) {
            return
        }
        if (value==="") {
            return
        }
        let pre = this.state.userInput
        const key = e.target.getAttribute('name');
        let {userInput} = this.state
        switch (key) {
            case "amount":
                userInput[3] = value
                if (userInput[0]==="products") {
                    userInput[4] = this.state.oriAmount - parseInt(value)
                }
                break
            default:
                break
        }
        if (userInput[4] < 0 && userInput[0] === "products") {
            return
        }
        userInput[5] = parseInt(userInput[2]) * parseInt(userInput[3])
        this.setState({
            userInput: userInput
        })
        this.props.transferMsg(pre, userInput, this.state.idx)
    }

    handleClick = () => {
        this.props.fromPreRowContentToParent(this.state.idx)
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