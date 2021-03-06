import React from 'react';
import {Table} from "react-bootstrap";
import Select from 'react-select'
import MyAlert from "./my-alert";
import {
    requestCustomerUpdate,
    requestCustomerDelete,
    requestItemDelete,
    requestItemUpdate
} from "../../api";

export class MyTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idxIsLoading: [],
            alert: {
                type: "success",
                value: "success",
                timeStamp: Date.now()
            }
        }
    }

    informAlert = (value, type) => {
        let {alert} = this.state
        alert.type = type ? type : "warning"
        alert.value = value ? value : "Error"
        alert.timeStamp = Date.now()
        this.setState({alert: alert})
    }

    handleClick = (e) => {
        let {idxIsLoading} = this.state
        let rowId = parseInt(e.target.parentElement.parentElement.getAttribute("idx"))
        console.log(rowId)
        // if (contents.length === 0) {
        //     contents = this.props.contents
        // }

        let {contents} = this.props

        // if (contents.length === 0) {
        //     this.informAlert("Value no change")
        //     return
        // }
        let updateFunc
        let deleteFunc
        if (this.props.tableRole === "customers") {
            let operatingContent = contents[rowId]
            for (let item in operatingContent) {
                if (!operatingContent[item]) {
                    this.informAlert("One or more required fields are empty")
                    return
                }
            }
            console.log(operatingContent)
            let rePhone = /^(09)\d{8}$/;
            if (!rePhone.test(operatingContent.phone)) {
                this.informAlert("Phone number format is not correct")
                return
            }
            let reEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (!reEmail.test(operatingContent.email)) {
                this.informAlert("Email format is not correct")
                return
            }
            updateFunc = requestCustomerUpdate
            deleteFunc = requestCustomerDelete
        } else if (this.props.tableRole === "items") {
            // amount: 87
            // brand: "brand 1"
            // name: "product 1"
            // price: 120
            // type: "products"
            // _id: "5f9525e01169084cb2567370"
            let operatingContent = contents[rowId]
            for (let key in operatingContent) {
                if (key === "brand" && operatingContent.type === "services") {
                    continue
                }
                if (!operatingContent[key] && operatingContent.type === "products") {
                    this.informAlert("One or more required fields are empty")
                    return
                }
            }
            updateFunc = requestItemUpdate
            deleteFunc = requestItemDelete
        }
        idxIsLoading.push(rowId)
        this.setState({idxIsLoading: idxIsLoading})
        switch (e.target.getAttribute("name")) {
            case "update":
                updateFunc(contents[rowId]).then((r) => {
                    if (r.data.err_code === 0) {
                        this.informAlert("Update success", "success")
                    } else {
                        this.informAlert(`Update fail ${r.data.message}`, "danger")
                    }
                    let {idxIsLoading} = this.state
                    idxIsLoading = idxIsLoading.filter(idx => idx !== rowId)
                    this.setState({idxIsLoading: idxIsLoading})
                }).catch((err) => {
                    this.informAlert(`Update fail ${err}`, "danger")
                    let {idxIsLoading} = this.state
                    idxIsLoading = idxIsLoading.filter(idx => idx !== rowId)
                    this.setState({idxIsLoading: idxIsLoading})
                })
                break
            case "delete":
                deleteFunc({_id: contents[rowId]._id}).then((r) => {
                    if (r.data.err_code === 0) {
                        this.informAlert("Delete success", "success")
                        contents.splice(rowId, 1)
                        if (contents.length === 0) {
                            this.props.fromTableToParent("REQUEST PREVIOUS")
                        }
                    } else {
                        this.informAlert(`Delete fail ${r.data.message}`, "danger")
                    }
                    let {idxIsLoading} = this.state
                    idxIsLoading = idxIsLoading.filter(idx => idx !== rowId)
                    this.setState({contents: contents, idxIsLoading: idxIsLoading})
                }).catch((err) => {
                    this.informAlert(`Delete fail ${err}`, "danger")
                    let {idxIsLoading} = this.state
                    idxIsLoading = idxIsLoading.filter(idx => idx !== rowId)
                    this.setState({idxIsLoading: idxIsLoading})
                })
                break
            default:
                break
        }

    }

    handleSelectChange = (value) => {
        let idx = value.value.split('-').pop()

        // let {contents} = this.state
        // if (contents.length === 0) {
        //     contents = this.props.contents
        // }

        let {contents} = this.props

        let operatingContent = contents[parseInt(idx)]
        operatingContent.type = value.label
        if (value.label === "services") {
            operatingContent.amount = -1
            operatingContent.brand = ""
        }
        if (value.label === "products") {
            operatingContent.amount = 0
            operatingContent.brand = ""
        }
        this.setState({contents: contents}, () => {console.log(this.state.contents)})
    }

    handleChange = (e) => {
        let rowId = e.target.parentElement.parentElement.getAttribute("idx")
        let columnId = e.target.getAttribute("name")
        let value = e.target.value
        // let {contents} = this.state
        // if (contents.length === 0) {
        //     contents = this.props.contents
        // }

        let {contents} = this.props

        console.log(this.props.contents)
        console.log(contents, rowId)
        contents[rowId][columnId] = value
        this.setState({contents: contents})
    }

    render() {
        const {fields, keys, contents} = this.props
        const {alert, idxIsLoading} = this.state
        return (
            <div>
                <div className="form-row">
                    <MyAlert type={alert.type} value={alert.value} timeStamp={alert.timeStamp}
                             alertId="alert-my-table"/>
                </div>
                <Table hover responsive>
                    <thead>
                    <tr className="thead-dark text-center">
                        {
                            fields.map(
                                (item, idx) => (
                                    <th key={idx} width={`${100 / fields.length}%`}>{item}</th>
                                )
                            )
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        contents.map((item, idx) => (
                            <tr key={idx} idx={idx}>
                                {
                                    keys.map((key, subIdx) => (
                                        <td key={subIdx}>
                                            {
                                                key === "type"
                                                    ?
                                                    <Select
                                                        id={idx}
                                                        value={{value: item[key], label: item[key]}}
                                                        options={[
                                                            {value: `products-${idx}`, label: 'products'},
                                                            {value: `services-${idx}`, label: 'services'},
                                                        ]}
                                                        isDisabled={idxIsLoading.indexOf(idx) > -1}
                                                        onChange={this.handleSelectChange}
                                                    />
                                                :
                                                <input
                                                type={key === "amount" || key === "price" ? "number" : "text"}
                                                className="form-control" name={key}
                                                value={item[key]}
                                                disabled={(item["type"] === "services" && item[key] === "") || item[key] === -1 || idxIsLoading.indexOf(idx) > -1}
                                                onChange={this.handleChange}/>
                                            }
                                        </td>
                                    ))
                                }
                                <td className="text-center">
                                    <button type="button" className="btn btn-primary" style={{marginRight: "20px"}}
                                            name="update"
                                            disabled={idxIsLoading.indexOf(idx) > -1}
                                            onClick={this.handleClick}>
                                        <span
                                            className={`spinner-border spinner-border-sm fade ${idxIsLoading.indexOf(idx) > -1 ? "show" : "d-none"}`}
                                            role="status" aria-hidden="true"
                                            style={{right: "5px", position: "relative"}}/>
                                        {
                                            idxIsLoading.indexOf(idx) > -1 ? "Loading..." : "Update"
                                        }
                                    </button>
                                    <button type="button" className="btn btn-danger" style={{marginRight: "20px"}}
                                            name="delete"
                                            disabled={idxIsLoading.indexOf(idx) > -1}
                                            onClick={this.handleClick}>
                                        <span
                                            className={`spinner-border spinner-border-sm fade ${idxIsLoading.indexOf(idx) > -1 ? "show" : "d-none"}`}
                                            role="status" aria-hidden="true"
                                            style={{right: "5px", position: "relative"}}/>
                                        {
                                            idxIsLoading.indexOf(idx) > -1 ? "Loading..." : "Delete"
                                        }
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>


        )
    }
}