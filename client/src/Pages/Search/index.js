import React, { useState, useEffect } from "react";
import NavBarHome from '../../Components/NavBarHome'
import {Container, Card, Form, Button,Row,Col} from 'react-bootstrap'
import Footer from '../../Components/Footer'
import {useParams, useHistory, useLocation} from 'react-router-dom';
import api from '../../services/api';
import Accommodations from '../../Components/Accommodation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faHome} from '@fortawesome/free-solid-svg-icons'
import { Typeahead } from 'react-bootstrap-typeahead'
import localizacoes from '../RegisterAccommodation/localizacoes.js';

function Search() {
   // let { location } = useParams();
    const [token] = useState(localStorage.getItem('token'));
    const [Accmmodations, setAcommodations] = useState([]);
    
    
    const location = useLocation();
    
    

    const [localizacao, setLocalizacao] = useState(undefined);
    const [accommodationType, setAccommodationType] = useState(undefined);
    const [wifi, setWifi] = useState(undefined);
    const [cleaning, setClean] = useState(undefined);
    const [smoker, setSmoker] = useState(undefined);
    const [pet, setPet] = useState(undefined);
    const [ priceMin, setPriceMin ] = useState(undefined);
    const [ priceMax, setPriceMax ] = useState(undefined);
   // setLocalizacao(location);
    const history = useHistory();
    const [caract, setCaract] = useState([]); //Lista de caracteristicas complementares
    const [feature, setFeature] = useState([]);

    //ACCOMMODATIONS FILTERED
    const[accomFiltered, setAccomFiltered] = useState([]);

    useEffect(() => {
        api.get('api/accommodations/localSearch/' + location.state).then(response => {
            setAccomFiltered(response.data);
        }).catch(err => {
            alert(err)
        })


        api.get('api/accommodations/feature').then(response => {
            setFeature(response.data.data);            
        }).catch(err => {
          alert(err)
        })
    }, []);

    async function handleSearch(e) { 
        e.preventDefault();
        let filters ="";

        //Cacteristicas extra
        let caractList = Object.keys(caract)
        let caractIds = "" 
        if(caractList.length != 0) {
            for(let i = 0; i < caractList.length;i++){
                caractIds+= caract[caractList[i]].id + ","
            }
            filters += caractIds +";";
        }else{
            filters+=";"
        }

        //Cacteristicas principais
        if(wifi != undefined){
            filters += "wifi,";
        }
        if(cleaning != undefined){
            filters += "clean,";
        }
        if(smoker != undefined){
            filters += "smoker,";
        }
        if(pet != undefined){
            filters += "pet,";
        }

        //Localização
        if(localizacao != undefined){
            filters += "location," + localizacao +",";
        }

        //Preços
        if(priceMin != undefined){
            filters += "priceMin," + priceMin +",";
        }
        if(priceMax != undefined){
            filters += "priceMax," + priceMax +",";
        }

        //Tipo de alojamento
        if(accommodationType != undefined){
            filters += "accommodationType," + accommodationType +",";
        }
        console.log("OHHHHHfilters");
        console.log(filters);

        api.get('api/accommodations/filter/' + filters, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => { 
            window.scrollTo(0, 0);
            setAccomFiltered(response.data);
         }).catch(err => {
            alert(err)
        })
    } 

    return (
        <div>
            <NavBarHome></NavBarHome>
            <Container fluid>
                
                <Row>
                    <Col lg={2} sm={12} style={{wordWrap: "break-word"}}>
                        <Button  size="sm" className= "mr-3 mt-2 mb-4" variant="info" onClick={() => {history.goBack();}} >  <FontAwesomeIcon icon={faArrowLeft}/> Voltar</Button>
                        <h4 style={{textAlign:"center"}}>Filtros</h4>
                        <Form onSubmit={handleSearch} >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label><b>Localização:</b></Form.Label>
                                <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="name"
                                    onChange={setLocalizacao}
                                    options={localizacoes}
                                    placeholder="Escolha uma localização..."
                                    selected={localizacao}
                                />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label><b>Preço:</b></Form.Label>
                                <Form.Row>
                                    <Col> <Form.Control width="sm" type="number" min="20" max="950" placeholder="Min" value={priceMin} onChange={e => setPriceMin(e.target.value)}/></Col>
                                    <Col><Form.Control width="sm" type="number" min="30" max="1000" placeholder="Max"value={priceMax} onChange={e => setPriceMax(e.target.value)} /></Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId="formBasicSolar" >
                                <Form.Label><b>Tipo de Alojamento:</b></Form.Label>
                                <Form.Control as="select" type="solar" value={accommodationType} onChange={e => setAccommodationType(e.target.value)}>
                                <option>Selecione um opção</option>
                                <option value="Apartamento" >Apartamento </option>
                                <option value="Quarto">Quarto </option>
                                <option value="Moradia">Moradia </option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Label><b>Caracteríticas:</b></Form.Label>
                                <Form.Check type="checkbox" label="Tem Wifi" onChange={() => setWifi("1")}/>
                                <Form.Check type="checkbox" label="Permite animais de Estimação" onChange={() =>setPet("1")} />
                                <Form.Check type="checkbox" label="Permite fumadores" onChange={() =>setSmoker("1")}/>
                                <Form.Check type="checkbox" label="Tem limpeza incluida" onChange={() =>setClean("0")} />
                                <Typeahead className="pt-2"
                                    id="basic-typeahead-multiple"
                                    labelKey={"name"}
                                    multiple
                                    onChange={setCaract}
                                    options={feature}
                                    placeholder="Escolha características complementares..."
                                    selected={caract}
                                />
                            </Form.Group>
                            <Button className="mb-5" variant="info" type="submit" className="button">
                                Mostrar Alojamentos
                            </Button>
                        </Form>
                    </Col>
                    <Col lg={10} sm={12}>
                        <h2 style={{textAlign:"center"}}>Alojamentos</h2>
                        <Container fluid>    {/*FALTA METER OS ALOJAMENTOS QUE VEEM*/}
                            {accomFiltered.length>0? <Accommodations accom={accomFiltered} />:
                             <h6 className="center mt-5 text-muted"  ><FontAwesomeIcon icon={faHome} />  Não foram encontrados alojamentos com essas caracteríticas</h6>} 
                             
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Footer></Footer>
        </div>
    )
}

export default Search
