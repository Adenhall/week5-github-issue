import React, {useState, useEffect} from 'react';
import './App.css';

const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
  const [token,setToken] = useState(null);

  const getToken = () =>{
  const existingToken = localStorage.getItem('token');
  const accessToken = (window.location.search.split("=")[0] === "?access_token") ? window.location.search.split("=")[1].split("&")[0] : null;
  console.log(accessToken)

  if (!accessToken && !existingToken) {
    window.location.replace(`https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`)
  };


  if (accessToken) { // if u  get token value from url
    console.log(`New accessToken: ${accessToken}`);

    localStorage.setItem("token", accessToken); //savie it to localstorage 
    setToken(accessToken)
  }

  if (existingToken) {
    setToken(existingToken) // if u have token on ur localStorage already
  }
};

const getIssues = async(owner,repo) => {
  console.log("let's get physical")
  let url = `https://api.github.com/repos/:${owner}/:${repo}/issues`
  let data = await fetch(url)
  let result = await data.json()
  console.log("result", result)

}


const postIssues = ()=>{

}

useEffect(()=>{
  getToken()
},[])

  return (
  <div>
    <div>
    nav nav nav
  </div>
    <div>{console.log("what is token?", token)}
    <button onClick={()=>getIssues}>search</button>
    <button onClick={()=> postIssues}>post</button>
    </div>

  </div>
  
 );
  }

export default App;
