import React from "react";
import {MyDropdown} from "../common/my-dropdown";

export default class PreRowContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idx: this.props.rowIdx,
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
                let items
                if (this.state.userInput[0] === "products") {
                    items = this.props.productsItems
                } else {
                    items = this.props.servicesItems
                }
                userInput[2] = items[msg][0]
                userInput[3] = 1
                break
            default:
                break
        }
        userInput[index] = msg
        if (index === 0 && msg !== preMsg[0]) {
            if (msg === "products") {
                userInput[1] = this.props.productsName[0]
                // console.log(userInput)
            } else {
                userInput[1] = this.props.servicesName[0]
                // console.log(userInput)
            }
        }

        userInput[4] = parseInt(userInput[2]) * parseInt(userInput[3])
        this.setState({
            userInput: userInput
        })

        // this.setState(prevState => {
        //     let userInput = Object.assign({}, prevState.userInput);
        //     userInput[index] = msg
        //     if (index === 0 && msg !== this.state.userInput[0]) {
        //         if (msg === "items") {
        //             userInput[1] = this.props.productsName[0]
        //         } else {
        //             userInput[1] = this.props.servicesName[0]
        //         }
        //     }
        //     if (items) {
        //         userInput[2] = items[msg][0]
        //         userInput[3] = 1
        //         // console.log(items)
        //     }
        //     userInput[4] = parseInt(userInput[2]) * parseInt(userInput[3])
        //     return {userInput: userInput};
        // })
        this.props.transferMsg(preMsg, userInput, this.state.idx)
    }

    handleChange = (e) => {
        let {value} = e.target
        let index = 0
        let pre = this.state.userInput
        const key = e.target.getAttribute('name');
        switch (key) {
            case "amount":
                index = 3
                break
            default:
                break
        }
        let {userInput} = this.state
        userInput[index] = value
        userInput[4] = parseInt(userInput[2]) * parseInt(userInput[3])
        this.setState({
            userInput: userInput
        })
        // this.setState(prevState => {
        //     let userInput = Object.assign({}, prevState.userInput);
        //     userInput[index] = value
        //     userInput[4] = parseInt(userInput[2]) * parseInt(userInput[3])
        //     return {userInput: userInput};
        // })
        this.props.transferMsg(pre, userInput, this.state.idx)
    }

    render() {
        let {type, productsName, servicesName} = this.props
        let {userInput} = this.state
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
                </td>
            </tr>
        )
    }
}