import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const EventForm = () => {
  const location = useLocation(); // use useLocation
  const proposal = location.state?.proposal || {}; // initialize proposal as an empty object if it's undefined

  const [eventType, setEventType] = useState(proposal?.eventType || '');
  const [eventName, setEventName] = useState(proposal?.eventName || '');
  const [organizedBy, setOrganizedBy] = useState(proposal?.organizedBy || '');
  const [eventDate, setEventDate] = useState(proposal?.eventDate || '');
  const [eventEndDate, setEventEndDate] = useState(proposal?.eventEndDate || '');
  const [eventTime, setEventTime] = useState(proposal?.eventTime || '');
  const [eventEndTime, setEventEndTime] = useState(proposal?.eventEndTime || '');
  const [publicityPeriod, setPublicityPeriod] = useState(proposal?.publicityPeriod || '');
  const [endPeriod, setEndPeriod] = useState(proposal?.endPeriod || '');
  const [venue, setVenue] = useState(proposal?.venue || '');
  const [estimatedAttendance, setEstimatedAttendance] = useState(proposal?.estimatedAttendance || '');
  const [totalHours, setTotalHours] = useState(proposal?.totalHours || '');
  const [elePointRequest, setElePointRequest] = useState(proposal?.elePointRequest || '');
  const [eventLevel, setEventLevel] = useState(proposal?.eventLevel || '');
  const [eventCategory, setEventCategory] = useState(proposal?.eventCategory || '');
  const [pdfFile, setPdfFile] = useState(proposal?.pdfFile || null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    const formData = {
        id: proposal.id,
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
        pdfFile: pdfFile ? pdfFile.name : null,
        status: "Pending"
    };
    if (proposal.id) {
      // Update the existing event
      fetch(`http://localhost:8000/events/${proposal.id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("Event updated:", data);
        // Clear the input fields or keep the event information for further editing
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });
    } else {
      // Create a new event
      fetch("http://localhost:8000/events", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        // Clear the input fields
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  return (
    <Container className="bg-danger p-5 my-5 rounded w-50 d-block">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="d-flex align-items-start">
            <Form.Label className='fs-1'>Event Proposal</Form.Label>
        </Form.Group>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label className='fw-bold'>Event Name:</Form.Label>
            <Form.Control type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} style={{width:400}}/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label className='fw-bold'>Event Type:</Form.Label>
            <Form.Select type="text" value={eventType} onChange={(e) => setEventType(e.target.value)} style={{width:410}}>
                  <option value="Event">Event</option>
                  <option value="Competition">Competition</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

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
          <Form.Control type="text" value={venue} onChange={(e) => setVenue(e.target.value)}/>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className='fw-bold'>Estimated Attendance:</Form.Label>
              <Form.Control type="number" value={estimatedAttendance} onChange={(e) => setEstimatedAttendance(e.target.value)} style={{width:250}}/>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label className='fw-bold'>Total Hours:</Form.Label>
              <Form.Control type="number" value={totalHours} onChange={(e) => setTotalHours(e.target.value)} style={{width:250}}/>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label className='fw-bold'>ELE Point Request:</Form.Label>
                <Form.Select type="text" value={elePointRequest} onChange={(e) => setElePointRequest(e.target.value)} style={{width:250}}>
                    <option value="Required">Yes</option>
                    <option value="None">No</option>
                </Form.Select>
            </Form.Group>
          </Col> 
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className='fw-bold'>Event / Competition Level:</Form.Label>
                <Form.Select type="text" value={elePointRequest} onChange={(e) => setEventLevel(e.target.value)} style={{width:200}}>
                    <option value="IL">International Level</option>
                    <option value="NL">National Level</option>
                    <option value="SL">State Level</option>
                    <option value="UL">University Level</option>
                    <option value="CFL">Club / Faculty Level</option>
                </Form.Select>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label className='fw-bold'>Event Category:</Form.Label>
              <Form.Select type="text" value={elePointRequest} onChange={(e) => setEventCategory(e.target.value)} style={{width:200}}>
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
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label className='fw-bold'>Upload PDF:</Form.Label>
              <Form.Control type="file" accept=".pdf" onChange={handleFileChange} style={{width:250}}/>
            </Form.Group>
          </Col>
        </Row>
        <input type="hidden" name="status" value="pending" />
        <Button variant="primary" type="submit" className='float-end'>
          Submit
        </Button>
      </Form>
    </Container>
  )
}
