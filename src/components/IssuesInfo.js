import React, {useState} from 'react';
import { Badge, Container, Row } from 'react-bootstrap';
import moment from 'moment'
import TitleModal from './TitleModal.js'



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
                <Row>
                    <h1>List of issues</h1>
                </Row>
                <Row>
                    {props.issuesListProps.map(item => {
                        return (
                            <>
                            <div className="issueslist">
                                <div>
                                    <div onClick={() => openTitleModal()}><a className="issue-title" href="#"><h4>Issue: {item.title}</h4></a></div>
                                    <div>{item.labels.map(label => <Badge variant="primary" style={{backgroundColor:`#${label.color}`,color: "black"}}>{label.name}</Badge>)}</div>
                                    <div><p>#{item.number} opened {moment(item.created_at).startOf('day').fromNow()} by {item.user.login}</p></div>
                                </div>
                                <div className="d-flex flex-column align-items-end"><img src={item.user.avatar_url} width="40" height="40" /><div><b>State of Issue: {item.state}</b></div></div>
                                
                            </div>
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
