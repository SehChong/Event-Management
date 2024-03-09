import React, { useEffect, useState } from 'react';
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

export const ActivitiesCard = () => {
  const [userData, setUserData] = useState(null);

  // Function to get the total points from ele1, ele2, and ele3
  const getTotalPoints = () => {
    // Check if userData is available
    if (userData) {
      // Retrieve total points from each ele
      const ele1TotalPoints = userData.ele1[1];
      const ele2TotalPoints = userData.ele2[1];
      const ele3TotalPoints = userData.ele3[1];

      // Return the total points as an object
      return {
        ele1TotalPoints,
        ele2TotalPoints,
        ele3TotalPoints
      };
    } else {
      // Return default values or handle the case when userData is not available
      return {
        ele1TotalPoints: 0,
        ele2TotalPoints: 0,
        ele3TotalPoints: 0
      };
    }
  };

  const { ele1TotalPoints, ele2TotalPoints, ele3TotalPoints } = getTotalPoints();

  // Function to fetch user data and set state
  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/user/${sessionStorage.getItem("username")}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch user data and check ele1 status on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Retrieve the 'unregistered' value for each 'ele'
  const ele1Registration = userData ? userData.ele1[2] : '';
  const ele2Registration = userData ? userData.ele2[2] : '';
  const ele3Registration = userData ? userData.ele3[2] : '';

  const getStatus = () => {
    const currentDate = new Date();

    if (userData) {
      const ele1Status = userData.ele1[1];
      const ele2Status = userData.ele2[1];
      const ele3Status = userData.ele3[1];
  
      // Assuming startDate is stored in the 3rd index of ele1
      const ele1StartDate = new Date(userData.ele1[3]);
      const ele2StartDate = new Date(userData.ele2[3]);
      const ele3StartDate = new Date(userData.ele3[3]);
  
      // Calculate difference in milliseconds
      const ele1TimeDifference = currentDate.getTime() - ele1StartDate.getTime();
      const ele2TimeDifference = currentDate.getTime() - ele2StartDate.getTime();
      const ele3TimeDifference = currentDate.getTime() - ele3StartDate.getTime();
  
      // Convert time difference to years
      const ele1YearsDifference = ele1TimeDifference / (1000 * 60 * 60 * 24 * 365);
      const ele2YearsDifference = ele2TimeDifference / (1000 * 60 * 60 * 24 * 365);
      const ele3YearsDifference = ele3TimeDifference / (1000 * 60 * 60 * 24 * 365);
  
      // Check if any activity has passed
      if (ele1Status === 'Passed' || ele2Status === 'Passed' || ele3Status === 'Passed') {
        return 'Passed';
      }
      
      // Check if time limit is reached and points are not achieved
      if ((ele1YearsDifference >= 1 && getTotalPoints() < 100 && ele1Status !== 'Passed') ||
          (ele2YearsDifference >= 1 && getTotalPoints() < 100 && ele2Status !== 'Passed') ||
          (ele3YearsDifference >= 1 && getTotalPoints() < 100 && ele3Status !== 'Passed')) {
        return 'Failed';
      }
    }
    return 'Ongoing';
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
              {ele1Registration}
            </Card.Text>
            <Card.Text className='text-justify'>
              Status: <StatusText status={getStatus()}>{getStatus()}</StatusText>
            </Card.Text>
            <Card.Text className='text-justify pb-3'>
              Points: {ele1TotalPoints}/100
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
              {ele2Registration}
            </Card.Text>
            <Card.Text className='text-justify'>
              Status: <StatusText status={getStatus()}>{getStatus()}</StatusText>
            </Card.Text>
            <Card.Text className='text-justify pb-3'>
              Points: {ele2TotalPoints}/100
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
              {ele3Registration}
            </Card.Text>
            <Card.Text className='text-justify'>
              Status: <StatusText status={getStatus()}>{getStatus()}</StatusText>
            </Card.Text>
            <Card.Text className='text-justify pb-3'>
              Points: {ele3TotalPoints}/100
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
