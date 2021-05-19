import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Nav, NavDropdown, Button, Form, FormControl} from 'react-bootstrap'
import React from "react";
import ReactDOM from "react-dom";
import {  BrowserRouter as Router,  Switch,  Route} from "react-router-dom";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faHome, faCircle, faHeart, faSearch, faSignOutAlt, faSms, faUser } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../Components/Spinner';


function NavBarAdmin() {
    const [token] = useState(localStorage.getItem('token'));
    const [auth, setAuth] = useState(true);
    const [username, setUsername] = useState('');
    const [userid, setUserid] = useState();
    const [loading, setLoading] = useState(true);

    const history = useHistory();
    const [local, setLocal]=useState();

    const [imgC, setImgC] = useState();

    async function routeChange(local){
        history.push({
            pathname: '/Search',
            state: local
        });
    }

    async function enter(target){
        if(target.charCode==13){
            routeChange(local)
        } 
    }

    useEffect(() => {
        
        if(token === null || token ===''){
            setAuth(false);
            setLoading(false);
        }else{
        api.get('api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then( response => {
            if(response.data.status && response.data.status === (401 || 498)){
                console.log("erro")
                localStorage.clear();
                history.push('/');
            }else{
                setUsername(response.data.username);
                setUserid(response.data.id)
                setLoading(false);

                api.get('api/chat/chatNotifications/' + response.data.id).then(responseChatNotification => {
                    console.log(responseChatNotification.data);
                    if(responseChatNotification.data.length == 0){
                      setImgC();
                    }else{
                      setImgC(faCircle);
                    }
                  })
          }
        }).catch(err => {
          alert(err)
        })
      }}, [token]);
    
      async function handleLogout(){
        api.get('/api/logout', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(response => {
          if(response.data.status){
            localStorage.clear();
            history.push('/');
            setAuth(false);
            window.location.reload();
          }
        }).catch(err => {
          alert(err)
        })
      }

    return (
        <div className="header" style={{margin: "60px"}}>
            {loading === false ? (
          <Switch>
                <Route exact path="/admin" >
                    <Navbar bg="white" expand="lg" fixed="top">
                        <Navbar.Brand href="/admin">SweetUni</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="nav-tabs ">
                            
                            <Nav className="text-center ml-auto">
                                {/* show auth user data  */}
                                {auth?<>
                                    <NavDropdown drop="left" title={username} id="collasible-nav-dropdown">
                                        <NavDropdown.Item href={ "/admin"}><FontAwesomeIcon icon={faHome}/> Alojamentos</NavDropdown.Item>
                                        <NavDropdown.Item href={ "/adminFeature"}><FontAwesomeIcon icon={faFile}/> Gerir de Caracteristicas</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt}/>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                    </>: <>
                                            <Nav.Link href="/login">Login</Nav.Link>
                                        </> }
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Route>
            </Switch>
            ): (
                <Spinner />
                    )}
        </div>
    )
}

export default NavBarAdmin
