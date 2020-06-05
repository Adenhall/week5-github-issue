import React, {useState, useEffect} from 'react';
import './App.css';
import { Button, Container, Row, Column } from 'react-bootstrap';
import IssuesInfo from './components/IssuesInfo.js'
import HieuFooter from './components/Footer.js'
const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
  const [token,setToken] = useState(null)
  const [issuesList, setIssuesList] = useState([])

  const getToken = () => {
    const existingToken = localStorage.getItem('token'); // if we already have token in our localstorage, just get that
    const accessToken = (window.location.search.split("=")[0] === "?access_token") ? window.location.search.split("=")[1].split("&")[0] : null; // reads the token value from body (url)

    if (!accessToken && !existingToken) {
      window.location.replace(`http://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`)
    }

    if (accessToken) { // A.1 if you get token value from url
      console.log(`New accessToken: ${accessToken}`);

      localStorage.setItem("token", accessToken); // A.2 save it to localStorage
      setToken(accessToken) // A.3 and set the state
    }

    if (existingToken) { // A.4 if you have token on your localStorage already
      setToken(existingToken)
    }
  }

  const postNewIssue = async() => {
    // const issue = { title: title, body: details }; // made this as object type to change to json
    const issue = { title: "title", body: "details" }; 
    const url = `http://api.github.com/repos/christinapbui/GithubIssues/issues`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `token ${token}`
      },
      body: JSON.stringify(issue)
    });
    console.log("response?",response)
  } // how to make a new issue

  useEffect(()=>{
    getToken()
  },[])
      
  const getIssues = async() => {
    const owner = "facebook", repo="react";
    let url = `http://api.github.com/repos/${owner}/${repo}/issues`
    let data = await fetch(url)
    let dataResult = await data.json()
    console.log("result?",dataResult)
    setIssuesList(dataResult)
  } // this is how to get the data



  return (
    <div>
      <Container className="navbar">

        <input placeholder="Search here..."></input><Button onClick={()=>getIssues()}>search</Button>
      </Container>
      <Container className="issues-area">
      <button onClick={()=>getIssues()}>Get issues</button>
      <Button onClick={()=>postNewIssue()}>Post new issue</Button>
      <IssuesInfo issuesListProps = {issuesList} getIssuesProps = {getIssues}/>
      </Container>
    
      <div >
      <HieuFooter />
      </div>
    </div>
  );
}

export default App;
