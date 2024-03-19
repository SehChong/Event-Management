import React from 'react';
import {
  Navbar,
  Nav,
  Container,
  Card,
  Button,
  NavDropdown
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
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

  const toRegisteredEvents = () => {
    navigate("/registeredEvent");
  }

  const toLogin = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar bg="danger" expand="lg" style={{height:100}}>
        <Container>
          <Navbar.Brand onClick={toHome} className='fs-4 mx-5 text-light'>UCSI ELE Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav " className='flex-grow-0 fs-3 p-5'>
            <Nav className="me-auto gap-5">
            <NavDropdown title="Event" id="event-dropdown" className="rounded custom-dropdown">
              <NavDropdown.Item onClick={toEvent} className='fs-5'>Create Event</NavDropdown.Item>
              <NavDropdown.Item onClick={toEventList} className='fs-5'>Event List</NavDropdown.Item>
              <NavDropdown.Item onClick={toRegisteredEvents} className='fs-5'>Joined Events</NavDropdown.Item>
            </NavDropdown>
              <Nav.Link onClick={toClub} onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className="nav-link rounded text-light fs-4">Club</Nav.Link>
              <Nav.Link onClick={toAttendance} onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className="nav-link rounded text-light fs-4">Attendance</Nav.Link>
              <Nav.Link onClick={toProfile} onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className="nav-link rounded text-light fs-4">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
              <Nav.Link onClick={toLogin} className='fs-4 p-5 text-light'>Logout</Nav.Link>
      </Navbar>

      <Card className="text-center bg-primary text-danger" style={{height:800 , backgroundImage: `url(${require('../Assets/img/UCSI_Background.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Card.Body className='d-flex align-items-center justify-content-center flex-column'>
          <Card.Title className='fs-1'>Welcome to My Website</Card.Title>
          <Card.Text className='fs-1'>This is the first page banner.</Card.Text>
          <Button className='fs-3 bg-primary' variant="outline-light">Learn more</Button>
        </Card.Body>
      </Card>

      {/* <div className='bg-light fs-3 pt-5' style={{height:400}}>
        <Container>
          <h2>Content Section</h2>
          <p>This is the content section of the first page.</p>
          <p>You can add more components and elements here as needed.</p>
        </Container>
      </div> */}
    </>
  );
};
