import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import {Button, Card, Row, Col, Container} from 'react-bootstrap'
import { AnimationWrapper } from 'react-hover-animation'
import alojamento from '../img/basicRoom.png'
import api from '../services/api';

function SingleChat({chats}) { 
    const [id] = useState(chats.id);
    const [token] = useState(localStorage.getItem('token'));
    const [chat, setChat] = useState();
    const [userReceiver, setReceiverName] = useState();

    useEffect(() => {
          api.get( 'api/chat/'+id,{
              headers:{
                  Authentication:`Bearer ${token}`,
              }
          }).then(response => {
            if(response.data.status && response.data.status === (401 || 498)){
                console.log("erro")
                localStorage.clear();
               
            }else{
               setChat(response.data)
                console.log(response.data);
                const idUser1 = response.data.id_user1;
                const idUser2 = response.data.id_user2;


                api.get('api/users/'+ response.data.id).then(responseChat => {
                    console.log(responseChat)
                    setChat(responseChat.data);
                }).catch(err => {
                    alert(err)
                })
          }
        }).catch(err => {
          alert(err)
        })
      }, [token]);
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