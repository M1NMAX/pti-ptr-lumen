import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import ReactDOM from "react-dom";
import {  BrowserRouter as Router,  Switch,  Route} from "react-router-dom";
import {Navbar, Nav, NavDropdown, Button, Form, Card} from 'react-bootstrap'
import { AnimationWrapper } from 'react-hover-animation'
import alojamento from '../img/basicRoom.png'
import api from '../services/api';
function Accommodation({accom}) {
    return (
        <>
          <Card className="mb-4 mt-4 ml-4 mr-4 center">
                <AnimationWrapper>
                    <a href="/profileAlojamento">
                        <Card.Img onclick="href='/profileAlojamento" className="img" src={alojamento}></Card.Img>
                    </a>
                </AnimationWrapper>
                <Card.Title className="center">{accom.name}</Card.Title>

                <Card.Text>
                    <p>{accom.descricao}</p>
                    <p>Preco: {accom.preco}&euro;</p>
                    <p>Rating: {accom.rating}&#42;</p>
                </Card.Text>
                <Button variant="primary"href={ "/profileAlojamento/"+accom.id}>Ir para o alojamento</Button>
            </Card> 
        </>
    )
}

export default Accommodation