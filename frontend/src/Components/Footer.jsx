import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export const Footer = () => {
  return (
    <footer className="bg-dark pt-5">
      <Container>
        <Row>
          <Col md={3}>
            <h5 className='text-light text-center'>Company</h5>
            <ListGroup>
              <ListGroup.Item>About Us</ListGroup.Item>
              <ListGroup.Item>Careers</ListGroup.Item>
              <ListGroup.Item>Contact Us</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <h5 className='text-light text-center'>Products</h5>
            <ListGroup>
              <ListGroup.Item>Product 1</ListGroup.Item>
              <ListGroup.Item>Product 2</ListGroup.Item>
              <ListGroup.Item>Product 3</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <h5 className='text-light text-center'>Support</h5>
            <ListGroup>
              <ListGroup.Item>FAQ</ListGroup.Item>
              <ListGroup.Item>Help Center</ListGroup.Item>
              <ListGroup.Item>Contact Support</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <h5 className='text-light text-center'>Follow Us</h5>
            <ListGroup>
              <ListGroup.Item>
                <FaFacebookSquare/> Facebook
              </ListGroup.Item>
              <ListGroup.Item>
                <FaXTwitter/> Twitter
              </ListGroup.Item>
              <ListGroup.Item>
                <FaInstagramSquare/> Instagram
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="text-center">
            <p>&copy; 2023 My Company. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
