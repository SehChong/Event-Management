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

  // Use for check the report event id and the event id available to make the report submit once only
  useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch event data
                const eventDataResponse = await fetch(`http://localhost:8000/user/${sessionStorage.getItem("username")}`);
                if (!eventDataResponse.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const eventData = await eventDataResponse.json();

                // Fetch report data
                const reportResponse = await fetch('http://localhost:8000/reports');
                if (!reportResponse.ok) {
                    throw new Error('Failed to fetch report data');
                }
                const reportData = await reportResponse.json();

                // Merge event and report data
                const updatedEventData = eventData.registeredEvents.map(eventId => {
                    const event = eventData.events.find(event => event.id === eventId);
                    const report = reportData.find(report => report.eventId === eventId);
                    const submissionStatus = report ? report.submissionStatus : "Pending";
                    const submittedReport = report ? report.submittedReport : false;
                    return {
                        ...event,
                        submissionStatus,
                        submittedReport
                    };
                });

                setData(updatedEventData);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                // Handle the error gracefully
            }
        };

        fetchData();
    }, []);
    
  const handleSubmit = (eventId) => {
    const event = data.find(event => event.id === eventId);
        if (!event) {
            console.error('Event details not found');
            return;
        }

        // Check if report already submitted for the event
        if (event.submittedReport) {
            console.error('Report already submitted for this event');
            return;
        }
    navigate("/accordion-form", { state: { eventDetails: event } }); // Navigate to AccordionForm with eventDetails in location state
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
        {data.map((event, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{event.eventName}</td>
              <td>{event.eventDate}</td>
              <td>{event.eventEndDate}</td>
              <td>{event.totalELEPoints}</td>
              <td>{event.submissionStatus}</td>
              <td>{event.submittedReport ? "Yes" : "No"}</td>
              <td>
              {!event.submittedReport && event.submissionStatus !== "Approved" ? (
                  <Button variant="primary" onClick={() => handleSubmit(event.id)}>
                      <HiDocument />
                  </Button>
               ) : (
                  <Button variant="primary" disabled>
                      <HiDocument />
                  </Button>
              )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  )
}
