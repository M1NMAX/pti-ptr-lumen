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

    const [token] = useState(localStorage.getItem('token'));
    const [auth, setAuth] = useState(true);
    const [username, setUsername] = useState('');
    const [userid, setUserid] = useState();
    const [userChats, setUserChats] = useState([]);
    const history = useHistory();
  
    useEffect(() => {
        
        if(token === null || token ===''){
            setAuth(false);
        }else{
          api.get('api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(response => {
            if(response.data.status && response.data.status === (401 || 498)){
                console.log("erro")
                localStorage.clear();
                history.push('/');
            }else{
                setUsername(response.data.username);
                setUserid(response.data.id);
                api.get('api/chat/user/'+ response.data.id).then(responseChat => {
                  console.log(responseChat.data)
                  setUserChats(responseChat.data);
              }).catch(err => {
                  alert(err)
              })
                
          }
        }).catch(err => {
          alert(err)
        })
      }}, [token]);
    return(
      <div>
      <NavBarHome/>
      

      { userChats.length>0 ? 
              userChats.map((chats)=>(<a href={'/chat/' + chats.id}><SingleChat chats={chats} /></a>)): 
              <div class="center">
              <h6><FontAwesomeIcon icon={faHeartBroken}/> Ainda não tem chats</h6>
          </div>
      }
      
      <Footer/>
     </div>

    )
}

export default ListUsersChat