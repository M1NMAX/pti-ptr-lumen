import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Nav, NavDropdown, Button, Form} from 'react-bootstrap'
import React, { useState, useEffect }  from "react";
import {useHistory,  Switch,  Route} from "react-router-dom";
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircle, faHeart, faSearch, faSignOutAlt, faSms, faUser } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../Components/Spinner';
import { Typeahead } from 'react-bootstrap-typeahead'
import localizacoes from '../Pages/RegisterAccommodation/localizacoes.js';


function NavBarHome() {
    const [token] = useState(localStorage.getItem('token'));
    const [auth, setAuth] = useState(true);
    const [username, setUsername] = useState('');
    const [hasFavourites, setHasFavourites] = useState();
    const [loading, setLoading] = useState(true);

    const history = useHistory();
    const [local, setLocal]=useState(undefined);

    const [imgC, setImgC] = useState();

    async function routeChange(){
        history.push({
            pathname: '/Search',
            state: local
        });
    }

    async function enter(target){
        if(target.charCode==13){
            routeChange()
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
                response.data.userable_type == "App\\Models\\Guest" 
                    && setHasFavourites(<NavDropdown.Item href={ "/favourites"}>
                                <FontAwesomeIcon icon={faHeart}/> Favoritos
                        </NavDropdown.Item>
                );
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
                <Route exact path="/" >
                    <Navbar bg="white" expand="lg" fixed="top">
                        <Navbar.Brand href="/">SweetUni</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="nav-tabs ">
                            
                            <Nav className="text-center ml-auto">
                                {/* show auth user data  */}
                                {auth?<>
                                    <NavDropdown title={username} id="collasible-nav-dropdown">
                                        <NavDropdown.Item href={ "/me"}><FontAwesomeIcon icon={faUser}/> Perfil</NavDropdown.Item>
                                        {hasFavourites}
                                        <NavDropdown.Item href={ "/listChat"}><FontAwesomeIcon icon={faSms}/> Chat <FontAwesomeIcon color="red" size="xs" icon={imgC}/> </NavDropdown.Item>
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
                        <Navbar.Collapse id="basic-navbar-nav" className="nav-tabs">
                            <Nav className="text-center ml-auto">
                                {/* show auth user data  */}
                                <Form inline >
                                    <Typeahead
                                        className="mr-sm-2 search-box" 
                                        id="basic-typeahead-single"
                                        labelKey="name"
                                        onChange={setLocal}
                                        onKeyPress={e => enter(e)}
                                        options={localizacoes}
                                        placeholder="Onde?" 
                                        selected={local}
                                        allowNew
                                        newSelectionPrefix=''
                                        ignoreDiacritics
                                    />
                                    <Button variant="info" onClick={() => routeChange()}  className="button"><FontAwesomeIcon icon={faSearch} /></Button>
                                </Form>
                                {auth?<>
                                    <NavDropdown title={username} id="collasible-nav-dropdown">
                                        <NavDropdown.Item href={ "/me"}><FontAwesomeIcon icon={faUser}/> Perfil</NavDropdown.Item>
                                        {hasFavourites}
                                        <NavDropdown.Item href={ "/listChat"}><FontAwesomeIcon icon={faSms}/> Chat <FontAwesomeIcon color="red" size="xs" icon={imgC}/></NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt}/>Logout</NavDropdown.Item>
                                    </NavDropdown> 
                                    <Nav.Link href="/dashboard" >Dashboard</Nav.Link>
                                    </>: <>
                                            <Nav.Link href="/login">Login</Nav.Link>
                                            <Nav.Link href="/register">Registo</Nav.Link>
                                        </> }
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
