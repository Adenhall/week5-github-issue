import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
export default class Navbarsearchresult extends Component {
    constructor(props){
      super(props)
      this.state = {
        createIssue:false
      }
    }
    const createIssue = ()=>{
      this.setState(
        {
          createIssue: true
        }
      )
    }
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features" onClick={()=>createIssue()>Issue</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link href="#deets"></Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
            </div>
        )
    }
}
