import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import {  BrowserRouter as Router,  Switch,  Route} from "react-router-dom";
import {Navbar, Nav, NavDropdown, Button, Form, Card, Row, Col} from 'react-bootstrap'
import { AnimationWrapper } from 'react-hover-animation'
import alojamento from '../img/basicRoom.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope } from '@fortawesome/free-solid-svg-icons'
import api from '../services/api';
import DefaultUserPic from "../img/standartUser3.png";

function Accommodation({accom}) {
    
    const x = accom.map((accommodation)=>
        <Card className="mb-4 mt-4 ml-4 mr-4 center" style={{ width: '30%', height: '10%' }}>
            <AnimationWrapper>
            <a href={"/profileAlojamento/"+accommodation.id}>
                   <Card.Img onclick="href='/profileAlojamento" className="img" src={alojamento}></Card.Img>
                </a>
            </AnimationWrapper>
            
            <Card.Text>
                <p style={{ fontSize: '50%' }}>{accommodation.name}</p>
                { /*<Button style={{ fontSize: '50%' }}  variant="primary"href={ "/profileAccommodation/"+accommodation.id}>Ver alojamento</Button>*/}
            </Card.Text>
            
        </Card> 
    )
    const users = ["Pedro", "checheche"]
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
    for (let i=0; i < 2; i++){
        content.push(<Row className='border'>
            <Col></Col>

            <Col className="mb-4 mt-4 ml-4 mr-4 center">
            <img src={DefaultUserPic} alt="Imagem de perfil" width="30px"></img>
            <h7 className="d-inline-block">Pedro</h7>{' '}
            <Button size="sm"><FontAwesomeIcon icon={faEnvelope}/></Button>
            </Col>
            <Col className="center">
                {x[y]}
            </Col>
            <Col className="mb-4 mt-4 ml-4 mr-4 center">
            <Button variant="success" size="sm">Aceitar</Button>{' '}
            <Button variant="danger" size="sm">Rejeitar</Button>{' '}
            
            </Col>
            <Col></Col>
        </Row>)
        y += 1
    }
    
    return (
        <div>
            {content}
        </div>
    )
}

export default Accommodation