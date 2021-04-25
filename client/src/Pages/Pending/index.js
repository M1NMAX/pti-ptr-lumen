import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarHome from '../../Components/NavBarHome';
import { Container,Row,Col,Form ,Button, Card, Carousel} from 'react-bootstrap'
import DefaultUserPic from "../../img/standartUser3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope } from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api';
import React, { useState, useEffect } from "react";
import {useParams, useHistory} from 'react-router-dom';
import PendingAc from '../../Components/PendingAc'
import Footer from '../../Components/Footer'
function Pending() {
    const[token] = useState(localStorage.getItem('token'));
    const[userId]= useState(localStorage.getItem('userID'));
    const[pending, setPending] = useState([]);


    const history = useHistory();


    const accommodation = useState([
        { "name":"John", "age":30, "city":"New York" },
        { "name":"Wick", "age":30, "city":"New York" }
    ]);

    useEffect(() => {
        console.log(userId);
        if(token === null || token === ''){
            history.push('/login');    
        }else{
            api.get('api/accommodations/rentalpending/'+userId, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
            }).then(response => {
                if(response.data.status){
                    setPending(response.data.pending);
                }else{
                    localStorage.clear();
                    history.push('/login')
                }
            }).catch(err => {
            alert(err)
            })
        }
    }, [token]);

    return(
        <div>
        <NavBarHome/>
        <div class="center"><h3>Pendentes</h3></div>
        <PendingAc accom={accommodation}/>
        <Footer/>
       </div>

    )
}
export default Pending
