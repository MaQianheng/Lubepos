import React from "react";
import {Carousel} from "react-bootstrap";

class MyCarousels extends React.Component {
    render() {
        return (
            <Carousel interval={null}>
                {
                    this.props.data.map((item, idx) => (
                        <Carousel.Item key={idx}>
                            <img
                              className="d-block w-100"
                              src={item.src}
                              alt={item.brand}
                              style={{height: "300px"}}
                            />
                            <Carousel.Caption>
                              <h3>{item.brand}</h3>
                              <p>{item.model}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))
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