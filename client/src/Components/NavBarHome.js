import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Nav, NavDropdown, Button, Form, FormControl} from 'react-bootstrap'

function NavBarHome() {
    return (
        <div className="header">
            <Navbar bg="white" expand="lg">
                <Navbar.Brand href="/">SweetUni</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" class="nav justify-content-end nav nav-tabs ">
                    <Nav className="mr-auto">
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Registo</Nav.Link>
                        <Nav.Link href="/chat">Chat</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBarHome
