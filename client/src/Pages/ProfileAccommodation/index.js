import React, {useEffect, useState}  from 'react';
import {useParams} from 'react-router-dom';
import api from '../../services/api';
import { Container,Row,Col,Form ,Button, Card, Carousel} from 'react-bootstrap'
//import {connect} from 'react-redux';
import DefaultRoomPic1 from "../../img/basicRoom.png"
import DefaultRoomPic2 from "../../img/basicWC.png"
import DefaultRoomPic3 from "../../img/basicKitchen.jpg"
import NavBarHome from '../../Components/NavBarHome'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faStar, faMapMarkerAlt, faEuroSign, faBed, faBath, faSun, faWifi, faBroom, faPeopleArrows,  faMars, faVenus,faVenusMars, faNeuter, faSmoking, faPaw, faPlus} from '@fortawesome/free-solid-svg-icons'
//const axios = require('axios');
import ImageUploading from 'react-images-uploading';

function ProfileAccommodation() {
    let { id } = useParams();
    const [accommodation, setaccommodation] = useState([]);

    useEffect(() => {
        api.get('api/accommodations/'+id).then(response => {
            // you must define a default operation
        setaccommodation(response.data);
        
        }).catch(err => {
          alert(err)
        })
      }, []);

   const interesse = () => {
    /**return (<div className="date-range">
        <p>O senhorio foi informado do seu interesse e irá contactá-lo em breve</p>
    </div>);*/

    alert("O senhorio foi informado do seu interesse e irá contactá-lo em breve");
  };

   
        var profilePic1=DefaultRoomPic1;
        var profilePic2=DefaultRoomPic2;
        var profilePic3=DefaultRoomPic3;
    
        return (
            <div>
                <NavBarHome/>
                <Container>
                <h2> {accommodation.name} </h2> 
                <Row> 
                    <Col xs="8">
                        <Carousel >
                            <Carousel.Item>
                                <img className="d-block w-100" src={profilePic1}  alt="First image" />
                                <Carousel.Caption>
                                <p>Quarto</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100" src={profilePic2}  alt="Second image" />
                                <Carousel.Caption>
                                <p>Casa de banho</p> 
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100" src={profilePic3}  alt="Thrid image" />
                                <Carousel.Caption>
                                <p>Cozinha</p> 
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>


                        <Button variant="info" onClick={interesse} className="interesse" size="lg">Estou interessado!</Button>
                        <Button variant="info" href= "/chat" className="interesse" size="lg"><FontAwesomeIcon icon={faEnvelope} /></Button>
                        <Button variant="info" className="interesse" size="lg"><FontAwesomeIcon icon={faStar} /> Adicionar aos favoritos</Button>
                        <Card style={{ width: '100%' }}>
                            <Card.Header as="h3">Descrição</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {accommodation.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '100%', marginTop: '2%' }}>
                            <Card.Header as="h3">Requisitos dos inquilinos</Card.Header>
                            <Card.Body>
                                <Card.Title> <FontAwesomeIcon icon={faPeopleArrows} /> Faixa etária: </Card.Title>
                                <Card.Text>
                                    Dos 18 aos 23 anos
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title>Género preferecial: </Card.Title>
                                <Card.Text>
                                    <p className="mas"> <FontAwesomeIcon icon={faMars} /> Masculino</p>
                                    <p className="fem"> <FontAwesomeIcon icon={faVenus} /> Feminino</p>
                                    <p className="mix"><FontAwesomeIcon icon={faVenusMars} /> Misto</p>
                                    <p className="indif"><FontAwesomeIcon icon={faNeuter} /> Indiferente</p>
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title><FontAwesomeIcon icon={faSmoking} /> Permite fumadores? </Card.Title>
                                <Card.Text>
                                    Sim
                                    Não
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title> <FontAwesomeIcon icon={faPaw} /> Permite animais de estimação? </Card.Title>
                                <Card.Text>
                                    Sim
                                    Não
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title> <FontAwesomeIcon icon={faPlus} /> Outras informações complementares: </Card.Title>
                                <Card.Text>
                                    Oi
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        
                    </Col>
                    <Col xs="4">
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Title><FontAwesomeIcon icon={faMapMarkerAlt} /> Morada:</Card.Title>
                                <Card.Text>
                                
                                {accommodation.streetName}, &nbsp;
                                {accommodation.city}, &nbsp;
                                {accommodation.country}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Title><FontAwesomeIcon icon={faEuroSign} /> Preço/mês:</Card.Title>
                                <Card.Text>
                                    {accommodation.price}&euro;
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Title><FontAwesomeIcon icon={faStar} /> Rating:</Card.Title>
                                <Card.Text>
                                    {accommodation.rating}/5
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Title> Estado de Ocupação: </Card.Title>
                                <Card.Text>
                                    <p className="ocupado"> Ocupado</p>
                                    <p className="desocupado">Desocupado</p>
                                    <p className="reservado">Reservado</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '100%' }}   style={{ marginTop: '2%' }} >
                            <Card.Header as="h3">Informações sobre o Alojamento</Card.Header>
                            <Card.Body>
                                <Card.Title> <FontAwesomeIcon icon={faBed} /> Nº de quartos: </Card.Title>
                                <Card.Text>
                                    2
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title> <FontAwesomeIcon icon={faBath} /> Nº de casas de banho: </Card.Title>
                                <Card.Text>
                                    2
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title> Área do quarto: </Card.Title>
                                <Card.Text>
                                    20 m<sup>2</sup>
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title> <FontAwesomeIcon icon={faSun} /> Orientação solar do quarto: </Card.Title>
                                <Card.Text>
                                    Norte (N)
                                    Nordeste (NE)
                                    Este (E)
                                    Sudeste (SE)
                                    Sul (S)
                                    Sudoeste (SO)
                                    Oeste (O)
                                    Noroeste (NO)
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title> <FontAwesomeIcon icon={faWifi} /> Acesso à Internet: </Card.Title>
                                <Card.Text>
                                    Existe
                                    Não existe
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title> <FontAwesomeIcon icon={faBroom} /> Limpeza: </Card.Title>
                                <Card.Text>
                                    Cada um faz a sua própria
                                    É feita por profissionais
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        
                    </Col>

                </Row>
                </Container>
            </div>
        )
}

    /**const mapStatetoProps=(state)=>{
        return{
            user_id:state.user.userDetails.userid,
            username:state.user.userDetails.username,
        email:state.user.email,
        profileImage: state.user.profileImage,
        msg:state.user.msg
        }
    }
   */
   

  // export default connect(mapStatetoProps)(ProfileAlojamento);
  export default ProfileAccommodation;