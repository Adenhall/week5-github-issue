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
                                <div onClick={() => openTitleModal()}><a href="#">Issue: {item.title}</a></div>

                                <div>Issue #{item.number}</div>
                                <div>Owner of Issue: {item.user.login} <img src={item.user.avatar_url} width="40" height="40" /></div>
                                <div>Issue created on: {moment(item.created_at).startOf('day').fromNow()}</div>
                                <div>Label {item.labels.map(label => <Badge pill variant="primary">{label.name}</Badge>)}</div>
                                <div>State of Issue: {item.state}</div>
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
