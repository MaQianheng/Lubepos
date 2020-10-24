import React from "react";
import CardFormWrapperItems from "./card-form-wrapper-items";
import {MyTable} from "../common/my-table";
import {requestItemsQuery} from "../../api";
import MySpinner from "../common/my-spinner";
import MyPagination from "../common/my-pagination";

class PageItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: ["Name", "Type", "Brand", "Amount", "Price"],
            keys: ["name", "type", "brand", "amount", "price"],
            items: [],
            currentPageCount: 1,
            itemsCount: 1,
            isLoading: true
        }
    }

    fromWrapperToParent = async (item) => {
        // let tmp = this.state.items
        // tmp.unshift(item)
        // for (let i=10;i<tmp.length;i++) {
        //     tmp.remove(i)
        // }
        // this.setState({...this.state, items: tmp})
        await this.requestData(this.state.currentPageCount)
    }

    transferMsgFromPagination = async (msg) => {
        msg = parseInt(msg)
        await this.requestData(msg)
        this.setState({currentPageCount: msg})
    }

    requestData = async (pageCount) => {
        this.setState({isLoading: true})
        const response = await requestItemsQuery({currentPageCount: pageCount})
        if (response.data.err_code === 0) {
            this.setState({
                items: response.data.items,
                itemsCount: response.data.itemsCount,
                isLoading: false
            })
        }
    }

    async componentDidMount() {
        await this.requestData()
    }

    render() {
        return (
            <div style={{padding: "30px"}}>
                <MySpinner isLoading={this.state.isLoading}></MySpinner>
                <CardFormWrapperItems fromWrapperToParent={(item) => this.fromWrapperToParent(item)}></CardFormWrapperItems>
                <br/>
                <MyTable
                    fields={this.state.fields}
                    contents={this.state.items}
                    keys={this.state.keys}
                    ></MyTable>
                <div className="row">
                    <MyPagination fromPaginationToParent={(msg) => this.transferMsgFromPagination(msg)} dataPerPage={10} currentPageCount={this.state.currentPageCount} dataCount={this.state.itemsCount}></MyPagination>
                </div>
            </div>
        )
    }
}

export default PageItems;