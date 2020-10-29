import React from 'react';
import {Nav, Navbar, Button} from "react-bootstrap";
import {withRouter, Link} from 'react-router-dom'
import storageUtils from "../../utils/storageUtils";
import {requestUserInfo} from "../../api";
import {connect} from 'react-redux';
import {logout} from "../../redux/action"

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
                    text: "SALES REPORT",
                    href: "/sales_report"
                },
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
                    href: "/items"
                }
            ],
            isLoading: true,
            username: ""
        };
    }

    componentDidMount() {
        if (!this.props.user.user) {
            requestUserInfo({userId: storageUtils.getUserId()}).then((r) => {
                if (r.data.err_code === 0) {
                    this.setState({username: r.data.user.username})
                } else {
                    storageUtils.deleteUserId()
                }
                this.setState({isLoading: false})
            }).catch((err) => {
                storageUtils.deleteUserId()
            })
        } else {
            this.setState({username: this.props.user.user.username, isLoading: false})
        }
    }

    handleClick = () => {
        storageUtils.deleteUserId()
        this.props.history.replace('/login')
        this.props.logout()
    }


    render() {
        let currentPathname = this.props.history.location.pathname
        let {isLoading, username} = this.state
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/sales">The One Car POS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {
                            this.state.navInfo.map(
                                (item, idx) => (
                                    <Nav.Link as={Link} to={item.href} key={idx}
                                              className={currentPathname === item.href ? "active" : ""}>{item.text}</Nav.Link>
                                )
                            )
                        }
                    </Nav>
                    {isLoading ? null
                        :
                        <Navbar.Text>
                            Signed in as: {username}
                        </Navbar.Text>
                    }
                    <Button className="btn" variant="warning" type="submit"
                            style={{position: "relative", marginLeft: "20px"}}
                            disabled={isLoading ? true : false}
                            onClick={this.handleClick}>
                        <span
                            className={`spinner-border spinner-border-sm fade ${isLoading ? "show" : "d-none"}`}
                            role="status" aria-hidden="true"
                            style={{right: "5px", position: "relative"}}></span>
                        {
                            isLoading ? "Loading..." : "Logout"
                        }
                    </Button>
                    {/*<button type="button" class="btn btn-warning" style={{marginLeft: "20px"}}></button>*/}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {logout}
)(withRouter(Header));
