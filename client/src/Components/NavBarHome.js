import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Nav, NavDropdown, Button, Form, FormControl} from 'react-bootstrap'
import React from "react";
import ReactDOM from "react-dom";
import {  BrowserRouter as Router,  Switch,  Route} from "react-router-dom";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
function NavBarHome() {
    const [token] = useState(localStorage.getItem('token'));
    console.log(token)
    const [auth, setAuth] = useState(true)
    //const [userdata, setUserdata] = useState([]);
    const [username, setUsername] = useState('');
    const [userid, setUserid] = useState();

    const history = useHistory();
    useEffect(() => {
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
                if(token === null || token ===''){
                    setAuth(false);
                }
                else{
                    setUsername(response.data.name);
                    setUserid(response.data.id)
                }
                console.log(auth)
            // console.log(username);
            // console.log(response.data);
            // setUserdata(response.data);
          }
        }).catch(err => {
          alert(err)
        })
      }, [token]);

      function handleLogout() {
        localStorage.clear();
        history.push('/');
        window.location.reload();
      }

    return (
        <div className="header">
          <Switch>
                <Route exact path="/" >
                    <Navbar bg="white" expand="lg">
                        <Navbar.Brand href="/">SweetUni</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="nav justify-content-end nav nav-tabs ">
                            <Nav className="mr-auto">

                                 {/* show auth user data  */}
                                {auth?<>
                                        <Nav.Link href="/chat"> Chat</Nav.Link>
                                        <Nav.Link href={ "/profileUser/"+userid}> {username} </Nav.Link>
                                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                                    </>: <>
                                            <Nav.Link href="/login">Login</Nav.Link>
                                            <Nav.Link href="/register">Registo</Nav.Link>
                                        </> }
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Route>
                <Route exact path="/login">
                    <Navbar bg="white" expand="lg">
                        <Navbar.Brand href="/">SweetUni</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="nav justify-content-end nav nav-tabs ">
                            <Nav className="mr-auto">
                                <Nav.Link href="/register">Registo</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Route>
                <Route exact path="/register">
                    <Navbar bg="white" expand="lg">
                        <Navbar.Brand href="/">SweetUni</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="nav justify-content-end nav nav-tabs ">
                            <Nav className="mr-auto">
                                <Nav.Link href="/login">Login</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Route>
                <Navbar bg="white" expand="lg">
                        <Navbar.Brand href="/">SweetUni</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="nav justify-content-end nav nav-tabs ">
                            <Nav className="mr-auto">
                                {/* show auth user data  */}
                                {/* {auth?<UserGreeting name={username} id={userid}/>:<GuestGreeting/> } */}

                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Registo</Nav.Link>
                                <Nav.Link href="/chat"> Chat</Nav.Link>
                                <Nav.Link href="/profileUser"> Perfil</Nav.Link>
                                <Nav.Link href="/profileAlojamento"> Alojamento</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
            </Switch>
        </div>
    )
}

export default NavBarHome
