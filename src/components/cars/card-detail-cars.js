import React from "react";
import MyCarousels from "../common/my-carousels";
import {Button} from "react-bootstrap";
import {requestCarDelete} from "../../api";

class CardDetailCars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    handleEditClick = () => {
        this.props.fromCardToParent("EDIT", this.props.data)
    }

    handleDeleteClick = () => {
        this.setState({isLoading: true})
        requestCarDelete({_id: this.props.data._id}).then((r) => {
            if (r.data.err_code === 0) {
                this.props.fromCardToParent("DELETE SUC", this.props.data)
            } else {
                this.props.fromCardToParent("DELETE FAIL", r.data.message)
            }
            this.setState({isLoading: false})
        }).catch((err) => {
            this.props.fromCardToParent("DELETE FAIL", err)
            this.setState({isLoading: false})
        })
    }

    render() {
        const {data} = this.props
        const {isLoading} = this.state
        return (
            <div className="col" style={{margin: "10px 0px"}}>
                <div className="card h-100" id="card-detail-cars">
                    <MyCarousels className="card-img-top" data={data}/>
                    <div className="card-body">
                        <h5 className="card-title">{data.brand + " " + data.model}</h5>
                        <p className="card-text">Owner: {data.owner.name}</p>
                        <p className="card-text">Year: {data.year}</p>
                        <p className="card-text">Color: {data.color}</p>
                        <p className="card-text">Plate Number: {data.plateNumber}</p>
                        <div className="row row-cols-6">
                            <Button className="col-5" variant="primary" type="submit" style={{position: "relative", margin: "0 10px"}}
                                    disabled={!!isLoading} onClick={this.handleEditClick}>
                            <span className={`spinner-border spinner-border-sm fade ${isLoading ? "show" : "d-none"}`}
                                  role="status" aria-hidden="true" style={{right: "5px", position: "relative"}}/>
                                {
                                    isLoading ? "Loading..." : "Edit"
                                }
                            </Button>
                            <Button className="col-5" variant="danger" type="submit" style={{position: "relative", margin: "0 10px"}}
                                    disabled={!!isLoading} onClick={this.handleDeleteClick}>
                            <span className={`spinner-border spinner-border-sm fade ${isLoading ? "show" : "d-none"}`}
                                  role="status" aria-hidden="true" style={{right: "5px", position: "relative"}}/>
                                {
                                    isLoading ? "Loading..." : "Delete"
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardDetailCars;