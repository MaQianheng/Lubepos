import React from "react";
import {login} from "../redux/action"
import {Button} from "react-bootstrap";
import {connect} from 'react-redux'
import MyAlert from "../components/common/my-alert";
import storageUtils from "../utils/storageUtils"
import {Redirect} from 'react-router-dom'

// import {Redirect} from 'react-router-dom'

class PageLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            username: "",
            password: "",
            isChecked: false,
            isLoading: false,
            alert: {
                type: "success",
                value: "success",
                timeStamp: Date.now()
            }
        }
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
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
            value = this.state.isChecked ? false : true
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
        await this.props.login(this.state)
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
        if(e.keyCode === 13) {
            await this.handleClick(e)
        }
    }

    render() {
        const {isLoading, alert} = this.state
        const {user} = this.props.user
        let userid = user ? user._id : storageUtils.getUserId()
        if (userid) {
            return <Redirect to='/sales'/>
        }
        return (
            <div className="container" style={{marginTop: "200px"}}>
                <div className="card text-center">
                    <div className="card-header">
                        Login
                    </div>
                    <div className="card-body">
                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Please login</h3>
                                </div>
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
                                                disabled={isLoading ? true : false}
                                                onClick={this.handleClick}>
                                            <span
                                                className={`spinner-border spinner-border-sm fade ${isLoading ? "show" : "d-none"}`}
                                                role="status" aria-hidden="true"
                                                style={{right: "5px", position: "relative"}}></span>
                                            {
                                                isLoading ? "Loading..." : "Login"
                                            }
                                        </Button>
                                        <Button className="btn btn-lg btn-block" variant="success" type="submit"
                                                name="guest"
                                                style={{position: "relative"}}
                                                disabled={isLoading ? true : false}
                                                onClick={this.handleClick}>
                                            <span
                                                className={`spinner-border spinner-border-sm fade ${isLoading ? "show" : "d-none"}`}
                                                role="status" aria-hidden="true"
                                                style={{right: "5px", position: "relative"}}></span>
                                            {
                                                isLoading ? "Loading..." : "Login as guest"
                                            }
                                        </Button>
                                        {/*<input className="btn btn-lg btn-success btn-block" type="submit"*/}
                                        {/*       value="Login" onClick={this.handleClick}/>*/}
                                    </fieldset>
                                    <br/>
                                    <MyAlert type={alert.type} value={alert.value} timeStamp={alert.timeStamp}
                                             alertId="alert-login-form"></MyAlert>
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