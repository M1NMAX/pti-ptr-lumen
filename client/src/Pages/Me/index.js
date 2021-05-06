import React, {useEffect, useState} from 'react';
import {Container,Row,Col,Form ,Button} from 'react-bootstrap';
import DefaultUserPic from "../../img/standartUser3.png";
import NavBarHome from '../../Components/NavBarHome';
import {useParams, useHistory} from 'react-router-dom';
import api from '../../services/api';
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faAudioDescription} from '@fortawesome/free-solid-svg-icons'


function ProfileUser(){
    const [id ] = useState(localStorage.getItem('userID'));
    const [token] = useState(localStorage.getItem('token'));
    const [name, setname] = useState();
    const [username, setusername] = useState();
    const [email, setemail] = useState();
    const [birthdate, setbirthdate] = useState();
    const [gender, setgender] = useState();
    const [college, setcollege] = useState();
    const [smoker, setsmoker] = useState();
    const [pets, setpets] = useState();
    const [userType, setUserType] = useState();
    const [description, setdescription] = useState();
    
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
            setname(response.data.user.name);
            setusername(response.data.user.username);
            setemail(response.data.user.email);
            setbirthdate(response.data.user.birthdate);
            setgender(response.data.extra.gender);
            setcollege(response.data.extra.college);
            setsmoker(response.data.extra.smoker);
            setpets(response.data.extra.pets)
            setUserType(response.data.user.userable_type.substring(11).toLowerCase());
          }
        }).catch(err => {
          alert(err)
        })
      }, [token]);

      async function handleUpdateUserData(e){
          e.preventDefault();
          let data = {
              'name' : name,
              'username': username,
              'email': email,
              'type' : userType,
              'birthdate': birthdate,
              'gender': gender,
              'college': college,
              'smoker': smoker,
              'pets': pets,
              'description': description,
          }
          console.log(data);

      }

      

        return (
            <div>
                <NavBarHome/>
                <Container>
                <Row  className= "mt-3 mb-3">
                    <Col xs={6} md={4}>
                        <Button  size="sm" className= "ml-3 mr-3" variant="info" onClick={() => {history.goBack();}} >  <FontAwesomeIcon icon={faArrowLeft}/> Voltar</Button>
                    </Col>
                    <Col xs={6} md={4} className='text-center'><h2>Sobre mim</h2></Col>                 
                </Row>
                
                <Row>
                    <Col sm={12} md={6}>
                            <img src={DefaultUserPic} alt="profiles pic" style={{maxWidth: '90%'}}/>
                            <Button className="changeImage" variant="info" style={{margin: '4%'}}>Alterar imagem</Button>
                    </Col>
                    <Col sm={12} md={6}>
                        
                        <Form className="form" onSubmit={handleUpdateUserData}>     
                       
                            <Form.Group controlId="formCategory1">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" value={username} onChange={e => setusername(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formCategory2">
                                <Form.Label>Nome Completo:</Form.Label>
                                <Form.Control type="text" value={name} onChange={e => setname(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formCategory3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" value={email} onChange={e => setemail(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formCategory5">
                                <Form.Label>Data de Nascimento:</Form.Label>
                                <Form.Control type="date" value={birthdate} onChange={e => setbirthdate(e.target.value)}/>
                            </Form.Group>
                           
                            <Form.Group controlId="formBasicType">
                                <Form.Label>Tenho como objetivo</Form.Label>
                                <Form.Control required as="select" type="type" value={userType} onChange={e => setUserType(e.target.value)} >
                                <option value="one" >selecione uma opção</option>
                                <option value="guest" >Alugar um alojamento</option>
                                <option value="landlord" >Colocar alojamentos para alugar</option>
                                </Form.Control>
                            </Form.Group>
                            
                            {userType === 'guest' && <>
                                <Form.Group controlId="formCategory10">
                                    <Form.Label>Instituição:</Form.Label>
                                    <Form.Control type="text" value={college} onChange={e => setcollege(e.target.value)}/>
                                </Form.Group>

                                <Form.Group controlId="formBasicGender">
                                    <Form.Label>Género:</Form.Label>
                                    <Form.Control required as="select" type="gender" value={gender} onChange={e => setgender(e.target.value)}>
                                    <option>Selecione um opção</option>
                                    <option value="Masculino"> Masculino </option>
                                    <option value="Feminino"> Feminino </option>
                                    <option value="Misto"> Misto </option>
                                    <option value="Indiferente"> Indiferente </option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formBasicSmoker">
                                    <Form.Label> Permite fumadores?</Form.Label>
                                    <Form.Control as="select" type="type" value={smoker} onChange={e => setsmoker(e.target.value)}>
                                    <option>Selecione um opção</option>
                                    <option value="1"> Sim </option>
                                    <option value="0"> Não </option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formBasicPet">
                                    <Form.Label> Permite animais de estimação?</Form.Label>
                                    <Form.Control as="select" type="type" value={pets} onChange={e => setpets(e.target.value)}>
                                    <option>Selecione um opção</option>
                                    <option value="1"> Sim </option>
                                    <option value="0"> Não </option>
                                    </Form.Control>
                                </Form.Group>
                            </>
                            }
                           <Form.Group controlId="formCategory4">
                            <Form.Label>Descrição:</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={e => setdescription(e.target.value)} />
                            <Form.Text className="text-muted">
                                Fale um pouco da sua pessoa
                            </Form.Text>
                        </Form.Group>
                            
                            {/* Change profile picture  */}
                        {/* <Form.Group controlId="formCategory4">
                                <Form.Control type="file" name="profileImage"/>
                            </Form.Group> */}
                             <Button variant="info" style={{margin: '4%'}} type="submit" >Guardar as alterações</Button>
                        </Form>
                    </Col>
                </Row>
                </Container>
                <Footer/>
            </div>
        )
    }

  export default ProfileUser;