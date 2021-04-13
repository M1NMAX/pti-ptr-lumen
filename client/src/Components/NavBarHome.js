import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Nav, NavDropdown, Button, Form, FormControl} from 'react-bootstrap'
import React from "react";
import ReactDOM from "react-dom";
import {  BrowserRouter as Router,  Switch,  Route} from "react-router-dom";

function NavBarHome() {
    return (
        <div className="header">
          <Switch>
                <Route exact path="/" >
                    <Navbar bg="white" expand="lg">
                        <Navbar.Brand href="/">SweetUni</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="nav justify-content-end nav nav-tabs ">
                            <Nav className="mr-auto">
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Registo</Nav.Link>
                                <Nav.Link href="/chat"> Chat</Nav.Link>
                                <Nav.Link href="/profileUser"> Perfil</Nav.Link>
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
