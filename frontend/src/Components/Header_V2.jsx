import React from 'react';
import {
  Navbar,
  Nav,
  Container,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Header_V2 = () => {
    const handleMouseOver = (e) => {
        e.target.style.backgroundColor = '#d3d3d3';
        e.target.style.color = 'white';
        e.target.style.transition = 'background-color 0.3s ease';
      };
    
      const handleMouseOut = (e) => {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.color = 'black' ;
      };
    
      const navigate = useNavigate();
      
      const toHome = () => {
        navigate("/home");
      };

      const toClub = () => {
        navigate("/club");
      };
    
      const toEvent = () => {
        navigate("/event");
      };
  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top" style={{height:120}}>
        <Container>
          <Navbar.Brand onClick={toHome} className='fs-3'>My Website</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav " className='flex-grow-0 fs-3 p-5'>
            <Nav className="me-auto gap-5">
              <Nav.Link onClick={toEvent} onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className="nav-link  rounded">Event</Nav.Link>
              <Nav.Link onClick={toClub} onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className="nav-link rounded">Club</Nav.Link>
              <Nav.Link href="#link3" onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className="nav-link rounded">Attendance</Nav.Link>
              <Nav.Link href="#link4" onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className="nav-link rounded">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
              <Nav.Link href="#logout" className='fs-3 p-5'>Logout</Nav.Link>
      </Navbar>
    </>
  )
}
