import React from "react";
import {Carousel} from "react-bootstrap";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {baseUrl} from "../../api";

class MyCarousels extends React.Component {

    render() {
        const {data} = this.props
        return (
            <Carousel interval={null}>
                {
                    data.imageURLs.map((item, idx) => (
                        <Carousel.Item key={idx} style={{height: "300px"}}>
                            {/*<img*/}
                            {/*    className="d-block w-100 lazy"*/}
                            {/*    src={item.src}*/}
                            {/*    alt={item.brand}*/}
                            {/*    style={{height: "300px"}}*/}
                            {/*/>*/}
                            <LazyLoadImage
                                wrapperClassName="img-thumbnail"
                                style={{minBlockSize: "-webkit-fill-available"}}
                                alt={data.brand}
                                effect="blur"
                                // src={`http://127.0.0.1:4000/images/${item}`}
                                src={`${baseUrl}/images/${item}`} // use normal <img> attributes as props
                                width="100%"
                            />
                            <Carousel.Caption>
                                <h3>{data.brand}</h3>
                                <p>{data.model}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))
                    // Object.keys(data).forEach((key, idx) => (
                    //
                    // ))
                }

                {/*<Carousel.Item>*/}
                {/*  <img*/}
                {/*    className="d-block w-100"*/}
                {/*    src="holder.js/800x400?text=Second slide&bg=282c34"*/}
                {/*    alt="Third slide"*/}
                {/*  />*/}
                {/*  <Carousel.Caption>*/}
                {/*    <h3>Audi</h3>*/}
                {/*    <p>100</p>*/}
                {/*  </Carousel.Caption>*/}
                {/*</Carousel.Item>*/}

                {/*<Carousel.Item>*/}
                {/*  <img*/}
                {/*    className="d-block w-100"*/}
                {/*    src="holder.js/800x400?text=Third slide&bg=20232a"*/}
                {/*    alt="Third slide"*/}
                {/*  />*/}
                {/*  <Carousel.Caption>*/}
                {/*    <h3>Audi</h3>*/}
                {/*    <p>100</p>*/}
                {/*  </Carousel.Caption>*/}
                {/*</Carousel.Item>*/}

            </Carousel>
        );
    }
}

export default MyCarousels;