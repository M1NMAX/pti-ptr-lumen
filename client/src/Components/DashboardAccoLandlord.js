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
    const [accommodationData, setAccommodationData] = useState([]);
    const [accommodationRequirements, setAccommodationRequirements] = useState([]);
    const [paymentState, setPaymentState]= useState(); 

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
                        accommodation.paymentState?
                            setPaymentState(<p><FontAwesomeIcon color="green" icon={faCheckCircle}/> <b>Pago </b></p>):
                            setPaymentState(<p><FontAwesomeIcon color="red" icon={faTimesCircle}/> <b>Não Pago </b> </p>)
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
        <Card className="mb-2 border" >
            <Card.Header><b>{accommodationData.name}</b></Card.Header>
            <Card.Text>
            <Row className="d-flex justify-content-left d-flex align-items-center ml-5" >
                <h6 className="mr-4"><b> &nbsp; &nbsp;   Inquilino/a:</b> </h6>
                <Button size="m"  className="mr-4 m-2 " variant="info" href={ "/profileUser/"+accommodation.guest_id}>{userData.name}</Button>
                <Button size="m"  className="m-2" variant="info"> <FontAwesomeIcon icon={faEnvelope}/></Button>
                
            </Row>
            <Row className="d-flex justify-content-center">
                <Col> <p><b>Início: </b> {accommodation.beginDate} </p></Col>
                <Col><p><b>Fim: </b> {accommodation.endDate} </p></Col>
                <Col> <p><b>Preço:</b> {accommodation.price} &euro;</p></Col>
                <Col> {paymentState} </Col>
                
               
            </Row>
            <Row className="d-flex justify-content-center mb-2">
                <Button variant="primary" className="m-1 "  size="m" href={ "/profileAccommodation/"+accommodation.accommodation_id}>Ver alojamento</Button>
                <Button variant="success"  className="m-1 "  size="m" href={ "/profileAccommodationEditable/"+accommodation.accommodation_id}>Editar Alojamento</Button>
                <Button variant="danger" className="m-1 "   size="m" onClick={handleShowWarning} >Apagar Alojamento</Button>
            </Row>
            </Card.Text>
        </Card> 
        ) : (
            <Spinner />
          )}
        </Container>
    )
}

export default DashboardAccoLandlord