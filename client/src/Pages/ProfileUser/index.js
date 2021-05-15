import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Card, ListGroup, Button} from 'react-bootstrap';
import DefaultUserPic from "../../img/standartUser3.png";
import NavBarHome from '../../Components/NavBarHome';
import {useParams, useHistory} from 'react-router-dom';
import api from '../../services/api';
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faEnvelope} from '@fortawesome/free-solid-svg-icons'


function Me(){
    let { id } = useParams();
    const [token] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState([]);
    const [userExtra, setUserExtra] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.get('api/users/'+id, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(response => {
          if(response.data.status && response.data.status === (401 || 498)){
            localStorage.clear();
            history.push('/login');
          }else{
            setUser(response.data.user);
            setUserExtra(response.data.extra)
          }
        }).catch(err => {
          alert(err)
        })
      }, [token]);

      

        return (
            <div>
                <NavBarHome/>
                <Container>
                <Row  className= "mt-3 mb-3">
                    <Col xs={6} md={4}>
                        <Button  size="sm" className= "ml-3 mr-3" variant="info" onClick={() => {history.goBack();}} >  <FontAwesomeIcon icon={faArrowLeft}/> Voltar</Button>
                    </Col>
                    <Col xs={6} md={4} className='text-center'><h2>Sobre {user.name}</h2></Col>                 
                </Row>
                <Row>
                    <Col sm={12} md={5} className="center">
                      <img src={DefaultUserPic} alt="profiles pic" className="mt-2"  style={{maxWidth: '70%'}}/><br/>
                      <Button variant="info">{user.name}  &nbsp; <FontAwesomeIcon icon={faEnvelope}/></Button>
                    </Col>
                    <Col sm={12} md={7}>
                        <Card style={{ width: '70%' }} className="ml-3">
                        <Card.Header>Detalhes</Card.Header>
                        <ListGroup variant="flush" className="ml-3">
                            <ListGroup.Item><b>Username:</b> {user.username}</ListGroup.Item>
                            <ListGroup.Item><b>Nome completo: </b>{user.name}</ListGroup.Item>
                            <ListGroup.Item><b>Email:</b> {user.email}</ListGroup.Item>
                            <ListGroup.Item><b>Data de nascimento:</b> {user.birthdate}</ListGroup.Item>
                            <ListGroup.Item><b>Género:</b> {userExtra.gender}</ListGroup.Item>
                            <ListGroup.Item><b>Instituição:</b> {userExtra.college}</ListGroup.Item>
                            <ListGroup.Item><b>Tem animais de estimação:</b> {userExtra.pets?'Sim':'Não'}</ListGroup.Item>
                            <ListGroup.Item><b>É fumador/a:</b> {userExtra.smoker?'Sim':'Não'}</ListGroup.Item>
                        </ListGroup>
                        </Card>  
                    </Col>
                </Row>
                </Container>
                <Footer/>
            </div>
        )
    }

  export default Me;