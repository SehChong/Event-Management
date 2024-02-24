import React from 'react'
import { Table, Button } from "react-bootstrap";
import { HiDocument } from "react-icons/hi2";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ActivitiesTable = () => {

    const [data, setData] = useState([
        {
          no: 1,
          eventName: "Event 1",
          participatedDate: "2022-01-01",
          endDate: "2022-01-05",
          marks: 10,
          status: "Approved",
          submittedReport: false,
        },
        {
          no: 2,
          eventName: "Event 2",
          participatedDate: "2022-01-02",
          endDate: "2022-01-06",
          marks: 20,
          status: "Rejected",
          submittedReport: false,
        },
      ]);

      const navigate = useNavigate();
    
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
            <td>{item.participatedDate}</td>
            <td>{item.endDate}</td>
            <td>{item.marks}</td>
            <td>{item.status}</td>
            <td>{item.submittedReport ? "Yes" : "No"}</td>
            <td>
              <Button variant="primary" onClick={() => handleSubmit(index)}>
                <HiDocument />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
