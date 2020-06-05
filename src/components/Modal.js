import React, { Component } from 'react'
import { 
    Button, 
    Navbar, 
    Form, 
    FormControl, 
    Nav, 
    Modal 
    } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
//[ ] The user should be able to create a new issue via a modal for the repository, by clicking on a "new issue" button. Clicking on this button will pop open a modal that asks for the requisite fields.
//[ ] The user should be able to see the body of the issue rendered in markdown.
//Tips: check this document! https://github.com/rexxars/react-markdown

export default class Modal2 extends Component {
    constructor(props){
        super(props)
        this.state={
            modalShow:this.props.modalShow,
        }
    }
    render() {
        return (

            <div>
                <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{ backgroundColor: "#282c34" }} closeButton>
          <Navbar variant="dark">
            <Nav className="mr-auto" />
            <Form inline>
              <FormControl
                onChange={this.props.checkTitle}
                type="text"
                placeholder="Issue subject"
                className="mr-sm-2"
              />
            </Form>
          </Navbar>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Describe your issue below</Form.Label>
            <Form.Control
              onChange={this.props.checkBody}
              as="textarea"
              rows="10"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#282c34" }}>
          <Navbar variant="dark">
            <Button
              className="mr-auto"
              onClick={this.props.onHide}
              variant="outline-info"
            >
              Submit issue
            </Button>
          </Navbar>
        </Modal.Footer>
        
        <button
               
               onClick={() => this.setState({ modalShow: true })}>Create Issue</button> 
      </Modal>
            </div>
        )
    }
}
