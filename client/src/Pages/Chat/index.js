import NavBarHome from '../../Components/NavBarHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Card, Form, Button} from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './index.css'
import DefaultUserPic from "../../img/standartUser3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faComments} from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';
import React, { useState } from 'react';


function Chat() {
    const [msg, setMsg] = useState('');


    async function handleMsg(e) {
        e.preventDefault();}

    return(
        <div>
        <NavBarHome/>
            <Row>
            <Col class="w-25"></Col>
            <Col class="w-25"><h4>Conversas</h4></Col>
            </Row>
            <Row>
                <Col class="w-25"></Col>
                
                <Col class="sidebar bg-dark w-25 text-white"> {/*ChatList*/}
                
                <div class="border border-primary"> {/*Chat*/}
                    <img src={DefaultUserPic} alt="Imagem de perfil" width="30px"></img>
                    <h7 class="user d-inline-block">Pedro</h7>
                    <p class="date d-inline-block">Just Now</p><br></br>
                    <h9 class="lastMsg d-inline-block">Não posso agora... mas era nice</h9>
                    {/*<button class="send d-inline-block"><FontAwesomeIcon icon={faComments} /></button>*/}
                    
                </div> {/*FIM Chat*/}
                </Col>{/* FIM ChatList*/}

                <Col class="container w-50 border border-primary"> {/*Chat Escrever*/}
                <div>{/*top*/}
                <img src={DefaultUserPic} alt="Imagem de perfil" width="30px"></img>
                <p class="d-inline-block">Pedro</p>
                </div>{/*fim top*/}

                <div class="w3-container">{/*Msg Box*/}
                    <p class="date" id="currentUser">heyyyyy</p>
                    <p id="otherUser">Não posso agora... mas era nice</p>
                </div>{/*fim Msg Box*/}

                <div class="sendMsg">{/*textarea*/}
                <Form className="msg"  onSubmit={handleMsg}>
                <Form.Group controlId="formBasictext">
                    <Form.Control required width="sm" type="textarea" placeholder="Escreva uma mensagem..." value={msg} onChange={e => setMsg(e.target.value)}/>
                </Form.Group>

                <Button class="send" variant="primary" type="submit">
                <FontAwesomeIcon icon={faPaperPlane}/>
                </Button>
            </Form>
                </div>{/*Fim textarea*/}
                
                </Col>{/*FIM Chat Escrever*/}
                <Col></Col>
           </Row>
       </div>
    )
}
export default Chat
