import NavBarHome from '../../Components/NavBarHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import DefaultUserPic from "../../img/standartUser3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken} from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import SingleAccommodation from '../../Components/SingleAccommodation'
import Footer from '../../Components/Footer'


function Favourites() {
    const [Accommodations, setAccommodations] = useState([]);
    const [token] = useState(localStorage.getItem('token'));

    const history = useHistory();
   
    useEffect(() => {
        api.get('api/favourites',  {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }).then(response => {
            if(response.data.status){
                setAccommodations(response.data.favourites);
            }else{
                history.push("/login")
            }
            
        }).catch(err => {
            alert(err)
        })
    }, [token]);


    async function removeFavourite(accommodationId){
       await api.delete('/api/favourites/'+accommodationId, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }).then(response => {
          if(!response.data.status){
              alert('Ocorreu um erro, não foi possivel remover o item dos favoritos, tente mais tarde');
          }

        }).catch(err => {
          alert(err)
        })

        setAccommodations(Accommodations.filter((accommodation) => accommodation.accommodation_id != accommodationId ));
        
    }
    
    return(
        <div>
        <NavBarHome/>
        <div class="center"><h3><FontAwesomeIcon icon={faHeart}/> Os meus favoritos</h3></div>
        <div class="center"><h3>Criar filtros e possiblitar pesquisa</h3></div>

        { Accommodations.length>0 ? 
                Accommodations.map((accommodation)=>(<SingleAccommodation accom={accommodation} removeFavourite={removeFavourite} />)): 
                <div class="center">
                <h6><FontAwesomeIcon icon={faHeartBroken}/> Ainda não tem favoritos</h6>
                <a class="center" href="/">Procurar Alojamentos</a>
            </div>
        }
        
        <Footer/>
       </div>

    )
}
export default Favourites
