import React from 'react';
import {
    Container,
    Nav,
    Navbar
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar className="mb-3" bg="light" expand="md">
                <Container>
                    <Navbar.Brand>TEST_PROJECT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                            <Nav.Link onClick={() => navigate('/News')}>News</Nav.Link>
                            <Nav.Link onClick={() => navigate('/Chat')}>Chat</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
