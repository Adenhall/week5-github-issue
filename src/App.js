import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, Container, Row, Column } from "react-bootstrap";

const clientId = process.env.REACT_APP_CLIENT_ID;
let inputString = "";

function App() {
	const [token, setToken] = useState(null);
	const [respoSearch, setRespoSearch] = useState(null);
	const [userSearch, setUserSearch] = useState(null);
	const [dataList, setDataList] = useState([]);
	const getToken = () => {
		const existingToken = localStorage.getItem("token"); // if we already have token in our localstorage, just get that
		const accessToken = window.location.search.split("=")[0] === "?access_token" ? window.location.search.split("=")[1].split("&")[0] : null; // reads the token value from body (url)

		if (!accessToken && !existingToken) {
			window.location.replace(`https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`);
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

	const postNewIssue = async () => {
		// const issue = { title: title, body: details }; // made this as object type to change to json
		const issue = { title: "title", body: "details" };
		const url = `https://api.github.com/repos/Yogitravel/GithubIssues/issues`;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `token ${token}`,
			},
			body: JSON.stringify(issue),
		});
		console.log("response?", response);
	}; // how to make a new issue

	useEffect(() => {
		getToken();
		postNewIssue();
	}, []);

	const getIssues = async () => {
		let tempArray = inputString.split("/");
		let url = `http://api.github.com/repos/${tempArray[0]}/${tempArray[1]}/issues`;
		let data = await fetch(url);
		let result = await data.json();
		setDataList(result);
		console.log("Data nhan duoc cua get ", dataList);
	}; // this is how to get the data

	if (dataList !== null)
		return (
			<div>
				<Container className="navbar">
					<input onChange={(e) => (inputString = e.target.value)} placeholder="RespoSearch here..."></input>
					<Button onClick={() => getIssues()}>search</Button>

					<ul>
						{dataList.map((item) => {
							return <li>{item.body}</li>;
						})}
					</ul>
				</Container>
				<Container className="issues-area">
					<Button onClick={() => postNewIssue()}>Post new issue</Button>
				</Container>
			</div>
		);
}

export default App;
