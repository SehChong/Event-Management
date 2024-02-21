import React from 'react';
import {
  Navbar,
  Nav,
  Container,
  Card,
  Button
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
              <Nav.Link onClick={toEvent} onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className="nav-link  rounded">Event</Nav.Link>
              <Nav.Link onClick={toClub} onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className="nav-link rounded">Club</Nav.Link>
              <Nav.Link onClick={toAttendance} onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className="nav-link rounded">Attendance</Nav.Link>
              <Nav.Link onClick={toProfile} onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className="nav-link rounded">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
              <Nav.Link href="#logout" className='fs-3 p-5'>Logout</Nav.Link>
      </Navbar>

      <Card className="text-center bg-primary text-white" style={{height:800}}>
        <Card.Body className='d-flex align-items-center justify-content-center flex-column'>
          <Card.Title className='fs-3'>Welcome to My Website</Card.Title>
          <Card.Text className='fs-3'>This is the first page banner.</Card.Text>
          <Button className='fs-3' variant="outline-light">Learn more</Button>
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
