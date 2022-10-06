import React, { useState } from 'react';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import CartSideBar from './CartSideBar';

const MyNavBar = () => {
    const navigate = useNavigate();
    const logout = () => {

        localStorage.setItem("token", "")
        navigate("/login")
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand to="/" as={Link}>Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link to="/login" as={Link}>Login</Nav.Link>
                            {/* <Nav.Link to="/products/:id" as={Link}>Products Detail</Nav.Link> */}
                            <Nav.Link to="/purchases" as={Link}>Purchases</Nav.Link>
                            <Nav.Link onClick={handleShow}> Cart </Nav.Link>
                            <Nav.Link onClick={logout}>LogOut</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <CartSideBar show={show} handleClose={handleClose} />            
        </div>
    );
}

export default MyNavBar;