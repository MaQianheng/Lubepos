import React from "react";
import $ from "jquery";

class MyAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeStamp: this.props.timeStamp
        }
    }

    toggleAlert = () => {
        $(`#${this.props.alertId}`).slideToggle()
    }

    componentDidUpdate(preProps,preStates, s) {
        if (this.props.timeStamp === this.state.timeStamp) {
            return
        }
        this.setState({timeStamp: this.props.timeStamp})
        // 如果正在展示
        if ($(`#${this.props.alertId}`).css("display") === "none") {
            this.toggleAlert()
        }
        // setTimeout(() => {
        //     this.toggleAlert()
        // }, 5000)
    }

    render() {
        const {type, value, alertId} = this.props
        // ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"]

        return (
            <div className={`alert alert-${type}`} id={alertId} role="alert" style={{display: "none", width: "100%"}}>
                {value}
                <button type="button" className="close" aria-label="Close" onClick={this.toggleAlert}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
}

export default MyAlert;