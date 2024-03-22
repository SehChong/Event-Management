import React from 'react'
import { Table, Button } from "react-bootstrap";
import { HiDocument } from "react-icons/hi2";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SubmitReportModal = ( {userId} ) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
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
                        submissionStatus = event.submittedReport ? "Pending" : "Pending";
                    } else {
                        submissionStatus = event.submittedReport ? "Approved" : "Rejected";
                    }
                    return {
                        event: event.id,
                        eventName: event.eventName,
                        eventDate: event.eventDate,
                        eventEndDate: event.eventEndDate,
                        totalELEPoints: event.totalELEPoints,
                        submissionStatus: submissionStatus,
                        submittedReport: event.submittedReport || false // Assuming none of the reports are submitted initially
                    };
                });

                console.log(registeredEventsData)

            // Fetch report data
            const reportResponse = await fetch('http://localhost:8000/reports');
            if (!reportResponse.ok) {
                throw new Error('Failed to fetch report data');
            }
            const reportData = await reportResponse.json();

            // Filter report data for the current user
            const userReportData = reportData.filter(report => report.userId === sessionStorage.getItem("username"));

            const updatedData = registeredEventsData.map(event => {
              const report = userReportData.find(report => report.eventName === event.eventName);
              if (report) {
                  return {
                      eventId: event.id,
                      eventName: event.eventName,
                      eventDate: event.eventDate,
                      eventEndDate: event.eventEndDate,
                      totalELEPoints: event.totalELEPoints,
                      submissionStatus: report.submissionStatus,
                      submittedReport: report.submittedReport
                  };
              }
              return event;
              });
              console.log(updatedData)
              setData(updatedData);
              } catch (error) {
                  console.error('Error fetching data:', error);
              }
    };

      fetchEventData();
    }, [userId]);

  const handleSubmit = (event) => {
    navigate("/accordion-form", { state: { eventDetails: event } }); // Navigate to AccordionForm with eventDetails in location state
  };

  const getStatusColor = (submissionStatus) => {
    switch (submissionStatus) {
      case "Approved":
        return "text-success";
      case "Pending":
        return "text-warning";
      case "Rejected":
        return "text-danger";
      default:
        return "";
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div>
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
        {currentItems.map((event, index) => {
        return (
            <tr key={event.id}>
              <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
              <td>{event.eventName}</td>
              <td>{event.eventDate}</td>
              <td>{event.eventEndDate}</td>
              <td>{event.totalELEPoints}</td>
              <td className={getStatusColor(event.submissionStatus)}>{event.submissionStatus}</td>
              <td>{event.submittedReport ? "Yes" : "No"}</td>
              <td>
              {!event.submittedReport ? (
                  <Button variant="primary" onClick={() => handleSubmit(event)}>
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
    <nav aria-label="Page navigation example" className="mt-5">
        <ul className="pagination justify-content-end">
          {currentPage > 1 && (
            <li className="page-item">
              <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
            </li>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
              <a className="page-link" href="#" onClick={() => handlePageChange(page)}>{page}</a>
            </li>
          ))}
          {currentPage < totalPages && (
            <li className="page-item">
              <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
            </li>
          )}
        </ul>
      </nav>
  </div>
  )
}