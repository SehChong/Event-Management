import React from 'react'
import { Container, Row, Col, Table, Form, Button, Card, ButtonGroup, Dropdown } from 'react-bootstrap';
import { FiPrinter, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EventPrintModal from './EventPrintModal';

const ITEMS_PER_PAGE = 10;

export const EventProposal = ({ onFilterChange }) => {
      
    const [eventProposals, setEventProposals] = useState([]);
    const [student, setStudent] = useState({
      name: "",
      studentNo: "",
      program: "",
      image: "",
    });
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/user/${sessionStorage.getItem("username")}`);
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          const data = await response.json();
          setStudent({
            name: data.name,
            studentNo: data.studentNo,
            program: data.program,
            image: data.image,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }, []);

    useEffect(() => {
      const fetchEventProposals = async () => {
        try {
          const response = await fetch(`http://localhost:8000/events?userId=${sessionStorage.getItem("username")}`);
          if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
          }
          const data = await response.json();
          setEventProposals(data);
        } catch (error) {
          console.error('Error fetching events data:', error);
        }
      };
      fetchEventProposals();
    }, [student]);

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
        setEventProposals(eventProposals.filter((proposal) => proposal.id !== id));
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
    
    useEffect(() => {
      setTotalPages(Math.ceil(eventProposals.length / ITEMS_PER_PAGE));
      setCurrentPage(1);
    }, [eventProposals]);
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = eventProposals.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container fluid className="my-5" style={{ height: '110vh', overflowY: 'auto' }}>
      <Row className="h-100">
        <Col md={4} className="h-100 d-flex flex-column justify-content-center">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <h5 className="font-weight-bold fs-4">Student Info:</h5>
              <div className='d-flex justify-content-center mb-3' style={{padding:100}}>
              <img src={student.image} alt="Profile" className="rounded-circle d-block mx-auto" width="250" height="250" />
              </div>
              <p className='fs-5'> 
                Student No: {student.studentNo} <br />
                Full Name: {student.name} <br />
                Program: {student.program}
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
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
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
                  {currentItems.map((proposal, index) => (
                    <tr key={proposal.id}>
                      <td>{index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}</td>
                      <td>{proposal.eventName}</td>
                      <td>{proposal.eventType}</td>
                      <td className={`text-${proposal.status === "Pending" ? "warning" : proposal.status === "Approved" ? "success" : proposal.status === "Rejected" ? "danger" : "dark"}`}>{proposal.status}</td>                      <td>
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
              <nav aria-label="Page navigation example" className='mt-5'>
                <ul className="pagination justify-content-end">
                  {currentPage > 1 && (
                    <li className="page-item">
                      <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
                    </li>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                    if (totalPages > 10) {
                      if (page === currentPage || page === currentPage - 1 || page === currentPage - 2 || page === currentPage + 1 || page === currentPage + 2 || page === 1 || page === totalPages) {
                        return (
                          <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                            <a className="page-link" href="#" onClick={() => handlePageChange(page)}>{page}</a>
                          </li>
                        );
                      } else if (page === currentPage - 3 || page === currentPage + 3) {
                        return (
                          <li key={page} className="page-item">
                            <a className="page-link" href="#">...</a>
                          </li>
                        );
                      }
                    } else {
                      return (
                        <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                          <a className="page-link" href="#" onClick={() => handlePageChange(page)}>{page}</a>
                        </li>
                      );
                    }
                  })}
                  {currentPage < totalPages && (
                    <li className="page-item">
                      <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
                    </li>
                  )}
                </ul>
              </nav>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
