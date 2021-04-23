import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import {Button, Card, Row, Col, Container} from 'react-bootstrap'
import { AnimationWrapper } from 'react-hover-animation'
import alojamento from '../img/basicRoom.png'
import api from '../services/api';

function SingleChat({accom}) {
    return (
        <div>
            <a href="/chat">
                <Container>
                    <Card className="mb-2">
                            <Card.Img   style={{ width: '30%'}} onclick={"/profileAccommodation/"} className="img" src={alojamento}></Card.Img>
                            <Card.Text style={{textAlign:"center", verticalAlign:"middle"}}>
                                <h6 style={{textAlign:"center", verticalAlign:"middle"}}>Pedro</h6>
                            </Card.Text>
                    </Card> 
                </Container>
            </a>
        </div>
    )
}

export default SingleChat