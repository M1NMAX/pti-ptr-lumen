import React, { useState, useEffect } from "react";
import NavBarHome from '../../Components/NavBarHome'
import {Container, Card, Form, Button,Row,Col} from 'react-bootstrap'
import Footer from '../../Components/Footer'
import {useParams, useHistory} from 'react-router-dom';
import api from '../../services/api';
import Accommodations from '../../Components/Accommodation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { Typeahead } from 'react-bootstrap-typeahead';
import localizacoes from '../RegisterAccommodation/localizacoes.js';

function Search() {
    let { location } = useParams();
    const [Accmmodations, setAcommodations] = useState([]);
    console.log(location)
    
    const [localizacao, setLocalizacao] = useState([]);
    const [accommodationType, setAccommodationType] = useState('');
    const [wifi, setWifi] = useState('');
    const [cleaning, setClean] = useState('');
    const [smoker, setSmoker] = useState('');
    const [pet, setPet] = useState('');
    const [ priceMin, setPriceMin ] = useState('');
    const [ priceMax, setPriceMax ] = useState('');
   // setLocalizacao(location);
    const history = useHistory();
    const [caract, setCaract] = useState([]); //Lista de caracteristicas complementares
    const [feature, setFeature] = useState([]);


    useEffect(() => {
        api.get('api/accommodations').then(response => {
            console.log(response.data)
            setAcommodations(response.data);
            console.log(response.data.length);
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
        console.log(cleaning);
        console.log(smoker);
        /*e.preventDefault();
        let data = {
            "price": priceMin,
            "price": priceMax,
            "county": localizacao[0],
            "accommodationType": accommodationType, 
            "wifi": wifi,
            "clean":cleaning,
            "smoker": smoker,
            "pets":pet,
            "feature_id":caract,
        };

        console.log(data);
            
        api.post('api/accommodations/', data, {
            headers: {
                //Authorization: `Bearer ${token}`,
            }
        }).then(response => { 
            if(response.data.status){
                 alert(true);
                window.scrollTo(0, 0);
            }else{
                alert(response.data);    
            }
         }).catch(err => {
            alert(err)
        })*/
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
                            <Button variant="info" type="submit" className="button">
                                Mostrar Alojamentos
                            </Button>
                        </Form>
                    </Col>
                    <Col lg={10} sm={12}>
                        <h2 style={{textAlign:"center"}}>Alojamentos</h2>
                        <Container fluid>
                            <Accommodations accom={Accmmodations} />   
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Footer></Footer>
        </div>
    )
}

export default Search
