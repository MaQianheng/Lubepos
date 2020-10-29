import React from "react";
import MyCarousels from "../common/my-carousels";

class CardDetailCars extends React.Component {
    render() {
        const {data} = this.props
        return(
            <div className="col mb-4">
                <div className="card h-100" id="card-detail-cars">
                    <MyCarousels className="card-img-top" data={data}></MyCarousels>
                    <div className="card-body">
                        <h5 className="card-title">{data.brand +" "+ data.model}</h5>
                        <p className="card-text">Owner: {data.owner.name}</p>
                        <p className="card-text">Year: {data.year}</p>
                        <p className="card-text">Color: {data.color}</p>
                        <p className="card-text">Plate Number: {data.plateNumber}</p>
                        {/*<p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>*/}
                    </div>
                </div>
            </div>
        )
    }
}

export default CardDetailCars;