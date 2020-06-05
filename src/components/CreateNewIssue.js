import React, { Component } from 'react'
import Modal2 from "./components/Modal.js"
import "./css/footer.css"
import 'bootstrap/dist/css/bootstrap.min.css';
export default class CreateNewIssue extends Component {
    constructor(props){
        super(props)
        this.state = {
            modalShow:false,
            title:null,
            issue:null,
            body:null,
            user:null,
        }
    }
    titleIssue = (input) => {
        this.setState(
            {}
        )
    }
    descriptionIssue = (input) => {

    } 
    render() {
        return (
            <div>
                <Navbar variant="dark">
        <div className="d-flex">
          <Button
            className="issue-btn"
            variant="outline-info"
            style={{ width: "150px", fontSize: "1.25em" }}
            onClick={() => this.setState({ 
                modalShow: true })}
          >
            Create Issue
          </Button>
          <img className="App-logo" src={"img/logo.svg"} alt="logo" />
          <Modal2
            show={this.state.modalShow}
            onHide={modalClose}
            checkTitle={input => this.titleIssue(input)}
            checkBody={input => this.descriptionIssue(input)}
          />
        </div>
      </Navbar>
            </div>
        )
    }
}
