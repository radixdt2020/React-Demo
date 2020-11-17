import React, { Component } from 'react'
import '../css/User.css';
// import { Link } from 'react-router-dom';
import history from '../../hisory';
import Service from "../service/axios";
import {Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import ModalComponent from "../common/Modal";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = { userList: [], studentId: '' };
    }
    
    componentDidMount(){
        Service.get('/getData').then(response=>
        {
            this.setState({
                userList: response.data
            });
        }
        ).catch(error=>{console.log(error)})
    };

    deleteStudent = (StudentId) => { 
        this.setState({ studentId : StudentId,showModal: true, isClose:true, isOk: true, body : "Are you sure you want to remove this student?"});
    }

    closeModal=val=>{
        this.setState({ showModal: false })
    }

    okModal=val=>{
        this.componentDidMount();
        this.setState({ showModal: false })
    }

    render() {
        return (
            <>
                <div className="dvLink">
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add new student!</Tooltip>}>
                        <span className="d-inline-block">
                            <Button variant="outline-primary" size="sm" onClick={() => history.push('/student/Add')}>
                                Student
                            </Button>
                        </span>
                    </OverlayTrigger>
                    {/* <Link onClick={() => history.push('/student/Add')}></Link> */}
                    <ModalComponent result={this.state} onClose={this.closeModal} onOk={this.okModal}/>
                </div>
                <table className="tableOuter table">
                    <thead>
                        <tr>
                            <th scope="row">Student Name</th>
                            <th scope="row">Roll Number</th>
                            <th scope="row">Age</th>
                            <th scope="row">Gender</th>
                            <th scope="row">Email Id</th>
                            <th scope="row"></th>
                            <th scope="row"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userList.map(( userList, index ) => {
                        return (
                            <tr key={index}>
                                <td>{userList.StudentName}</td>
                                <td>{userList.RollNumber}</td>
                                <td>{userList.Age}</td>
                                <td>{userList.Gender}</td>
                                <td>{userList.EmailId}</td>
                                <td>
                                    <Button variant="outline-primary" size="sm" onClick={() => history.push('/student/Edit/'+userList.StudentId)}>Edit</Button>
                                </td>
                                <td>
                                    <Button variant="outline-primary" size="sm" onClick={e => this.deleteStudent(userList.StudentId)}>Delete</Button>
                                </td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
            </>
        )
    }
}

export default User;