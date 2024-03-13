import React, { useState, useEffect } from 'react';
import { Table, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { AccordionQuestion } from './AccordionQuestion';

export const ActivitiesModal2 = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

    const fetchReportsData = async () => {
      try {
        const response = await fetch('http://localhost:8000/reports');
        if (!response.ok) {
          throw new Error('Failed to fetch report data');
        }
        const reportData = await response.json();
        const userReports = reportData.filter(report => report.userId === sessionStorage.getItem("username"));
        // Filter reports to include only ELE 2 events
        const ele2Reports = userReports.filter(report => report.ele === 'ele2');
        setReports(ele2Reports);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    useEffect(() => {
      fetchReportsData();

    // Set up interval for polling
    const intervalId = setInterval(fetchReportsData, 1000); // Fetch data every 1 minute

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleViewQuestions = (report) => {
    navigate("/accordion-questions", { state: { eventDetails: report } });
  };

  return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Event End</th>
            <th>Event Points</th>
            <th>ELE</th>
            <th>Submission Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>{report.eventName}</td>
              <td>{report.eventDate}</td>
              <td>{report.eventEndDate}</td>
              <td>{report.totalELEPoints}</td>
              <td>{report.ele}</td>
              <td>{report.submissionStatus}</td>
              <td>
                <Button variant="primary" onClick={() => handleViewQuestions(report)}>
                  View Questions
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
  );
};

