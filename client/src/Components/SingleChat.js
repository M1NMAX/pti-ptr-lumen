import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import {Button, Card, Row, Col, Container} from 'react-bootstrap'
import { AnimationWrapper } from 'react-hover-animation'
import alojamento from '../img/basicRoom.png'
import api from '../services/api';
import { useHistory } from 'react-router-dom';
var idTarget;

function SingleChat({chats}) { 
    const [id] = useState(chats.id);
    const [token] = useState(localStorage.getItem('token'));
    const [chat, setChat] = useState();
    const [userReceiver, setReceiverName] = useState();
    const [auth, setAuth] = useState(true);
    const [userid, setUserid] = useState();
    const [user,setUser] = useState();
    const[userName, setUserName] = useState();
    const[accommodation, setAccommodation] = useState();
    const[text, setText] = useState();
    const[bt, setBt] = useState();
    const history = useHistory();

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
                        console.log(responseChat.data)
                        if(responseChat.data.user_id1 == response.data.id){
                            /*console.log(idUser2);*/
                            idTarget = responseChat.data.user_id2;
                        }else{
                            /*console.log(idUser1);*/
                            idTarget = responseChat.data.user_id1;
                        }
      
                      api.get('api/users/'+ idTarget).then(responseUser => {
                          console.log(responseUser.data)
                          setUserName(responseUser.data.user.name);
                         
                      }).catch(err => {
                          alert(err)
                      })

                      api.get('api/accommodations/'+ responseChat.data.accommodation_id).then(responseAccommodation => {
                        console.log(responseAccommodation.data.aboutAccommodation)
                        setAccommodation(responseAccommodation.data.aboutAccommodation);
                       
                      }).catch(err => {
                          alert(err)
                      })

                      api.get('api/chat/notifications/' + response.data.id).then(responseChatNotification => {
                        console.log(responseChatNotification.data);
                        if(responseChatNotification.data.length == 0){
                          setText("Conversar");
                          setBt("info");
                        }else{
                          setText("Ver novas mensagens");
                          setBt("success");
                        }
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

    
    return (
        <div>
                <Container>
                    <Card className="mb-4 mt-4 ml-4 mr-4 border border-10 center">
                    <Card.Body>
                            <Card.Img   style={{ width: '20%'}} onclick={"/profileAccommodation/"} className="img" src={"/img/" + accommodation.id + ".jpg"}></Card.Img>
                            <Card.Title className="">{accommodation.name}</Card.Title>
                            <Card.Text style={{textAlign:"center", verticalAlign:"middle"}}>
                                <h6 style={{textAlign:"center", verticalAlign:"middle"}}>{userName}</h6>
                            </Card.Text>
                            <Button variant={bt}>{text}</Button>
                    </Card.Body>
                    </Card> 
                </Container>
        </div>
    )
}

export default SingleChat