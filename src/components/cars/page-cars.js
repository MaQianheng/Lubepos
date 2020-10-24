import React from 'react';
import CardFormWrapperCars from "./card-form-wrapper-cars";
import CardDetailCars from "./card-detail-cars";
import SearchField from "./search-field";
import {requestCarsQuery} from "../../api";
import MyPagination from "../common/my-pagination";
import MySpinner from "../common/my-spinner";

// add a search box, the search keyword can be Licence plate number, owner's name,
// also add filter of brands / models / color

class PageCars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: ["Name", "Phone", "Email"],
            keys: ["name", "phone", "email"],
            cars: [],
            currentPageCount: 1,
            carsCount: 1,
            isLoading: true
        }
    }

    fromWrapperToParent = (data) => {
        this.requestData({currentPageCount: this.state.currentPageCount})
    }

    fromSearchFieldToParent = (userInput) => {
        userInput.currentPageCount = this.state.currentPageCount
        this.requestData(userInput)
    }

    transferMsgFromPagination = async (msg) => {
        this.setState({isLoading: true})
        msg = parseInt(msg)
        await this.requestData(msg)
        this.setState({currentPageCount: msg})
    }

    requestData = (queryCondition) => {
        this.setState({isLoading: true})
        // {color, brand, model, searchField, searchText, currentPageCount}
        requestCarsQuery(queryCondition).then((r) => {
            if (r.data.err_code === 0) {
                this.setState({
                    cars: r.data.cars,
                    carsCount: r.data.count,
                    isLoading: false
                })
            }
            console.log(this.state)
        }).catch((err) => {
            console.log(err)
        })
    }

    async componentDidMount() {
        await this.requestData({currentPageCount: this.state.currentPageCount})
    }

    render() {
        const {cars} = this.state
        return (
            <div style={{padding: "30px"}}>
                <MySpinner isLoading={this.state.isLoading}></MySpinner>
                <CardFormWrapperCars fromWrapperToParent={(data) => this.fromWrapperToParent(data)}></CardFormWrapperCars>
                <br/>
                <div className="sticky-top" style={{marginBottom: "20px"}}>
                    <SearchField fromSearchFieldToParent={(userInput) => this.fromSearchFieldToParent(userInput)}></SearchField>
                </div>
                <div className="row row-cols-1 row-cols-md-6">
                    {
                        cars.map((car, idx) => (
                            <CardDetailCars key={idx} data={car}></CardDetailCars>
                        ))
                    }
                </div>
                <div className="row">
                    <MyPagination transferMsg={(msg, label) => this.transferMsgFromPagination(msg, label)}
                                  dataPerPage={18} currentPageCount={this.state.currentPageCount}
                                  dataCount={this.state.carsCount}></MyPagination>
                </div>
            </div>
        );
    }
}

export default PageCars;