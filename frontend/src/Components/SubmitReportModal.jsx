import React from 'react'
import { Table, Button } from "react-bootstrap";
import { HiDocument } from "react-icons/hi2";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SubmitReportModal = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/${sessionStorage.getItem("username")}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        const registeredEvents = userData.registeredEvents || [];

        const eventPromises = registeredEvents.map(eventId => {
          return fetch(`http://localhost:8000/events/${eventId}`);
        });

        const eventDataResponses = await Promise.all(eventPromises);

        const eventData = await Promise.all(
          eventDataResponses.map(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch event data');
            }
            return response.json();
          })
        );

        const registeredEventsData = eventData.map(event => {
          if (event.elePointRequest === 'Required') {
            return {
              eventName: event.eventName,
              eventDate: event.eventDate,
              eventEndDate: event.eventEndDate,
              totalELEPoints: event.totalELEPoints,
              status: event.status,
              submittedReport: false // Assuming none of the reports are submitted initially
            };
          }
          return null;
        }).filter(Boolean);
        
        setData(registeredEventsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEventData();
  }, []);
    
      const handleSubmit = (index) => {
        const updatedData = [...data];
        updatedData[index].submittedReport = "Yes";
        setData(updatedData);
        navigate("/accordion-form")
      };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Event Name</th>
          <th>Participated Date</th>
          <th>End Date</th>
          <th>Marks</th>
          <th>Status</th>
          <th>Submitted Report</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.no}>
            <td>{item.no}</td>
            <td>{item.eventName}</td>
            <td>{item.eventDate}</td>
            <td>{item.eventEndDate}</td>
            <td>{item.totalELEPoints}</td>
            <td>{item.status}</td>
            <td>{item.submittedReport ? "Yes" : "No"}</td>
            <td>
              {!item.submittedReport && (
                <Button variant="primary" onClick={() => handleSubmit(index)}>
                  <HiDocument />
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
