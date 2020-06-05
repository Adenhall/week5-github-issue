import React, {useState, useEffect} from 'react';
import './App.css';
import IssueList from './components/IssueList.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css"; 
import {Form, FormControl, Button} from 'react-bootstrap';
import {Navbar, Nav, Collapse, NavDropdown} from 'react-bootstrap';

const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
  let searchIssue = ''
  let [issues,setIssues] = useState(null);
  const [token,setToken] = useState(null);
 
  let [searchIssues, setSearchIssues] = useState(null)
  let [pageNumber, setPageNumber] = useState(1)
  let [total,setTotalPages]=useState(null)
  let [errorIssues, setErrorIssues]= useState(false)
  let [fullList, setFullList] = useState([])
  let owner = ''
  let repo = ''
  

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

const getIssues = async(owner,repo,pageNumber) => {
  let newArray = searchIssue.split('/') 
  owner = newArray[0]
  repo = newArray[1]
  console.log("let's get physical")
  let url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNumber}&per_page=30`
  let data = await fetch(url)
  let result = await data.json()
  // console.log("result", result)
  setFullList(result)
  setIssues(getListToDisplay(result,0))
  
  // console.log(searchIssue)
  if (searchIssue === ''){
   setErrorIssues(true)
  }
  setTotalPages((result.length)/10)

}

const getListToDisplay = (result, page) => {
  return result.filter((x, index) => index >= page * 10 && index < (page+1)*10)
}


const postIssues = ()=>{
  // console.log(issues)
  

}



useEffect(()=>{
  getToken()
},[])

if (errorIssues)
{
  return <div>No Issues Found</div>
}
let changeCurrentPage=(pageNumber)=>{
  let a = getListToDisplay(fullList, pageNumber-1)
  setPageNumber(pageNumber)
  setIssues(a)
 
}

  return (
  <div>
    <div>
    <h1>Github Issues</h1>
  </div>
    <div>{console.log("what is token?", token)}
    <Form inline>
      <FormControl type="text" placeholder="Format: Owner/Repo" className="mr-sm-2" onChange={(e)=>searchIssue=e.target.value} />
      
      <Button variant="outline-success" onClick={()=>getIssues()}>Search</Button>
      <Button variant="outline-success" onClick={()=> postIssues()}>Post</Button>
    
    </Form>

    
    
    </div>
  <div>
  <IssueList list={issues}></IssueList>
  
  </div>
    <Navbar className="nav3" bg="light" expand="sm" fixed="bottom">
        <Pagination 
              currentPage={pageNumber}
              totalPages={total}
              changeCurrentPage={changeCurrentPage}
              theme="bottom-border"
            /> 

    </Navbar>

  </div>
  
 );
  }

export default App;
