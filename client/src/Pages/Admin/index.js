import NavBarAdmin from '../../Components/NavBarAdmin'
import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import AdminSingleAccommodation from '../../Components/AdminSingleAccom'
import {Container, Card,Row,Col, Form, Button, FormControl, Alert} from 'react-bootstrap'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faHome} from '@fortawesome/free-solid-svg-icons'
import { Typeahead } from 'react-bootstrap-typeahead'
import localizacoes from '../RegisterAccommodation/localizacoes.js';

function AdminPage() {
    const [Accommodations, setAccommodations] = useState([]);
    const [token] = useState(localStorage.getItem('token'));

    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState('');

    const history = useHistory();
    const [mgErro, setMgErro] = useState('');
    //Filtros
    const [idSearch, setIdSearch] = useState(undefined);
    const [localizacao, setLocalizacao] = useState(undefined);
    const [accommodationType, setAccommodationType] = useState(undefined);
    const [ priceMin, setPriceMin ] = useState(undefined);
    const [ priceMax, setPriceMax ] = useState(undefined);
    const [caract, setCaract] = useState([]); //Lista de caracteristicas complementares
    const [feature, setFeature] = useState([]);
   
    useEffect(() => {
        api.get('api/accommodations').then(response => {
                console.log(response.data)
                setAccommodations(response.data);
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
        e.preventDefault();
        if(idSearch==undefined){
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

            //Localização
            if(localizacao != undefined){
                const typeLoc = "location," + localizacao +",";
                if(typeLoc.includes('Object')){
                    filters += "location," + localizacao[0].name +",";
                }else{
                    filters += "location," + localizacao +",";
                }
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
            console.log(filters);
            api.get('api/accommodations/filter/' + filters, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(response => { 
                window.scrollTo(0, 0);
                setAccommodations(response.data);
            }).catch(err => {
                alert(err)
            })

            setMgErro( <h6 className="center text-muted"  ><FontAwesomeIcon icon={faHome} />  Não foram encontrados alojamentos com essas caracteríticas</h6>);
        }else{ //É feita pesquisa por id
            setAccommodations(Accommodations.filter((accommodation) => accommodation.id == idSearch ));
            setMgErro( <h6 className="center text-muted"  > Não existe um alojamento com esse Id</h6>);
        }
    }
    async function remove(accommodationId){
       await api.delete('api/accommodations/'+accommodationId, {
            headers: {
                Authentication: `Bearer ${token}`,
            }
          }).then(response => {
            setShowResult(true);
            setResult(<Alert  variant="danger">
                        <hr></hr>
                        <p>Alojamento removido com sucesso!</p>
                    </Alert>)
             window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }).catch(err => {
          alert(err)
        })
        setAccommodations(Accommodations.filter((accommodation) => accommodation.id != accommodationId ));
    }
    
    return(
        <div>
            <NavBarAdmin/>
            <Container fluid>
                <Row  className= "mt-3 mb-3">
                    <Col  xs={{ span: 5, offset: 0 }} md={{ span: 4, offset: 0 }}>
                        <Button  size="sm" className= "mr-3 mt-2" variant="info" onClick={() => {history.goBack();}} >  <FontAwesomeIcon icon={faArrowLeft}/> Voltar</Button>
                    </Col>
                    <Col xs={7} md={4} className='text-center'><h3>Gerir Alojamentos</h3> </Col>                 
                </Row>
                {showResult && result}
                
                <Row>
                    <Col lg={2} sm={12} style={{wordWrap: "break-word"}}>
                        <h4 className="mt-3" style={{textAlign:"center"}}>Filtros</h4>
                        <Form onSubmit={handleSearch} >
                            <Form.Group >
                                <Form.Label><b>Por Id do Alojamento:</b></Form.Label>
                                <Form.Row>
                                    <Col> <Form.Control width="sm" type="number" placeholder="Id" value={idSearch} onChange={e => setIdSearch(e.target.value)}/></Col>
                                    
                                </Form.Row>
                                </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label><b>Localização:</b></Form.Label>
                                <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="name"
                                    onChange={setLocalizacao}
                                    options={localizacoes}
                                    placeholder="Escolha uma localização..."
                                    selected={localizacao}
                                    allowNew
                                    newSelectionPrefix=''
                                    ignoreDiacritics

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
                            <Button className="mb-5" variant="info" type="submit" className="button">
                                Filtrar
                            </Button>
                        </Form>
                    </Col>
                    <Col lg={10} sm={12}>
                        {Accommodations.length>0? Accommodations.map((accommodation)=>(<AdminSingleAccommodation accom={accommodation} remove={remove} />)): 
                            <Alert variant="info" className="mt-4">
                                {mgErro}
                            </Alert>} 
                    </Col>
                </Row>
            </Container>
            <Footer/>
       </div>

    )
}
export default AdminPage
