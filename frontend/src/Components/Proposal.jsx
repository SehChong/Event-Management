import React from 'react'
import { Container, Row, Col, Table, Form, Button, Card, ButtonGroup, Dropdown } from 'react-bootstrap';
import { FiPrinter, FiEdit, FiTrash2 } from 'react-icons/fi';

export const Proposal = ({ onFilterChange, onCreateProposal }) => {
    const student = {
        StudentNo: '1002058020',
        FullName: 'KONG SEH CHONG',
        Program: 'Foundation in Arts (Information Technology)',
      };
      
      const clubProposals = [
        { ClubName: 'Proposal 1', Status: 'Created' },
        { ClubName: 'Proposal 2', Status: 'Created' },
    ];

    const IconButton = ({ children, variant, onClick, className }) => (
        <Dropdown.Item as="button" className={className} onClick={onClick}>
          <Button variant={variant} className="me-2" style={{ padding: 0 }}>
            <span className="fas fa-fw fa-sm" aria-hidden="true"></span>
          </Button>
          {children}
        </Dropdown.Item>
    );
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Row>
                <Col>
                  <h5 className="font-weight-bold fs-4">Student Info:</h5>
                  <p>
                    Student No: {student.StudentNo} <br />
                    Full Name: {student.FullName} <br />
                    Program: {student.Program}
                  </p>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
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
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table striped bordered hover className="mt-4">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Club Name</th>
                        <th>Club Type</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clubProposals.map((proposal, index) => (
                        <tr key={proposal.ClubName}>
                          <td>{index + 1}</td>
                          <td>{proposal.ClubName}</td>
                          <td>{proposal.ClubType}</td>
                          <td>{proposal.Status}</td>
                          <td>
                            <ButtonGroup horizontal className='d-flex justify-content-center'>
                              <IconButton variant="secondary" onClick={() => {}} className="mb-2 px-2">
                                <FiPrinter /> Print
                              </IconButton>
                              <IconButton variant="info" onClick={() => {}} className="mb-2 px-2">
                                <FiEdit /> Edit
                              </IconButton>
                              <IconButton variant="danger" onClick={() => {}} className="mb-2 px-2">
                                <FiTrash2 /> Delete
                              </IconButton>
                            </ButtonGroup>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
