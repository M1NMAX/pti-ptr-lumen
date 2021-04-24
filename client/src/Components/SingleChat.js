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
                        if(responseChat.data.user_id1 == response.data.id){
                            /*console.log(idUser2);*/
                            idTarget = responseChat.data.user_id2;
                        }else{
                            /*console.log(idUser1);*/
                            idTarget = responseChat.data.user_id1;
                        }
      
                      api.get('api/users/'+ idTarget).then(responseUser => {
                          console.log(responseUser.data)
                          setUserName(responseUser.data.name);
                         
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

    
    return (
        <div>
                <Container>
                    <Card className="mb-2">
                            <Card.Img   style={{ width: '30%'}} onclick={"/profileAccommodation/"} className="img" src={alojamento}></Card.Img>
                            <Card.Text style={{textAlign:"center", verticalAlign:"middle"}}>
                                <h6 style={{textAlign:"center", verticalAlign:"middle"}}>{userName}</h6>
                            </Card.Text>
                    </Card> 
                </Container>
        </div>
    )
}

export default SingleChat