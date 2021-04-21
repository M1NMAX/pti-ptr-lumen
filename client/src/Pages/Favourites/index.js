import NavBarHome from '../../Components/NavBarHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import DefaultUserPic from "../../img/standartUser3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken} from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import SingleAccommodation from '../../Components/SingleAccommodation'
import Footer from '../../Components/Footer'


function Favourites() {
    const [Accommodations, setAccommodation] = useState([]);
    const [token] = useState(localStorage.getItem('token'));
    const [status, setStatus] = useState(true);
   
    useEffect(() => {
        api.get('api/favourites',  {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }).then(response => {
            setAccommodation(response.data);
            setStatus(false);
        }).catch(err => {
            alert(err)
        })
    }, [token]);
    
    return(
        <div>
        <NavBarHome/>
        <div class="center"><h3><FontAwesomeIcon icon={faHeart}/> Os meus favoritos</h3></div>
        <div class="center"><h3>Criar filtros e possiblitar pesquisa</h3></div>
        {Accommodations.map((accommodation)=>(<SingleAccommodation accom={accommodation} />))}
        <br></br>

        {status && <div class="center">
        <h6><FontAwesomeIcon icon={faHeartBroken}/> Ainda não tem favoritos</h6>
        <a class="center" href="/homepage">Procurar Alojamentos</a>
        </div>}
        
        <br></br>
        <Footer/>
       </div>

    )
}
export default Favourites
