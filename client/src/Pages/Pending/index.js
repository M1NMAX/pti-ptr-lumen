import NavBarHome from '../../Components/NavBarHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import DefaultUserPic from "../../img/standartUser3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import Accommodations from '../../Components/Accommodation'
import Footer from '../../Components/Footer'

function Pending() {
    
    return(
        <div>
        <NavBarHome/>
        <div class="center"><h3>Pendentes</h3></div>
        <div>
        <img src={DefaultUserPic} alt="Imagem de perfil" width="30px"></img>
        <h7 className="d-inline-block">Pedro</h7>
        </div>
        <Footer/>
       </div>

    )
}
export default Pending
