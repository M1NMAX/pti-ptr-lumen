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



function DashboardAccoLandlord({accommodation, showWarning}) {
    const [token] = useState(localStorage.getItem('token'));
    const [userData, setUserData] = useState([]);
    const [userExtra, setUserExtra] = useState([]);
    const [accommodationData, setAccommodationData] = useState([]);
    const [accommodationRequirements, setAccommodationRequirements] = useState([]);
    const [userAge, setUserAge]= useState(); 

    const [loading, setLoading] = useState(true)
    

    

    
    const history = useHistory();
    useEffect(() => {
        if(token === null || token === ''){
            history.push('/login');    
        }else{
            api.get('api/users/'+accommodation.guest_id, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
            }).then(response => {
                if(response.data.status){
                    setUserData(response.data.user)
                    setUserExtra(response.data.extra);

                }else{
                    localStorage.clear();
                    history.push('/login')
                }
            }).catch(err => {
            alert(err)
            })

            api.get('api/accommodations/'+accommodation.accommodation_id, {
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

    const handleShowWarning = async (event) =>{
        event.preventDefault();
        showWarning(accommodationData.name, accommodationData.id);
    };


    return (
        <Container>
            {loading === false ? (
        <Card className="mb-2 border" style={{padding: '2%'}}>
            <Card.Header><b>{accommodationData.name}</b></Card.Header>

            <Row>
                <p>Inquilino/a: </p>
                <Button size="m"  className="m-1" variant="info" href={ "/profileUser/"+accommodation.guest_id}>{userData.name}</Button>
                <Button size="m"  className="m-1" variant="info"> <FontAwesomeIcon icon={faEnvelope}/></Button>
                
            </Row>
            <Row >
                <Col> <p>Início: {accommodation.beginDate} </p></Col>
                <Col><p>Fim: {accommodation.endDate} </p></Col>
                <Col> <p>Preço: {accommodation.price} &euro;</p></Col>
                <Col> {accommodation.paymentState?
                            <p><FontAwesomeIcon color="green" icon={faCheckCircle}/> Pago </p>:
                            <p><FontAwesomeIcon color="red" icon={faTimesCircle}/> Pago </p>} </Col>
                
                {/* <Col className="center" xm={4} sm={3}>
                    <AnimationWrapper>
                        <a href={ "/profileAccommodation/"+accommodation.accommodation_id} >
                            <Card.Img onclick="href='/profileAlojamento" className="pb-4 pt-4 pl-2 pr-2 center" style={{ width: '70%'}} src={alojamento}></Card.Img>
                        
                            <Card.Text>
                                <p style={{ fontSize: '100%', color:'black', textDecoration:'none' }}>{accommodationData.name} </p>
                                {/* <Button style={{ fontSize: '60%' }}  variant="primary"href={ "/profileAccommodation/"+pending.accommodation_id}>Ver alojamento</Button> 
                            </Card.Text>
                        </a>
                    </AnimationWrapper>
                </Col> */}
            </Row>
            <Row className="ml-5">
                <Button variant="primary" className="m-1 "  size="m" href={ "/profileAccommodation/"+accommodation.accommodation_id}>Ver alojamento</Button>
                <Button variant="success"  className="m-1 "  size="m" href={ "/profileAccommodationEditable/"+accommodation.accommodation_id}>Editar Alojamento</Button>
                <Button variant="danger" className="m-1 "   size="m" onClick={handleShowWarning} >Apagar Alojamento</Button>
            </Row>
            
        </Card> 
        ) : (
            <Spinner />
          )}
        </Container>
    )
}

export default DashboardAccoLandlord