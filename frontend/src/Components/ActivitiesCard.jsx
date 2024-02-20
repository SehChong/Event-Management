import React from 'react'
import { Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
`;

const StatusText = styled.span`
  color: ${(props) => {
    switch (props.status) {
      case 'Passed':
        return 'green';
      case 'Failed':
        return 'red';
      case 'Ongoing':
        return 'orange';
      default:
        return 'black';
    }
  }};
`;

export const ActivitiesCard = ({ totalPoints, timeLimit }) => {
  const getStatus = () => {
    if (totalPoints >= 100 && timeLimit === 1) {
      return 'Passed';
    } else if (timeLimit === 1) {
      return 'Failed';
    } else {
      return 'Ongoing';
    }
  };

  return (
    <CardContainer>
      <CardWrapper>
        <Card style={{ width: '25rem'}}>
          <Card.Img variant="top" src="https://via.placeholder.com/150" />
          <Card.Body className='text-center'>
            <Card.Title className='fs-3'>ELE 1</Card.Title>
            <Card.Text className='text-justify text-center pb-3'>
              Registered/Unregistered
            </Card.Text>
            <Card.Text className='text-justify'>
              Status: <StatusText status={getStatus()}>{getStatus()}</StatusText>
            </Card.Text>
            <Card.Text className='text-justify pb-3'>
              Points: {totalPoints}/100
            </Card.Text>
            <Button variant="primary">View Activities</Button>
          </Card.Body>
        </Card>
      </CardWrapper>
      <CardWrapper>
        <Card style={{ width: '25rem' }}>
          <Card.Img variant="top" src="https://via.placeholder.com/150" />
          <Card.Body className='text-center'>
            <Card.Title className='fs-3'>ELE 2</Card.Title>
            <Card.Text className='text-justify text-center pb-3'>
              Registered/Unregistered
            </Card.Text>
            <Card.Text className='text-justify'>
              Status: <StatusText status={getStatus()}>{getStatus()}</StatusText>
            </Card.Text>
            <Card.Text className='text-justify pb-3'>
              Points: {totalPoints}/100
            </Card.Text>
            <Button variant="primary">View Activities</Button>
          </Card.Body>
        </Card>
      </CardWrapper>
      <CardWrapper>
        <Card style={{ width: '25rem' }}>
          <Card.Img variant="top" src="https://via.placeholder.com/150" />
          <Card.Body className='text-center'>
            <Card.Title className='fs-3'>ELE 3</Card.Title>
            <Card.Text className='text-justify text-center pb-3'>
              Registered/Unregistered
            </Card.Text>
            <Card.Text className='text-justify'>
              Status: <StatusText status={getStatus()}>{getStatus()}</StatusText>
            </Card.Text>
            <Card.Text className='text-justify pb-3'>
              Points: {totalPoints}/100
            </Card.Text>
            <Button variant="primary">View Activities</Button>
          </Card.Body>
        </Card>
      </CardWrapper>
    </CardContainer>
  )
}