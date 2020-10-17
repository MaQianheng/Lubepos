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
                                src: "https://img.wallpapersafari.com/tablet/2048/2732/67/87/GQNkS5.jpg",
                                brand: "Audi",
                                model: "100"
                            },
                            {
                                src: "https://lh3.googleusercontent.com/proxy/u-VILd_S73fAqwxCfmy3vnjDb99uRWTnlnRMMaeaVhBr9Fy0bL2Fwsjsk23wmTcWrmT5jGh6Mi_OctlOG-YCQ89hOdztJTKfSQur1cHch-zdvsvfj3arulc4HlYY0O8ysYYhJpR33zQbxQgG3gQV1g",
                                brand: "3",
                                model: "4"
                            },
                            {
                                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbqK9gI0IZ7_8b7kk5i2RSbhSA2DooXl2ztA&usqp=CAU",
                                brand: "5",
                                model: "6"
                            }
                        ]
                    }></MyCarousels>
                    <div className="card-body">
                        <h5 className="card-title">Audi 100</h5>
                        <p className="card-text">Owner: Bob</p>
                        <p className="card-text">Year: 2018</p>
                        <p className="card-text">Color: white</p>
                        {/*<p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>*/}
                    </div>
                </div>
            </div>
        )
    }
}

export default CardDetailCars;