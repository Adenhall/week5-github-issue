import React from 'react'
import {Form, FormControl, Button,  Badge} from 'react-bootstrap';
import Card from 'react-bootstrap/Card'

export default function IssueList(props) {
    let list = props.list;
    console.log(props.list)

    if(list != null)
    return (
        <div>
            {list.map(item=>{
                return(
                    <div>
                        <Card>
                            <Card.Header>Issue no: {item.number}</Card.Header>
                            <Card.Body>
                                <Card.Title>{item.title}<Badge variant="info">{item.state}</Badge></Card.Title>
                                <Card.Text>
                                    <div><img width="60" src={item.user.avatar_url}/></div>
                                    <div>{item.user.login}</div>
                                    <div>{item.user.body}</div>
                                    <Badge style={{"background-color":`#${item.labels[0].color}`}}>{item.labels[0].description}</Badge>
                                    
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        
                        
                    </div>
                   
                )}
            )}

        </div>
    )
    else{
        return (<div></div>)
    }
}
