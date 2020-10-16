import React from "react";
import "./my-search-bar.css";

class MySearchBar extends React.Component {

    render() {
        return(
            // <div className="card">
                <div className="input-field col-12 col-md-3">
                    <input type="text" className="input-search-bar form-control" placeholder={this.props.placeHolder}/>
                    <i></i>
                </div>
            // </div>
        )
    }
}

export default MySearchBar;