import NavBarHome from '../../Components/NavBarHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import {Container, Card, Form, Button, Row, Col} from 'react-bootstrap'
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
                <Col className="w-25"></Col>
                <Col className="w-25"><h4>Conversas</h4></Col>
            </Row>
            <Row >
                <Col xs="3" className="boxUsers sidebar w-25 border scrollbar scrollbar-info"> {/*ChatList*/}
                    <div className="boxUser border border-grey"> {/*Chat*/}
                        <img src={DefaultUserPic} alt="Imagem de perfil" width="30px"></img>
                        <h7 className="d-inline-block">Pedro</h7>
                        <p className="date d-inline-block text-muted">Just Now</p>
                        <h9 className="d-inline-block">Não posso agora... mas era nice</h9>
                        {/*<button className="send d-inline-block"><FontAwesomeIcon icon={faComments} /></button>*/}
                    </div> {/*FIM Chat*/}

                    <div className="boxUser border border-grey"> {/*Chat*/}
                        <img src={DefaultUserPic} alt="Imagem de perfil" width="30px"></img>
                        <h7 className="d-inline-block">Pedro</h7>
                        <p className="date d-inline-block text-muted">Just Now</p>
                        <h9 className="d-inline-block">Não posso agora... mas era nice</h9>
                        {/*<button className="send d-inline-block"><FontAwesomeIcon icon={faComments} /></button>*/}
                    </div> {/*FIM Chat*/}

                </Col>{/* FIM ChatList*/}
                <Col xs="9" className="container w-50 border"> {/*Chat Escrever*/}
                    <div className="title">{/*top*/}
                        <img src={DefaultUserPic} alt="Imagem de perfil" width="40px"></img>
                        <h5 className="d-inline-block">Pedro</h5>
                    </div>{/*fim top*/}

                    <div className="w3-container">{/*Msg Box*/}
                        <div className="msgBoxR">
                            <p  className="textMe" id="currentUser">heyyyyy</p><br></br>
                        </div>
                        <div className="msgBoxL">
                            <p className="textOther" id="otherUser">Não posso agora... mas era nice</p>
                        </div>
                    </div>{/*fim Msg Box*/}

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
                </Col>{/*FIM Chat Escrever*/}
           </Row>
       </div>
    )
}
export default Chat
