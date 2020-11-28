import React from "react";
import {login} from "../redux/action"
import {Button} from "react-bootstrap";
import {connect} from 'react-redux'
import MyAlert from "../components/common/my-alert";
import storageUtils from "../utils/storageUtils"
import {Redirect} from 'react-router-dom'
import Unsplash, {toJson} from 'unsplash-js'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';

class PageLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            username: "",
            password: "",
            isChecked: false,
            isLoading: false,
            key: 0,
            bgSrc: require("./index.svg"),
            alert: {
                type: "success",
                value: "success",
                timeStamp: Date.now()
            }
        }
    }

    componentDidMount() {
        const unsplash = new Unsplash({
            accessKey: "bwlM1wzrPkZSlj1RXG-MAjNDeSIeV-Gf7nflQ-5hYFU",
            // Optionally you can also configure a custom header to be sent with every request
            headers: {
                "X-Custom-Header": "foo"
            },
            // Optionally if using a node-fetch polyfill or a version of fetch which supports the timeout option, you can configure the request timeout for all requests
            timeout: 500 // values set in ms
        });
        unsplash.photos.getRandomPhoto({query: "car", orientation: "landscape"})
            .then(toJson)
            .then((json) => {
                this.setState({bgSrc: json.urls.regular, key: 1})
            });
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {};
    }

    informAlert = (value, type) => {
        let {alert} = this.state
        alert.type = type ? type : "warning"
        alert.value = value ? value : "Error"
        alert.timeStamp = Date.now()
        this.setState({alert: alert})
    }

    handleChange = (e) => {
        let key = e.target.getAttribute("name")
        let value = e.target.value
        if (key === "isChecked") {
            value = !this.state.isChecked
        }
        this.setState({[key]: value})
    }

    handleClick = async (e) => {
        e.preventDefault()
        if (e.target.getAttribute("name") === "guest") {
            await this.setState({username: "guest", password: "00000000"})
        }
        const {username, password} = this.state
        if (!username || !password) {
            this.informAlert("One or more required fields are empty")
            return
        }
        this.setState({isLoading: true})
        // 发请求redux更新user
        try {
            await this.props.login({username, password})
        } catch (err) {
            this.informAlert(`Login fail ${err}, can not connect to server`, "danger")
            this.setState({isLoading: false})
            return
        }
        // 读取新的props.user
        const {user} = this.props
        // err_code: 1
        // message: "Username or password is wrong"
        console.log(user)
        if (user.err_code === 0) {
            let {isChecked} = this.state
            if (isChecked) {
                storageUtils.saveUserId(user.user._id)
            }
            this.informAlert("Login success", "success")
            this.props.history.replace('/')
        } else {
            this.informAlert(`Login fail ${user.message}`, "danger")
        }
        this.setState({isLoading: false})
    }

    enterTriggerSearch = async (e) => {
        if (e.keyCode === 13) {
            await this.handleClick(e)
        }
    }

    render() {
        const {isLoading, alert, bgSrc, key} = this.state
        const {user} = this.props.user
        let userid = user ? user._id : storageUtils.getUserId()
        if (userid) {
            return <Redirect to='/sales'/>
        }
        return (
            <div>
                <LazyLoadImage
                    key={key}
                    wrapperClassName="img-fluid"
                    style={{
                        height: "-webkit-fill-available"
                    }}
                    effect="blur"
                    src={bgSrc}
                    width="100%"
                />
                <div className="card text-center" style={{
                    width: "330px",
                    position: "absolute",
                    top: "20%",
                    left: "calc(50% - 165px)"
                }}>
                    <div className="card-header">
                        Login
                    </div>
                    <div className="card-body">
                        <div className="container">
                            <div className="panel panel-default">
                                {/*<div className="panel-heading">*/}
                                {/*    <h3 className="panel-title">Please login</h3>*/}
                                {/*</div>*/}
                                <div className="panel-body">
                                    <fieldset>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Username" name="username"
                                                   disabled={isLoading}
                                                   type="text" value={this.state.username}
                                                   onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Password" name="password"
                                                   disabled={isLoading}
                                                   type="password" value={this.state.password}
                                                   onChange={this.handleChange}
                                                   onKeyUp={this.enterTriggerSearch}
                                            />
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input name="isChecked" type="checkbox" checked={this.state.isChecked}
                                                       disabled={isLoading}
                                                       onChange={this.handleChange} value="Remember Me"/> Remember Me
                                            </label>
                                        </div>
                                        <Button className="btn btn-lg btn-block" variant="primary" type="submit"
                                                name="login"
                                                style={{position: "relative"}}
                                                disabled={!!isLoading}
                                                onClick={this.handleClick}>
                                            <span
                                                className={`spinner-border spinner-border-sm fade ${isLoading ? "show" : "d-none"}`}
                                                role="status" aria-hidden="true"
                                                style={{right: "5px", position: "relative"}}/>
                                            {
                                                isLoading ? "Loading..." : "Login"
                                            }
                                        </Button>
                                        <Button className="btn btn-lg btn-block" variant="success" type="submit"
                                                name="guest"
                                                style={{position: "relative"}}
                                                disabled={!!isLoading}
                                                onClick={this.handleClick}>
                                            <span
                                                className={`spinner-border spinner-border-sm fade ${isLoading ? "show" : "d-none"}`}
                                                role="status" aria-hidden="true"
                                                style={{right: "5px", position: "relative"}}/>
                                            {
                                                isLoading ? "Loading..." : "Login as guest"
                                            }
                                        </Button>
                                        {/*<input className="btn btn-lg btn-success btn-block" type="submit"*/}
                                        {/*       value="Login" onClick={this.handleClick}/>*/}
                                    </fieldset>
                                    <br/>
                                    <MyAlert type={alert.type} value={alert.value} timeStamp={alert.timeStamp}
                                             alertId="alert-login-form"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {login}
)(PageLogin)