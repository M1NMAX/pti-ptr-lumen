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

function PendingAc({pending}) {

    console.log(pending);

    return (
        <>
       <Row className='border'>
            <Col className="mb-4 mt-4 ml-4 mr-4 center">
            <img src={DefaultUserPic} alt="Imagem de perfil" width="30%"></img>
            <p>{pending.user_name} <Button size="sm"><FontAwesomeIcon icon={faEnvelope}/></Button></p>
            
            </Col>
            <Col className="center">
            <Card className="mb-4 mt-4 ml-4 mr-4 center" style={{ width: '100%', height: '10%' }}>
            <AnimationWrapper>
            <a href={ "/profileAccommodation/"+pending.accommodation_id} >
                   <Card.Img onclick="href='/profileAlojamento" className="img" style={{ width: '50%'}} src={alojamento}></Card.Img>
                </a>
            </AnimationWrapper>
            
            <Card.Text>
                <p style={{ fontSize: '100%' }}>{pending.accommodation_name} </p>

                {/* <Button style={{ fontSize: '60%' }}  variant="primary"href={ "/profileAccommodation/"+pending.accommodation_id}>Ver alojamento</Button> */}
            </Card.Text>
            
        </Card> 
            </Col>
            <Col className="mb-4 mt-4 ml-4 mr-4 center">
            <Button variant="danger" size="m" style={{top: '40%',left: '50%',position: 'absolute'}}>Rejeitar</Button>{' '}
            <Button variant="success" size="m" style={{top: '40%',left: '30%',position: 'absolute'}}>Aceitar</Button>{' '}
            
            </Col>
        </Row>
        </>
    )
}

export default PendingAc