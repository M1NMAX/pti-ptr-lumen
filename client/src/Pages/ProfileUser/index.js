import React, {useEffect, useState} from 'react';
import {Container,Row,Col,Form ,Button} from 'react-bootstrap';
//import {connect} from 'react-redux';
import DefaultUserPic from "../../img/standartUser3.png";
import NavBarHome from '../../Components/NavBarHome';
import {useParams, useHistory} from 'react-router-dom';
import api from '../../services/api';



//const axios = require('axios');
function ProfileUser(){
    let { id } = useParams();
    const [token] = useState(localStorage.getItem('token'));
    const [username, setUsername] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
   


    const history = useHistory();

    useEffect(() => {
        api.get('api/users/'+id, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(response => {
          if(response.data.status && response.data.status === (401 || 498)){
            localStorage.clear();
            history.push('/');
          }else{
            setUsername(response.data.username);
            setName(response.data.name);
            setEmail(response.data.email);
            //console.log(response.data);
            
          }
        }).catch(err => {
          alert(err)
        })
      }, [token]);

        return (
            <div>
                <NavBarHome/>
                <Container>
                <Row>
                    <Col>
                            <img src={DefaultUserPic} alt="profils pic" />
                    </Col>
                    <Col>
                        <h1>Meu dados</h1>
                        <Form className="form">     
                        {   /* <p>{this.state.msg}</p> */}
                            <Form.Group controlId="formCategory1">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" value={username}/>
                            </Form.Group>
                            <Form.Group controlId="formCategory2">
                                <Form.Label>Nome Completo:</Form.Label>
                                <Form.Control type="email" value={name} />
                            </Form.Group>
                            <Form.Group controlId="formCategory3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="text" value={email}/>
                            </Form.Group>
                            <Form.Group controlId="formCategory5">
                                <Form.Label>Data de Nascimento:</Form.Label>
                                <Form.Control type="text" defaultValue="21/01/2000" />
                            </Form.Group>
                            <Form.Group controlId="formCategory6">
                                <Form.Label>Nº de contribuinte:</Form.Label>
                                <Form.Control type="text" defaultValue="123457789"/>
                            </Form.Group>
                            <Form.Group controlId="formCategory7">
                                <Form.Label>Características Pessoais:</Form.Label>
                                <Form.Control type="text" defaultValue="Organizado, vou para a cama cedo, gosto de limpar casas de banho" />
                            </Form.Group>
                            <Form.Group controlId="formCategory8">
                                <Form.Label>Preferências:</Form.Label>
                                <Form.Control type="text" defaultValue="Gostava de viver só com rapazes, de preferência da faculdade onde ando"/>
                            </Form.Group>
                            <Form.Group controlId="formCategory9">
                                <Form.Label>Estou interessado em:</Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    checked={"alugarAlojamento" === "alugarAlojamento"}
                                    type="radio"
                                    label="Alugar um alojamento"
                                    name="alugarAlojamento"
                                    id="alugarAlojamento"
                                    />
                                    <Form.Check
                                    checked={"alugarAlojamento"=== "tenhoAlojamento"}
                                    type="radio"
                                    label="Tenho um alojamento para alugar"
                                    name="tenhoAlojamento"
                                    id="tenhoAlojamento"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formCategory10">
                                <Form.Label>Instituição:</Form.Label>
                                <Form.Control type="text" defaultValue="UL-FCUL"/>
                            </Form.Group>
                        <Form.Group controlId="formCategory4">
                                <Form.Control type="file" name="profileImage"/>
                            </Form.Group>
                <Button variant="primary" >Update Profile</Button>
                        </Form>
                    </Col>

                </Row>
                </Container>
            </div>
        )
    }

  export default ProfileUser;