import React from 'react';


export default class Greeting extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <b>Hello {this.props.name}</b>
                </div>
                <div>
                    Your designation is <b>{this.props.designation}</b> and employee code is <b>{this.props.employeeCode}</b>.
                </div>
            </div>
        )
    }
}
