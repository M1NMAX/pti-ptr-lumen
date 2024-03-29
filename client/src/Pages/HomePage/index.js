
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import {Container, Card,Row,Col, Form, Button, FormControl} from 'react-bootstrap'
import scroll from '../../img/scroll.png'
import video from '../../img/intro.mp4'
import NavBarHome from '../../Components/NavBarHome'
import Search from '../../Components/Search'
import Accommodations from '../../Components/Accommodation'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import './index.css'
import api from '../../services/api';
import { Typeahead } from 'react-bootstrap-typeahead';
import localizacoes from '../RegisterAccommodation/localizacoes.js';

function Homepage() {
    const [Accmmodations, setAcommodations] = useState([]);
    const history = useHistory();
    const [local, setLocal]=useState(undefined);

    async function routeChange(local){
        history.push({
            pathname: '/Search',
            state: local
        });
    }

    async function enter(target){
        if(target.charCode==13){
            routeChange(local)
        } 
    }

    console.log(Accmmodations)
    useEffect(() => {
        api.get('api/accommodations/bestOnes').then(response => {
            console.log(response.data)
            setAcommodations(response.data);
            console.log(response.data.length);
        }).catch(err => {
            alert(err)
        })
    }, []);
    return (
        <div className="App">
            <div className="App img video-container">
                <video id="videoBG" autoPlay muted loop id="videoBG">
                    <source src={video} type="video/mp4"></source>
                </video>
            </div>
            <NavBarHome/>
            <div className="App">
                <Container>
                        <h1 className="slogan">Your sweet home away from home</h1>
                        <Form inline className="search">
                            <Typeahead
                                style={{width:"60%",right:"0"}}
                                className="mr-sm-2 search-box"
                                id="basic-typeahead-single"
                                labelKey="name"
                                onChange={setLocal}
                                onKeyPress={e => enter(e)}
                                options={localizacoes}
                                placeholder="Onde?(Distrito/Concelho/Morada)" 
                                selected={local}
                                allowNew
                                newSelectionPrefix=''
                                ignoreDiacritics
                            />
                            <Button variant="info" onClick={() => routeChange(local)} className="button"><FontAwesomeIcon icon={faSearch} /></Button>
                        </Form>
                        <div className="buttonImg" >
                            <a href='#down'> 
                                <img src={scroll} className="buttonImg2"  width="100px"/> 
                                <a className="buttonImgLink" href='#down'>Ver mais</a>
                            </a>
                        </div>
                </Container>
            </div>
            <Container id='down' fluid>
                <h1>Top 9 alojamentos melhor classificados:</h1>
                <Accommodations accom={Accmmodations} />   
                <Button variant="info" onClick={() => routeChange(local)} style={{marginLeft: '48%'}} className="button3 mt-1 mb-1">Ver mais!</Button>
            </Container>
            <Footer/>
        </div>

    )
}
export default Homepage
