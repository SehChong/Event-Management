import React, { useRef, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { FiPrinter } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const EventPrintModal = ({ event, onHide, show }) => {
  const navigate = useNavigate();
  const printContentRef = useRef(null);

  const printContent = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Event Details</title></head><body>');
    printWindow.document.write(printContentRef.current.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const handlePrintButtonClick = () => {
    printContent();
  };

  const handleClosePrintModal = () => {
    onHide();

  };

  const handleCloseAndGoBack = () => {
    handleClosePrintModal();
    setTimeout(() => {
        if (onHide && typeof onHide === 'function'){
            onHide();
        }
        if (navigate && navigate.location){
            navigate.replace(navigate.location.pathname);
        }
    }, 100);
  };

  useEffect(() => {
    if (printContentRef.current) {
      const handleDOMNodeInserted = () => {
        printContent();
      };
  
      const printContentElement = printContentRef.current;
      printContentElement.addEventListener('DOMNodeInserted', handleDOMNodeInserted);
  
      return () => {
        printContentElement.removeEventListener('DOMNodeInserted', handleDOMNodeInserted);
      };
    }
  }, []);

  return (
    <Modal show={show} onHide={handleCloseAndGoBack} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Event Details</Modal.Title>
      </Modal.Header>
      <Modal.Body ref={printContentRef} style={{ whiteSpace: 'pre-wrap' }}>
        {event ? (
          <>
            <strong>Event Name:</strong> {event.eventName} <br />
            <strong>Event Type:</strong> {event.eventType} <br />
            <strong>Organized By:</strong> {event.organizedBy} <br />
            <strong>Event Date:</strong> {event.eventDate} <br />
            <strong>Event End Date:</strong> {event.eventEndDate} <br />
            <strong>Event Time:</strong> {event.eventTime} <br />
            <strong>Event End Time:</strong> {event.eventEndTime} <br />
            <strong>Publicity Period:</strong> {event.publicityPeriod} <br />
            <strong>End Period:</strong> {event.endPeriod} <br />
            {event.mode === 'Online' ? (
              <>
                <strong>Platform:</strong> {event.platform} <br />
                <strong>Link:</strong> {event.link} <br />
              </>
            ) : (
              <>
                <strong>Venue:</strong> {event.venue} <br />
              </>
            )}
            <strong>Estimated Attendance:</strong> {event.estimatedAttendance} <br />
            <strong>Total Hours:</strong> {event.totalHours} <br />
            <strong>ELE Point Request:</strong> {event.elePointRequest} <br />
            {event.elePointRequest === 'Required' && (
              <>
                <strong>Total ELE Points:</strong>{event.totalELEPoints} <br />
              </>
            )}
            <strong>Event Level:</strong> {event.eventLevel} <br />
            <strong>Event Category:</strong> {event.eventCategory} <br />
            {event.pdfFile != null && (
              <>
                <strong>PDF File:</strong> {event.pdfFile} <br />
              </>
            )}
          </>
        ): (
            <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseAndGoBack}>
          Close
        </Button>

        <Button variant="primary" onClick={handlePrintButtonClick}>
          <FiPrinter /> Print
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventPrintModal;