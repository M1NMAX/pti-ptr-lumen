
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import {Container, Card,Row,Col} from 'react-bootstrap'
import scroll from '../../img/scroll.png'
import capa from '../../img/capa.png'
import video from '../../img/intro.mp4'
import NavBarHome from '../../Components/NavBarHome'
import Search from '../../Components/Search'
import Accommodations from '../../Components/Accommodation'
import Footer from '../../Components/Footer'
import './index.css'
import api from '../../services/api';
function Homepage() {
    const [Accmmodations, setAcommodations] = useState([]);


    useEffect(() => {
        api.get('api/accommodations').then(response => {
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
                <Container >
                        <h1 className="slogan">Your sweet home away from home</h1>
                        <div className="buttonImg" >
                            <a href='#down'> 
                                <img src={scroll} className="buttonImg2"  width="70px"/> 
                                <a className="buttonImgLink" href='#down'>Ver mais</a>
                            </a>
                        </div>
                </Container>
            </div>
            <Search/>
            <Accommodations accom={Accmmodations} />   
            <Footer/>
        </div>

    )
}
export default Homepage
