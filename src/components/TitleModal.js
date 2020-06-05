import React from 'react'
import { Badge, Container, Button } from 'react-bootstrap';
import moment from 'moment'
import ReactMarkdown from 'react-markdown';
import ReactModal from 'react-modal'

export default function TitleModal(props) {
    const item = props.item;

    return (
        <>
        <Container>
        <ReactModal
        className="video-popup-modal" 
        ariaHideApp={false}
        isOpen={props.titleModalProps}
        // onRequestClose={()=>closeModal()}
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
        {/* {props.issuesListProps.map(item =>  */}
            <div className="issueslist-per-issue">
                <Button onClick={()=>props.closeTitleModalProps()}>Close</Button>
                <div>Issue: {item.title}</div>
                <div>Issue #{item.number}</div>
                <div>Owner of Issue: {item.user.login} <img src={item.user.avatar_url} width="40" height="40"/></div>
                <div>Issue created on: {moment(item.created_at).startOf('day').fromNow()}</div>
                <div>Body: 
                    <br />
                    <ReactMarkdown source= {item.body}/></div>
                <div>Label {item.labels.map(label => <Badge pill variant="primary">{label.name}</Badge>)}</div>
                <div>State of Issue: {item.state}</div>
            </div>
        {/* )} */}
        </ReactModal>
        </Container>  
        </>
    )
}
