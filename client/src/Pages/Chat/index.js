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
import Moment from 'react-moment';

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
    Moment.globalLocale = 'uk';

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
                            api.get('api/chat/'+ id + '/messages/' + response.data.id).then(responseMessages => {
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
                                        <Col xs={{span: 6, offset: 5}} sm={{ span: 4, offset: 7 }} lg={{ span: 4, offset: 7 }} className="w-25 me"><p className=" pb-0 mb-0"><b>Eu: </b> {responseMessages.data[i].content} </p> <p className="time mt-0 pt-0 mb-2" style={{color: "rgb(74, 78, 80)", float: "right"}}><Moment add={{hours: 1}} format="eH:mm, D MMM YYYY">{responseMessages.data[i].created_at}</Moment></p></Col>
                                        <Col xs={1} sm={1} lg={1} className="w-25"></Col>
                                        </Row>)
                                    }else{
    
                                        allMessages.push(<Row className="text">                                        
                                        <Col xs={{span: 6, offset: 1}} sm={{span: 4, offset: 1}} lg={{span: 4, offset: 1}} className="w-25 you"><p className=" pb-0 mb-0"><b>{responseUser.data.user.name}: </b> {responseMessages.data[i].content}</p><p className="time mt-0 pt-0 mb-2" style={{color: "rgb(74, 78, 80)", float: "right"}}><Moment add={{hours: 1}} format="HH:mm, D MMM YYYY">{responseMessages.data[i].created_at}</Moment></p></Col>
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
                    <Col xs={{span: 3}} md={{span: 3}}>
                        <Button  size="sm" className= "mr-3 mt-2" variant="info" onClick={() => {history.goBack();}} >  <FontAwesomeIcon icon={faArrowLeft}/> Voltar</Button>
                    </Col>
                    <Col xs={6} md={6} className='text-center'><h2> {userName} </h2> </Col>
                    <Col xs={3} md={3}></Col>               
                </Row>
            <div className="messageBox mr-2" >
            {content}
            </div>

            </Container>
            
            <Row className="height">
                <Col xs={{span: 10, offset: 1}}>
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
                </Col>
           </Row>
       </div>
    )
}
export default Chat
