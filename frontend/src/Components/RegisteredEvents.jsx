import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, Button } from 'react-bootstrap';

const ITEMS_PER_PAGE = 10;

export const RegisteredEvents = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredProposals, setFilteredProposals] = useState([]);

  useEffect(() => {
    // Fetch user data
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/${sessionStorage.getItem("username")}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();

    // Fetch events data
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8000/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events data');
        }
        const eventsData = await response.json();
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events data:', error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    // Calculate total pages when user or events data changes
    if (user && events.length > 0) {
      const totalPagesCount = Math.ceil(user.registeredEvents.length / ITEMS_PER_PAGE);
      setTotalPages(totalPagesCount);
    }
  }, [user, events]);

  useEffect(() => {
    // Update filtered proposals based on the current page
    if (user) {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const filteredEvents = user.registeredEvents.slice(startIndex, endIndex);
      const filteredProposalsData = filteredEvents.map(eventId => events.find(event => event.id === eventId));
      setFilteredProposals(filteredProposalsData);
    }
  }, [user, events, currentPage]);

  const handleShowModal = (content) => {
    let modalContent = ''; // Initialize modal content
  
    // Check if event has platform or venue, and format accordingly
    if (content.platform && content.link) {
      modalContent = (
        <>
          <p><strong>Platform: </strong>{content.platform}</p>
          <p><strong>Link: </strong>{content.link}</p>
        </>
      );
    } else if (content.venue) {
      modalContent = (
        <>
          <p><strong>Venue: </strong>{content.venue}</p>
        </>
      );
    } else {
      modalContent = <p>No content available</p>; // Set default message
    }
  
    setModalContent(modalContent); // Set the formatted content to the modal
    setShowModal(true); // Open the modal
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <div className='bg-light rounded my-3 p-3 w-100'>
        <h1 className="my-4">Registered Events</h1>
        {user && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>Event Name</th>
                <th>Event Type</th>
                <th>Event Date</th>
                <th>Event Points</th>
                <th>Venue / Platform</th>
              </tr>
            </thead>
            <tbody>
              {filteredProposals.map((event, index) => (
                <tr key={event.id}>
                  <td>{index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}</td>
                  <td>{event.eventName}</td>
                  <td className='text-center'>{event.eventType}</td>
                  <td className='text-center'>{event.eventDate}</td>
                  <td className='text-center'>{event.totalELEPoints || 'None'}</td>
                  <td className='d-flex justify-content-center'>
                    <Button variant="primary" onClick={() => handleShowModal(event)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {/* Pagination */}
        <nav aria-label="Page navigation example" className='mt-5'>
          <ul className="pagination justify-content-end">
            {/* Previous page */}
            {currentPage > 1 && (
              <li className="page-item">
                <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
              </li>
            )}
            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                <a className="page-link" href="#" onClick={() => handlePageChange(page)}>{page}</a>
              </li>
            ))}
            {/* Next page */}
            {currentPage < totalPages && (
              <li className="page-item">
                <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
              </li>
            )}
          </ul>
        </nav>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Venue / Platform</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalContent}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};
