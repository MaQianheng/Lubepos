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
            fields: ["Name", "Type", "Brand", "Amount", "Price", "Action"],
            keys: ["name", "type", "brand", "amount", "price"],
            items: [],
            currentPageCount: 1,
            itemsCount: 1,
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
        requestItemsQuery({currentPageCount: pageCount}).then((r) => {
            if (r.data.err_code === 0) {
                this.setState({
                    items: r.data.items,
                    itemsCount: r.data.itemsCount,
                    isLoading: false
                })
            }
        }).catch((err) => {
            this.setState({
                isLoading: false
            })
            console.log(err)
        })
    }

    async componentDidMount() {
        await this.requestData()
    }

    render() {
        return (
            <div style={{padding: "30px"}}>
                <MySpinner isLoading={this.state.isLoading}></MySpinner>
                <CardFormWrapperItems
                    fromWrapperToParent={(item) => this.fromWrapperToParent(item)}>
                </CardFormWrapperItems>
                <br/>
                <div className="card">
                    <div className="card-body">
                        <MyTable
                            tableRole="items"
                            fromTableToParent={(action) => this.fromTableToParent(action)}
                            fields={this.state.fields}
                            contents={this.state.items}
                            keys={this.state.keys}
                        ></MyTable>
                        <div className="row">
                            <MyPagination fromPaginationToParent={(msg) => this.transferMsgFromPagination(msg)}
                                          dataPerPage={10}
                                          currentPageCount={this.state.currentPageCount}
                                          dataCount={this.state.itemsCount}></MyPagination>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageItems;