import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState}  from 'react';
import {Card} from 'react-bootstrap';
import api from '../services/api';
import DefaultUserPic from "../img/standartUser3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faStar, faMapMarkerAlt, faEuroSign,faHome, faBed, faBath, faSun, faWifi, faBroom, faPeopleArrows,  faMars, faVenus,faVenusMars, faNeuter, faSmoking, faPaw, faPlus, faComments, faComment} from '@fortawesome/free-solid-svg-icons'



function Comment({comment}) {

    const [userInfo, setuserInfo] = useState([]);
    console.log(comment.user_id);

    useEffect(() => {
        api.get('api/users/'+comment.user_id).then(response => {
            setuserInfo(response.data);
        }).catch(err => {
          alert(err)
        })
    }, []);
    
   
    return (
        <Card.Body className="borderComment">
            <Card.Title> 
                <img src={DefaultUserPic} className="userPic" alt="profils pic" />{userInfo.username}<p className="date d-inline-block "><FontAwesomeIcon icon={faStar} style={{color:'rgb(243, 243, 78)'}}/> {comment.rate}/5</p> 
                </Card.Title>
            <Card.Text>
                <p className="time text-muted">
                    Just Now</p>
                &emsp;{comment.content}
            </Card.Text>
        </Card.Body>
    )
}

export default Comment