import NavBarHome from '../../Components/NavBarHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import {Container, Card, Form, Button, Row, Col} from 'react-bootstrap'
import DefaultUserPic from "../../img/standartUser3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faComments} from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';
import React, { useState } from 'react';
import "./index.css";
import "bootstrap/js/src/collapse.js";

function Chat() {
    const [msg, setMsg] = useState('');
    const scrollContainerStyle = { width: "800px", maxHeight: "400px" };

    async function handleMsg(e) {
        e.preventDefault();}

    return(
        <div>
        <NavBarHome/>
            <h2 style={{textAlign:"center"}}>Pedro</h2>
            <Container fluid className="bottom">
                <Row className="text">
                    <Col xs={4} sm={2} lg={1} className="w-25"><h4>Pedro:</h4></Col>
                    <Col xs={8} sm={10} lg={11} className="w-25"><h5>dwenjfewnkfjewkfnhwefbhjbfjhewvfgwvfehwfvwlejhfvewfhgjwelefvwehl:</h5></Col>
                </Row>
                <Row className="text">
                    <Col xs={4} sm={2} lg={1} className="w-25"><h4>Jorge:</h4></Col>
                    <Col xs={8} sm={10} lg={11} className="w-25"><h5>dwenjfewnkfjewkfnhwefbhjbfjhewvfgwvfehwfvwlejhfvewfhgjwelefvwehl:</h5></Col>
                </Row>
                <Row className="text">
                    <Col xs={4} sm={2} lg={1} className="w-25"><h4>Pedro:</h4></Col>
                    <Col xs={8} sm={10} lg={11} className="w-25"><h5>dwenjfewnkfjewkfnhwefbhjbfjhewvfgwvfehwfvwlejhfvewfhgjwelefvwehl:</h5></Col>
                </Row>
                <Row className="text">
                    <Col xs={4} sm={2} lg={1} className="w-25"><h4>Jorge:</h4></Col>
                    <Col xs={8} sm={10} lg={11} className="w-25"><h5>dwenjfewnkfjewkfnhwefbhjbfjhewvfgwvfehwfvwlejhfvewfhgjwelefvwehl:</h5></Col>
                </Row>


                

            </Container>
            
            <Row className="height">
                    <div className="sendMsg">{/*textarea*/}
                        <Form className="msg" onSubmit={handleMsg}>
                            <Form.Group controlId="formBasictext">
                                <Form.Control as="textarea" rows={3} required className="textMsg" placeholder="Escreva uma mensagem..." value={msg} onChange={e => setMsg(e.target.value)}/>
                            </Form.Group>
                            <Button className="send" variant="info" type="submit">
                                <FontAwesomeIcon icon={faPaperPlane}/> Enviar
                            </Button>
                        </Form>
                    </div>{/*Fim textarea*/}
           </Row>
       </div>
    )
}
export default Chat
