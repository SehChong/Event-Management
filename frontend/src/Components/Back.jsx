import React from 'react'
import {
    Navbar,
    Nav,
    Container,
    NavLink,
  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SlActionUndo } from "react-icons/sl";

export const Back = () => {
    const navigate = useNavigate();

    const toHome = () => {
        navigate("/Club");
      };

  return (
    <>
        <Navbar bg="light" expand="lg" sticky="top" style={{height:120}}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav " className='flex-grow-0 fs-3 p-5'>
                    <Nav className="me-auto">
                        <NavLink className="nav-link d-flex align-items-center gap-2" onClick={toHome}><SlActionUndo />Back</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  )
}
