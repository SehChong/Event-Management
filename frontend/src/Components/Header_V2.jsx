import React from 'react';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown
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

      const toEventList = () => {
        navigate("/eventlist");
      };

      const toProfile = () => {
        navigate("/profile");
      };

      const toAttendance = () => {
        navigate("/attendance");
      };

  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top" style={{height:120}}>
        <Container>
          <Navbar.Brand onClick={toHome} className='fs-3'>My Website</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav " className='flex-grow-0 fs-3 p-5'>
            <Nav className="me-auto gap-5">
              <NavDropdown title="Event" id="event-dropdown" className="rounded">
                <NavDropdown.Item onClick={toEvent}>Create Event</NavDropdown.Item>
                <NavDropdown.Item onClick={toEventList}>Event List</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={toClub} onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className="nav-link rounded">Club</Nav.Link>
              <Nav.Link onClick={toAttendance} onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className="nav-link rounded">Attendance</Nav.Link>
              <Nav.Link  onClick={toProfile} onMouseOver={handleMouseOver}
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
