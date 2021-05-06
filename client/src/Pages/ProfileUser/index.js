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
                        <Button size="sm" variant="info">{user.name}  &nbsp; <FontAwesomeIcon icon={faEnvelope}/></Button>
                    </Col>
                    <Col xs={6} md={4} className='text-center'><h2>Sobre</h2></Col>                 
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                            <img src={DefaultUserPic} alt="profiles pic" style={{maxWidth: '90%'}}/>
                    </Col>
                    <Col sm={12} md={6}>
                        <Card style={{ width: '18rem' }}>
                        <Card.Header>Detalhes</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Username: {user.username}</ListGroup.Item>
                            <ListGroup.Item>Nome completo: {user.name}</ListGroup.Item>
                            <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                            <ListGroup.Item>Data de nascimento: {user.birthdate}</ListGroup.Item>
                            <ListGroup.Item>Género: {userExtra.gender}</ListGroup.Item>
                            <ListGroup.Item>Instituição: {userExtra.college}</ListGroup.Item>
                            <ListGroup.Item>Tem animais de estimação: {userExtra.pets?'sim':'não'}</ListGroup.Item>
                            <ListGroup.Item>É fumador/a: {userExtra.smoker?'sim':'não'}</ListGroup.Item>
                            <ListGroup.Item>Descrição pessoal: Uma pessoa normal </ListGroup.Item>
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