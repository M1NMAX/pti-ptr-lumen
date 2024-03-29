import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {Button, Card, Row, Col} from 'react-bootstrap';
import { AnimationWrapper } from 'react-hover-animation';
import alojamento from '../img/basicRoom.png';

function Message({msn}) {
    const x = msn.map((msn)=>
        <Card className="mb-4 mt-4 ml-4 mr-4 center">
            <AnimationWrapper>
                <a href={"/profileAccommodation/"+accommodation.id}>
                    <Card.Img onclick="href='/profileAccommodation" className="img" src={alojamento}></Card.Img>
                </a>
            </AnimationWrapper>
            <Card.Title className="center">{accommodation.name}</Card.Title>

            <Card.Text>
                <p>{accommodation.description}</p>
                <p>Preco: {accommodation.price}&euro;</p>
                <p>Rating: {accommodation.rating}&#42;</p>
            </Card.Text>
        </Card> 
    )
    const amount = x.length
    let rows = 0
    if (amount%3 !== 0) {
        rows = Math.floor(amount/3) + 1
    }
    else{
        rows = Math.floor(amount/3)
    }
    console.log(rows)
    let content = []
    let y = 0
    for (let i=0; i < rows; i++){
        content.push(<Row>
            <Col xs={12} sm={4}>
                {x[y]}
            </Col>
            <Col xs={12} sm={4}>
                {x[y+1]}
            </Col>
            <Col xs={12} sm={4}>
                {x[y+2]}
            </Col>
        </Row>)
        y += 3
    }
    
    return (
        <div>
            {content}
        </div>
    )
}

export default Accommodation