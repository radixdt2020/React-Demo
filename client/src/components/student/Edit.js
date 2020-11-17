import React, { Component } from 'react'
import '../css/AddStudent.css'
import Service from "../service/axios";
import history from '../../hisory';
// import { Link } from 'react-router-dom'
import { Badge, Spinner,Breadcrumb} from "react-bootstrap";

const countryList = ["Select", "India", "United States", "China", "United Kingdom"];

class Edit extends Component {
    
    constructor(props) {
        super(props);
        this.state = { studentID : '' ,StudentName: '', RollNumber: '', Age: '', Country: countryList[0] , Gender: '', EmailId: '', fields: {}, errors: {}  };
        this.loading = false;
    }

    componentDidMount(){
        this.loading = true;
        Service.get('/'+  this.props.match.params.studentID).then(response=>
        {
            // setTimeout(() => {
            //     this.loading = false;
            //     this.setState({
            //         studentID : this.props.match.params.studentID,
            //         StudentName: response.data[0].StudentName,
            //         RollNumber: response.data[0].RollNumber,
            //         Age: response.data[0].Age,
            //         Gender: response.data[0].Gender,
            //         EmailId: response.data[0].EmailId,
            //     });
            //     // this.loading = false;
            // }, 3000);
            if(response.data !== ""){
                this.loading = false;
                this.setState({
                    studentID : this.props.match.params.studentID,
                    StudentName: response.data[0].StudentName,
                    RollNumber: response.data[0].RollNumber,
                    Age: response.data[0].Age,
                    Gender: response.data[0].Gender,
                    EmailId: response.data[0].EmailId,
                    Country: response.data[0].Country
                });
            }
        }
        ).catch(error=>{console.log(error)})
    };
    
    validateNumber = evt => {
        var theEvent = evt || window.event;
        var key;
        // Handle paste
        if (theEvent.type === "paste") {
          key = theEvent.clipboardData.getData("text/plain");
        } else {
          // Handle key press
          key = theEvent.keyCode || theEvent.which;
          key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
          theEvent.returnValue = false;
          if (theEvent.preventDefault) theEvent.preventDefault();
        }
    };

