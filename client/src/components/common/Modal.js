import React, { Component } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Service from "../service/axios";

class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false };
    }

    close =()=> {
        this.props.onClose(false);
    }
    
    deleteStudent =()=> {
        Service.delete('/' + this.props.result.studentId).then(response=>
        {
            if(response.data.message !== ""){
                this.props.onOk(false);
            }
        }
        ).catch(error=>{console.log(error)})
    }

    render() {
        let {result} = this.props;
          return (
            <>
                <Modal
                    show={result.showModal}
                    size="lg"
                    aria-labelledby="example-modal-sizes-title-lg"
                    backdrop="static"
                >
                    {result.header && <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {result.header}
                        </Modal.Title>
                        </Modal.Header>
                    }
                    <Modal.Body>
                        {result.bodyHeader && <h4>Unauthorized</h4> }
                        <p>
                            {result.body}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        {result.isClose && <Button onClick={this.close}>Close</Button> }
                        {result.isOk && <Button onClick={this.deleteStudent}>Ok</Button> }
                    </Modal.Footer>
                    </Modal> 
            </>
        )
    }
}

export default ModalComponent;

