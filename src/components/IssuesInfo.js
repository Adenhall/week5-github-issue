import React, {useState} from 'react';
import { Badge, Container, Row } from 'react-bootstrap';
import moment from 'moment'
import TitleModal from './TitleModal.js'
import Button from "react-bootstrap/Button";
import ReactMarkdown from 'react-markdown';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'


export default function IssuesInfo(props) {
    let [titleModal, setTitleModal] = useState(false)

    const openTitleModal = () => {
        setTitleModal(true)
        console.log("here")
    }

    const closeTitalModal = () => {
        setTitleModal(false)
    }

    return (
        <>
            <Container>
                <Row className="d-flex justify-content-between">
                    <h1>List of issues</h1>
                </Row>
                <Row>
                    {props.issuesListProps.map(item => {
                        return (
                            <>
            
                            <div className="issueslist">
                                <div style={{marginLeft: "10px"}}>
                                    <OverlayTrigger
                                        trigger="hover"
                                        key={item}
                                        placement="top"
                                        overlay={
                                            <Popover id={`popover-positioned-top`}>
                                            <Popover.Title style={{color: "black"}} as="h3">{props.inputString} on {item.created_at}</Popover.Title>
                                            <Popover.Content>
                                                <strong>{item.labels.map(x => {return(<div>{x.description}</div>)})}</strong>
                                            </Popover.Content>
                                            </Popover>
                                        }
                                        >
                                        <div onClick={() => openTitleModal()}><h4><a className="issue-title" href="#"><i class="fas fa-exclamation-circle" style={{margin: "10px 10px 10px 0px"}}></i>Issue: {item.title}</a></h4></div>
                                    </OverlayTrigger>
                                    <div>{item.labels.map(label => <Badge variant="primary" style={{backgroundColor:`#${label.color}`,color: "black"}}>{label.name}</Badge>)}</div>
                                    <div><p>#{item.number}
                                    <div></div> {moment(item.created_at).startOf('hour').fromNow()} by {item.user.login}</p></div>
                                </div>
                                <div style={{margin: "10px 10px"}} className="d-flex flex-column align-items-end"><img src={item.user.avatar_url} width="40" height="40" /><div><b>State: {item.state.toUpperCase()}</b></div></div>
                               
                            </div>
                            
                                <Accordion>
                                    <Card.Text>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{ paddingLeft: 0 }}>
                                        Read More
                                    </Accordion.Toggle>
                                    <Accordion.Collapse className="markdown" eventKey="0">
                                        <ReactMarkdown source={item.body} />
                                    </Accordion.Collapse>
                                    </Card.Text>
                                </Accordion>
                          
                            
                        
                            <TitleModal item={item} titleModalProps={titleModal} closeTitleModalProps={closeTitalModal}/>
                            </>
                    )
                    }

                    )}
                </Row>
            </Container>
        </>
    )
}
