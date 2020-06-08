import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Row, Column, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import IssuesInfo from "./components/IssuesInfo.js";
import ReactModal from "react-modal";
import HieuFooter from "./components/Footer.js";
import Navbar from "react-bootstrap/Navbar";
import Pagination from "react-pagination-library";
import Dropdown from 'react-bootstrap/Dropdown'
import Card from 'react-bootstrap/Card'
import "react-pagination-library/build/css/index.css";


const clientId = process.env.REACT_APP_CLIENT_ID;
let newIssueTitle = "";
let newIssueBody = "";
let inputString = "";

function App() {
  const [token, setToken] = useState(null);
  const [issuesList, setIssuesList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  let [pageNumber, setPageNumber] = useState(1);
  let [total, setTotalPages] = useState(null);
  let [errorIssues, setErrorIssues] = useState(false);
  let [fullList, setFullList] = useState([]);
  let [showAlert, setShowAlert] = useState(false);

  let [labelList, setLabelList] = useState([]);

  const getToken = () => {
    const existingToken = localStorage.getItem("token"); // if we already have token in our localstorage, just get that
    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("=")[1].split("&")[0]
        : null; // reads the token value from body (url)
    console.log("acc", accessToken);
    if (!accessToken && !existingToken) {
      window.location.replace(
        `http://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
    }

    if (accessToken) {
      // A.1 if you get token value from url
      console.log(`New accessToken: ${accessToken}`);

      localStorage.setItem("token", accessToken); // A.2 save it to localStorage
      setToken(accessToken); // A.3 and set the state
    }

    if (existingToken) {
      // A.4 if you have token on your localStorage already
      setToken(existingToken);
    }
  };

  const postNewIssue = () => {
    setOpenModal(true);
    console.log("open modal?", openModal);
  }; // how to make a new issue

  const resetPage = () => {
    window.location.reload()
  }

  useEffect(() => {
    getToken();
  }, []);

  const getIssues = async (owner, repo, pageNumber) => {
    let tempArray = inputString.split("/");
    owner = tempArray[0];
    repo = tempArray[1];
    let url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNumber}&per_page=30`;
    let data = await fetch(url);
    let dataResult = await data.json();
    console.log("result?", dataResult);
    setFullList(dataResult);
    
    if (dataResult.message == "Not Found") {
      setIssuesList([])
      alert("No Data Found")
    } else {
      setIssuesList(getListToDisplay(dataResult, 0));
      let c = []
      let b = dataResult.map(item => {
        console.log(item.labels)
        c = c.concat(item.labels)
        return item.labels
      })
      console.log("b is", c)
      setLabelList(c)
      try {
      } catch (error) { }

      if (issuesList === "") {
        setErrorIssues(true);
      }
      setTotalPages(dataResult.length / 10);
    }
    if (owner === undefined || repo === undefined) setIssuesList(["Error 404"])

  }; // this is how to get the data

  const getListToDisplay = (result, page) => {
    console.log("result getlisttodisplay", result)
    return result.filter(
      (x, index) => index >= page * 10 && index < (page + 1) * 10
    );
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const submitNewIssue = async (owner, repo) => {
    let issue = { title: newIssueTitle, body: newIssueBody };
    if (newIssueTitle.length === 0 || newIssueBody.length === 0) {
      setShowAlert(true);
      return;
    }

    let tempArray = inputString.split("/");
    owner = tempArray[0];
    repo = tempArray[1];

    // const issue = { title: newIssueTitle, body: newIssueBody }; // made this as object type to change to json
    console.log(issue);
    const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify(issue),
    });
    closeModal();
  };

  //   const openTitleModal = () => {
  //     setTitleModal(true)
  // }

  if (errorIssues) {
    return <div>No Issues Found</div>;
  }
  let changeCurrentPage = (pageNumber) => {
    let a = getListToDisplay(fullList, pageNumber - 1);
    setPageNumber(pageNumber);
    setIssuesList(a);

  };

  return (
    <div className="content">
      <Navbar bg="dark" className="d-flex">
        <h3><img onClick={() => resetPage()} width="40" src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" /></h3>
        <input className="inpux-box d-flex"
          placeholder="Search here..."
          onChange={(e) => (inputString = e.target.value)}
        ></input>
        <button style={{ fontSize: "15px"}} onClick={() => getIssues()}>Search</button>
        <button style={{ fontSize: "15px" }} onClick={() => postNewIssue()}>
          New Issue
        </button>
        <div>

        </div>

      </Navbar>

      <Container className="issues-area">
        <ReactModal
          className="video-popup-modal"
          ariaHideApp={false}
          isOpen={openModal}
          onRequestClose={() => closeModal()}
          closeTimeOutMS={2000}
          shouldCloseOnOverlayClick={true}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.75)",
            },
            content: {
              position: "absolute",
              top: "40px",
              left: "40px",
              right: "40px",
              bottom: "40px",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
            },
          }}
        >
          <Card>
            <Card.Header as="h2">Create A Post</Card.Header>
            <div>
              {showAlert ? (
                <div>
                  <Alert
                    variant="danger"
                    onClose={() => setShowAlert(false)}
                    dismissible
                  >
                    <div>
                      <p>
                        Please fill in all the fields.
                    </p>
                    </div>
                  </Alert>

                </div>
              ) : null}



            </div>
            <Card.Body>

              <Card.Text>
                <div className="title">

                  <textarea
                    rows="1"
                    cols="180"
                    type="text"
                    placeholder="Title"
                    onChange={(e) => {
                      newIssueTitle = e.target.value;
                    }}
                  ></textarea>
                </div>
                <div>
                  <textarea
                    placeholder="Text (option)"
                    rows="7"
                    cols="180"
                    onChange={(e) => {
                      newIssueBody = e.target.value;
                    }}
                  ></textarea>
                </div>

              </Card.Text>
              <div className="submit">
                <Dropdown>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Label
                </Dropdown.Toggle>

                  <Dropdown.Menu>

                    {labelList.map(item => {
                      return (
                        <Dropdown.Item variant="dark" href="#/action-1">{item.name}</Dropdown.Item>

                      )
                    }
                    )}

                  </Dropdown.Menu>
                </Dropdown>

                <Button variant="dark" onClick={() => submitNewIssue()}>Submit new issue</Button>
                <Button variant="secondary" onClick={() => closeModal()}>Cancel</Button>
              </div>
            </Card.Body>
          </Card>

        </ReactModal>
        {
          issuesList.length == 0 ? <div className="loading"><img src="https://i.pinimg.com/originals/7c/2d/f0/7c2df083aab95b8415314351b5b0d6f4.gif" /><h2> ... Search Something</h2></div> :


            <IssuesInfo issuesListProps={issuesList} inputString={inputString} getIssuesProps={getIssues} postNewIssue={postNewIssue} />}
      </Container>
      <Navbar className="nav justify-content-center" expand="lg">
        <Pagination
          currentPage={pageNumber}
          totalPages={total}
          changeCurrentPage={changeCurrentPage}
          theme="border-bottom"
        />
      </Navbar>

      <HieuFooter />











    </div>
  );
}

export default App;
