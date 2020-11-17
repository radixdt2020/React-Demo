import React, { Component } from 'react'
import '../css/AddStudent.css';
import history from '../../hisory';
import { Breadcrumb , Badge } from "react-bootstrap";
import Service from "../service/axios";

const countryList = ["Select", "India", "United States", "China", "United Kingdom"];

class Add extends Component {
    
    constructor(props) {
        super(props);
        this.state = { StudentName: '', RollNumber: '', Age: '', Gender: '', EmailId: '', Country: countryList[0] , fields: {}, errors: {} , Language: [],selectedlanguage:"" };
        this.accessPointUrl = 'http://localhost:2000/user';
        this.languageList = [
            { value: "english", label: "English" },
            { value: "hindi", label: "Hindi" },
            { value: "urdu", label: "Urdu" },
            { value: "arabic", label: "Arabic" }
        ];
    }

    onChangeHandler =(event)=> {
        let nam = event.target.name;
        let val = event.target.value;
        
        // if(nam === "Language")
        // {
        //     console.log(val);
        //     var a = val;
        //     var add = a.split(', ')
        //     this.setState({selectedlanguage:  this.Language+=add})
            
        //     console.log(add);
        //     // this.setState({Language: this.Language+=val.split(',')})
        // }
        // else
        // {
        //     this.setState({ [nam]: val });
        // }
        this.validation({[nam]: val});
        this.setState({ [nam]: val });
    }

    clearForm  =(e)=> {
        e.preventDefault();
        console.log(countryList[0])
        this.setState({ StudentName: '', RollNumber: '', Age: '', Gender: '', EmailId: '' , fields: {}, errors: {}, Country: countryList[0] });
    }

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

    onSubmit =(e)=> {
        e.preventDefault();
        if(this.validation(this.state)){
            Service.post('/insertData', this.state).then(response=>
            {
                if(response.data.length !== 0)
                {
                    history.push("/student");
                }
            }
            ).catch(error=>{console.log(error)})
         }else{
            if (this.state.StudentName.length === 0 || this.state.RollNumber.length === 0 || this.state.Age.length === 0 
                || this.state.Gender.length === 0 || this.state.EmailId.length === 0) {
                return;
            }
         }
    }

    // React Dropdown
    // handleSelect(eventKey, event) {
    //     this.setState({ Country: countryList[eventKey] });
    // }

    render() {
        return (
            <div className="mainDv">
                <div className="dvHeader">
                    <div>
                        <Breadcrumb>
                            <Breadcrumb.Item onClick={() => history.push('/student')}>Home</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="dvAddStudent">
                        {/* <Button variant="outline-primary" size="sm" onClick={() => history.push('/student')}>- Back</Button> */}
                        <h4><Badge variant="info" className="lblstudent">Add Student</Badge></h4>
                    </div>
                </div>
                <div className="formContent dvParent">
                    <form>
                        <div className="dvControls">
                            <div>
                                <span><span className="asterisk">*</span>Name:</span>
                            </div>
                            <div>
                                <input type="text" name="StudentName" onChange={this.onChangeHandler} 
                                    value={this.state.StudentName}  className="form-control controls" placeholder="Name"
                                    onKeyPress={this.validateName}/>
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
                                <input type="radio" name="Gender" onChange={this.onChangeHandler} value="Male"/>&nbsp;Male &nbsp;&nbsp;
                                <input type="radio" name="Gender" onChange={this.onChangeHandler} value="Female"/>&nbsp;Female
                            </div>
                            <div>
                                <span className="spnError">{this.state.errors["Gender"]}</span>
                            </div>
                        </div>
                        {/* React Dropdown */}
                        {/* <div className="dvControls">
                            <div>
                                <span><span className="asterisk">*</span>Language:</span>&nbsp;&nbsp;
                                {this.languageList.map((x, i) => {
                                    return (
                                    <label key={i} className="mr-2">
                                        <input
                                        type="checkbox"
                                        name="Language"
                                        value={x.value}
                                        onChange={this.onChangeHandler}
                                        />
                                        {x.label}
                                    </label>
                                    );
                                })}
                            </div>
                        </div> */}
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
                                {/* <DropdownButton
                                    title={this.state.Country}
                                    id="document-type"
                                    onSelect={this.handleSelect.bind(this)}
                                    variant="variant"
                                >
                                    {countryList.map((opt, i) => (
                                    <Dropdown.Item key={i} eventKey={i}>
                                        {opt}
                                    </Dropdown.Item>
                                    ))}
                                </DropdownButton> */}
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

        // if(!fields["Language"] && fields["Language"] === ""){
        //     formIsValid = false;
        //     errors["Language"] = "Please select hobbies.";
        // }

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

export default Add;
