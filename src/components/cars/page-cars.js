import React from 'react';
import CardFormWrapperCars from "./card-form-wrapper-cars";
import CardDetailCars from "./card-detail-cars";
import SearchField from "./search-field";
import {requestCarsQuery} from "../../api";
import MyPagination from "../common/my-pagination";
import MySpinner from "../common/my-spinner";
import MyVerticallyCenteredModal from "../common/my-vertically-centered-modal";
import MyAlert from "../common/my-alert";

class PageCars extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: ["Name", "Phone", "Email"],
            keys: ["name", "phone", "email"],
            cars: [],
            currentPageCount: 1,
            carsCount: 1,
            isLoading: true,
            modalShow: false,
            ownerPreContent: [],
            editingData: {
                brand: "",
                color: "",
                imageURLs: [],
                newImages: [],
                model: "",
                owner: {
                    _id: "",
                    name: ""
                },
                plateNumber: "",
                year: "",
                _id: ""
            },
            alert: {
                type: "success",
                value: "success",
                timeStamp: Date.now()
            }
        }
    }

    async componentDidMount () {
        await this.requestCarsData({currentPageCount: 1})
    }

    requestCarsData = (queryCondition) => {
        this.setState({isLoading: true})
        // {color, brand, model, searchField, searchText, currentPageCount}
        requestCarsQuery(queryCondition).then((r) => {
            if (r.data.err_code === 0) {
                this.setState({
                    cars: r.data.cars,
                    carsCount: r.data.count,
                    isLoading: false
                })
            } else {
                this.setState({isLoading: false})
                this.informAlert(`Request data fail ${r.data.message}`, "danger")
            }
        }).catch((err) => {
            this.setState({isLoading: false})
            this.informAlert(`Request data fail ${err}`, "danger")
        })
    }

    informAlert = (value, type) => {
        let {alert} = this.state
        alert.type = type ? type : "warning"
        alert.value = value ? value : "Error"
        alert.timeStamp = Date.now()
        this.setState({alert: alert})
    }

    toggleModal = () => {
        let {modalShow} = this.state
        this.setState({modalShow: !modalShow})
    }

    fromCardToParent = (action, data) => {
        switch (action) {
            case "EDIT":
                this.setState({editingData: data})
                this.toggleModal()
                break
            case "DELETE SUC":
                this.requestCarsData({currentPageCount: this.state.currentPageCount})
                break
            case "DELETE FAIL":
                this.informAlert(data, "danger")
                break
            default:
                break
        }
    }

    fromModalToParent = (action, data) => {
        switch (action) {
            case "REQUEST DATA":
                this.requestCarsData({currentPageCount: this.state.currentPageCount})
                break
            default:
                break
        }
    }

    fromWrapperToParent = (action, data) => {
        switch (action) {
            case "REQUEST DATA":
                this.requestCarsData({currentPageCount: this.state.currentPageCount})
                break
            case "TRANSFER DATA":
                this.setState({ownerPreContent: data})
                // this.props.fromWrapperToParent("TRANSFER DATA", data)
                break
            default:
                break
        }

    }

    fromSearchFieldToParent = (userInput) => {
        userInput.currentPageCount = 1
        this.requestCarsData(userInput)
    }

    transferMsgFromPagination = async (msg) => {
        this.setState({isLoading: true})
        msg = parseInt(msg)
        await this.requestCarsData(msg)
        this.setState({currentPageCount: msg})
    }

    render() {
        const {cars, modalShow, isLoading, currentPageCount, carsCount, editingData, ownerPreContent} = this.state

        return (
            <div style={{padding: "30px"}}>
                <MyAlert type={alert.type} value={alert.value} timeStamp={alert.timeStamp}
                             alertId="alert-page-cars"/>
                <MyVerticallyCenteredModal
                    fromModalToParent={(action, data) => this.fromModalToParent(action, data)}
                    ownerprecontent={ownerPreContent}
                    editingdata={editingData}
                    show={modalShow}
                    onHide={this.toggleModal}
                />
                <MySpinner isLoading={isLoading}/>
                <CardFormWrapperCars
                    editingData={editingData}
                    fromWrapperToParent={(action, data) => this.fromWrapperToParent(action, data)}>
                </CardFormWrapperCars>
                <br/>
                <div className="card">
                    <div className="card-body">
                        <div className="sticky-top" style={{marginBottom: "20px"}}>
                            <SearchField
                                fromSearchFieldToParent={(userInput) => this.fromSearchFieldToParent(userInput)}/>
                        </div>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                            {
                                cars.map((car, idx) => (
                                    <CardDetailCars
                                        fromCardToParent={(action, data) => this.fromCardToParent(action, data)}
                                        key={idx} data={car}/>
                                ))
                            }
                        </div>
                        <div className="row">
                            <MyPagination
                                fromPaginationToParent={(msg, label) => this.transferMsgFromPagination(msg, label)}
                                dataPerPage={18} currentPageCount={currentPageCount}
                                dataCount={carsCount}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageCars;