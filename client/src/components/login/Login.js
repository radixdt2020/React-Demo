import React, { Component } from 'react'
import '../css/Login.css';
import axios from 'axios';
import history from '../../hisory';
import ModalComponent from "../common/Modal";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', fields: {}, errors: {} };
        this.accessPointUrl = 'http://localhost:2000/Login';
    }

    onChangeHandler =(event)=> {
        let nam = event.target.name;
        let val = event.target.value;
        this.handleValidation({[nam]: val});
        this.setState({ [nam]: val });
    }

    onSubmit =(e)=> {
        e.preventDefault();
        
        if(this.handleValidation(this.state)){
            axios.post(this.accessPointUrl, this.state).then(response=>
                {
                    localStorage.setItem('token', response.data);
                    if(response.data.length !== 0)
                    {
                        history.push("/student");
                        // this.setState({ redirect: true })
                    }
                    else{
                        this.setState({ showModal: true, isClose :true, body : "Access is denied due to invalid credentials.", bodyHeader: "Unauthorized",
                                        header : "Oops you found a glitch!"});
                    }
                }
                ).catch(error=>{console.log(error)})
         }else{
            if (this.state.email.length === 0 || this.state.password.length === 0) {
                return;
            }
         }
    }

    handleValidation(item){
        let fields = item;
        let errors = {};
        let formIsValid = true;
        if(!fields["email"] && fields["email"] === ""){
           formIsValid = false;
           errors["email"] = "Please enter email.";
        }
        else if(fields["email"] !== "" && typeof fields["email"] !== "undefined"){
           let lastAtPos = fields["email"].lastIndexOf('@');
           let lastDotPos = fields["email"].lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid";
            }
       }  
        if(!fields["password"] && fields["password"] === ""){
            formIsValid = false;
            errors["password"] = "Please enter password.";
        }
        else if(typeof fields["password"] !== "undefined" && fields["password"].length < 4){
            formIsValid = false;
            errors["password"] = "You have to enter at least 4 digit.";
        }  

       this.setState({errors: errors});
       return formIsValid;
    }

    closeModal=val=>{
        this.setState({ showModal: false })
    }

    render() {
        // const { redirect } = this.state;

        // if (redirect) {
        //     return  <BrowserRouter>
        //                 <Route to="/user" component={User} render={() => (<Redirect to="/user/User" />)} />          
        //             </BrowserRouter>;
        //   }
          return (
            <div className="container">
                <div className="dvLoginHeader">
                    <label><b>Login</b></label>
                </div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="Appcontent" >
                            <div className="dvLogin">
                                <div>
                                    <span> Email </span>
                                </div>
                                <div>
                                    <input type="text" name="email"  className="form-control controls" placeholder="email@gmail.com" onChange={this.onChangeHandler} value={this.state.email}/>
                                    <span className="spnError">{this.state.errors["email"]}</span>
                                </div>
                            </div>
                            <div className="dvLogin">
                                <div>
                                    <span> Password </span>
                                </div>
                                <div>
                                    <input type="password" name="password" className="form-control controls" placeholder="Password" onChange={this.onChangeHandler} value={this.state.password}/>
                                    <span className="spnError">{this.state.errors["password"]}</span>
                                </div>
                            </div>
                            <div className="divBtnSubmit">
                                <input type="submit" className="btn btn-primary" value="Login"/>
                                <ModalComponent result={this.state} onClose={this.closeModal}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;

