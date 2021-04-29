import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import api from '../../services/api';
import {useHistory} from 'react-router-dom';
import { Container,Row,Col,Form ,Button, Carousel} from 'react-bootstrap'
//import {connect} from 'react-redux';
import DefaultRoomPic1 from "../../img/basicRoom.png"
import DefaultRoomPic2 from "../../img/basicWC.png"
import DefaultRoomPic3 from "../../img/basicKitchen.jpg"
import NavBarHome from '../../Components/NavBarHome'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faStar, faMapMarkerAlt, faEuroSign, faBed, faBath, faSun, faWifi, faBroom, faPeopleArrows,  faMars, faVenus,faVenusMars, faNeuter, faSmoking, faPaw, faPlus} from '@fortawesome/free-solid-svg-icons'
//const axios = require('axios');
import ImageUploading from 'react-images-uploading';
import RangeSlider from 'react-bootstrap-range-slider';

function ProfileAccommodationEditable () {
    const  history = useHistory();
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

    const [ ageMin, setAgeMin ] = useState(18);
    const [ ageMax, setAgeMax ] = useState(27);

    const [images, setImages] = useState([]);
    const maxNumber = 69;
 
    const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };


        var profilePic1=DefaultRoomPic1;
        var profilePic2=DefaultRoomPic2;
        var profilePic3=DefaultRoomPic3;
    
        var titulo = "Quarto num apartamento T2 só para rapazes";
        return (
            <div>
                <NavBarHome/>
                <Container>
                <Row  className= "mt-3 mb-3">
                    <Col xs={6} md={2}>
                        <Button  size="sm" className= "mr-3 mt-2" variant="info" onClick={() => {history.goBack();}}> <FontAwesomeIcon icon={faArrowLeft}/> Voltar</Button>
                    </Col>
                    <Col xs={6} md={10} >
                        <Form.Group controlId="formCategory1">
                            <Form.Control size="lg" type="text" defaultValue={titulo}/>
                        </Form.Group>
                    </Col>                 
                </Row> 
                
                <Row>
                    <Col xs={12} sm={8} className="imagem">
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
                    </Col>
                    <Col xs={12} sm={4} >
                        <ImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                        >
                            {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                            }) => (
                            // write your building UI
                            <div className="upload__image-wrapper">
                                <Button variant="info" stule={{margin: '2%'}} onClick={onImageUpload}>Adicionar imagem</Button>
                                &nbsp;
                                {/*<button onClick={onImageRemoveAll}>Remove all images</button>*/}
                                {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image['data_url']} alt="" width="100%" />
                                    <div className="image-item__btn-wrapper">
                                    {/*<button onClick={() => onImageUpdate(index)}>Update</button>*/}
                                    <Form className="form"> 
                                        <Form.Group controlId="formCategory1">
                                            <Form.Label>Descrição da foto:</Form.Label>
                                            <Form.Control type="text" defaultValue="Sala de Estar"/>
                                        </Form.Group>
                                        <Button variant="info" size="sm">Adicionar</Button> &nbsp;
                                        <Button variant="info" size="sm" onClick={() => onImageRemove(index)}>Remover</Button>
                                    </Form>
                                        
                                    
                                    </div>
                                </div>
                                ))}
                            </div>
                            )}
                        </ImageUploading>
                    </Col>
                </Row>
                        
                    <Form className="form">   
                        <Form.Row>
                            <Col xs={12} sm={6}>
                            <h3 class="w3-border-top">Informações Importantes </h3>
                            <Form.Group controlId="formCategory1">
                                <Form.Label><FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon> Morada:</Form.Label>
                                <Form.Control type="text" defaultValue={accommodation.streetName,accommodation.city,
                                accommodation.country}/>
                            </Form.Group>
                            <Form.Group controlId="formCategory2">
                                <Form.Label><FontAwesomeIcon icon={faEuroSign} /> Preço:</Form.Label>
                                <Form.Control type="text" defaultValue={accommodation.price} />
                            </Form.Group>
                            <Form.Group controlId="formCategory3">
                                <Form.Label>Estado de ocupação:</Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    checked={"desocupado" === "ocupado"}
                                    type="radio"
                                    label="Ocupado"
                                    name="ocupado"
                                    id="ocupado"
                                    />
                                    <Form.Check
                                    checked={"desocupado"=== "desocupado"}
                                    type="radio"
                                    label="Desocupado"
                                    name="desocupado"
                                    id="desocupado"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formCategory4">
                                <Form.Label>Descrição:</Form.Label>
                                <Form.Control as="textarea" rows={3} defaultValue={accommodation.description}/>
                            </Form.Group>
                            <h3 class="w3-border-top">Requisitos dos inquilinos</h3>
                            <Form.Group controlId="formCategory10">
                                <Form.Label>Faixa Etária:</Form.Label>
                                <Row> 
                                     &nbsp; &nbsp; Dos 	&nbsp;
                                        <RangeSlider
                                            value={ageMin}
                                            onChange={e => setAgeMin(e.target.value)}
                                            min={17}
                                            max={64}
                                            variant='info'
                                        />
                                    	&nbsp; aos 	&nbsp;
                                        <RangeSlider
                                            variant='info'
                                            value={ageMax}
                                            onChange={e => setAgeMax(e.target.value)}
                                            min={18}
                                            max={65}
                                            
                                        />
                                   	&nbsp;  anos
                                </Row>
                        </Form.Group>
                            <Form.Group controlId="formCategory11">
                                <Form.Label>Género preferecial:</Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    checked={"m" === "m"}
                                    type="radio"
                                    label="Masculino"
                                    name="m"
                                    id="m"
                                    />
                                    <Form.Check
                                    checked={"m"=== "f"}
                                    type="radio"
                                    label="Feminino"
                                    name="f"
                                    id="f"
                                    />
                                    <Form.Check
                                    checked={"m"=== "mix"}
                                    type="radio"
                                    label="Misto"
                                    name="mix"
                                    id="mix"
                                    />
                                    <Form.Check
                                    checked={"ind" === "m"}
                                    type="radio"
                                    label="Indiferente"
                                    name="ind"
                                    id="ind"
                                    />                                
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formCategory12">
                                <Form.Label>Permite fumadores?</Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    checked={"simF" === "simF"}
                                    type="radio"
                                    label="Sim"
                                    name="simF"
                                    id="simF"
                                    />
                                    <Form.Check
                                    checked={"simF"=== "naoF"}
                                    type="radio"
                                    label="Não"
                                    name="naoF"
                                    id="naoF"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formCategory13">
                                <Form.Label>Permite animais de estimação?</Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    checked={"simA" === "simA"}
                                    type="radio"
                                    label="Sim"
                                    name="simA"
                                    id="simA"
                                    />
                                    <Form.Check
                                    checked={"simA"=== "naoA"}
                                    type="radio"
                                    label="Não"
                                    name="naoA"
                                    id="naoA"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formCategory14">
                                <Form.Label>Outras informações complementares:</Form.Label>
                                <Form.Control as="textarea" rows={2} defaultValue=""/>
                            </Form.Group>
                            
                        </Col>
                        <Col xs={12} sm={6}>
                            <h3 class="w3-border-top">Informações sobre o Alojamento</h3>
                            <Form.Group controlId="formCategory4">
                                <Form.Label><FontAwesomeIcon icon={faBed} /> Nº de quartos:</Form.Label>
                                <Form.Control type="number" defaultValue="2"/>
                            </Form.Group>
                            <Form.Group controlId="formCategory5">
                                <Form.Label><FontAwesomeIcon icon={faBath} /> Nº de casas de banho:</Form.Label>
                                <Form.Control type="number" defaultValue="2" />
                            </Form.Group>
                            <Form.Group controlId="formCategory6">
                                <Form.Label>Área: </Form.Label>
                                <Form.Control type="text" defaultValue="100m<sup>2</sup>"/>
                            </Form.Group>
                            <Form.Group controlId="formCategory7">
                                <Form.Label><FontAwesomeIcon icon={faSun} /> Orientação solar do quarto:</Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    checked={"n" === "n"}
                                    type="radio"
                                    label="Norte (N)"
                                    name="n"
                                    id="ne"
                                    />
                                    <Form.Check
                                    checked={"n"=== "ne"}
                                    type="radio"
                                    label="Nordeste (NE)"
                                    name="ne"
                                    id="ne"
                                    />
                                    <Form.Check
                                    checked={"n"=== "e"}
                                    type="radio"
                                    label="Este (E)"
                                    name="e"
                                    id="e"
                                    />
                                    <Form.Check
                                    checked={"n" === "se"}
                                    type="radio"
                                    label="Sudeste (SE)"
                                    name="se"
                                    id="se"
                                    />
                                    <Form.Check
                                    checked={"n"=== "s"}
                                    type="radio"
                                    label="Sul (S)"
                                    name="s"
                                    id="s"
                                    />
                                    <Form.Check
                                    checked={"n"=== "so"}
                                    type="radio"
                                    label="Sudoeste (SO)"
                                    name="so"
                                    id="so"
                                    />
                                    <Form.Check
                                    checked={"n"=== "o"}
                                    type="radio"
                                    label="Oeste (O) "
                                    name="o"
                                    id="o"
                                    />
                                    <Form.Check
                                    checked={"n"=== "no"}
                                    type="radio"
                                    label="Noroeste (NO)"
                                    name="no"
                                    id="no"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formCategory8">
                                <Form.Label><FontAwesomeIcon icon={faWifi} /> Acesso à Internet:</Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    checked={"existe" === "existe"}
                                    type="radio"
                                    label="Existe"
                                    name="existe"
                                    id="existe"
                                    />
                                    <Form.Check
                                    checked={"existe"=== "naoExiste"}
                                    type="radio"
                                    label="Não existe"
                                    name="naoExiste"
                                    id="naoExiste"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formCategory9">
                                <Form.Label><FontAwesomeIcon icon={faBroom} /> Limpeza:</Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    checked={"propria" === "propria"}
                                    type="radio"
                                    label="Cada um faz a sua própria"
                                    name="propria"
                                    id="propria"
                                    />
                                    <Form.Check
                                    checked={"propria"=== "profissionais"}
                                    type="radio"
                                    label="É feita por profissionais"
                                    name="profissionais"
                                    id="profissionais"
                                    />
                                </Col>
                            </Form.Group>
                            
                            
                           {/* <Form.Group controlId="formCategory15">
                                    <Form.Control type="file" name="profileImage" onChange={this.changeProfileImage}/>
                            </Form.Group>
                           */}
                           </Col>
                         </Form.Row>
                         <Button variant="info">Guardar alterações</Button>
                    </Form>

                    
                </Container>
            </div>
        )
}

  export default ProfileAccommodationEditable;