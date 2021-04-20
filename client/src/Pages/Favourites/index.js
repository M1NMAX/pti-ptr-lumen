import NavBarHome from '../../Components/NavBarHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import DefaultUserPic from "../../img/standartUser3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken} from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import Accommodations from '../../Components/Accommodation'
import Footer from '../../Components/Footer'


function Favourites() {
    const [Accmmodations, setAcommodations] = useState([]);
    useEffect(() => {
        api.get('api/accommodations').then(response => {
            console.log(response.data)
            setAcommodations(response.data);
            console.log(response.data.length);
        }).catch(err => {
            alert(err)
        })
    }, []);
    return(
        <div>
        <NavBarHome/>
        <div class="center"><h3><FontAwesomeIcon icon={faHeart}/> Os meus favoritos</h3></div>
        <Accommodations accom={Accmmodations} />
        <br></br>
        <div class="center">
        <h6><FontAwesomeIcon icon={faHeartBroken}/> Ainda não tem favoritos</h6>
        <a class="center" href="/homepage">Procurar Alojamentos</a>
        </div>
        <br></br>
        <Footer/>
       </div>

    )
}
export default Favourites
