
import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import history from './hisory';
import Add from "./components/student/Add";
import User from "./components/user/User";
import Edit from "./components/student/Edit";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/student/Add" exact component={Add} />
                    <Route path="/student" exact component={User} />
                    <Route path="/student/Edit/:studentID" component={Edit} />
                </Switch>
            </Router>
        )
    }
}