import React from "react";

class MySpinner extends React.Component {
    render() {
        const {isLoading} = this.props
        return (
            <div>
                <div className={`modal-backdrop fade ${isLoading ? "show" : "d-none"}`}></div>
                <div className={`text-center fade ${isLoading ? "show" : ""}`}
                     style={{position: "fixed", left: "50%", bottom: "50%", zIndex: "1060"}}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default MySpinner;