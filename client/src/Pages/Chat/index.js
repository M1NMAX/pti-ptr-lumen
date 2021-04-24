import NavBarHome from '../../Components/NavBarHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import {Container, Card, Form, Button, Row, Col} from 'react-bootstrap'
import DefaultUserPic from "../../img/standartUser3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faComments} from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import "./index.css";
import "bootstrap/js/src/collapse.js";
import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

var idTarget;

function Chat() {
    const [messages, setMessages] = useState();
    const [userName, setUserName] = useState();
    const [meId, setMeId] = useState();
    const [chat, setChat] = useState();
    const scrollContainerStyle = { width: "800px", maxHeight: "400px" };
    let { id } = useParams();
    const [token] = useState(localStorage.getItem('token'));
    const history = useHistory();
    const [auth, setAuth] = useState(true);

    useEffect(() => {
        if(token === null || token ===''){
            setAuth(false);
        }else{
          api.get('api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(response => {
            if(response.data.status && response.data.status === (401 || 498)){
                console.log("erro")
                localStorage.clear();
                history.push('/');
            }else{
                api.get( 'api/chat/'+id,{
                    headers:{
                        Authentication:`Bearer ${token}`,
                    }
                }).then(responseChat => {
                  if(responseChat.data.status && responseChat.data.status === (401 || 498)){
                    console.log("erro")
                    localStorage.clear();
                     
                  }else{
                        setChat(responseChat.data)
                        if(responseChat.data.user_id1 == response.data.id){
                            idTarget = responseChat.data.user_id2;
                        }else{
                            idTarget = responseChat.data.user_id1;
                        }
      
                      api.get('api/users/'+ idTarget).then(responseUser => {
                          console.log(responseUser.data.name)
                          setUserName(responseUser.data.name);
                          
                          api.get('api/chat/'+ id + '/messages').then(responseMessages => {
                            console.log(responseMessages.data)
                            
                            
                           
                        }).catch(err => {
                            alert(err)
                        })
                         
                      }).catch(err => {
                          alert(err)
                      })
                }
              }).catch(err => {
                alert(err)
              })
          }
        }).catch(err => {
          alert(err)
        })
      }}, [token]);

    async function handleMsg(e) {
        e.preventDefault();}

    return(
        <div>
        <NavBarHome/>
            <h2 style={{textAlign:"center"}}>{userName}</h2>
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
                                <Form.Control as="textarea" rows={3} required className="textMsg" placeholder="Escreva uma mensagem..." value={messages} onChange={e => setMessages(e.target.value)}/>
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
