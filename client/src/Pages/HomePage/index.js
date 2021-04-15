
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import {Container, Card,Row,Col} from 'react-bootstrap'
import scroll from '../../img/scroll.png'
import capa from '../../img/capa.png'
import NavBarHome from '../../Components/NavBarHome'
import Search from '../../Components/Search'
import Accommodations from '../../Components/Accommodation'
import './index.css'
import api from '../../services/api';

function Homepage() {
    const [Accmmodations, setAcommodations] = useState([]);


    useEffect(() => {
        api.get('api/accommodations').then(response => {
            setAcommodations(response.data);
        }).catch(err => {
            alert(err)
        })
    }, []);
    return (
        <div className="App img">
            <div className="App img" style={{
            height:"100%"
          }}>
            <NavBarHome/>
            <Container >
                <h1 className="slogan">Your sweet home away from home</h1>
                <div className="buttonImg" >
                    <a href='#down'> 
                        <img src={scroll} className="buttonImg2"  width="10%"/> 
                        <a className="buttonImgLink" href='#down'>Ver mais</a>
                    </a>
                </div>
             </Container>
            </div>
            <Search/>
            {Accmmodations.map((accom)=> (<Accommodations accom={accom} />))}   
        </div>

    )
}

export default Homepage
