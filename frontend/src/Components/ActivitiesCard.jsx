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
import { SubmitReportModal } from './SubmitReportModal';
import { ActivitiesModal1 } from './ActivitiesModal1';
import { ActivitiesModal2 } from './ActivitiesModal2';
import { ActivitiesModal3 } from './ActivitiesModal3';

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
  const [optSmReportModal, setOptSmReportModal] = useState(false);
  // Define state variables for controlling modals for each ELE
  const [optSmActivitiesModal1, setOptSmActivitiesModal1] = useState(false);
  const [optSmActivitiesModal2, setOptSmActivitiesModal2] = useState(false);
  const [optSmActivitiesModal3, setOptSmActivitiesModal3] = useState(false);

  // Modify toggleActivitiesModal function to accept an argument specifying the ELE number
  const toggleActivitiesModal = (eleNumber) => {
    switch (eleNumber) {
      case 1:
        setOptSmActivitiesModal1(!optSmActivitiesModal1);
        break;
      case 2:
        setOptSmActivitiesModal2(!optSmActivitiesModal2);
        break;
      case 3:
        setOptSmActivitiesModal3(!optSmActivitiesModal3);
        break;
      default:
        break;
    }
  };

  // Function to get the total points from ele1, ele2, and ele3
  const getTotalPoints = () => {
    // Check if userData is available
    if (userData) {
      // Retrieve total points from each ele
      const ele1TotalPoints = parseInt(userData.ele1[1]);
      const ele2TotalPoints = parseInt(userData.ele2[1]);
      const ele3TotalPoints = parseInt(userData.ele3[1]);

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

  const getStatus = (activity) => {
    const currentDate = new Date();
  
    if (userData) {
      const [_, status, registration, startDate] = userData[activity];
      const points = parseInt(userData[activity][1]);
      
      const startDateObj = new Date(startDate);
      const timeDifference = currentDate.getTime() - startDateObj.getTime();
      const yearsDifference = timeDifference / (1000 * 60 * 60 * 24 * 365);
  
      if (registration !== 'Unregistered') {
        if (status === 'Passed' || (points >= 100 && yearsDifference < 1)) {
          return 'Passed';
        }
    
        if (yearsDifference >= 1 && status !== 'Passed') {
          return 'Failed';
        }
      }
  
      return 'Ongoing';
    }
  
    return 'Ongoing';
  };
  
  const resetEle1Points = async () => {
    try {
      // Create a copy of the user data
      const updatedUserData = { ...userData };
  
      // Set ele1 points to 0
      updatedUserData.ele1[1] = 0;
  
      // Send a PUT request to update the user data
      const response = await fetch(`http://localhost:8000/user/${sessionStorage.getItem("username")}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUserData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to reset ele1 points');
      }
  
      // Update the state with the updated user data
      setUserData(updatedUserData);
    } catch (error) {
      console.error('Error resetting ele1 points:', error);
    }
  };
  
  const toggleReportModal = () => setOptSmReportModal(!optSmReportModal);

  return (
    <div className='text-center mt-5'>
      <MDBBtn class='btn btn-primary btn-lg'variant="primary" onClick={toggleReportModal}>
        Submit Report
      </MDBBtn>
      <MDBBtn variant="primary" onClick={resetEle1Points}>
      Reset Points for ELE 1
      </MDBBtn>

    <CardContainer className='gap-5'>
      <CardWrapper>
        <Card className="rounded" style={{ width: '25rem'}}>
          <Card.Img variant="top" src="https://via.placeholder.com/150" />
          <Card.Body className='text-center'>
            <Card.Title className='fs-3'>ELE 1</Card.Title>
            <Card.Text className='text-justify text-center pb-3'>
              {ele1Registration}
            </Card.Text>
            <Card.Text className='text-justify'>
              Status: <StatusText status={getStatus('ele1')}>{getStatus('ele1')}</StatusText>
            </Card.Text>
            <Card.Text className='text-justify pb-3'>
              Points: {ele1TotalPoints}/100
            </Card.Text>
            <MDBBtn variant="primary" onClick={() => toggleActivitiesModal(1)}>View Activities</MDBBtn>
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
              Status: <StatusText status={getStatus('ele2')}>{getStatus('ele2')}</StatusText>
            </Card.Text>
            <Card.Text className='text-justify pb-3'>
              Points: {ele2TotalPoints}/100
            </Card.Text>
            <MDBBtn variant="primary" onClick={() => toggleActivitiesModal(2)}>View Activities</MDBBtn>
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
              Status: <StatusText status={getStatus('ele3')}>{getStatus('ele3')}</StatusText>
            </Card.Text>
            <Card.Text className='text-justify pb-3'>
              Points: {ele3TotalPoints}/100
            </Card.Text>
            <MDBBtn variant="primary" onClick={() => toggleActivitiesModal(3)}>View Activities</MDBBtn>
          </Card.Body>
        </Card>
      </CardWrapper>
    </CardContainer>

    {/* SubmitReportModal */}
    <MDBModal open={optSmReportModal} tabIndex='-1' setOpen={setOptSmReportModal}>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Submit Report</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleReportModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <SubmitReportModal />
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

    {/* ActivitiesModal */}
    <MDBModal open={optSmActivitiesModal1} tabIndex='-1' setOpen={setOptSmActivitiesModal1}>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Activities</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setOptSmActivitiesModal1(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <ActivitiesModal1/>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <MDBModal open={optSmActivitiesModal2} tabIndex='-1' setOpen={setOptSmActivitiesModal2}>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Activities</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setOptSmActivitiesModal2(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <ActivitiesModal2/>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <MDBModal open={optSmActivitiesModal3} tabIndex='-1' setOpen={setOptSmActivitiesModal3}>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Activities</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setOptSmActivitiesModal3(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <ActivitiesModal3/>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}
