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
import {faArrowLeft, faStar, faMapMarkerAlt, faMapMarkedAlt, faSearchLocation, faEuroSign, faHome, faBed, faBath, faSun, faWifi, faBroom, faPeopleArrows,  faMars, faVenus,faVenusMars, faNeuter, faSmoking, faPaw, faPlus} from '@fortawesome/free-solid-svg-icons'
//const axios = require('axios');
import ImageUploading from 'react-images-uploading';
import RangeSlider from 'react-bootstrap-range-slider';
import { Typeahead } from 'react-bootstrap-typeahead';
import localizacoes from '../RegisterAccommodation/localizacoes.js';

function ProfileAccommodationEditable () {
    const  history = useHistory();
    let { id } = useParams();
    
    const [title, setTitle] = useState('');
    const [content, setContent] =  useState('');
    const [adress, setAdress] = useState('');
    const [price, setPrice] = useState('');
    const [accommodationType, setAccommodationType] = useState('');
    const [nRooms, setNrooms] = useState('');
    const [nWC, setNWC] = useState('');
    const [area, setArea] = useState('');
    const [solar, setSolar] = useState('');
    const [wifi, setWifi] = useState('');
    const [cleaning, setClean] = useState('');
    const [gender, setGender] = useState('');
    const [smoker, setSmoker] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [pet, setPet] = useState('');
    const [ ageMin, setAgeMin ] = useState(17);
    const [ ageMax, setAgeMax ] = useState(65);

    const [localizacao, setLocalizacao] = useState('');
    const [caract, setCaract] = useState([]); //Lista de caracteristicas complementares
    const [feature, setFeature] = useState([]);
   

    useEffect(() => {
        api.get('api/accommodations/'+id).then(response => {
            setTitle(response.data.aboutAccommodation.name)
            setContent(response.data.aboutAccommodation.description)
            setAdress(response.data.aboutAccommodation.address)
            setPrice(response.data.aboutAccommodation.price)
            setLat(response.data.aboutAccommodation.latitude)
            setLng(response.data.aboutAccommodation.longitude)
            setLocalizacao(response.data.aboutAccommodation.location) 

            setAccommodationType(response.data.aboutAccommodation.info.accommodationType)
            setNrooms(response.data.aboutAccommodation.info.rooms)
            setNWC(response.data.aboutAccommodation.info.bathRooms)
            setArea(response.data.aboutAccommodation.info.area)
            setSolar(response.data.aboutAccommodation.info.solar)
            setWifi(response.data.aboutAccommodation.info.wifi)
            setClean(response.data.aboutAccommodation.info.clean)

            setAgeMin(response.data.aboutAccommodation.requirements.ageRangeBot)
            setAgeMax(response.data.aboutAccommodation.requirements.ageRangeTop)
            setGender(response.data.aboutAccommodation.requirements.gender)
            setSmoker(response.data.aboutAccommodation.requirements.smoker)
            setPet(response.data.aboutAccommodation.requirements.pets)

            setCaract(response.data.aboutAccommodation.feature);
        }).catch(err => {
          alert(err)
        })
        api.get('api/accommodations/feature').then(response => {
            setFeature(response.data.data);            
        }).catch(err => {
          alert(err)
        })

        api.get('api/accommodations/'+ id + '/showFeatures').then(responseFeatures => {
            // you must define a default operation
            console.log(responseFeatures.data.length)
            let featuresArray = [];
            if(responseFeatures.data.length > 0){
                for(let i = 0; i < responseFeatures.data.length; i++ ){
                    featuresArray.push(responseFeatures.data[i].name);
                }
                setCaract(featuresArray);
            }
        }).catch(err => {
          alert(err)
        })

      }, []);

    let [ errors, setErrors ] = useState({});
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
                            <Form.Control size="lg" type="text" defaultValue={title}/>
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
                            <Form.Group controlId="formCategory0">
                                <Form.Label><FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon> Morada:</Form.Label>
                                <Form.Control type="text" defaultValue={adress}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicSolar" >
                            <Form.Label><FontAwesomeIcon icon={faMapMarkedAlt} /> Localização:</Form.Label>
                                <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="name"
                                    onChange={setLocalizacao}
                                    options={localizacoes}
                                    placeholder={localizacao}
                                    selected={localizacao}
                                />
                            </Form.Group>

                            <Form.Group controlId="formCategory2">
                                <Form.Label><FontAwesomeIcon icon={faEuroSign} /> Preço/mês:</Form.Label>
                                <Form.Control type="text" defaultValue={price} />
                            </Form.Group>
                            {/*<Form.Group controlId="formCategory3">
                                <Form.Label>Estado de ocupação:</Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    checked={accommodation.available === false}
                                    type="radio"
                                    label="Ocupado"
                                    name="ocupado"
                                    id="ocupado"
                                    />
                                    <Form.Check
                                    checked={accommodation.available === true}
                                    type="radio"
                                    label="Desocupado"
                                    name="desocupado"
                                    id="desocupado"
                                    />
                                </Col>
                                </Form.Group> */}
                            <Form.Group controlId="formCategory4">
                                <Form.Label>Descrição:</Form.Label>
                                <Form.Control as="textarea" rows={3} defaultValue={content}/>
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
                            <Form.Group controlId="formBasicGender">
                                <Form.Label>Género:</Form.Label>
                                <Form.Control required isInvalid={errors.gender} as="select" type="gender" value={gender} onChange={e => setGender(e.target.value)}>
                                <option>Selecione um opção</option>
                                <option value="Masculino"> Masculino </option>
                                <option value="Feminino"> Feminino </option>
                                <option value="Misto"> Misto </option>
                                <option value="Indiferente"> Indiferente </option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicSmoker">
                                <Form.Label><FontAwesomeIcon icon={faSmoking} /> Permite fumadores?</Form.Label>
                                <Form.Control required isInvalid={errors.smoker} as="select" type="type" value={smoker} onChange={e => setSmoker(e.target.value)}>
                                <option>Selecione um opção</option>
                                <option value="1"> Sim </option>
                                <option value="0"> Não </option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Indique se permite fumadores!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formBasicPet">
                                <Form.Label><FontAwesomeIcon icon={faPaw} /> Permite animais de estimação?</Form.Label>
                                <Form.Control required isInvalid={errors.pet} as="select" type="type" value={pet} onChange={e => setPet(e.target.value)} custom>
                                <option >Selecione um opção</option>
                                <option value="1"> Sim </option>
                                <option value="0"> Não </option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Indique se permite animais de estimação!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formCategory14">
                                <Form.Label><FontAwesomeIcon icon={faPlus} /> Outras características complementares:</Form.Label>
                                <Typeahead
                                    id="basic-typeahead-multiple"
                                    labelKey="name"
                                    multiple
                                    onChange={setCaract}
                                    options={feature}
                                    placeholder="Escolha características complementares..."
                                    selected={caract}
                                />
                            </Form.Group>
                            
                        </Col>
                        <Col xs={12} sm={6}>
                            <h3 class="w3-border-top">Informações sobre o Alojamento</h3>
                            <Form.Group controlId="formBasicSolar" >
                                <Form.Label><FontAwesomeIcon icon={faHome} /> Tipo de Alojamento:</Form.Label>
                                <Form.Control required isInvalid={errors.accommodationType} as="select" type="solar" value={accommodationType} onChange={e => setAccommodationType(e.target.value)} >
                                <option>Selecione um opção</option>
                                <option value="Apartamento" >Apartamento </option>
                                <option value="Quarto">Quarto </option>
                                <option value="Moradia">Moradia </option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Escolha o tipo de alojamento!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formBasicRoom">
                                <Form.Label><FontAwesomeIcon icon={faBed}  /> Nº de quartos:</Form.Label>
                                <Form.Control required isInvalid={errors.nRooms}  width="sm" type="number"  value={nRooms} onChange={e => setNrooms(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Insira o nº de quartos!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formBasicWC">
                                <Form.Label><FontAwesomeIcon icon={faBath} /> Nº de casas de banho:</Form.Label>
                                <Form.Control required isInvalid={errors.nWC} width="sm" type="number" value={nWC} onChange={e => setNWC(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    Insira o nº de casas de banho!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formBasicArea" >
                                <Form.Label>Área:</Form.Label>
                                <Form.Control required isInvalid={errors.area} width="sm" type="textarea" value={area} onChange={e => setArea(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Insira a área!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formBasicSolar" >
                                <Form.Label><FontAwesomeIcon icon={faSun} /> Orientação solar:</Form.Label>
                                <Form.Control required isInvalid={errors.solar} as="select" type="solar" value={solar} onChange={e => setSolar(e.target.value)}>
                                <option>Selecione um opção</option>
                                <option value="N" >Norte (N)</option>
                                <option value="NE">Nordeste (NE)</option>
                                <option value="E">Este (E)</option>
                                <option value="SE">Sudeste (SE)</option>
                                <option value="S">Sul (S)</option>
                                <option value="SO">Sudoeste (SO)</option>
                                <option value="O">Oeste (O)</option>
                                <option value="NO">Noroeste (NO)</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Insira a orientação solar!
                                </Form.Control.Feedback>
                            </Form.Group>  

                            <Form.Group controlId="formBasicWifi">
                                <Form.Label><FontAwesomeIcon icon={faWifi} /> Acesso à Internet:</Form.Label>
                                <Form.Control required isInvalid={errors.wifi} as="select" type="wifi" value={wifi} onChange={e => setWifi(e.target.value)}>
                                <option>Selecione um opção</option>
                                <option value="1">Existe</option>
                                <option value="0">Não existe</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Imdique se existe internet!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formBasicClean">
                                <Form.Label><FontAwesomeIcon icon={faBroom} /> Limpeza:</Form.Label>
                                <Form.Control required isInvalid={errors.cleaning} as="select" type="cleaning" value={cleaning} onChange={e => setClean(e.target.value)}>
                                <option>Selecione um opção</option>
                                <option value="1">Cada um faz a sua própria</option>
                                <option value="0">É feita por profissionais</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Indique como é a limpeza!
                                </Form.Control.Feedback>
                            </Form.Group>
                                                
                            {/*<Form.Group controlId="formCategory14" style={{height:"500px"}}>
                                <Form.Label><FontAwesomeIcon icon={faMapMarkerAlt} /> Morada:</Form.Label>
                                <Maps isInvalid={errors.adress} parentCallback={getData}></Maps>
                                <Form.Control.Feedback type="invalid">
                                    Insira uma morada!
                                </Form.Control.Feedback>
                            </Form.Group> */}

                            
                            
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