import React from 'react';
import {Table} from "react-bootstrap";

// 每个组件有个prop，prop可以通过'prop.'的方式拿到自定义组件标签里的任一属性

export class MyTable extends React.Component {
    render() {
        const {fields, contents, keys} = this.props;
        return (
            <div>

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
                        contents.map((item, idx) => (
                            <tr key={idx}>
                                {
                                    keys.map((key, idx) => (
                                        <td key={idx}>{item[key]}</td>
                                    ))
                                    // Object.keys(item).map((key, idx) => (
                                    //     <td key={idx}>{item[key]}</td>
                                    // ))
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}