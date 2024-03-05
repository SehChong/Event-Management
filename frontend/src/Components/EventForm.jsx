import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EventForm = () => {
  const location = useLocation(); // use useLocation
  const proposal = location.state?.proposal || {}; // initialize proposal as an empty object if it's undefined
  const userId = sessionStorage.getItem("username");

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
  const [mode, setMode] = useState(proposal?.mode || '');
  const [platform, setPlatform] = useState(proposal?.platform || '');
  const [link, setLink] = useState(proposal?.link || '');
  const [userIdValue, setUserIdValue] = useState(userId || '');

  const clearInputFields = () => {
    setEventType('');
    setEventName('');
    setOrganizedBy('');
    setEventDate('');
    setEventEndDate('');
    setEventTime('');
    setEventEndTime('');
    setPublicityPeriod('');
    setEndPeriod('');
    setVenue('');
    setEstimatedAttendance('');
    setTotalHours('');
    setElePointRequest('');
    setEventLevel('');
    setEventCategory('');
    setPdfFile(null);
    setMode('');
    setPlatform('');
    setLink('');
    setUserIdValue('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    const form = e.target;
    if (form.checkValidity() === false) {
      alert("Please fill in all required fields.");
      return;
    }

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
        userId: userIdValue,
        status: "Pending",
        mode,
        link,
        platform
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
        toast.success('Event created successfully!', { autoClose: 2000 });
        clearInputFields();
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

  useEffect(() => {
    if (eventTime && eventEndTime) {
      const startTime = new Date(`2022-01-01T${eventTime}:00Z`);
      const endTime = new Date(`2022-01-01T${eventEndTime}:00Z`);
      const diffInMilliseconds = endTime - startTime;
      const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
      setTotalHours(diffInHours.toFixed(2));
    }
  }, [eventTime, eventEndTime]);

  const [eventEndDateError, setEventEndDateError] = useState('');
  const [publicityEndDateError, setPublicityEndDateError] = useState('');

  useEffect(() => {
    const eventEndDateObj = new Date(eventEndDate);
    const eventDateObj = new Date(eventDate);

    if (eventEndDateObj < eventDateObj) {
      setEventEndDateError('Event end date should not be earlier than the event date.');
  
      // Display an error toast message
      toast.error('Event end date should not be earlier than the event date.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setEventEndDateError('');
    }  

    const publicityEndDateObj = new Date(publicityPeriod);
    const publicityPeriodObj = new Date(endPeriod);

    if (publicityEndDateObj < publicityPeriodObj) {
      setPublicityEndDateError('Publicity end date should not be earlier than the publicity date.');
  
      // Display an error toast message
      toast.error('Publicity end date should not be earlier than the publicity date.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setPublicityEndDateError('');
    }
  },[eventDate, eventEndDate, publicityPeriod, endPeriod]);

  return (
    <Container className="bg-danger p-5 my-5 rounded w-50 d-block">
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="d-flex align-items-start">
            <Form.Label className='fs-1'>Event Proposal</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" style={{ display: 'none' }}>
          <Form.Label className='fw-bold'>User:</Form.Label>
          <Form.Control type="text" value={userIdValue} onChange={(e) => setUserIdValue(e.target.value)} readOnly />
        </Form.Group>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label className='fw-bold'>Event Name:</Form.Label>
            <Form.Control type="text" required value={eventName} onChange={(e) => setEventName(e.target.value)} style={{width:400}}/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label className='fw-bold'>Event Type:</Form.Label>
            <Form.Select type="text" required value={eventType} onChange={(e) => setEventType(e.target.value)} style={{width:410}}>
                  <option value="">Select Type</option>
                  <option value="Event">Event</option>
                  <option value="Competition">Competition</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

        <Form.Group className="mb-3">
          <Form.Label className='fw-bold'>Organized By:</Form.Label>
          <Form.Control type="text" required value={organizedBy} onChange={(e) => setOrganizedBy(e.target.value)} />
        </Form.Group>

      <Row className="g-3 mb-3">
      <Col>
        <Form.Group>
          <Form.Label className="fw-bold">Event Date:</Form.Label>
          <Form.Control type="date" required className="form-control" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group>
          <Form.Label className="fw-bold">Event End Date:</Form.Label>
          <Form.Control type="date" required className="form-control" value={eventEndDate} onChange={(e) => setEventEndDate(e.target.value)} isInvalid={eventEndDateError}/>
          <Form.Control.Feedback type="invalid">Event end date should not be earlier than the event date.</Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>

    <Row className="g-3 mb-3">
      <Col>
        <Form.Group>
          <Form.Label className="fw-bold">Event Time:</Form.Label>
          <Form.Control type="time" required className="form-control" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group>
          <Form.Label className="fw-bold">Event End Time:</Form.Label>
          <Form.Control type="time" required className="form-control" value={eventEndTime} onChange={(e) => setEventEndTime(e.target.value)} />
        </Form.Group>
      </Col>
    </Row>

    <Row className="g-3 mb-3">
      <Col>
        <Form.Group>
          <Form.Label className="fw-bold">Publicity Period:</Form.Label>
          <Form.Control type="date" required className="form-control" value={publicityPeriod} onChange={(e) => setPublicityPeriod(e.target.value)} />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group>
          <Form.Label className="fw-bold">End Period:</Form.Label>
          <Form.Control type="date" required className="form-control" value={endPeriod} onChange={(e) => setEndPeriod(e.target.value)} isInvalid={publicityEndDateError}/>
          <Form.Control.Feedback type="invalid">End period end date should not be earlier than the end period start date.</Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>

        <Form.Group className="mb-3">
          <Form.Label className='fw-bold'>Mode:</Form.Label>
          <Form.Select type="text" required value={mode} onChange={(e) => setMode(e.target.value)} style={{width:200}}>
            <option value="">Select Mode</option>
            <option value="Physical">Physical</option>
            <option value="Online">Online</option>
          </Form.Select>
        </Form.Group>

        {mode === "Physical" && (
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className='fw-bold'>Venue:</Form.Label>
              <Form.Control type="text" required value={venue} onChange={(e) => setVenue(e.target.value)} />
            </Form.Group>
          </Col>
        )}
        {mode === "Online" && (
          <>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className='fw-bold'>Platform:</Form.Label>
                <Form.Control type="text" required value={platform} onChange={(e) => setPlatform(e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className='fw-bold'>Link:</Form.Label>
                <Form.Control type="text" required value={link} onChange={(e) => setLink(e.target.value)} />
              </Form.Group>
            </Col>
          </>
        )}

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className='fw-bold'>Estimated Attendance:</Form.Label>
              <Form.Control type="number" required value={estimatedAttendance} onChange={(e) => setEstimatedAttendance(e.target.value)} style={{width:250}}/>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label className='fw-bold'>Total Hours:</Form.Label>
              <Form.Control type="number" required readOnly value={totalHours} onChange={(e) => setTotalHours(e.target.value)} style={{width:250}}/>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label className='fw-bold'>ELE Point Request:</Form.Label>
                <Form.Select type="text" required value={elePointRequest} onChange={(e) => setElePointRequest(e.target.value)} style={{width:250}}>
                    <option value="">Select...</option>
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
                <Form.Select type="text" required value={eventLevel} onChange={(e) => setEventLevel(e.target.value)} style={{width:200}}>
                    <option value="">Select Level</option>
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
              <Form.Select type="text" required value={eventCategory} onChange={(e) => setEventCategory(e.target.value)} style={{width:200}}>
                    <option value="">Select Category</option>
                    <option value="conferences">Conferences</option>
                    <option value="seminar">Seminar</option>
                    <option value="meetings">Meetings</option>
                    <option value="DL">Dinner/Lunches</option>
                    <option value="exhibition">Exhibition</option>
                    <option value="camp">Camp</option>
                    <option value="TF">Trade Fairs/Job Fairs/Carnival</option>
                    <option value="AC">Award Ceremonies</option>
                    <option value="talk">Talk/Forum</option>
                    <option value="PS">Performance/Screening</option>
                    <option value="religious">Religious Activity</option>
                    <option value="sport">Sport Activities/Competition</option>
                    <option value="community">Community Service</option>
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
