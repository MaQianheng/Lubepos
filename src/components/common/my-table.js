import React from 'react';
import {Table} from "react-bootstrap";

// 每个组件有个prop，prop可以通过'prop.'的方式拿到自定义组件标签里的任一属性

export class MyTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const {fields, content} = this.props.data;
        return(
            <Table hover responsive>
              <thead>
                <tr className="thead-dark">
                    {
                        fields.map(
                            (item, idx) => (
                                <th key={idx}>{item}</th>
                            )
                        )
                    }
                </tr>
              </thead>
              <tbody>
                {
                    content.map(
                        (item, idx) => (
                            <tr key={idx}>
                                {
                                    item.map((subItem, subIdx) => (
                                        <td key={subIdx}>{subItem}</td>
                                    ))
                                }
                            </tr>
                        )
                    )
                }
              </tbody>
            </Table>
        )
    }
}