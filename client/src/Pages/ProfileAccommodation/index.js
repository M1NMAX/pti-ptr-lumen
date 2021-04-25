import React, {useEffect, useState, useRef}  from 'react';
import {useParams} from 'react-router-dom';
import api from '../../services/api';
import { Container,Row,Col,Form ,Button, Card, Carousel, Popover, Overlay} from 'react-bootstrap'
import DefaultRoomPic1 from "../../img/basicRoom.png"
import DefaultRoomPic2 from "../../img/basicWC.png"
import DefaultRoomPic3 from "../../img/basicKitchen.jpg"
import NavBarHome from '../../Components/NavBarHome';
import Comment from '../../Components/Comments';
import DatePicker from "react-datepicker";
import './index.css'
import BeautyStars from 'beauty-stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "react-datepicker/dist/react-datepicker.css";

import { faEnvelope, faStar, faMapMarkerAlt, faEuroSign,faHome, faBed, faBath, faSun, faWifi, faBroom, faPeopleArrows,  faMars, faVenus,faVenusMars, faNeuter, faSmoking, faPaw, faPlus, faComments, faComment} from '@fortawesome/free-solid-svg-icons'

function ProfileAccommodation() {
    let { id } = useParams();
    const [userId] = useState(localStorage.getItem('userID'))
    const [token] = useState(localStorage.getItem('token'));
    const [accommodation, setaccommodation] = useState([]);
    const [accommodationInfo, setaccommodationInfo] = useState([]);
    const [accommodationComments, setaccommodationComments] = useState([]);
    const [isFavourite, setIsFavourite]= useState(false);

    const [content, setContent] = useState('');
    const [star, setStar] = useState(0);

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState( );
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
   
    const [isDisabled, setDisabled] = useState(true);
    const [showMessage, setshowMessage] = useState(false);

    const ref = useRef(null);
 
    useEffect(() => {
        api.get('api/accommodations/'+id).then(response => {
            // you must define a default operation
            setaccommodation(response.data);
            setaccommodationInfo(response.data.info)
        }).catch(err => {
          alert(err)
        })

        api.get('api/accommodations/'+id+'/comments').then(response => {
            // you must define a default operation
        setaccommodationComments(response.data);
        
        }).catch(err => {
          alert(err)
        })

        if(token ===null || token ===''){
           setIsFavourite(false);
        }else{
            api.get('api/favourites',  {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              }).then(response => {
                if(response.data.status){
                    for (let i = 0; i < response.data.favourites.length; i++) {
                        if(id ==response.data.favourites[i].accommodation_id){
                            setIsFavourite(true);
                            break;
                        }      
                    }
                }else{
                    localStorage.clear();
                }
            
            
            }).catch(err => {
            alert(err)
            })
        }

      }, [token]);

      async function handleFavourite(){

        if(token ==null || token ===''){
            alert('Não estas autenticado');
        }else{
            if(isFavourite){
                api.delete('/api/favourites/'+id, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    }
                }).then(response => {
                    if(response.data.status){
                        setIsFavourite(false);
                    }else{
                        alert('Ocorreu um erro, não foi possivel adicionar o item dos favoritos, tente mais tarde');
                    }

                }).catch(err => {
                alert(err)
                })
            }
            else if(!isFavourite){
            var data = {
                "accommodation_id":parseInt(id)
            };
                
                api.post('/api/favourites/', data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then(response => { 
                    if(response.data.status){
                        setIsFavourite(true);
                    }else{
                        alert('Ocorreu um erro, não foi possivel remover o item dos favoritos, tente mais tarde');
                    }
                }).catch(err => {
                alert(err)
                })
            }
        }
        
      }


    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };
     

    const buttonChange = () => {
        if (document.getElementsByClassName("monthStart")[0].value || document.getElementsByClassName("monthEnd")[0].value) {
            setDisabled(false)
            setshowMessage(!showMessage);
        }else{
            setDisabled(true)
        }
    }

    
    const changeShowMessage = () => {
        
        let data = {
            'user_id': userId,
            'landlord_id': accommodation.landlord_id,
            'accommodation_id': accommodation.id,
            'price': accommodation.price,
            'beginDate':document.getElementsByClassName("monthStart")[0].value,
            'endDate':document.getElementsByClassName("monthEnd")[0].value,
        };
        if(token ==null || token ===''){
            alert('Não estas autenticado');
        }else{
            api.post('/api/accommodations/rentalpending/', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(response => { 
                if(response.data.status){
                    console.log('done');
        
                }else{
                    alert('Ocorreu um erro, não foi possivel remover o item dos favoritos, tente mais tarde');
                }
            }).catch(err => {
            alert(err)
            })
        }

    }

   

    async function handleComment(e) {
        e.preventDefault();

        var data = {
            "user_id": parseInt(userId),
            "accommodation_id":parseInt(id),
            "rate": star,
            "content":content,
        };
         
        if(token ==null || token ===''){
            alert('Não estas autenticado');
        }else{
            api.post('/api/accommodations/comment/', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(response => { 
                if(response.data.status){
                    setContent('');
                    setStar(0);
                }else{
                    alert('Ocorreu um erro, não foi possivel remover o item dos favoritos, tente mais tarde');
                }
            }).catch(err => {
            alert(err)
            })
        }
    
    }
   
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
                        <Button variant="info" href= {"/chat/" + accommodation.landlord_id + "/" + id} className="interesse" size="lg"><FontAwesomeIcon icon={faEnvelope} /></Button>
                        <Button variant="info" id="button" className="interesse" size="lg" onClick={handleFavourite}>
                            {isFavourite? 'Remover dos favoritos' : 'Adicionar aos favoritos' }
                        </Button>
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
                                {accommodationInfo.accommodationType}
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title> <FontAwesomeIcon icon={faBed} /> Nº de quartos: </Card.Title>
                                <Card.Text>
                                {accommodationInfo.rooms}
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title> <FontAwesomeIcon icon={faBath} /> Nº de casas de banho: </Card.Title>
                                <Card.Text>
                                {accommodationInfo.bathRooms}
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title> Área: </Card.Title>
                                <Card.Text>
                                {accommodationInfo.area} m<sup>2</sup>
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title> <FontAwesomeIcon icon={faSun} /> Orientação solar: </Card.Title>
                                <Card.Text>
                                {accommodationInfo.solar}
                                    {/* Norte (N)
                                    Nordeste (NE)
                                    Este (E)
                                    Sudeste (SE)
                                    Sul (S)
                                    Sudoeste (SO)
                                    Oeste (O)
                                    Noroeste (NO) */}
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title> <FontAwesomeIcon icon={faWifi} /> Acesso à Internet: </Card.Title>
                                <Card.Text>
                                {accommodationInfo.wifi?'Tem Wifi': 'Não tem Wifi'}
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Title> <FontAwesomeIcon icon={faBroom} /> Limpeza: </Card.Title>
                                <Card.Text>
                                {accommodationInfo.clean?'A limpeza é realizada pelo ocupante':'A limpeza é realizada por profissionais'}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Card style={{ width: '100%', marginTop: '2%' }}>
                            <Card.Header as="h3">Comentar</Card.Header>
                                <Form className="msg" onSubmit={handleComment}>
                                    <Form.Row>
                                    <Col xs={12} sm={9}>
                                        <Form.Group controlId="formBasictext">
                                            <Form.Control as="textarea" rows={3} required className="textMsg" placeholder="Escreva o seu comentário..." value={content} onChange={e => setContent(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={8} sm={3}>
                                        <div className = "star">
                                        <BeautyStars
                                            value={star}
                                            inactiveColor="rgb(173, 173, 173)"
                                            activeColor="rgb(243, 243, 78)"
                                            size="90%"
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
                        <Card style={{ width: '100%', marginTop: '2%' }}>
                            <Card.Header as="h3"><FontAwesomeIcon icon={faComments} /> Comentários:</Card.Header>
                            <div className="comments">
                                {accommodationComments.length>0? 
                                    accommodationComments.map((comment)=>(<Comment comment={comment}/>)):
                                    <p>Ainda não existem comentários associados a este alojamento</p> }
                            </div>
                        </Card>
                        
                    </Col>
                </Row>
                </Container>
            </div>
        )
}

export default ProfileAccommodation;