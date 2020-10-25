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
            fields: ["Name", "Phone", "Email"],
            keys: ["name", "phone", "email"],
            customers: [],
            currentPageCount: 1,
            customersCount: 1,
            isLoading: true
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
                <MySpinner isLoading={this.state.isLoading}></MySpinner>
                <CardFormWrapperCustomers
                    fromWrapperToParent={(data) => this.fromWrapperToParent(data)}></CardFormWrapperCustomers>
                <br/>
                <MyTable
                    fields={this.state.fields}
                    keys={this.state.keys}
                    contents={this.state.customers}>
                </MyTable>
                <div className="row">
                    <MyPagination transferMsg={(msg, label) => this.transferMsgFromPagination(msg, label)}
                                  dataPerPage={10} currentPageCount={this.state.currentPageCount}
                                  dataCount={this.state.customersCount}></MyPagination>
                </div>
            </div>
        );
    }
}

export default PageCustomer;