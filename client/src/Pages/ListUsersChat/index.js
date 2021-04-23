import NavBarHome from '../../Components/NavBarHome'
import 'bootstrap/dist/css/bootstrap.min.css'
import DefaultUserPic from "../../img/standartUser3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken} from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import SingleChat from '../../Components/SingleChat'
import Footer from '../../Components/Footer'

function ListUsersChat() {

    const [Accommodations, setAccommodation] = useState([]);
    const [token] = useState(localStorage.getItem('token'));

    const history = useHistory();
   
    useEffect(() => {
        api.get('api/favourites',  {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }).then(response => {
            if(response.data.status){
                setAccommodation(response.data.favourites);
            }else{
                history.push("/login")
            }

            
            
        }).catch(err => {
            alert(err)
        })
    }, [token]);

    return(
        <div>
        <NavBarHome/>
        <div class="center"><h3>Lista de Chats</h3></div>
        <SingleChat />
        
        

        <Footer/>
       </div>

    )
}

export default ListUsersChat