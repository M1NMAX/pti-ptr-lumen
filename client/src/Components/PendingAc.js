import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import {Button, Card, Row, Col, Container} from 'react-bootstrap'
import { AnimationWrapper } from 'react-hover-animation'
import alojamento from '../img/basicRoom.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope, faTimesCircle, faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import DefaultUserPic from "../img/standartUser3.png";
import api from '../services/api';
import {useHistory} from 'react-router-dom';


function PendingAc({pending, acceptPending, rejectPending}) {
    const[token] = useState(localStorage.getItem('token'));
    const[userData, setUserData] = useState([]);
    const[userExtra, setUserExtra] = useState([]);
    const[accommodationData, setAccommodationData] = useState([]);
    const[accommodationRequirements, setAccommodationRequirements] = useState([]);
    const[userAge, setUserAge]= useState(); 

    

    
    const history = useHistory();
    useEffect(() => {
        if(token === null || token === ''){
            history.push('/login');    
        }else{
            api.get('api/users/'+pending.user_id, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
            }).then(response => {
                if(response.data.status){
                    setUserData(response.data.user)
                    setUserExtra(response.data.extra);
                    //calculates user's age 
                    let birth = new Date(response.data.user.birthdate);
                    let ageDifMs = Date.now() - birth.getTime();
                    let ageDate = new Date(ageDifMs); // miliseconds from epoch
                    setUserAge(Math.abs(ageDate.getUTCFullYear() - 1970));

                }else{
                    localStorage.clear();
                    history.push('/login')
                }
            }).catch(err => {
            alert(err)
            })

            api.get('api/accommodations/'+pending.accommodation_id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
                }).then(response => {
                    if(response.data.status){
                        setAccommodationData(response.data.aboutAccommodation);
                        setAccommodationRequirements(response.data.aboutAccommodation.requirements);
                    }else{
                        localStorage.clear();
                        history.push('/login')
                    }
                }).catch(err => {
                alert(err)
                })


        }
    }, [token]);

    const handleAcceptPending = async (event) =>{
        event.preventDefault();
        await acceptPending(pending.id);

    };

    const handleRejectPending = async (event) =>{
        event.preventDefault();
        await rejectPending(pending.id)
    }

    return (
        <Container>
        <Card className="mb-2 border" style={{padding: '2%'}}>
            <Card.Header><b>{userData.name}</b> está interessado(a) em arrendar <b>{pending.accommodation_name}</b>, aceita?</Card.Header>
            <Row >
                <Col className="pb-2 pt-2 pl-2 pr-2 center" xm={6} sm={2}>
                    <img src={DefaultUserPic} alt="Imagem de perfil" width="100%"></img>
                    <Button variant="info" href={ "/profileUser/"+pending.user_id} > Ver perfil do {userData.name}</Button>
                </Col>
                <Col className="pb-4 pt-4 pr-4 center" xm={6} sm={4}>
                    <Button ize="sm" variant="info">{userData.name}  &nbsp; <FontAwesomeIcon icon={faEnvelope}/></Button>
                    <div className="ml-4 mt-3 pt-2" style={{textAlign: 'left'}}>
                        {accommodationRequirements.gender === userExtra.gender || accommodationRequirements.gender === "Misto" || accommodationRequirements.gender === "Indiferente" ?
                        <p><FontAwesomeIcon color="green" icon={faCheckCircle}/> Género</p>:
                        <p><FontAwesomeIcon color="red" icon={faTimesCircle}/> Género</p>}

                        {accommodationRequirements.pets === userExtra.pets?
                            <p><FontAwesomeIcon color="green" icon={faCheckCircle}/> Tem animais de estimação</p>:
                            <p><FontAwesomeIcon color="red" icon={faTimesCircle}/> Tem animais de estimação</p>}

                        {userAge >= accommodationRequirements.ageRangeBot  && userAge <= accommodationRequirements.ageRangeTop?
                            <p><FontAwesomeIcon color="green" icon={faCheckCircle}/> Idade</p>:
                            <p><FontAwesomeIcon color="red" icon={faTimesCircle}/> Idade</p>}

                        {accommodationRequirements.smoker === userExtra.smoker?
                            <p><FontAwesomeIcon color="green" icon={faCheckCircle}/> Fumador</p>:
                            <p><FontAwesomeIcon color="red" icon={faTimesCircle}/> Fumador</p>}
                    
                    </div>
                </Col>
                <Col className="center" xm={4} sm={3}>
                    <AnimationWrapper>
                        <a href={ "/profileAccommodation/"+pending.accommodation_id} >
                            <Card.Img onclick="href='/profileAlojamento" className="pb-2 pt-4 pl-2 pr-2 center" style={{ width: '70%'}} src={alojamento}></Card.Img>
                        
                            <Card.Text>
                                <p style={{ fontSize: '100%', color:'black', textDecoration:'none' }}>{accommodationData.name} </p>
                                {/* <Button style={{ fontSize: '60%' }}  variant="primary"href={ "/profileAccommodation/"+pending.accommodation_id}>Ver alojamento</Button> */}
                            </Card.Text>
                        </a>
                    </AnimationWrapper>
                    <p className="mt-4 mb-1"><b>Início:</b> {pending.beginDate}</p>
                    <p><b>Fim:</b> {pending.endDate}</p>
                </Col>
                <Col className="pb-4 pt-4 pl-4 pr-4 center border-left inline" xm={8} sm={3}>
                    <Button variant="success"  className="m-1 mt-5" onClick={handleAcceptPending} size="m" >Aceitar</Button>
                    <Button variant="danger" className="m-1 mt-5" onClick={handleRejectPending}  size="m"  >Rejeitar</Button>                    
                </Col>
            </Row>
        </Card> 
        </Container>
    )
}

export default PendingAc