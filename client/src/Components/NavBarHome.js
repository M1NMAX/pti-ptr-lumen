import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Nav, NavDropdown, Button, Form, FormControl} from 'react-bootstrap'
import React from "react";
import ReactDOM from "react-dom";
import {  BrowserRouter as Router,  Switch,  Route} from "react-router-dom";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faHeart, faSearch, faSignOutAlt, faSms, faUser } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../Components/Spinner';


function NavBarHome() {
    const [token] = useState(localStorage.getItem('token'));
    const [auth, setAuth] = useState(true);
    const [username, setUsername] = useState('');
    const [userid, setUserid] = useState();
    const [loading, setLoading] = useState(true);

    const history = useHistory();
    const [local, setLocal]=useState();

    async function routeChange(local){
        history.push({
            pathname: '/Search',
            state: local
        });
    }

    useEffect(() => {
        
        if(token === null || token ===''){
            setAuth(false);
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
                <Route exact path="/" >
                    <Navbar bg="white" expand="lg" fixed="top">
                        <Navbar.Brand href="/">SweetUni</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="nav justify-content-end nav nav-tabs ">
                            
                            <Nav className="text-center">
                                {/* show auth user data  */}
                                {auth?<>
                                    <NavDropdown title={username} id="collasible-nav-dropdown">
                                        <NavDropdown.Item href={ "/me"}><FontAwesomeIcon icon={faUser}/> Perfil</NavDropdown.Item>
                                        <NavDropdown.Item href={ "/favourites"}><FontAwesomeIcon icon={faHeart}/> Favoritos</NavDropdown.Item>
                                        <NavDropdown.Item href={ "/listChat"}><FontAwesomeIcon icon={faSms}/> Chat</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt}/>Logout</NavDropdown.Item>
                                    </NavDropdown> 
                                    <Nav.Link href="/dashboard" > Dashboard</Nav.Link>          
                                    </>: <>
                                            <Nav.Link href="/login">Login</Nav.Link>
                                            <Nav.Link href="/register">Registo</Nav.Link>
                                        </> }
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Route>
                <Route exact path="/login">
                    <Navbar bg="white" expand="lg" fixed="top">
                        <Navbar.Brand href="/">SweetUni</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="nav justify-content-end nav nav-tabs ">
                            <Nav className="mr-auto">

                            </Nav>
                            <Nav>
                                <Nav.Link href="/register">Registo</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Route>
                <Route exact path="/register">
                    <Navbar bg="white" expand="lg" fixed="top">
                        <Navbar.Brand href="/">SweetUni</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="nav justify-content-end nav nav-tabs ">
                            <Nav className="mr-auto">
                            </Nav>
                            <Nav>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Route>
                <Navbar bg="white" expand="lg" fixed="top">
                        <Navbar.Brand href="/">SweetUni</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="nav justify-content-end nav nav-tabs ">
                            <Nav className="text-center">
                                {/* show auth user data  */}
                                <Form inline className="searchDashboard">
                                    <Form.Control type="text" placeholder="Onde?" className="mr-sm-2 search-box" onChange={e => setLocal(e.target.value)} />
                                    <Button variant="info" onClick={() => routeChange(local)}  className="button"><FontAwesomeIcon icon={faSearch} /></Button>
                                </Form>
                                {auth?<>
                                    <NavDropdown title={username} id="collasible-nav-dropdown">
                                        <NavDropdown.Item href={ "/me"}><FontAwesomeIcon icon={faUser}/> Perfil</NavDropdown.Item>
                                        <NavDropdown.Item href={ "/favourites"}><FontAwesomeIcon icon={faHeart}/> Favoritos</NavDropdown.Item>
                                        <NavDropdown.Item href={ "/listChat"}><FontAwesomeIcon icon={faSms}/> chat</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt}/>Logout</NavDropdown.Item>
                                    </NavDropdown> 
                                    <Nav.Link href="/dashboard" >Dashboard</Nav.Link>
                                    </>: <>
                                            <Nav.Link href="/login">Login</Nav.Link>
                                            <Nav.Link href="/register">Registo</Nav.Link>
                                        </> }
                                    {/* @carol when do you want Alojamento to been seen href={ "/profileUser/"+userid} */}
                                {/* <Nav.Link href="/profileAlojamento"> Alojamento</Nav.Link> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
            </Switch>
            ): (
                <Spinner />
                    )}
        </div>
    )
}

export default NavBarHome
