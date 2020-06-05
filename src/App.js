import React, {useState, useEffect} from 'react';
import './App.css';
import { Button, Container, Row, Column } from 'react-bootstrap';
import Navbarsearchresult from "./components/Navbarsearchresult"
const clientId = `208bd684988074b62c9e`;

function App() {
  /*const [userSearch,setUserSearch] = useState("")
  const [respoSearch,setRespoSearch] = useState("")
  const [issueList,setIssueList] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const token =`82c3975b1e61d3a533985ddbc45c880f30931e19` */
 /* const postNewIssue = async() => {
    // const issue = { title: title, body: details }; // made this as object type to change to json
    const issue = { title: "title", body: "details" }; 
    const url = `https://api.github.com/repos/christinapbui/GithubIssues/issues`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `token ${token}`
      },
      body: JSON.stringify(issue)
    });
    console.log("response?",response)
  } // how to make a new issue */

  useEffect(()=>{
    getIssues()
  },[])
  //const searchUserInput = (input) => {
    //setUserSearch(input.target.value) 
  //}
  //const searchRespoInput = (input) => {
    //setRespoSearch(input.target.value) 
  //}
 /*const getQuerryIssue = async() => {
    const { respoSearch, userSearch, issueList, currentPage} = this.state 
    if({userSearch}==="" || {respoSearch} ===""){
      return alert("Invalid Input");
    } 
    let rawString1;

    let response = await fetch(
      `http://api.github.com/repos/${userSearch}/${respoSearch}/issues?page=1`
    );

    let jsonData = await response.json();
    setIssueList(jsonData)
    respoSearch("")
    userSearch("")
  }    */
  /*const getIssues = async() => {
    let url = `https://api.github.com/repos/facebook/react/issues`
    let data = await fetch(url)
    let result = await data.json()
    console.log("result?",result)
  } // this is how to get the data
*/


  return (
    <div>
      <Container className="navbar">
        <input value="text" placeholder="Search here..."></input>
        <input value="text" placeholder="Search here..."></input>
        <Button onClick={()=>getQueryIssue()}
               // onUserSearchButton={(input)=>searchUserInput(input)}
                //onRespoSearchButton={(input)=>searchRespoInput(input)}
                >search</Button>
      </Container>
      <Container className="issues-area">
      <Button onClick={()=>postNewIssue()}>Post new issue</Button>
      <h1>Issue Title</h1>
      <h4>Owner of Issue</h4>
      <h4>Owner Avatar</h4>
      <h4>When Issue was Created</h4>
      <h4>Body of Issue</h4>
      <h4>Label</h4>
      <h4>State of Issue</h4>
      </Container>
    </div>
  );
}

export default App;