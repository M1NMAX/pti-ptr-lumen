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
import Spinner from './Spinner';



function PendingAc({pending, acceptPending, rejectPending}) {
    const[token] = useState(localStorage.getItem('token'));
    const[userData, setUserData] = useState([]);
    const[accommodationData, setAccommodationData] = useState([]);
    const[accommodationRequirements, setAccommodationRequirements] = useState([]);
    const[userAge, setUserAge]= useState(); 

    const [loading, setLoading] = useState(true);

    
    const history = useHistory();
    useEffect(() => {
        if(token === null || token === ''){
            history.push('/login');    
        }else{
            api.get('api/users/'+pending.landlord_id, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
            }).then(response => {
                if(response.data.status){
                    setUserData(response.data.user)
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
                        setLoading(false);
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
            {loading === false ? (
        <Card className="mb-2 border" style={{padding: '2%'}}>
            <Card.Header>O senhorio do alojamento <b>{accommodationData.name}</b> aceitou-o, tem a certeza que quer prosseguir?</Card.Header>
            <Row className="d-flex justify-content-center" >
                <Col className="pb-2 pt-2 pl-2 pr-2 center"  xm={4} sm={3} >
                    <AnimationWrapper>
                        <a href={ "/profileAccommodation/"+pending.accommodation_id} >
                            <Card.Img onclick="href='/profileAlojamento" className="pb-2 pt-4 pl-2 pr-2 center" style={{ width: '100%'}} src={alojamento}></Card.Img>
                        
                            <Card.Text>
                                <p style={{ fontSize: '100%', color:'black', textDecoration:'none' }}>{accommodationData.name} </p>
                                {/* <Button style={{ fontSize: '60%' }}  variant="primary"href={ "/profileAccommodation/"+pending.accommodation_id}>Ver alojamento</Button> */}
                            </Card.Text>
                        </a>
                    </AnimationWrapper>
                </Col>
                <Col className="d-flex align-items-center d-flex justify-content-center" xm={6} sm={2}>
                    <Button variant="info">{userData.name}  &nbsp; <FontAwesomeIcon icon={faEnvelope}/></Button>
                    
                </Col>
                <Col className="d-flex align-items-center d-flex justify-content-center" xm={6} sm={4}>
                    <Col> <p><b>Início: </b> {pending.beginDate} </p></Col>
                    <Col><p><b>Fim: </b> {pending.endDate} </p></Col>
                </Col>
                <Col className="d-flex align-items-center d-flex justify-content-center border-left inline" xm={8} sm={3}>
                    <Button size="lg" variant="success"  className="m-2 mt-5" onClick={handleAcceptPending} size="m" >Sim</Button>
                    <Button size="lg" variant="danger" className="m-2 mt-5" onClick={handleRejectPending}  size="m"  >Não</Button>                    
                </Col>
            </Row>
        </Card> 
         ) : (
            <Spinner />
          )}
        </Container>
    )
}

export default PendingAc