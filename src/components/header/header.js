import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {withRouter, Link} from 'react-router-dom'

// 每个组件有个prop，prop可以通过'prop.'的方式拿到自定义组件标签里的任一属性

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPathname: "/sales",
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
        if (currentPathname === "/") {
            currentPathname = "/sales"
            this.props.history.push("/sales")
        }
        this.setState({currentPathname})
        // console.log(currentPathname)
    }

    componentDidMount() {
        this.props.history.listen((location) => {
            let currentPathname = location.pathname
            this.setState({currentPathname})
        })
    }


    render() {
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/sales">The One Car POS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {
                            this.state.navInfo.map(
                                (item, idx) => (
                                    <Nav.Link as={Link} to={item.href} key={idx} className={this.state.currentPathname === item.href ? "active" : ""}>{item.text}</Nav.Link>
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
