import React, {useState, useEffect} from 'react';
import './App.css';
import { Button, Container, Row, Column } from 'react-bootstrap';

const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
  const [token,setToken] = useState(null)

  const getToken = () => {
    const existingToken = localStorage.getItem('token'); // if we already have token in our localstorage, just get that
    const accessToken = (window.location.search.split("=")[0] === "?access_token") ? window.location.search.split("=")[1].split("&")[0] : null; // reads the token value from body (url)

    if (!accessToken && !existingToken) {
      window.location.replace(`https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`)
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
  } // how to make a new issue

  useEffect(()=>{
    getToken()
  },[])
      
  const getIssues = async() => {
    let url = `https://api.github.com/repos/facebook/react/issues`
    let data = await fetch(url)
    let result = await data.json()
    console.log("result?",result)
  } // this is how to get the data



  return (
    <div>
      <Container className="navbar">
        <input value="text" placeholder="Search here..."></input><Button onClick={()=>getIssues()}>search</Button>
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
