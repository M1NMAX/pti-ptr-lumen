import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import api from '../../services/api';
import {useHistory} from 'react-router-dom';
import { Container,Row,Col,Form ,Button, Carousel, FormLabel} from 'react-bootstrap'
//import {connect} from 'react-redux';
import DefaultRoomPic1 from "../../img/basicRoom.png"
import DefaultRoomPic2 from "../../img/basicWC.png"
import DefaultRoomPic3 from "../../img/basicKitchen.jpg"
import NavBarHome from '../../Components/NavBarHome'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faStar, faMapMarkerAlt, faMapMarkedAlt, faSearchLocation, faEuroSign, faBed, faBath, faSun, faWifi, faBroom, faPeopleArrows,  faMars, faVenus,faVenusMars, faNeuter, faSmoking, faPaw, faPlus} from '@fortawesome/free-solid-svg-icons'
//const axios = require('axios');
import ImageUploading from 'react-images-uploading';
import RangeSlider from 'react-bootstrap-range-slider';
import { Typeahead } from 'react-bootstrap-typeahead';
import localizacoes from '../RegisterAccommodation/localizacoes.js';

function ProfileAccommodationEditable () {
    const  history = useHistory();
    let { id } = useParams();
    
    const [localizacao, setLocalizacao] = useState([]);
    const [caract, setCaract] = useState([]); //Lista de caracteristicas complementares
    const [feature, setFeature] = useState([]);

    const [accommodation, setaccommodation] = useState([]);
    const [accommodationFeature, setaccommodationFeature] = useState([]);
    const [accommodationInfo, setaccommodationInfo] = useState([]);
    const [accommodationRequirements, setaccommodationRequirements] = useState([]);


    const [userId] = useState(localStorage.getItem('userID'));
    const [token] = useState(localStorage.getItem('token'));
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const [content, setContent] =  useState('');
   
    const [accommodationType, setAccommodationType] = useState('');
    // const [nRooms, setNrooms] = useState('');
    // const [nWC, setNWC] = useState('');
    // const [area, setArea] = useState('');
    // const [solar, setSolar] = useState('');
    // const [wifi, setWifi] = useState('');
    // const [cleaning, setClean] = useState('');
    // const [gender, setGender] = useState('');
    // const [smoker, setSmoker] = useState('');
    // const [lat, setLat] = useState('');
    // const [lng, setLng] = useState('');
    // const [pet, setPet] = useState('');
    // const [ ageMin, setAgeMin ] = useState(17);
    // const [ ageMax, setAgeMax ] = useState(65);
    // const [localizacao, setLocalizacao] = useState([]);
    // const [caract, setCaract] = useState([]);


    const [ ageMin, setAgeMin ] = useState();
    const [ ageMax, setAgeMax ] = useState();

    const [images, setImages] = useState([]);
    const maxNumber = 69;
   

    useEffect(() => {
        api.get('api/accommodations/'+id).then(response => {
            setTitle(response.data.aboutAccommodation.name);
            setAddress(response.data.aboutAccommodation.address);
            setPrice(response.data.aboutAccommodation.price);
            setContent(response.data.aboutAccommodation.description);
            setAgeMin(response.data.aboutAccommodation.requirements.ageRangeBot);
            setAgeMax(response.data.aboutAccommodation.requirements.ageRangeTop);

            setAccommodationType(response.data.aboutAccommodation.info.accommodationType);
            console.log(response.data);
            setaccommodation(response.data.aboutAccommodation);
            setaccommodationFeature(response.data.aboutAccommodation.feature);
            setaccommodationInfo(response.data.aboutAccommodation.info);
            setaccommodationRequirements(response.data.aboutAccommodation.requirements);
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
            // console.log(responseFeatures.data.length)
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

    
 
    const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    };

    async function handleUpdateAcccommodation(e){
        e.preventDefault();
        // let data = {
        //     "name": title,
        //     "description" :content, 
        //     "price": price,
        //     "address": adress,
        //     "location": localizacao[0],
        //     "district": 'None',
        //     "latitude": lat,
        //     "longitude": lng,
        //     "rooms": nRooms,
        //     "bathRooms" : nWC,
        //     "accommodationType": accommodationType, 
        //     "area":area,
        //     "solar":solar, 
        //     "wifi": wifi,
        //     "clean":cleaning,
        //     "ageRangeBot": ageMin,
        //     "ageRangeTop": ageMax,
        //     "gender": gender,
        //     "smoker": smoker,
        //     "pets":pet,
        //     "features":caractIds,
        // };
        // console.log(data);
        console.log('UMA');
        
    }

        
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
                       <h2>Edição do alojamento {accommodation.name}</h2> 
                        {/* <Form.Group controlId="formCategory1">
                            <Form.Control size="lg" type="text" defaultValue={accommodation.name}/>
                        </Form.Group> */}
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
                        
                    <Form className="form" onSubmit={handleUpdateAcccommodation}>  
                        <Form.Group controlId="formCategory1">
                            <Form.Label>Nome do alojamento</Form.Label>
                            <Form.Control size="lg" type="text"  value={title} onChange={e => setTitle(e.target.value)}/>
                        </Form.Group>
                        <Form.Row>
                            <Col xs={12} sm={6}>
                            <h3 class="w3-border-top">Informações Importantes </h3>
                            <Form.Group controlId="formCategory0">
                                <Form.Label><FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon> Morada:</Form.Label>
                                <Form.Control type="text" value={address} onChange={e => setAddress(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicSolar" >
                            <Form.Label><FontAwesomeIcon icon={faMapMarkedAlt} /> Localização:</Form.Label>
                                <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="name"
                                    onChange={setLocalizacao}
                                    options={localizacoes}
                                    placeholder={accommodation.county}
                                    selected={localizacao}
                                />
                            </Form.Group>

                            <Form.Group controlId="formCategory2">
                                <Form.Label><FontAwesomeIcon icon={faEuroSign} /> Preço/mês:</Form.Label>
                                <Form.Control type="text" value={price} onChange={e => setPrice(e.target.value)} />
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
                                <Form.Control as="textarea" rows={3} value={content} onChange={e => setContent(e.target.value)}/>
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
                                            min={ageMin}
                                            max={65}
                                            
                                        />
                                   	&nbsp;  anos
                                </Row>
                        </Form.Group>
                            <Form.Group controlId="formCategory11">
                                <Form.Label>Género preferecial:</Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    checked={accommodationRequirements.gender === "Masculino"}
                                    type="radio"
                                    label="Masculino"
                                    name="m"
                                    id="m"
                                    />
                                    <Form.Check
                                    checked={ accommodationRequirements.gender === "Feminino"}
                                    type="radio"
                                    label="Feminino"
                                    name="f"
                                    id="f"
                                    />
                                    <Form.Check
                                    checked={ accommodationRequirements.gender === "Misto"}
                                    type="radio"
                                    label="Misto"
                                    name="mix"
                                    id="mix"
                                    />
                                    <Form.Check
                                    checked={accommodationRequirements.gender === "Indiferente"}
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
                                    checked={accommodationRequirements.smoker === 1}
                                    type="radio"
                                    label="Sim"
                                    name="simF"
                                    id="simF"
                                    />
                                    <Form.Check
                                    checked={accommodationRequirements.smoker === 0}
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
                                    checked={accommodationRequirements.pets === 1}
                                    type="radio"
                                    label="Sim"
                                    name="simA"
                                    id="simA"
                                    />
                                    <Form.Check
                                    checked={accommodationRequirements.pets === 0}
                                    type="radio"
                                    label="Não"
                                    name="naoA"
                                    id="naoA"
                                    />
                                </Col>
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
                            <Form.Group controlId="formCategoryType">
                                <Form.Label>Tipo de Alojamento:</Form.Label>
                                <Form.Control  as="select" type="solar" value={accommodationType} onChange={e => setAccommodationType(e.target.value)} >
                            <option>Selecione um opção</option>
                            <option value="Apartamento" >Apartamento </option>
                            <option value="Quarto">Quarto </option>
                            <option value="Moradia">Moradia </option>
                            </Form.Control>
                                {/* <Col sm={10}>
                                    <Form.Check
                                    checked={accommodationInfo.accommodationType === "Quarto"}
                                    type="radio"
                                    label="Quarto"
                                    name="Quarto"
                                    id="Quarto"
                                    />
                                    <Form.Check
                                    checked={accommodationInfo.accommodationType === "Apartamento"}
                                    type="radio"
                                    label="Apartamento"
                                    name="Apartamento"
                                    id="Apartamento"
                                    />
                                    <Form.Check
                                    checked={accommodationInfo.accommodationType === "Moradia"}
                                    type="radio"
                                    label="Moradia"
                                    name="Moradia"
                                    id="Moradia"
                                    />
                                </Col> */}
                            </Form.Group>
                            <Form.Group controlId="formCategoryRooms">
                                <Form.Label><FontAwesomeIcon icon={faBed} /> Nº de quartos:</Form.Label>
                                <Form.Control type="number" defaultValue={accommodationInfo.rooms}/>
                            </Form.Group>
                            <Form.Group controlId="formCategoryBaths">
                                <Form.Label><FontAwesomeIcon icon={faBath} /> Nº de casas de banho:</Form.Label>
                                <Form.Control type="number" defaultValue={accommodationInfo.bathRooms} />
                            </Form.Group>
                            <Form.Group controlId="formCategoryArea">
                                <Form.Label>Área: </Form.Label>
                                <Form.Control type="text" defaultValue={accommodationInfo.area}/>
                            </Form.Group>
                            <Form.Group controlId="formCategorySolar">
                                <Form.Label><FontAwesomeIcon icon={faSun} /> Orientação solar do quarto:</Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    checked={accommodationInfo.solar === "N"}
                                    type="radio"
                                    label="Norte (N)"
                                    name="n"
                                    id="ne"
                                    />
                                    <Form.Check
                                    checked={accommodationInfo.solar === "NE"}
                                    type="radio"
                                    label="Nordeste (NE)"
                                    name="ne"
                                    id="ne"
                                    />
                                    <Form.Check
                                    checked={accommodationInfo.solar === "E"}
                                    type="radio"
                                    label="Este (E)"
                                    name="e"
                                    id="e"
                                    />
                                    <Form.Check
                                    checked={accommodationInfo.solar === "SE"}
                                    type="radio"
                                    label="Sudeste (SE)"
                                    name="se"
                                    id="se"
                                    />
                                    <Form.Check
                                    checked={accommodationInfo.solar === "S"}
                                    type="radio"
                                    label="Sul (S)"
                                    name="s"
                                    id="s"
                                    />
                                    <Form.Check
                                    checked={accommodationInfo.solar === "SO"}
                                    type="radio"
                                    label="Sudoeste (SO)"
                                    name="so"
                                    id="so"
                                    />
                                    <Form.Check
                                    checked={accommodationInfo.solar === "O"}
                                    type="radio"
                                    label="Oeste (O) "
                                    name="o"
                                    id="o"
                                    />
                                    <Form.Check
                                    checked={accommodationInfo.solar === "NO"}
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
                                    checked={accommodationInfo.wifi === 1}
                                    type="radio"
                                    label="Existe"
                                    name="existe"
                                    id="existe"
                                    />
                                    <Form.Check
                                    checked={accommodationInfo.wifi=== 0}
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
                                    checked={accommodationInfo.clean === 0}
                                    type="radio"
                                    label="Cada um faz a sua própria"
                                    name="propria"
                                    id="propria"
                                    />
                                    <Form.Check
                                    checked={accommodationInfo.clean=== 1}
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