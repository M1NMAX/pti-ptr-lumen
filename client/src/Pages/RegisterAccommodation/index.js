import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.css'
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css'
import DefaultHome from "../../img/standartHome.png"
import NavBarHome from '../../Components/NavBarHome'
import { Container,Row,Col,Form,Button} from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMapMarkerAlt, faSearchLocation, faMapMarkedAlt, faEuroSign,faHome, faBed, faBath, faSun, faWifi, faBroom, faPeopleArrows,  faMars, faVenus,faVenusMars, faNeuter, faSmoking, faPaw, faPlus, faArrowLeft, faTemperatureLow} from '@fortawesome/free-solid-svg-icons'
import Footer from '../../Components/Footer'
import { Typeahead } from 'react-bootstrap-typeahead';
import localizacoes from './localizacoes.js';
import AutoComplete from '../../Components/AutoComplete';
import Maps from '../../Components/MapsRegister';
import 'react-bootstrap-typeahead/css/Typeahead.css';

function RegisterAlojamento() {
    const [userId] = useState(localStorage.getItem('userID'));
    const [token] = useState(localStorage.getItem('token'));
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
    const [localizacao, setLocalizacao] = useState([]);
    const [caract, setCaract] = useState([]); //Lista de caracteristicas complementares
    // After the register is concluded
    const [ showLink, setShowLink] = useState(false);
    const [ newAccommodationId, setNewAccommodationId] = useState('');


    const  history = useHistory();
    const [feature, setFeature] = useState([]);
    
    const [validated, setValidated] = useState(false);
    let [ errors, setErrors ] = useState({});

    const findFormErrors = () => {
        
        let newErrors = {}
        // name errors
        if ( !title || title === '' ) {newErrors.title = ''}
        if ( !content || content === '' ) {newErrors.content = ''}
        if ( !adress || adress === '' ) {newErrors.adress = ''}
        if ( !price || price === '' ) {newErrors.price = ''}
        if ( !nRooms || nRooms === '' ) {newErrors.nRooms = ''}
        if ( !nWC || nWC === '' ) {newErrors.nWC = ''}
        if ( !area || area === '' ) {newErrors.area = ''}
        if ( !solar || solar === '' ) {newErrors.solar = ''}
        if ( !wifi || wifi === '' ) {newErrors.wifi = ''}
        if ( !cleaning || cleaning === '' ) {newErrors.cleaning = ''}
        if ( !gender || gender === '' ) {newErrors.gender = ''}
        if ( !smoker || smoker === '' ) {newErrors.smoker = ''}
        if ( !pet || pet === '' ) {newErrors.pet = ''}
        if ( !accommodationType || accommodationType === '' ) {newErrors.accommodationType = ''}
        
        return newErrors
    }

    useEffect(() => {
        api.get('api/accommodations/feature').then(response => {
            setFeature(response.data.data);            
        }).catch(err => {
          alert(err)
        })
    }, []);

    async function handleRegisterAlojamento(e) {
        e.preventDefault();
        //Verificar se os campos estão preenchidos
        let newErrors = findFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
            setErrors(newErrors);
        };
        console.log(errors);
        //Transformar as caracteristicas numa string estilo 'id1,id2,id3,'
        console.log(caract)
        let caractList = Object.keys(caract)
        let caractIds = ""    
        for(let i = 0; i < caractList.length;i++){
            caractIds+= caract[caractList[i]].id + ","
        }
        //console.log(caractIds)
        let data = {
            "landlord_id": userId,
            "name": title,
            "description" :content, 
            "price": price,
            "address": adress,
            "county": localizacao[0],
            "district": 'None',
            "latitude": lat,
            "longitude": lng,
            "rooms": nRooms,
            "bathRooms" : nWC,
            "accommodationType": accommodationType, 
            "area":area,
            "solar":solar, 
            "wifi": wifi,
            "clean":cleaning,
            "ageRangeBot": ageMin,
            "ageRangeTop": ageMax,
            "gender": gender,
            "smoker": smoker,
            "pets":pet,
            "features":caractIds,
        };

        console.log(data);
        
        if(token ==null || token ===''){
            alert('Não estas autenticado');
        }else{
            
            api.post('api/accommodations/', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(response => { 
                if(response.data.status){
                    alert(true);
                    setShowLink(true);
                    window.scrollTo(0, 0);
                    setNewAccommodationId(response.data.newAccommodationId);
                    //history.push('/dashboard');
                }else{
                    alert(response.data);    
                }
            }).catch(err => {
            alert(err)
             })
        }
    } 

    async function getData(data) {
        console.log(data[0])
        console.log(data[1].lat)
        console.log(data[1].lng)
        setAdress(data[0])
        setLat(data[1].lat);
        setLng(data[1].lng);

    }
    
    return (
        <div>

            <NavBarHome/>
            <Container>
            <Row  className= "mt-3 mb-3">
                <Col xs={6} md={4}>
                    <Button  size="sm" className= "mr-3 mt-2" variant="info" onClick={() => {history.goBack();}} >  <FontAwesomeIcon icon={faArrowLeft}/> Voltar</Button>
                </Col>
                <Col xs={6} md={4} className='text-center'><h1>Novo Alojamento</h1> </Col>                 
            </Row> 
            {showLink && <Row  className= "mt-3 mb-3">
                <Button href={'/profileAccommodation/'+newAccommodationId}>Ver a página do alojamentos</Button>                 
            </Row> }    
            <Form  noValidate validated={validated} onSubmit={handleRegisterAlojamento} >
                <Form.Row>
                    <Col className="cols" xs={12} sm={6}>
                        <Row>
                            <img className="image" src={DefaultHome}  alt="Standart image" />
                        </Row>
                        <Row>
                            <Button className="addImage" variant="info">Adicionar imagem</Button>
                        </Row>
                    </Col>
                    <Col className="cols" xs={12} sm={6}>
                        <Form.Group controlId="formBasicTitle" >
                            <Form.Label as="h4" >Título</Form.Label>
                            <Form.Control size="lg" isInvalid={!!errors.title} width="sm" type="textarea" placeholder="Apartamento T3 em Lisboa " value={title} onChange={e => setTitle(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Insira um título apelativo!
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group controlId="formCategory4">
                            <Form.Label>Descrição:</Form.Label>
                            <Form.Control required isInvalid={!!errors.content} as="textarea" rows={3} value={content} onChange={e => setContent(e.target.value)} />
                            <Form.Text className="text-muted">
                                Informe se as pessoas vão partilhar o alojamento com alguém. Quanto mais descritivo for melhor!
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Insira uma descrição!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicSolar" >
                            <Form.Label><FontAwesomeIcon icon={faMapMarkedAlt} /> Localização</Form.Label>
                            <Typeahead 
                                id="basic-typeahead-single"
                                labelKey="name"
                                onChange={setLocalizacao}
                                options={localizacoes}
                                placeholder="Escolha uma localização..."
                                selected={localizacao}
                            />
                            <Form.Control.Feedback type="invalid">
                                Escolha a localização!
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPrice" >
                            <Form.Label><FontAwesomeIcon icon={faEuroSign} /> Preço/mês</Form.Label>
                            <Form.Control required isInvalid={!!errors.price} width="sm" type="number" value={price} onChange={e => setPrice(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Não se esqueça de inserir o preço!
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* <Form.Group controlId="formBasicOccupation">
                            <Form.Label>Estado de ocupação:</Form.Label>
                            <Form.Control required as="select" type="occupationState" value={occupationState} onChange={e => setOccupation(e.target.value)}>
                            <option className="ocupado">Ocupado</option>
                            <option className="desocupado">Desocupado</option>
                        </Form.Control>
                        </Form.Group> */}
                    </Col>
                </Form.Row>
                <Form.Row className="bottonRow">
                    <Col className="cols" xs={12} sm={6}>
                        <h3 class="w3-border-top">Informações sobre o Alojamento</h3>

                        <Form.Group controlId="formBasicSolar" >
                            <Form.Label><FontAwesomeIcon icon={faHome} /> Tipo de Alojamento:</Form.Label>
                            <Form.Control required isInvalid={!!errors.accommodationType} as="select" type="solar" value={accommodationType} onChange={e => setAccommodationType(e.target.value)} >
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
                            <Form.Control required isInvalid={!!errors.nRooms}  width="sm" type="number"  value={nRooms} onChange={e => setNrooms(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Insira o nº de quartos!
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicWC">
                            <Form.Label><FontAwesomeIcon icon={faBath} /> Nº de casas de banho:</Form.Label>
                            <Form.Control required isInvalid={!!errors.nWC} width="sm" type="number" value={nWC} onChange={e => setNWC(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Insira o nº de casas de banho!
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicArea" >
                            <Form.Label>Área:</Form.Label>
                            <Form.Control required isInvalid={!!errors.area} width="sm" type="textarea" value={area} onChange={e => setArea(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Insira a área!
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicSolar" >
                            <Form.Label><FontAwesomeIcon icon={faSun} /> Orientação solar:</Form.Label>
                            <Form.Control required isInvalid={!!errors.solar} as="select" type="solar" value={solar} onChange={e => setSolar(e.target.value)}>
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
                            <Form.Control required isInvalid={!!errors.wifi} as="select" type="wifi" value={wifi} onChange={e => setWifi(e.target.value)}>
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
                            <Form.Control required isInvalid={!!errors.cleaning} as="select" type="cleaning" value={cleaning} onChange={e => setClean(e.target.value)}>
                            <option>Selecione um opção</option>
                            <option value="1">Cada um faz a sua própria</option>
                            <option value="0">É feita por profissionais</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Indique como é a limpeza!
                            </Form.Control.Feedback>
                        </Form.Group>
                                                
                        <Form.Group controlId="formCategory14" style={{height:"500px"}}>
                            <Form.Label><FontAwesomeIcon icon={faMapMarkerAlt} /> Morada:</Form.Label>
                            <Maps parentCallback={getData}></Maps>
                        </Form.Group> 
                    </Col>
                    <Col className="cols" xs={12} sm={6}>
                        <h3 class="w3-border-top">Requisitos dos inquilinos</h3>

                        <Form.Group controlId="formBasicAge" >
                            <Form.Label><FontAwesomeIcon icon={faPeopleArrows} />  Faixa Etária:</Form.Label>
                                <Row> 
                                &nbsp; &nbsp; Dos 	&nbsp;
                                    <RangeSlider value={ageMin} onChange={e => setAgeMin(e.target.value)} min={17} max={64} variant='info'/>
                                    &nbsp; aos 	&nbsp;
                                    <RangeSlider value={ageMax} onChange={e => setAgeMax(e.target.value)} min={18} max={65} variant='info'/>
                                	&nbsp;  anos
                                </Row>
                        </Form.Group>
                        
                        <Form.Group controlId="formBasicGender">
                            <Form.Label>Género:</Form.Label>
                            <Form.Control required isInvalid={!!errors.gender} as="select" type="gender" value={gender} onChange={e => setGender(e.target.value)}>
                            <option>Selecione um opção</option>
                            <option value="Masculino"> Masculino </option>
                            <option value="Feminino"> Feminino </option>
                            <option value="Misto"> Misto </option>
                            <option value="Indiferente"> Indiferente </option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Insira o género!
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicSmoker">
                            <Form.Label><FontAwesomeIcon icon={faSmoking} /> Permite fumadores?</Form.Label>
                            <Form.Control required isInvalid={!!errors.smoker} as="select" type="type" value={smoker} onChange={e => setSmoker(e.target.value)}>
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
                            <Form.Control required isInvalid={!!errors.pet} as="select" type="type" value={pet} onChange={e => setPet(e.target.value)} custom>
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
                                labelKey={"name"}
                                
                                multiple
                                onChange={setCaract}
                                options={feature}
                                placeholder="Escolha características complementares..."
                                selected={caract}
                            />
                        </Form.Group>
                    </Col>
                    
                </Form.Row>
                
                <Button variant="info" type="submit" className="button">
                    Submeter
                </Button>
                {validated && <p>Preencha todos os campos para o podermos ajudar durante o processo de pesquisa!</p>}
            </Form>
            </Container>
            <Footer/>
        </div>
    )
}

export default RegisterAlojamento
