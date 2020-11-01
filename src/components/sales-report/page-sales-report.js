import React from "react";
import CardCharts from "./card-charts";
import {requestSalesQuery} from "../../api";
import MyPagination from "../common/my-pagination";
import DatePicker from 'react-date-picker';
import MySpinner from "../common/my-spinner";
import MyAlert from "../common/my-alert";
import {Media, Modal, Button, Table, ListGroup} from 'react-bootstrap';
import {timeStampToDate} from "../../utils/timeUtils";

export default class PageSalesReport extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date()
        this.state = {
            // Date/Time | Customer Name | Car Brand/Model/Number | Price
            fields: ["Date/time", "Customer Name", "Car Brand", "Model", "Number", "Price", ""],
            keys: ["name", "type", "brand", "amount", "price"],
            // Date/time	Customer Name	Car Brand	Model	Number	Price
            currentRow: 0,
            items: [],
            currentPageCount: 1,
            startDate: new Date(date.getFullYear(), 0, 1),
            endDate: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
            itemsCount: 1,
            flag: 0,
            isLoading: false,
            arrLineChartData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            objBarChartData: {
                names: ["", "", "", "", ""],
                amounts: [0, 0, 0, 0, 0]
            },
            modalShow: false,
            alert: {
                type: "success",
                value: "success",
                timeStamp: Date.now()
            }
        }
    }

    requestData = (currentPageCount) => {
        this.setState({isLoading: true})
        let {startDate, endDate} = this.state
        requestSalesQuery({
            currentPageCount: currentPageCount,
            startTimeStamp: startDate.getTime(),
            endTimeStamp: endDate.getTime()
        }).then((r) => {
            if (r.data.err_code === 0) {
                let {sales} = r.data
                // this.setState({
                //     itemsCount: sales.length
                // })
                console.log(r.data)
                // 第一次请求:
                if (currentPageCount === 0) {
                    this.organisingChartData(sales)
                }
                // 如果第一次请求数据长度大于10:
                if (sales.length > 10) {
                    sales.splice(10)
                    this.organisingTableData(sales)
                } else {
                    this.organisingTableData(sales)
                }
            } else {
                console.log(r.data.message)
                this.informAlert(`Request data fail ${r.data.message}`)
            }
            this.setState({isLoading: false, itemsCount: r.data.totalCount})
        }).catch((err) => {
            console.log(err)
            this.informAlert(`Request data fail ${err}`)
            this.setState({isLoading: false})
        })
    }

    organisingChartData = (data) => {
        let {arrLineChartData, objBarChartData, flag} = this.state
        let tmp = {}
        for (let i = 0; i < data.length; i++) {
            let date = new Date(data[i].createdTimeStamp)
            arrLineChartData[date.getMonth()] += data[i].totalPrice
            let {items} = data[i]
            for (let key in items) {
                if (!(key in tmp)) {
                    tmp[key] = 0
                }
                tmp[key] += parseInt(items[key].amount)
            }
        }
        let sortedItemsName = Object.keys(tmp).sort((a, b) => (tmp[b] - tmp[a]))
        if (sortedItemsName.length > 5) {
            sortedItemsName.splice(5)
        }
        let itemsSoldAmount = []
        for (let i = 0; i < sortedItemsName.length; i++) {
            let key = sortedItemsName[i]
            itemsSoldAmount.push(tmp[key])
        }
        objBarChartData = {names: sortedItemsName, amounts: itemsSoldAmount}
        flag+=1
        this.setState({arrLineChartData, objBarChartData, flag: flag})
    }

    organisingTableData = (data) => {
        let items = []
        for (let i = 0; i < data.length; i++) {
            let tmp = {dateTime: "", name: "", brand: "", model: "", plateNumber: "", price: "", items: {}}
            tmp.dateTime = data[i].createdTimeStamp
            tmp.name = data[i].customer.name
            tmp.brand = data[i].customer.brand
            tmp.model = data[i].customer.model
            tmp.plateNumber = data[i].customer.plateNumber
            tmp.price = data[i].totalPrice
            tmp.items = data[i].items
            items.push(tmp)
        }
        this.setState({items})
        console.log(items)
    }

    componentDidMount() {
        this.requestData(0)
    }

    handleStartDateChange = async (value) => {
        await this.setState({startDate: new Date(value.getFullYear(), value.getMonth(), value.getDate()), currentPageCount: 1})
        await this.requestData(1)
    }

    handleEndDateChange = async (value) => {
        await this.setState({endDate: new Date(value.getFullYear(), value.getMonth(), value.getDate()), currentPageCount: 1})
        await this.requestData(1)
    }

    // handleSubmit = async () => {
    //     // let {currentPageCount} = this.state
    //     await this.requestData(1)
    //     this.setState({currentPageCount: 1})
    // }

    toggleModal = () => {
        let {modalShow} = this.state
        this.setState({modalShow: !modalShow})
    }

    handleRowClick = async (e) => {
        await this.setState({currentRow: e.target.getAttribute("rowid")})
        this.toggleModal()
    }

    handleModalHide = () => {
        this.toggleModal()
    }

    informAlert = (value, type) => {
        let {alert} = this.state
        alert.type = type ? type : "warning"
        alert.value = value ? value : "Error"
        alert.timeStamp = Date.now()
        this.setState({alert: alert})
    }

    transferMsgFromPagination = async (msg) => {
        this.setState({isLoading: true})
        msg = parseInt(msg)
        await this.requestData(msg)
        console.log(msg)
        this.setState({currentPageCount: msg})
    }

    render() {
        const {flag, isLoading, startDate, endDate, alert, arrLineChartData, objBarChartData, items, fields, modalShow, currentRow} = this.state
        let date = new Date()
        // const [, ] = React.useState(false);
        function MyVerticallyCenteredModal(props) {
            let {data} = props
            let items
            if (data) {
                items = data.items
            }
            return (
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className="row">
                        </Modal.Title>
                    </Modal.Header>
                    <h5>
                        <li className="list-group-item list-group-item-info">Customer
                        Name: {data ? data.name : ""}</li>
                    </h5>
                    <Modal.Body>
                        <h4>Date: {data ? timeStampToDate(data.dateTime) : ""}</h4>
                        <ListGroup.Item action variant="light">
                            Car Brand: {data ? data.brand : ""}
                        </ListGroup.Item>
                        <ListGroup.Item action variant="light">
                            Car Model: {data ? data.model : ""}
                        </ListGroup.Item>
                        <ListGroup.Item action variant="light">
                            Plate Number: {data ? data.plateNumber : ""}
                        </ListGroup.Item>
                        <Table hover responsive className="text-center">
                            <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Item Amount</th>
                                <th>Item Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                items ?
                                    Object.keys(items).map((key, idx) => (
                                        <tr key={idx}>
                                            <td>{key}</td>
                                            <td>{items[key].amount}</td>
                                            <td>{items[key].price}</td>
                                        </tr>
                                    ))
                                    :
                                    ""
                            }
                            <tr>
                                <td colSpan={3} className="text-right"><b>Total Price: {data ? data.price : ""}</b></td>
                            </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            );
        }

        return (
            <div style={{padding: "30px"}}>
                <MySpinner isLoading={isLoading}></MySpinner>
                <CardCharts flag={flag} lineChartData={arrLineChartData} barChartData={objBarChartData}></CardCharts>
                <br/>
                <div className="card">
                    <div className="card-body">
                        <div className="row text-center" style={{marginBottom: "20px"}}>
                            <div className="col-lg-6" style={{marginTop: "20px"}}>
                                {/*最大不能大过今天*/}
                                start date:&nbsp;
                                <DatePicker
                                    name="start"
                                    clearIcon={null}
                                    disabled={isLoading}
                                    onChange={this.handleStartDateChange}
                                    maxDate={new Date()}
                                    value={startDate}
                                />
                            </div>
                            <div className="col-lg-6" style={{marginTop: "20px"}}>
                                {/*最小不能小过起始*/}
                                end date:&nbsp;
                                <DatePicker
                                    name="end"
                                    clearIcon={null}
                                    disabled={isLoading}
                                    onChange={this.handleEndDateChange}
                                    minDate={startDate}
                                    maxDate={new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)}
                                    value={endDate}
                                />
                            </div>
                            {/*<div className="col-lg-4" style={{marginTop: "20px"}}>*/}
                            {/*    <button className="btn btn-primary btn-group-lg" type="submit"*/}
                            {/*            style={{position: "relative"}}*/}
                            {/*            disabled={isLoading ? true : false}*/}
                            {/*            onClick={this.handleSubmit}>*/}
                            {/*<span className={`spinner-border spinner-border-sm fade ${isLoading ? "show" : "d-none"}`}*/}
                            {/*      role="status" aria-hidden="true" style={{right: "5px", position: "relative"}}></span>*/}
                            {/*        {*/}
                            {/*            isLoading ? "Loading..." : "QUERY"*/}
                            {/*        }*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </div>
                        <MyAlert type={alert.type} value={alert.value} timeStamp={alert.timeStamp}
                                 alertId="alert-sales-table"></MyAlert>
                        <Table hover responsive>
                            <thead>
                            <tr className="thead-dark text-center" width={`${100 / fields.length}%`}>
                                {
                                    fields.map((item, idx) => (<th key={idx}>{item}</th>))
                                }
                            </tr>
                            </thead>
                            <tbody className="text-center">
                            {
                                items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{timeStampToDate(item.dateTime)}</td>
                                        <td>{item.name}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.model}</td>
                                        <td>{item.plateNumber}</td>
                                        <td>{item.price}</td>
                                        <td><Button rowid={idx} variant="info"
                                                    onClick={this.handleRowClick}>
                                            Detail</Button></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                        <MyVerticallyCenteredModal
                            data={items[currentRow]}
                            show={modalShow}
                            onHide={this.handleModalHide}
                        />
                        <div className="row">
                            <MyPagination fromPaginationToParent={(msg) => this.transferMsgFromPagination(msg)}
                                          dataPerPage={10}
                                          currentPageCount={this.state.currentPageCount}
                                          dataCount={this.state.itemsCount}></MyPagination>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}