import React from 'react';
import CardFormWrapperCustomers from "./card-form-wrapper-customers";
// import {CarTable} from './table'
import {MyTable} from "../common/my-table";
import {requestCustomersQuery} from "../../api";
import MyPagination from "../common/my-pagination";
import MySpinner from "../common/my-spinner";

class PageCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardTitle: "Add a new customer record",
            fields: ["Name", "Phone", "Email", "Action"],
            keys: ["name", "phone", "email"],
            customers: [],
            currentPageCount: 1,
            customersCount: 1,
            isLoading: true
        }
    }

    fromTableToParent = async (action) => {
        switch (action) {
            case "REQUEST PREVIOUS":
                let {currentPageCount} = this.state
                currentPageCount -= 1
                if (currentPageCount === 0) {
                    return
                }
                this.setState({currentPageCount})
                await this.requestData(currentPageCount)
                break
            default:
                break
        }
    }

    fromWrapperToParent = async (data) => {
        // let tmp = this.state.items
        // tmp.unshift(item)
        // for (let i=10;i<tmp.length;i++) {
        //     tmp.remove(i)
        // }
        // this.setState({...this.state, items: tmp})
        await this.requestData(this.state.currentPageCount)
    }

    transferMsgFromPagination = async (msg) => {
        this.setState({isLoading: true})
        msg = parseInt(msg)
        await this.requestData(msg)
        this.setState({currentPageCount: msg})
    }

    requestData = async (pageCount) => {
        this.setState({isLoading: true})
        requestCustomersQuery({currentPageCount: pageCount}).then((r) => {
            if (r.data.err_code === 0) {
                this.setState({
                    customers: r.data.customers,
                    customersCount: r.data.customersCount,
                    isLoading: false
                })
            }
        }).catch((err) => {
            console.log(err)
            this.setState({
                isLoading: false
            })
        })
    }

    async componentDidMount() {
        await this.requestData(this.state.currentPageCount)
    }

    render() {
        return (
            <div style={{padding: "30px"}}>
                <MySpinner isLoading={this.state.isLoading}/>
                <CardFormWrapperCustomers
                    cardTitle={this.state.cardTitle}
                    fromWrapperToParent={(data) => this.fromWrapperToParent(data)}>
                </CardFormWrapperCustomers>
                <br/>

                <div className="card">
                    <div className="card-body">
                        <MyTable
                            tableRole="customers"
                            fromTableToParent={(action) => this.fromTableToParent(action)}
                            fields={this.state.fields}
                            keys={this.state.keys}
                            contents={this.state.customers}/>
                        <br/>
                        <div className="row">
                            <MyPagination
                                fromPaginationToParent={(msg, label) => this.transferMsgFromPagination(msg, label)}
                                dataPerPage={10} currentPageCount={this.state.currentPageCount}
                                dataCount={this.state.customersCount}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageCustomer;