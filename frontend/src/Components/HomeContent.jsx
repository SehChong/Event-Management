import React from 'react'
import { Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 50px;
`;

export const HomeContent = () => {
  return (
      <CardContainer className='gap-5'>
        <Card style={{ width: '30rem    ' }}>
          <Card.Img variant="top" src="https://via.placeholder.com/150" />
          <Card.Body className='text-center'>
            <Card.Title className='fs-3'>Event</Card.Title>
            <Card.Text className='text-justify'>
              We are Best construction in the world. Sompor incididu magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Card.Text>
            <Button variant="primary">Learn More</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '30rem' }}>
          <Card.Img variant="top" src="https://via.placeholder.com/150" />
          <Card.Body className='text-center'>
            <Card.Title className='fs-3'>Club</Card.Title>
            <Card.Text className='text-justify'>
              We are Best construction in the world. Sompor incididu magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Card.Text>
            <Button variant="primary">Learn More</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '30rem' }}>
          <Card.Img variant="top" src="https://via.placeholder.com/150" />
          <Card.Body className='text-center'>
            <Card.Title className='fs-3'>Attendance</Card.Title>
            <Card.Text className='text-justify'>
              We are Best construction in the world. Sompor incididu magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Card.Text>
            <Button variant="primary">Learn More</Button>
          </Card.Body>
        </Card>
      </CardContainer>
  )
}
