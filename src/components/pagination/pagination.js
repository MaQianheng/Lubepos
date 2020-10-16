import React from 'react';
import {Pagination} from "react-bootstrap";
import {withRouter} from 'react-router-dom'

// 每个组件有个prop，prop可以通过'prop.'的方式拿到自定义组件标签里的任一属性

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return(
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Ellipsis />

              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Item>{11}</Pagination.Item>
              <Pagination.Item active>{12}</Pagination.Item>
              <Pagination.Item>{13}</Pagination.Item>
              <Pagination.Item disabled>{14}</Pagination.Item>

              <Pagination.Ellipsis />
              <Pagination.Item>{20}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
        )
    }
}

export default withRouter(Pagination);
