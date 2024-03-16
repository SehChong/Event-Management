import React, { useRef, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { FiPrinter } from 'react-icons/fi';

const ClubPrintModal = ({ proposal, onHide, show }) => {
  const printContentRef = useRef(null);

  const printContent = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Club Details</title></head><body>');
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
    <Modal show={show} onHide={handleClosePrintModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Club Details</Modal.Title>
      </Modal.Header>
      <Modal.Body ref={printContentRef} style={{ whiteSpace: 'pre-wrap' }}>
        {proposal ? (
          <>
            <strong>Club Name:</strong> {proposal.name} <br />
            <strong>Date:</strong> {proposal.date} <br />
            <strong>Club Code:</strong> {proposal.clubCode} <br />
            <strong>Type of Organization:</strong> {proposal.type} <br />
            <strong>Email:</strong> {proposal.email} <br />
            <strong>Websites:</strong> {proposal.websites} <br />
            {proposal.logo && (
              <>
                <strong>Logo:</strong> <img src={URL.createObjectURL(proposal.logo)} alt="Logo" style={{ width: "100px", height: "auto" }} /> <br />
              </>
            )}
            {proposal.pdfFile && (
              <>
                <strong>PDF File:</strong> {proposal.pdfFile} <br />
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
        <Button variant="secondary" onClick={handleClosePrintModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePrintButtonClick}>
          <FiPrinter /> Print
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClubPrintModal;
