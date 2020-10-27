import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {withRouter, Link} from 'react-router-dom'

// 每个组件有个prop，prop可以通过'prop.'的方式拿到自定义组件标签里的任一属性

class Header extends React.Component {
    constructor(props) {
        super(props);
        // let currentPathname = this.props.history.location.pathname
        // if (currentPathname === "/") {
        //     currentPathname = "/sales"
        //     this.props.history.push("/sales")
        // }
        this.state = {
            navInfo: [
                {
                    text: "SALES",
                    href: "/sales"
                },
                {
                    text: "SALES REPORT",
                    href: "/sales_report"
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
                    href: "/items"
                }
            ]
        };
    }


    render() {
        let currentPathname = this.props.history.location.pathname
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/sales">The One Car POS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {
                            this.state.navInfo.map(
                                (item, idx) => (
                                    <Nav.Link as={Link} to={item.href} key={idx} className={currentPathname === item.href ? "active" : ""}>{item.text}</Nav.Link>
                                )
                            )
                        }
                        {/*<NavLink className="nav-link" to="">a</NavLink>*/}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(Header);
