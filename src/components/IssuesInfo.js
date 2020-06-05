import React from 'react'
import { Badge, Container, Row } from 'react-bootstrap';
import moment from 'moment'

export default function IssuesInfo(props) {



    return (
        <>
        <div>
            <button onClick={()=>props.getIssuesProps()}>search</button>
        </div>
        <Container>
            <Row>
                <h1>List of issues</h1>
            </Row>
            <Row>
                {props.issuesListProps.map(item => 
                <div className="issueslist-per-issue">
                    <h4>Issue: {item.title}</h4> 
                    <div>Issue #{item.number}</div>
                    <div>Owner of Issue: {item.user.login} <img src={item.user.avatar_url} width="40" height="40"/></div>
                    <div>Issue created on: {moment(item.created_at).startOf('day').fromNow()}</div>
                    <div>Body: 
                        <br />{item.body}</div>
                    <div>Label {item.labels.map(label => <Badge pill variant="primary">{label.name}</Badge>)}</div>
                    <div>State of Issue</div>
                </div>
                )}
            </Row>
        </Container>
        </>
    )
}