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
                            <Card.Header>{item.number}</Card.Header>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>
                                    <div>{item.user.login}</div>
                                    <div><img width="60" src={item.user.avatar_url}/></div>
                                    <div>{item.user.body}</div>
                                    <Badge style={{"background-color":`#${item.labels[0].color}`}}>{item.labels[0].description}</Badge>
                                    <Badge variant="info">{item.state}</Badge>   
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
