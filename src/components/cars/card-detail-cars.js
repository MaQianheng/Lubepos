import React from "react";
import MyCarousels from "../common/my-carousels";

class CardDetailCars extends React.Component {
    render() {
        return(
            <div className="col mb-4">
                <div className="card h-100" id="card-detail-cars">
                    <MyCarousels className="card-img-top" data={
                        [
                            {
                                // src: "http://127.0.0.1/imgs/0d016c1d4607b0c5cbe88174b037be86.jpg",
                                src: "./car_002.jpg",
                                brand: "Audi",
                                model: "100"
                            },
                            {
                                src: "./car_003.jpg",
                                brand: "3",
                                model: "4"
                            },
                            {
                                src: "./car_002.jpg",
                                brand: "5",
                                model: "6"
                            }
                        ]
                    }></MyCarousels>
                    <div className="card-body">
                        <h5 className="card-title">Audi 100</h5>
                        <p>Owner: Bob</p>
                        <p>Year: 2018</p>
                        <p>Color: white</p>
                        {/*<p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>*/}
                    </div>
                </div>
            </div>
        )
    }
}

export default CardDetailCars;