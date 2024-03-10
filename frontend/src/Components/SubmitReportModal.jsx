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
          eventDataResponses.map(async (response) => {
            if (!response.ok) {
              // Skip if event data cannot be fetched
              return null;
            }
            return response.json();
          })
        );

        const currentDate = new Date();
        const registeredEventsData = eventData
          .filter(event => event && event.elePointRequest === 'Required' && new Date(event.eventEndDate) < currentDate) // Filter out null values, non-required events, and events that have not ended
          .map(event => {
            const eventEndDate = new Date(event.eventEndDate);
            const timeDifference = currentDate.getTime() - eventEndDate.getTime();
            let submissionStatus;
            if (timeDifference <= 7 * 24 * 60 * 60 * 1000) {
              submissionStatus = event.submittedReport ? "Approved" : "Ongoing";
            } else {
              submissionStatus = "Rejected";
            }
            return {
              eventName: event.eventName,
              eventDate: event.eventDate,
              eventEndDate: event.eventEndDate, // Convert to a readable format
              totalELEPoints: event.totalELEPoints,
              submissionStatus: submissionStatus,
              submittedReport: event.submittedReport || false // Assuming none of the reports are submitted initially
            };
          });

        setData(registeredEventsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEventData();
  }, []);
    
  const handleSubmit = (eventDetails) => {
    // const updatedData = [...data];
    // updatedData[index].submittedReport = "Yes";
    // setData(updatedData);
    // navigate("/accordion-form")
    navigate("/accordion-form", { state: { eventDetails } }); // Navigate to AccordionForm with eventDetails in location state
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
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.eventName}</td>
            <td>{item.eventDate}</td>
            <td>{item.eventEndDate}</td>
            <td>{item.totalELEPoints}</td>
            <td className={item.submissionStatus === "Approved" ? "text-success" : item.submissionStatus === "Rejected" ? "text-danger" : "text-warning"}>{item.submissionStatus}</td>
            <td>{item.submittedReport ? "Yes" : "No"}</td>
            <td>
              {!item.submittedReport && (
                <Button variant="primary" onClick={() => handleSubmit(item)}>
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
