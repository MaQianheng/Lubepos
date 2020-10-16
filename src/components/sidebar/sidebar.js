import React from "react";
import "./siderbar.css";
import {Nav,NavLink} from "react-bootstrap";
import {withRouter,Link} from "react-router-dom";
import logo from "../../assets/theone-logo-s.jpg";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPathname: "/sales",
            // logoSrc: "./assets/theone-logo-s.jpg",
            navInfo: [
                {
                    text: "SALES",
                    href: "/sales"
                },
                {
                    text: "CARS",
                    href: "/cars"
                },
                {
                    text: "CUSTOMERS",
                    href: "/customers"
                },
                {
                    text: "PRODUCTS/SERVICES",
                    href: "/products"
                }
            ]
        };
    }

    componentWillMount() {
        let currentPathname = this.props.history.location.pathname
        if (currentPathname == "/") {
            currentPathname = "/sales"
            this.props.history.push("/sales")
        }
        this.setState({currentPathname})
        console.log(currentPathname)
    }

    componentDidMount() {
        this.props.history.listen((location) => {
            let currentPathname = location.pathname
            this.setState({currentPathname})
        })
    }

    render () {
        return (
            <div className="sidebar">
                <div className="logo">
                    <div className="row">
                        <div className="col-4"></div>
                        <Nav.Item className="col-8">
                            <NavLink as={Link} to="/sales">The One Car POS</NavLink>
                        </Nav.Item>
                    </div>
                </div>

                <div className="sidebar-menu">
                    <Nav className="flex-column">
                    {
                        this.state.navInfo.map(
                            (item, idx) => (
                                <NavLink as={Link} to={item.href} key={idx} className={this.state.currentPathname == item.href ? "active" : ""}>{item.text}</NavLink>
                            )
                        )
                    }
                    </Nav>
                </div>
            </div>
        )
    }
}

export default withRouter(Sidebar);