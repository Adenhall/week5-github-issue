import React from 'react'
import { Badge, Container, Row, Card } from 'react-bootstrap';
import moment from 'moment'
import ReactMarkdown from 'react-markdown';
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
                    <Card>
                        <Card.Header>Issue #{item.number}</Card.Header>
                        <Card.Body>
                            <Card.Title>  <h4>Issue: {item.title}</h4> </Card.Title>
                            <Card.Text>
                            With supporting text below as a natural lead-in to additional content.
                            </Card.Text>
                           
                        </Card.Body>
                    </Card>
                  
                   
                    <div>Owner {item.user.login} <img src={item.user.avatar_url} width="50" height="50"/></div>
                    <Badge style={{"background-color":`#${item.labels[0].color}`}}>{item.labels[0].description}</Badge>
                 
                   
                    
                    
                    <div>Issue created on: {moment(item.created_at).startOf('day').fromNow()}</div>
                    <div>Body: 
                        <br />
                        <ReactMarkdown source= {item.body}/></div>
                    <div>Label {item.labels.map(label => <Badge pill variant="primary">{label.name}</Badge>)}</div>
                    <Badge style={{"background-color": (item.state == "open") ? "pink":"green"}}> {item.state}</Badge>
                </div>
                )}
            </Row>
        </Container>
        </>
    )
}
