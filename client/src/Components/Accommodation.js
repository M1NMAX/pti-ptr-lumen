import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import ReactDOM from "react-dom";
import {  BrowserRouter as Router,  Switch,  Route} from "react-router-dom";
import {Navbar, Nav, NavDropdown, Button, Form, Card, Row, Col} from 'react-bootstrap'
import { AnimationWrapper } from 'react-hover-animation'
import alojamento from '../img/basicRoom.png'
import api from '../services/api';

function Accommodation({accom}) {
    
    const x = accom.map((accommodation)=>
        <Card className="mb-4 mt-4 ml-4 mr-4 center">
            <AnimationWrapper>
                <a href="/profileAlojamento">
                    <Card.Img onclick="href='/profileAlojamento" className="img" src={alojamento}></Card.Img>
                </a>
            </AnimationWrapper>
            <Card.Title className="center">{accommodation.name}</Card.Title>

            <Card.Text>
                <p>{accommodation.descricao}</p>
                <p>Preco: {accommodation.preco}&euro;</p>
                <p>Rating: {accommodation.rating}&#42;</p>
            </Card.Text>
            <Button variant="primary"href={ "/profileAlojamento/"+accommodation.id}>Ir para o alojamento</Button>
        </Card> 
    )
    const amount = x.length
    let rows = 0
    if (amount%3 != 0) {
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
            <Col>
                {x[y]}
            </Col>
            <Col>
                {x[y+1]}
            </Col>
            <Col>
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