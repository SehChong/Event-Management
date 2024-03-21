import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ViewReports = ({ report, onClose, updateReportSubmissionStatus }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApprove = (status) => {
    setIsSubmitting(true);
    updateSubmissionStatus('Approved');
    // Show toast notification
    toast.success(`Report has been Approved`, {
      autoClose: 3000, // Close the notification after 3 seconds
    });
  };

  const handleReject = (status) => {
    setIsSubmitting(true);
    updateSubmissionStatus('Rejected');
    // Show toast notification for error
    toast.error(`Report has been Rejected`, {
      autoClose: 3000,
    });
  };

  const updateSubmissionStatus = (status) => {
    fetch(`http://localhost:8000/reports/${report.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ submissionStatus: status }), // Only include submissionStatus
    })
      .then(response => response.json())
      .then(updatedReport => {
        // Handle successful update
        console.log(`Report has been ${status}`);
        setIsSubmitting(false);
        onClose(); // Close the modal after submission
        updateReportSubmissionStatus(updatedReport); // Call the function to update the report in parent component
      })
      .catch(error => {
        console.error('Error updating submission status:', error);
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Fetch updated data here
    }, 60000); // Refresh data every 1 minute (adjust interval as needed)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []); // Run effect only once on component mount

  return (
    <div>
      {/* Dark semi-transparent background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value to control transparency
          zIndex: 1000, // Ensure it's below the modal content
        }}
        onClick={isSubmitting ? null : onClose}
      ></div>

      <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title w-100">Report Details</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={isSubmitting ? null : onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h4>Question 1</h4>
              <label htmlFor="Textarea1" className='mb-3'>What knowledge/skills will you gain from attending the event?</label>
              <input type="text" className="form-control" value={report.question1} readOnly /> <br></br>
              <h4>Question 2</h4>
              <label htmlFor="Textarea2" className='mb-3'>How do you think you can apply the knowledge/skills learnt from the event to use in the future?</label>
              <input type="text" className="form-control" value={report.question2} readOnly /> <br></br>
              <h4>Question 3</h4>
              <label htmlFor="Textarea3" className='mb-3'>How do you feel about the event after attending it?</label>
              <input type="text" className="form-control" value={report.question3} readOnly /> <br></br>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={isSubmitting ? null : onClose}>Close</button>
              <button type="button" className="btn btn-danger" onClick={handleReject} disabled={isSubmitting}>Reject</button>
              <button type="button" className="btn btn-success" onClick={handleApprove} disabled={isSubmitting}>Approve</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
