import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

export const EventProposal = () => {
    const [eventType, setEventType] = useState('');
    const [eventName, setEventName] = useState('');
    const [organizedBy, setOrganizedBy] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
    const [publicityPeriod, setPublicityPeriod] = useState('');
    const [endPeriod, setEndPeriod ] = useState('');
    const [venue, setVenue] = useState('');
    const [estimatedAttendance, setEstimatedAttendance] = useState('');
    const [totalHours, setTotalHours] = useState('');
    const [elePointRequest, setElePointRequest] = useState('');
    const [eventLevel, setEventLevel] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [pdfFile, setPdfFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
        eventType,
        eventName,
        organizedBy,
        eventDate,
        eventEndDate,
        eventTime,
        eventEndTime,
        publicityPeriod,
        endPeriod,
        venue,
        estimatedAttendance,
        totalHours,
        elePointRequest,
        eventLevel,
        eventCategory,
        pdfFile,
    });
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  return (
    <Container className="d-flex justify-content-center p-5">
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
          <Form.Label className='fw-bold'>Event Type:</Form.Label>
          <Form.Select type="text" value={eventType} onChange={(e) => setEventType(e.target.value)}>
                <option value="E">Event</option>
                <option value="C">Competition</option>
            </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className='fw-bold'>Event Name:</Form.Label>
          <Form.Control type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className='fw-bold'>Organized By:</Form.Label>
          <Form.Control type="text" value={organizedBy} onChange={(e) => setOrganizedBy(e.target.value)} />
        </Form.Group>

        <Row className="g-3 mb-3">
      <Col>
        <Form.Group>
          <Form.Label className="fw-bold">Event Date:</Form.Label>
          <Form.Control type="date" className="form-control" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group>
          <Form.Label className="fw-bold">Event End Date:</Form.Label>
          <Form.Control type="date" className="form-control" value={eventEndDate} onChange={(e) => setEventEndDate(e.target.value)} />
        </Form.Group>
      </Col>
    </Row>

    <Row className="g-3 mb-3">
      <Col>
        <Form.Group>
          <Form.Label className="fw-bold">Event Time:</Form.Label>
          <Form.Control type="time" className="form-control" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group>
          <Form.Label className="fw-bold">Event End Time:</Form.Label>
          <Form.Control type="time" className="form-control" value={eventEndTime} onChange={(e) => setEventEndTime(e.target.value)} />
        </Form.Group>
      </Col>
    </Row>

    <Row className="g-3 mb-3">
      <Col>
        <Form.Group>
          <Form.Label className="fw-bold">Publicity Period:</Form.Label>
          <Form.Control type="date" className="form-control" value={publicityPeriod} onChange={(e) => setPublicityPeriod(e.target.value)} />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group>
          <Form.Label className="fw-bold">End Period:</Form.Label>
          <Form.Control type="date" className="form-control" value={endPeriod} onChange={(e) => setEndPeriod(e.target.value)} />
        </Form.Group>
      </Col>
    </Row>

        <Form.Group className="mb-3">
          <Form.Label className='fw-bold'>Venue:</Form.Label>
          <Form.Control type="text" value={venue} onChange={(e) => setVenue(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className='fw-bold'>Estimated Attendance:</Form.Label>
          <Form.Control type="number" value={estimatedAttendance} onChange={(e) => setEstimatedAttendance(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className='fw-bold'>Total Hours:</Form.Label>
          <Form.Control type="number" value={totalHours} onChange={(e) => setTotalHours(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className='fw-bold'>ELE Point Request:</Form.Label>
            <Form.Select type="text" value={elePointRequest} onChange={(e) => setElePointRequest(e.target.value)}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className='fw-bold'>Event / Competition Level:</Form.Label>
            <Form.Select type="text" value={elePointRequest} onChange={(e) => setEventLevel(e.target.value)}>
                <option value="IL">International Level</option>
                <option value="NL">National Level</option>
                <option value="SL">State Level</option>
                <option value="UL">University Level</option>
                <option value="CFL">Club / Faculty Level</option>
            </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className='fw-bold'>Event Category:</Form.Label>
          <Form.Select type="text" value={elePointRequest} onChange={(e) => setEventCategory(e.target.value)}>
                <option value="1">Conferences</option>
                <option value="2">Seminar</option>
                <option value="3">Meetings</option>
                <option value="4">Dinner/Lunches</option>
                <option value="5">Exhibition</option>
                <option value="6">Camp</option>
                <option value="7">Trade Fairs/Job Fairs/Carnival</option>
                <option value="8">Award Ceremonies</option>
                <option value="9">Talk/Forum</option>
                <option value="10">Performance/Screening</option>
                <option value="11">Religious Activity</option>
                <option value="12">Sport Activities/Competition</option>
                <option value="13">Community Service</option>
            </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className='fw-bold'>Upload PDF:</Form.Label>
          <Form.Control type="file" accept=".pdf" onChange={handleFileChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}
