import React, {useState, useEffect} from 'react';
import './App.css';
import { Container, Row, Column } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import IssuesInfo from './components/IssuesInfo.js'
import ReactModal from 'react-modal'
import HieuFooter from './components/Footer.js'
import Navbar from 'react-bootstrap/Navbar'
import Pagination from "react-pagination-library";


const clientId = process.env.REACT_APP_CLIENT_ID;
let newIssueTitle = ""
let newIssueBody = ""
let inputString= ""

function App() {
  const [token,setToken] = useState(null)
  const [issuesList,setIssuesList] = useState([])
  const [openModal,setOpenModal] = useState(false)
  let [pageNumber, setPageNumber] = useState(1)
  let [total,setTotalPages]=useState(null)
  let [errorIssues, setErrorIssues]= useState(false)
  let [fullList, setFullList] = useState([])

  const getToken = () => {
    const existingToken = localStorage.getItem('token'); // if we already have token in our localstorage, just get that
    const accessToken = (window.location.search.split("=")[0] === "?access_token") ? window.location.search.split("=")[1].split("&")[0] : null; // reads the token value from body (url)
     console.log("acc",accessToken)
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

  const postNewIssue = () => {
    setOpenModal(true)
    console.log("open modal?",openModal)
  } // how to make a new issue

  useEffect(()=>{
    getToken()
  },[])
      
  const getIssues = async(owner,repo,pageNumber) => {
    let tempArray = inputString.split('/')
    owner = tempArray[0]
    repo = tempArray[1]
    let url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNumber}&per_page=30`
    let data = await fetch(url)
    let dataResult = await data.json()
    console.log("result?",dataResult)
    setFullList(dataResult)
    setIssuesList(getListToDisplay(dataResult,0))
    
    if (issuesList === ''){
      setErrorIssues(true)
     }
     setTotalPages((dataResult.length)/10)
   
  } // this is how to get the data

  const getListToDisplay = (result, page) => {
    return result.filter((x, index) => index >= page * 10 && index < (page+1)*10)
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  const submitNewIssue = async() => {
    const issue = { title: {newIssueTitle}, body: {newIssueBody} }; // made this as object type to change to json
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
  }

  
if (errorIssues)
{
  return <div>No Issues Found</div>
}
let changeCurrentPage=(pageNumber)=>{
  let a = getListToDisplay(fullList, pageNumber-1)
  setPageNumber(pageNumber)
  setIssuesList(a)
}


  return (
    <div>
      <Container className="navbar">

  <input placeholder="Search here..."onChange={(e) => inputString = e.target.value}></input><Button onClick={()=>getIssues()}>search</Button>
      </Container>
      <Container className="issues-area">
      <Button variant="primary" onClick={()=>getIssues()}>Get issues</Button>
      <ReactModal
        className="video-popup-modal" 
        ariaHideApp={false}
        isOpen={openModal}
        onRequestClose={()=>closeModal()}
          closeTimeOutMS={2000}
          shouldCloseOnOverlayClick={true}
          style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
            content: {
              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'
            }
          }}>
        <Button onClick={()=>closeModal()}>Close</Button>
        <div>New Issue: <input type="text" placeholder="Title" onChange={(e)=>{newIssueTitle=e.target.value}}></input></div>
        <div>Owner of Issue: (get author of post here)</div>
        <div>Owner Avatar</div>
        <div>What's the Issue? <textarea placeholder="Leave a comment" rows="10" cols="30" onChange={(e)=>{newIssueBody=e.target.value}}></textarea></div>
        <div>Label: (dropdown - select label)</div>
        <div>State of Issue: (dropdown - select state)</div>
        <Button onClick={()=>submitNewIssue()}>Submit new issue</Button>
      </ReactModal>
      <Button variant="success" onClick={()=>postNewIssue()}>Post new issue</Button>
      <IssuesInfo issuesListProps = {issuesList} getIssuesProps = {getIssues}/>
      </Container>
      <Navbar className="nav" bg="light" expand="sm" fixed="bottom">
        <Pagination 
              currentPage={pageNumber}
              totalPages={total}
              changeCurrentPage={changeCurrentPage}
              theme="bottom-border"
            /> 

      </Navbar>
      <div >
      <HieuFooter />
      </div>
    </div>
  );
}

export default App;
