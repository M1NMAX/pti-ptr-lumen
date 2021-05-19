import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import {Button, Card, Row, Col, Container} from 'react-bootstrap'
import { AnimationWrapper } from 'react-hover-animation'
import alojamento from '../img/basicRoom.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope, faTimesCircle, faCheckCircle, faMoneyBill} from '@fortawesome/free-solid-svg-icons'
import DefaultUserPic from "../img/standartUser3.png";
import api from '../services/api';
import {useHistory} from 'react-router-dom';
import Spinner from './Spinner';



function DashboardAccoGuest({accommodation}) {
    const[token] = useState(localStorage.getItem('token'));
    const[userData, setUserData] = useState([]);
    const[userExtra, setUserExtra] = useState([]);
    const[accommodationData, setAccommodationData] = useState([]);
    const[accommodationRequirements, setAccommodationRequirements] = useState([]);
    const[userAge, setUserAge]= useState(); 
    
    const [loading, setLoading] = useState(true);


    const history = useHistory();
    useEffect(() => {
        if(token === null || token === ''){
            history.push('/login');    
        }else{
            api.get('api/users/'+accommodation.landlord_id, {
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
                        console.log(response.data.aboutAccommodation);
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

    // const handleAcceptPending = async (event) =>{
    //     event.preventDefault();
    //     await acceptPending(pending.id);

    // };

    // const handleRejectPending = async (event) =>{
    //     event.preventDefault();
    //     await rejectPending(pending.id)
    // }

    return (
        <Container>
             {loading === false ? (
        <Card className="mb-2 border" style={{padding: '2%'}}>
            <Card.Header><b>{accommodationData.name}</b></Card.Header>
            <Row className="d-flex justify-content-center mt-2">
                <Col> <p><b>Início: </b> {accommodation.beginDate} </p></Col>
                <Col><p><b>Fim: </b> {accommodation.endDate} </p></Col>
                <Col> <p><b>Preço:</b> {accommodation.price} &euro;</p></Col>
                <Col> {accommodation.paymentState?
                            <p><FontAwesomeIcon color="green" icon={faCheckCircle}/> <b>Pago</b> </p>:
                            <p><FontAwesomeIcon color="red" icon={faTimesCircle}/> <b>Não Pago</b> </p>} </Col>
                
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
            <Row className="d-flex justify-content-left d-flex align-items-center ml-5" >
                <h6 className="mr-4"><b> &nbsp; &nbsp;   Senhorio/a:</b> </h6>
                <Button size="m"  className="mr-4 m-2" variant="info" href={ "/profileUser/"+accommodation.guest_id}>{userData.name}</Button>
                <Button size="m"  className="mr-4 m-2" variant="info"> <FontAwesomeIcon icon={faEnvelope}/></Button>
                <Button size="m"  className="mr-4 m-2" variant="info" desable={accommodation.paymentState}> <FontAwesomeIcon icon={faMoneyBill}/> Pagar</Button>
                <Button variant="primary" className="mr-4 m-2 "  size="m" href={ "/profileAccommodation/"+accommodation.accommodation_id}>Ver alojamento</Button>

            </Row>
            
        </Card> 
            ) : (
                <Spinner />
              )}
        </Container>
    )
}

export default DashboardAccoGuest