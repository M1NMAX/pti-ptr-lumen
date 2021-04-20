import NavBarHome from '../../Components/NavBarHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container,Row,Col,Form ,Button, Card, Carousel} from 'react-bootstrap'
import DefaultUserPic from "../../img/standartUser3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope } from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import Accommodations from '../../Components/Accommodation'
import Footer from '../../Components/Footer'

function Pending() {
    
    return(
        <div>
        <NavBarHome/>
        <div class="center"><h3>Pendentes</h3></div>
        <div>
        <img src={DefaultUserPic} alt="Imagem de perfil" width="30px"></img>
        <h7 className="d-inline-block">Pedro</h7>
        <br></br>
        <Button variant="success" size="sm">Aceitar</Button>{' '}
        <Button variant="danger" size="sm">Rejeitar</Button>{' '}
        <Button size="sm"><FontAwesomeIcon icon={faEnvelope}/> Conversar</Button>
        </div>
        <Footer/>
       </div>

    )
}
export default Pending
