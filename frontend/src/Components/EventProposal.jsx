import React from 'react'
import { Container, Row, Col, Table, Form, Button, Card, ButtonGroup, Dropdown } from 'react-bootstrap';
import { FiPrinter, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EventPrintModal from './EventPrintModal';

export const EventProposal = ({ onFilterChange }) => {
    const student = {
        StudentNo: '1002058020',
        FullName: 'Kong Seh Chong',
        Program: 'Foundation in Arts (Information Technology)',
        Image: 'https://via.placeholder.com/150',
      };
      
    const [clubProposals, setClubProposals] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
          const response = await fetch('http://localhost:8000/events'); // Replace with the URL of your JSON server
          const data = await response.json();
          setClubProposals(data);
      };
      fetchData();
    }, []);

    const onCreateProposal = () => {
      navigate('/eventForm');
    }

    const handleDeleteProposal = async (id) => {
      const response = await fetch(`http://localhost:8000/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setClubProposals(clubProposals.filter((proposal) => proposal.id !== id));
      } else {
        console.log('Error:', data);
      }
    };

    const handleEditProposal = (proposal) => {
      navigate('/eventForm', { state: { proposal } });
    };

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showPrintModal, setShowPrintModal] = useState(false);
    
    const handlePrintProposal = (event) => {
      setSelectedEvent(event);
      setShowPrintModal(true);
    };
    
    const handleClosePrintModal = () => {
      setSelectedEvent(null);
      setShowPrintModal(false);
    };

    const IconButton = ({ children, variant, onClick, className }) => (
        <Dropdown.Item as="button" className={className} onClick={onClick}>
          <Button variant={variant} className="me-2" style={{ padding: 0 }}>
            <span className="fas fa-fw fa-sm" aria-hidden="true"></span>
          </Button>
          {children}
        </Dropdown.Item>
    );
  return (
    <Container fluid className="my-5" style={{ height: '90vh', overflowY: 'auto' }}>
      <Row className="h-100">
        <Col md={4} className="h-100 d-flex flex-column justify-content-center">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <h5 className="font-weight-bold fs-4">Student Info:</h5>
              <div className='d-flex justify-content-center mb-3' style={{padding:100}}>
                <img src={student.Image} alt="Profile" className="rounded-circle d-block mx-auto" width="250" height="250" />
              </div>
              <p className='fs-5'> 
                Student No: {student.StudentNo} <br />
                Full Name: {student.FullName} <br />
                Program: {student.Program}
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} className="h-100">
          <Card className="h-100 shadow-sm">
            <Card.Body className="h-100 d-flex flex-column">
              <Form.Label>Select Status:</Form.Label>
              <Form.Select onChange={(e) => onFilterChange(e.target.value)} className="mb-3">
                <option value="All">All</option>
                <option value="Created">Created</option>
                <option value="Submitted">Submitted</option>
                <option value="Approved">Approved</option>
              </Form.Select>
              <Button variant="primary" onClick={onCreateProposal}>
                Create New Proposal
              </Button>
              <Table striped bordered hover className="mb-auto">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Event Name</th>
                    <th>Event Type</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {clubProposals.map((proposal, index) => (
                    <tr key={proposal.id}>
                      <td>{index + 1}</td>
                      <td>{proposal.eventName}</td>
                      <td>{proposal.eventType}</td>
                      <td>{proposal.status}</td>
                      <td>
                        <ButtonGroup horizontal className='d-flex justify-content-center'>
                          <IconButton variant="secondary" onClick={() => handlePrintProposal(proposal)} className="mb-2 px-2">
                          {selectedEvent && <EventPrintModal event={selectedEvent} onHide={handleClosePrintModal} show={showPrintModal} />}
                            <FiPrinter /> Print
                          </IconButton>
                          <IconButton variant="info" onClick={() => handleEditProposal(proposal)} className="mb-2 px-2">
                            <FiEdit /> Edit
                          </IconButton>
                          <IconButton variant="danger" onClick={() => handleDeleteProposal(proposal.id)} className="mb-2 px-2">
                            <FiTrash2 /> Delete
                          </IconButton>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
