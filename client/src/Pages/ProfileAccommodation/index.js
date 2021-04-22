import React, {useEffect, useState, useRef}  from 'react';
import {useParams} from 'react-router-dom';
import api from '../../services/api';
import { Container,Row,Col,Form ,Button, Card, Carousel, Popover, Overlay} from 'react-bootstrap'
//import {connect} from 'react-redux';
import DefaultUserPic from "../../img/standartUser3.png";
import DefaultRoomPic1 from "../../img/basicRoom.png"
import DefaultRoomPic2 from "../../img/basicWC.png"
import DefaultRoomPic3 from "../../img/basicKitchen.jpg"
import NavBarHome from '../../Components/NavBarHome'
import DatePicker from "react-datepicker";
import './index.css'
import BeautyStars from 'beauty-stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "react-datepicker/dist/react-datepicker.css";

import { faEnvelope, faStar, faMapMarkerAlt, faEuroSign,faHome, faBed, faBath, faSun, faWifi, faBroom, faPeopleArrows,  faMars, faVenus,faVenusMars, faNeuter, faSmoking, faPaw, faPlus, faComments, faComment} from '@fortawesome/free-solid-svg-icons'
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

      const [startDate, setStartDate] = useState();
      const [endDate, setEndDate] = useState( );
      const [show, setShow] = useState(false);
      const [target, setTarget] = useState(null);
      const ref = useRef(null);
    
      const handleClick = (event) => {
        console.log(event.target)
        setShow(!show);
        setTarget(event.target);
      };
      const [isDisabled, setDisabled] = useState(true);
      const  [showMessage, setshowMessage] = useState(false);
      
    const [star, setStar] = useState(0);
    const buttonChange = (event) => {
        
        console.log(document.getElementsByClassName("monthStart")[0].value)
        console.log(document.getElementsByClassName("monthEnd")[0].value)

        if (document.getElementsByClassName("monthStart")[0].value || document.getElementsByClassName("monthEnd")[0].value) {
            console.log("nao")
            setDisabled(false)
            console.log(isDisabled)
        }
        else{
            console.log("sim")
            setDisabled(true)
            console.log(isDisabled)
        }
    }

      const changeShowMessage = (event) => {
        setshowMessage(!showMessage);
        console.log(startDate)
        console.log(document.getElementsByClassName("monthStart")[0].defaultValue)
        console.log(document.getElementsByClassName("monthEnd")[0].defaultValue)
        setDisabled(true)
        console.log(isDisabled)
    }

    const [com, setCom] = useState('');

    async function handleCom(e) {
        e.preventDefault();}
   
        var profilePic1=DefaultRoomPic1;
        var profilePic2=DefaultRoomPic2;
        var profilePic3=DefaultRoomPic3;
    
        return (
            <div>
                <NavBarHome/>
                <Container>
                <h2> {accommodation.name} </h2> 
                <Row> 
                    <Col xs={12} sm={8}>
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


                        <Button variant="info" onClick={handleClick} className="interesse" size="lg">Estou interessado!</Button>
                        <Overlay
                            show={show}
                            target={target}
                            placement="bottom"
                            container={ref.current}
                            containerPadding={20}
                        >
                            <Popover id="popover-contained">
                            <Popover.Title as="h3">Escolha os meses em que está interessado arrendar:</Popover.Title>
                            <Popover.Content>
                                <Form>
                                    <DatePicker
                                        className = "monthStart"
                                        placeholderText="Mês de entrada" 
                                        selected={startDate}
                                        onChange={date => {setStartDate(date); buttonChange();}}
                                        selectsStart
                                        minDate={new Date()}
                                        startDate={startDate}
                                        endDate={endDate}
                                        excludeDates={[new Date("2021/10"), new Date("2021/11"), new Date("2021/12")]}
                                        dateFormat="MM/yyyy"
                                        showMonthYearPicker
                                        isClearable
                                    />
                                    <DatePicker
                                        className = "monthEnd"
                                        placeholderText="Mês de saída"
                                        selected={endDate}
                                        onChange={date => {setEndDate(date); buttonChange();}}
                                        
                                        
                                        selectsEnd
                                        minDate={new Date()}
                                        startDate={startDate}
                                        endDate={endDate}
                                        excludeDates={[new Date("2021/10"), new Date("2021/11"), new Date("2021/12")]}
                                        dateFormat="MM/yyyy"
                                        showMonthYearPicker
                                        isClearable
                                    />
                                    <Button className="dateSend" size="sm" variant="info" onClick={changeShowMessage} disabled={isDisabled}>
                                        Enviar
                                    </Button>
                                </Form>
                                {showMessage && <h6 >Ao enviar o senhorio será informado do seu interesse e irá contactá-lo em breve</h6>}
                                
                            </Popover.Content>
                            </Popover>
                        </Overlay>
                        <Button variant="info" href= "/chat" className="interesse" size="lg"><FontAwesomeIcon icon={faEnvelope} /></Button>
                        <Button variant="info" id="button" className="interesse" size="lg" onClick={toggleButton}><FontAwesomeIcon icon={faStar} /> Adicionar aos favoritos</Button>
                    </Col>
                    <Col xs={12} sm={4}>
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Title><FontAwesomeIcon icon={faMapMarkerAlt} /> Morada:</Card.Title>
                                <Card.Text>
                                
                                {accommodation.address}
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
                                    {accommodation.available? <p className="desocupado">Desocupado</p>:<p className="ocupado"> Ocupado</p>}

{/*                                     
                                    <p className="ocupado"> Ocupado</p>
                                    <p className="desocupado">Desocupado</p>*/}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>   
                </Row>
                <Row> 
                    <Col xs={12} sm={8}>   
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
                    <Col xs={12} sm={4}>
                        <Card style={{ width: '100%' }} >
                            <Card.Header as="h3">Informações sobre o Alojamento</Card.Header>
                            <Card.Body>
                                <Card.Title> <FontAwesomeIcon icon={faHome} /> Tipo de Alojamento: </Card.Title>
                                <Card.Text>
                                    Apartamento Quarto Moradia
                                </Card.Text>
                            </Card.Body>
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
                                <Card.Title> Área: </Card.Title>
                                <Card.Text>
                                    20 m<sup>2</sup>
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title> <FontAwesomeIcon icon={faSun} /> Orientação solar: </Card.Title>
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
                <Row>
                    <Col>
                        <Card style={{ width: '100%', marginTop: '2%' }}>
                            <Card.Header as="h3"><FontAwesomeIcon icon={faComments} /> Comentários:</Card.Header>
                            <div className="comments">
                                    <Card.Body className="borderComment">
                                        <Card.Title> <img src={DefaultUserPic} className="userPic" alt="profils pic" />  José <p className="date d-inline-block "><FontAwesomeIcon icon={faStar} style={{color:'rgb(243, 243, 78)'}}/> 2.0/5</p> </Card.Title>
                                        <Card.Text>
                                            <p className="time text-muted">Just Now</p>
                                            &emsp; Dos 18 aos 23 anos
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Body>
                                        <Card.Title> <img src={DefaultUserPic} className="userPic"alt="profils pic" />  Francisco  <p className="date d-inline-block "><FontAwesomeIcon icon={faStar} style={{color:'rgb(243, 243, 78)'}}/> 4.0/5</p></Card.Title>
                                        <Card.Text>
                                            <p className="time text-muted">15:45</p>
                                            &emsp; Dos 18 aos 23 anos
                                        </Card.Text>
                                    </Card.Body>
                            </div>
                        </Card>
                        <Card style={{ width: '100%', marginTop: '2%' }}>
                            <Card.Header as="h3">Comentar</Card.Header>
                                <Form className="msg" onSubmit={handleCom}>
                                    <Form.Row>
                                    <Col xs={12} sm={9}>
                                        <Form.Group controlId="formBasictext">
                                            <Form.Control as="textarea" rows={3} required className="textMsg" placeholder="Escreva o seu comentário..." value={com} onChange={e => setCom(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} sm={3}>
                                        <div className = "star">
                                        <BeautyStars
                                            value={star}
                                            inactiveColor="rgb(173, 173, 173)"
                                            activeColor="rgb(243, 243, 78)"
                                            size="25px"
                                            onChange={value => {setStar(value)}}
                                        />
                                        </div>
                                    </Col >
                                    </Form.Row>
                                    <Button className="send" variant="info" type="submit">
                                        <FontAwesomeIcon icon={faComment}/> Comentar
                                    </Button>
                                </Form>
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
    
    /*fazer pedido a base de dados e perguntar se alojamento se encontra nos favoritos e alterar toggle perante output*/
    let toggle = 0

    function toggleButton() {
        if (toggle == 0){
            console.log("oi");
            document.getElementById("button").innerHTML = "<FontAwesomeIcon icon={faStar} />Remover dos Favoritos";
            toggle += 1
        }
        else {
            document.getElementById("button").innerHTML = "<FontAwesomeIcon icon={faStar} />Adicionar aos Favoritos";
            toggle -= 1
        }
        
    }

  // export default connect(mapStatetoProps)(ProfileAlojamento);
  export default ProfileAccommodation;