    validateName = evt => {
        var theEvent = evt || window.event;
        var key;
        // Handle paste
        if (theEvent.type === "paste") {
          key = theEvent.clipboardData.getData("text/plain");
        } else {
          // Handle key press
          key = theEvent.keyCode || theEvent.which;
          key = String.fromCharCode(key);
        }
        var regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(key)) {
          theEvent.returnValue = false;
          if (theEvent.preventDefault) theEvent.preventDefault();
        }
    };

    onChangeHandler =(event)=> {
        let nam = event.target.name;
        let val = event.target.value;
        this.validation({[nam]: val});
        this.setState({ [nam]: val });
    }

    clearForm  =(e)=> {
        e.preventDefault();
        this.setState({ StudentName: '', RollNumber: '', Age: '', Gender: '', EmailId: '' , Country: countryList[0]  });
    }

    onSubmit =(e)=> {
        e.preventDefault();
        console.log(this.state)
        if(this.validation(this.state)){
            Service.put('/'+ this.state.studentID, this.state).then(response=>
            {
                if(response.data.message !== '')
                {
                    history.push("/student");
                }
            }
            ).catch(error=>{console.log(error)})
         }else{
            if (this.state.studentID.length === 0 || this.state.StudentName.length === 0 || this.state.RollNumber.length === 0 || this.state.Age.length === 0 
                || this.state.Gender.length === 0 || this.state.EmailId.length === 0) {
                return;
            }
         }
    }

    render() {
       
        return (
            
            <div className="mainDv">
                {this.loading ? <Spinner animation="border" variant="primary" /> : 
                <div>
                    <div className="dvHeader">
                        <div>
                            <Breadcrumb>
                                <Breadcrumb.Item onClick={() => history.push('/student')}>Home</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="dvAddStudent">
                            {/* <Button variant="outline-primary" size="sm" onClick={() => history.push('/student')}>- Back</Button> */}
                            {/* <Link onClick={() => history.push('/student')}>- Back</Link> */}
                            <h4><Badge variant="info" className="lblstudent">Edit Student</Badge></h4>
                        </div>
                    </div>
                    <div className="formContent dvParent">
                        <form>
                            <div className="dvControls">
                                <div>
                                    <span><span className="asterisk">*</span>Name:</span>
                                </div>
                                <div>
                                    <input type="text" name="StudentName" onChange={this.onChangeHandler} value={this.state.StudentName}  
                                        className="form-control controls" placeholder="Name" onKeyPress={this.validateName}/>
                                    <span className="spnError">{this.state.errors["StudentName"]}</span>
                                </div>
                            </div>
                            <div className="dvControls">
                                <div>
                                    <span><span className="asterisk">*</span>Roll Number:</span>
                                </div>
                                <div>
                                    <input type="text" name="RollNumber" onChange={this.onChangeHandler} value={this.state.RollNumber} className="form-control controls" 
                                        placeholder="Roll Number" onKeyPress={this.validateNumber}/>
                                    <span className="spnError">{this.state.errors["RollNumber"]}</span>
                                </div>
                            </div>
                            <div className="dvControls">
                                <div>
                                    <span><span className="asterisk">*</span>Age:</span>
                                </div>
                                <div>
                                    <input type="text" name="Age" onChange={this.onChangeHandler} value={this.state.Age}  className="form-control controls" 
                                        placeholder="Age" onKeyPress={this.validateNumber}/>
                                    <span className="spnError">{this.state.errors["Age"]}</span>
                                </div>
                            </div>
                            <div className="dvControls">
                                <div>
                                    <span><span className="asterisk">*</span>Email Id:</span>
                                </div>
                                <div>
                                    <input type="text" name="EmailId" onChange={this.onChangeHandler} value={this.state.EmailId}  className="form-control controls" placeholder="email@gmail.com" />
                                    <span className="spnError">{this.state.errors["EmailId"]}</span>
                                </div>
                            </div>
                            <div className="dvControls">
                                <div>
                                    <span><span className="asterisk">*</span>Gender:</span>&nbsp;&nbsp;
                                    <input type="radio" name="Gender" onChange={this.onChangeHandler} checked={this.state.Gender === "Male"}  value="Male"/>&nbsp;Male &nbsp;&nbsp;
                                    <input type="radio" name="Gender" onChange={this.onChangeHandler} checked={this.state.Gender === "Female"}  value="Female"/>&nbsp;Female
                                </div>
                                <div>
                                    <span className="spnError">{this.state.errors["Gender"]}</span>
                                </div>
                            </div>
                            <div className="dvControls">
                                <div>
                                    <span><span className="asterisk">*</span>Country:</span>
                                    <select className="form-control controls" name="Country" value={this.state.Country} onChange={this.onChangeHandler}>
                                        {countryList.map(countryList => {
                                            return (
                                                <option value={countryList}> {countryList} </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <span className="spnError">{this.state.errors["Country"]}</span>
                                </div>
                            </div>
                            <div className="btnAdd">
                                <input type="submit" className="btn btn-success" value="Save" onClick={this.onSubmit}/> &nbsp;&nbsp;
                                <input type="submit" className="btn btn-primary" value="Cancel" onClick={this.clearForm}/>
                            </div>
                        </form>
                </div>
                </div>
                }
            </div>

        )
    }

    validation(item){
        let fields = item;
        let errors = {};
        let formIsValid = true;

        if(!fields["StudentName"] && fields["StudentName"] === ""){
            formIsValid = false;
            errors["StudentName"] = "Please enter student name.";
        }
        // else if(typeof fields["StudentName"] !== "undefined"){
        //     if(!fields["StudentName"].match(/^[a-zA-Z]+$/)){
        //        formIsValid = false;
        //        errors["StudentName"] = "Only letters are allowed.";
        //     }        
        // }

        if(!fields["RollNumber"] && fields["RollNumber"] === ""){
            formIsValid = false;
            errors["RollNumber"] = "Please enter roll number.";
        }

        if(!fields["Age"] && fields["Age"] === ""){
            formIsValid = false;
            errors["Age"] = "Please enter age.";
        }

        if(!fields["Gender"] && fields["Gender"] === ""){
            formIsValid = false;
            errors["Gender"] = "Please select gender.";
        }

        if(!fields["EmailId"] && fields["EmailId"] === ""){
           formIsValid = false;
           errors["EmailId"] = "Please enter email.";
        }
        else if(fields["EmailId"] !== "" && typeof fields["EmailId"] !== "undefined"){
           let lastAtPos = fields["EmailId"].lastIndexOf('@');
           let lastDotPos = fields["EmailId"].lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["EmailId"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["EmailId"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["EmailId"] = "Email is not valid";
            }
       }  

        if(fields["Country"] === "Select"){
            formIsValid = false;
            errors["Country"] = "Please enter country.";
        }

       this.setState({errors: errors});
       return formIsValid;
    }
}

export default Edit;
