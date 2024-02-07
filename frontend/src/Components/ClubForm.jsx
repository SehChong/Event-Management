import React, { useState } from "react";
import { Button, FormGroup, FormLabel, FormControl, Form, Row, Col, Container } from "react-bootstrap";
import { SideBar } from "./SideBar";

export const ClubForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        clubCode: "",
        type: "",
        email: "",
        websites: "",
        logo: null,
      });
    
      const handleInputChange = (e) => {
        if (e.target.name === "logo") {
          setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
      };
    
      return (
        <Container className="p-5 m-1 mx-auto bg-light rounded mt-5">
          <Row>
            <Col md={3} className=" bg-dark p-5 me-2 rounded">
              <SideBar />
            </Col>
          <Col className="bg-danger p-5 rounded">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={4} className="d-flex align-items-center justify-content-center bg-danger p-5">
                  <FormGroup controlId="formLogo">
                    <FormLabel>Club Logo</FormLabel>
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
                  </FormGroup>
                </Col>
      
                <Col md={8} className="bg-danger p-5">
                  <FormGroup controlId="formName">
                    <FormLabel>Name of Club / Society</FormLabel>
                    <FormControl type="text" name="name" onChange={handleInputChange} />
                  </FormGroup>
      
                  <FormGroup controlId="formDate">
                    <FormLabel>Date</FormLabel>
                    <FormControl type="date" name="date" onChange={handleInputChange} />
                  </FormGroup>
      
                  <FormGroup controlId="formClubCode">
                    <FormLabel>Club Code</FormLabel>
                    <FormControl type="text" name="clubCode" onChange={handleInputChange} />
                  </FormGroup>
      
                  <FormGroup controlId="formType">
                    <FormLabel>Type of Organization</FormLabel>
                    <FormControl as="select" name="type" onChange={handleInputChange}>
                      <option value=""></option>
                      <option value="Student Council">Student Council</option>
                      {/* Add more organization types here */}
                    </FormControl>
                  </FormGroup>
      
                  <FormGroup controlId="formEmail">
                    <FormLabel>Proposed Email Address</FormLabel>
                    <FormControl type="email" name="email" onChange={handleInputChange} />
                  </FormGroup>
      
                  <FormGroup controlId="formWebsites">
                    <FormLabel>Club Websites</FormLabel>
                    <FormControl type="text" name="websites" onChange={handleInputChange} />
                  </FormGroup>
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
