
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import {Container, Card,Row,Col, Form, Button, FormControl} from 'react-bootstrap'
import scroll from '../../img/scroll.png'
import capa from '../../img/capa.png'
import video from '../../img/intro.mp4'
import NavBarHome from '../../Components/NavBarHome'
import Search from '../../Components/Search'
import Accommodations from '../../Components/Accommodation'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faSearch, faMapMarkerAlt, faEuroSign, faBed, faBath, faSun, faWifi, faBroom, faPeopleArrows,  faMars, faVenus,faVenusMars, faNeuter, faSmoking, faPaw, faPlus} from '@fortawesome/free-solid-svg-icons'
import './index.css'
import api from '../../services/api';
function Homepage() {
    const [Accmmodations, setAcommodations] = useState([]);
    const history = useHistory();
    const [local, setLocal]=useState();

    async function routeChange(local){
        console.log(local)
        let path = "/Search/" + local;
        history.push(path);
    }


    console.log(Accmmodations)
    useEffect(() => {
        api.get('api/accommodations').then(response => {
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
                            <Form.Control type="text" placeholder="Onde?(Concelho/Freguesia/Morada)" className="mr-sm-2 search-box" onChange={e => setLocal(e.target.value)}/>
                            <Button variant="primary" onClick={() => routeChange(local)} className="button"><FontAwesomeIcon icon={faSearch} /></Button>
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
                <Accommodations accom={Accmmodations} />   
            </Container>
            <Footer/>
        </div>

    )
}
export default Homepage
