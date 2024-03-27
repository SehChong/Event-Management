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
        <Card style={{ width: '30rem    ' }} className='rounded'>
          <Card.Img variant="top" src={require("../Assets/img/event.avif")} />
          <Card.Body className='text-center'>
            <Card.Title className='fs-3'>Event</Card.Title>
            <Card.Text className='text-justify'>
            The Event module within the UCSI University Event Management System facilitates seamless organization and execution of various events hosted by the university. This module allows administrators to input comprehensive event details including event name, description, date, time, venue, category, and organizer information. Additionally, it enables efficient scheduling, registration, and management of event attendees. With features such as event capacity monitoring, budget allocation, sponsorship management, and marketing tools, this module ensures smooth planning and execution of events while also providing avenues for post-event evaluation and feedback collection            </Card.Text>
            <Button variant="primary">Learn More</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '30rem' }} className='rounded'>
          <Card.Img variant="top" src={require("../Assets/img/club.avif")} />
          <Card.Body className='text-center'>
            <Card.Title className='fs-3'>Club</Card.Title>
            <Card.Text className='text-justify'>
            The Club module within the UCSI University Event Management System serves as a centralized platform for managing university clubs and their activities. This module enables administrators to create detailed club profiles including club name, description, activities, officers, and membership information. Clubs can schedule meetings, plan events, manage budgets, and seek sponsorships efficiently through this module. With features for recruitment, communication, and constitution management, clubs can streamline their operations and engage with members effectively. Additionally, the module provides tools for club advisors to monitor and support club activities, fostering a vibrant club culture within the university.            </Card.Text>
            <Button variant="primary">Learn More</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '30rem' }} className='rounded'>
          <Card.Img variant="top" src={require("../Assets/img/attendance.avif")} />
          <Card.Body className='text-center'>
            <Card.Title className='fs-3'>Attendance</Card.Title>
            <Card.Text className='text-justify'>
            The Attendance module within the UCSI University Event Management System offers robust functionality for tracking and managing event attendance. This module allows administrators to create attendance records for events, monitor attendee participation, and generate comprehensive attendance reports. Attendees can be marked present or absent electronically, streamlining the attendance marking process and reducing administrative overhead. The module also provides features for attendance verification, analytics, and trend analysis, enabling administrators to gain insights into attendance patterns and make data-driven decisions. With automated alerts and summary views, this module ensures accurate and efficient management of event attendance, enhancing the overall event experience for participants.            </Card.Text>
            <Button variant="primary">Learn More</Button>
          </Card.Body>
        </Card>
      </CardContainer>
  )
}
