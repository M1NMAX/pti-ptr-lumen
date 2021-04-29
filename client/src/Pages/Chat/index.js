import NavBarHome from '../../Components/NavBarHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import {Container, Card, Form, Button, Row, Col} from 'react-bootstrap'
import DefaultUserPic from "../../img/standartUser3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faComments, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import "./index.css";
import "bootstrap/js/src/collapse.js";
import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Content } from 'rsuite';

var idTarget;

function Chat() {
    const [change, setChange] = useState(0);
    const [messages, setMessages] = useState();
    const [userName, setUserName] = useState();
    const [meId, setMeId] = useState();
    const [chat, setChat] = useState();
    const scrollContainerStyle = { width: "800px", maxHeight: "400px" };
    let { id } = useParams();
    const [token] = useState(localStorage.getItem('token'));
    const history = useHistory();
    const [auth, setAuth] = useState(true);
    const [content, setContent] = useState([]);


    async function sendMessage(messages){
        var data = {
            "content": messages,
            "user_id": parseInt(meId),
            "chat_id" : parseInt(id),
        };
        if(token ==null || token ===''){
            alert('Não estas autenticado');
        }else{
            api.post('/api/chat/addMessage/', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(response => { 
                if(response.data.status){
                    setMessages('');
                    console.log(change);
                    setChange(change + 1);

                }else{
                    alert('Ocorreu um erro, não foi possivel enviar a mensagem, tente novamente');
                }
            }).catch(err => {
            alert(err)
            })
        }
    }

    useEffect( () => {
        const interval = setInterval(() => {
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
                    api.get('api/chat/'+id,{
                        headers:{
                            Authentication:`Bearer ${token}`,
                        }
                    }).then(responseChat => {
                      if(responseChat.data.status && responseChat.data.status === (401 || 498)){
                        console.log("erro")
                        localStorage.clear();
                         
                      }else{
                        console.log(response.data)
                        setMeId(response.data.id);
                          
                        setChat(responseChat.data)
                        if(responseChat.data.user_id1 == response.data.id){
                            idTarget = responseChat.data.user_id2;
                        }else{
                            idTarget = responseChat.data.user_id1;
                        }
          
                        api.get('api/users/'+ idTarget).then(responseUser => {
                            setUserName(responseUser.data.user.name);
                            api.get('api/chat/'+ id + '/messages').then(responseMessages => {
                            //setAllMessages(responseMessages.data);    
                            var nMessages =  Object.keys(responseMessages.data).length;;
                            var allMessages = [];
                            if(nMessages == 0){                                
                                setContent([<h1>Ainda sem mensagens</h1>]);
                            }else{
                                for(let i=0;i < nMessages;i++){
                                    if(response.data.id == responseMessages.data[i].user_id ){
                                        allMessages.push(<Row className="text">
                                        <Col xs={10} sm={9} lg={8} className="w-25"></Col>                                    
                                        <Col xs={1} sm={2} lg={3} className="w-25 me"><h5>Eu: {responseMessages.data[i].content}</h5></Col>
                                        <Col xs={1} sm={1} lg={1} className="w-25"></Col>
                                        </Row>)
                                    }else{
    
                                        allMessages.push(<Row className="text">                                        
                                        <Col xs={1} sm={2} lg={3} className="w-25 you"><h5>{responseUser.data.user.name}: {responseMessages.data[i].content}</h5></Col>
                                        </Row>)
                                    }     
                                }
                                setContent(allMessages);
                            }
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
          }
        }, 5000);
        return () => clearInterval(interval);
        }, [token]);
    
   
    async function handleMsg(e) {
        e.preventDefault();}

    return(
        <div>
        <NavBarHome/>
            
            <Container fluid className="bottom">
                <Row  className= "mt-3 mb-3">
                    <Col xs={6} md={4}>
                        <Button  size="sm" className= "mr-3 mt-2" variant="info" onClick={() => {history.goBack();}} >  <FontAwesomeIcon icon={faArrowLeft}/> Voltar</Button>
                    </Col>
                    <Col xs={6} md={4} className='text-center'><h2> {userName} </h2> </Col>                 
                </Row>
            <div className="messageBox" >
            {content}
            </div>

            </Container>
            
            <Row className="height">
                    <div className="sendMsg">{/*textarea*/}
                        <Form className="msg" onSubmit={handleMsg}>
                            <Form.Group controlId="formBasictext">
                                <Form.Control as="textarea" rows={3} required className="textMsg" placeholder="Escreva uma mensagem..." value={messages} onChange={e => setMessages(e.target.value)}/>
                            </Form.Group>
                            <Button className="send" variant="info" type="submit" onClick={() => sendMessage(messages)}>
                                <FontAwesomeIcon icon={faPaperPlane}/> Enviar
                            </Button>
                        </Form>
                    </div>{/*Fim textarea*/}
           </Row>
       </div>
    )
}
export default Chat
