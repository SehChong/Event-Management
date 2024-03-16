import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

export const ClubForm = () => {
  const location = useLocation(); // use useLocation
  const proposal = location.state?.proposal || {}; // initialize proposal as an empty object if it's undefined

  const [formData, setFormData] = useState({
    name: proposal.name || "",
    date: proposal.date || new Date().toISOString().split('T')[0],
    clubCode: proposal.clubCode || "",
    type: proposal.type || "",
    email: proposal.email || "",
    websites: proposal.websites || "",
    logo: null,
    pdfFile: null,
    userId: sessionStorage.getItem("username") || '',
    status: proposal.status || "Pending",
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData({ ...formData, date: today });
  }, []);

  const handleInputChange = (e) => {
    if (e.target.name === "logo") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate email format before submitting
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.match(emailRegex)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (validateForm()) {
      // Send form data to server
      sendFormData(formData);
    }
  };

  const validateForm = () => {
    // Add your form validation logic here
    // For example, you can check if required fields are filled
    if (!formData.name || !formData.date || !formData.clubCode || !formData.type || !formData.email) {
      toast.error('Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const sendFormData = (data) => {
    fetch("http://localhost:8000/clubs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (response.ok) {
        toast.success('Club created successfully!');
        clearForm();
      } else {
        throw new Error('Failed to create club.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error('Failed to create club. Please try again later.');
    });
  };

  const clearForm = () => {
    setFormData({
      name: "",
      date: new Date().toISOString().split('T')[0],
      clubCode: "",
      type: "",
      email: "",
      websites: "",
      logo: null,
      pdfFile: null,
      userId: sessionStorage.getItem("username") || '',
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  return (
    <Container className="p-5 m-1 mx-auto bg-light rounded mt-5">
      <Row>
        <Col className="bg-danger p-5 rounded">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4} className="d-flex align-items-center justify-content-center bg-danger p-5">
                <Form.Group controlId="formLogo">
                  <Form.Label>Club Logo</Form.Label>
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      border: "1px solid #ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      background: "grey",
                    }}
                    onClick={() => document.getElementById("logo-input").click()}
                  >
                    {formData.logo ? (
                      <img src={URL.createObjectURL(formData.logo)} alt="logo" style={{ width: "100%", height: "auto" }} />
                    ) : (
                      <div>
                        <p>Insert Logo here</p>
                        <p style={{ fontSize: "10px" }}>150x150</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="logo-input"
                      name="logo"
                      style={{ display: "none" }}
                      onChange={handleInputChange}
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col md={8} className="bg-danger p-5">
                <Form.Group controlId="formName">
                  <Form.Label>Name of Club / Society</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formDate" className="my-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" name="date" value={formData.date} onChange={handleInputChange} disabled />
                </Form.Group>

                <Form.Group controlId="formClubCode" className="my-3">
                  <Form.Label>Club Code</Form.Label>
                  <Form.Control type="text" name="clubCode" value={formData.clubCode} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formType" className="my-3">
                  <Form.Label>Type of Organization</Form.Label>
                  <Form.Control as="select" name="type" value={formData.type} onChange={handleInputChange}>
                    <option value="">Select Type...</option>
                    <option value="Student Council">Student Council</option>
                    <option value="Faculty Related Association">Faculty Related Association</option>
                    <option value="Sports">Sports</option>
                    <option value="International">International</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Religious">Religious</option>
                    <option value="Recreational">Recreational</option>
                    <option value="External Affiliate">External Affiliate</option>
                    <option value="UCSI University">UCSI University</option>
                    <option value="Student Affaris and Alumni">Student Affaris and Alumni</option>
                    <option value="Sarawak Campus">Sarawak Campus</option>
                    <option value="Springhill Campus">Springhill Campus</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formEmail" className="my-3">
                  <Form.Label>Proposed Email Address</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formWebsites" className="my-3">
                  <Form.Label>Club Websites</Form.Label>
                  <Form.Control type="text" name="websites" value={formData.websites} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formPDF" className="my-3">
                  <Form.Label>Upload PDF:</Form.Label>
                  <Form.Control type="file" accept=".pdf" onChange={handleFileChange} />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="secondary" className="me-5">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ClubForm;
