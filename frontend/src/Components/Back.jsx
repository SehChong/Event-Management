import React from 'react'
import {
    Navbar,
    Nav,
    NavLink,
  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SlActionUndo } from "react-icons/sl";

export const Back = ({to}) => {
    const navigate = useNavigate();

    const toPrevious = () => {
        navigate(to);
      };

  return (
    <>
        <Navbar bg="light" expand="lg" sticky="top" style={{height:100}}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav " className='flex-grow-0 fs-3 p-5'>
                    <Nav className="me-auto">
                        <NavLink className="nav-link d-flex align-items-center gap-2" onClick={toPrevious}><SlActionUndo />Back</NavLink>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    </>
  )
}
