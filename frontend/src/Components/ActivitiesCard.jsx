import React from 'react'
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import { ActivitiesTable } from './ActivitiesTable';

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

  const [optSmModal, setOptSmModal] = useState(false);

  const toggleOpen = () => setOptSmModal(!optSmModal);

  return (
    <CardContainer>
      <CardWrapper>
        <Card className="rounded" style={{ width: '25rem'}}>
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
            <MDBBtn variant="primary" onClick={toggleOpen}>View Activities</MDBBtn>
            <MDBModal open={optSmModal} tabIndex='-1' setOpen={setOptSmModal}>
              <MDBModalDialog size='xl'>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle>Registered Events</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                    <ActivitiesTable/>
                  </MDBModalBody>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
          </Card.Body>
        </Card>
      </CardWrapper>
      <CardWrapper>
        <Card className="rounded" style={{ width: '25rem' }}>
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
            <MDBBtn variant="primary" onClick={toggleOpen}>View Activities</MDBBtn>
            <MDBModal open={optSmModal} tabIndex='-1' setOpen={setOptSmModal}>
              <MDBModalDialog size='xl'>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle>Registered Events</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                    <ActivitiesTable/>
                  </MDBModalBody>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
          </Card.Body>
        </Card>
      </CardWrapper>
      <CardWrapper>
        <Card className="rounded" style={{ width: '25rem' }}>
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
            <MDBBtn variant="primary" onClick={toggleOpen}>View Activities</MDBBtn>
            <MDBModal open={optSmModal} tabIndex='-1' setOpen={setOptSmModal}>
              <MDBModalDialog size='xl'>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle>Registered Events</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                    <ActivitiesTable/>
                  </MDBModalBody>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
          </Card.Body>
        </Card>
      </CardWrapper>
    </CardContainer>
  )
}