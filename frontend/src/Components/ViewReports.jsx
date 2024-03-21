import React from 'react';

export const ViewReports = ({ report, onClose }) => {
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
        onClick={onClose}
      ></div>

      <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title w-100">Report Details</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h4>Question 1</h4>
              <p>{report.question1}</p>
              <h4>Question 2</h4>
              <p>{report.question2}</p>
              <h4>Question 3</h4>
              <p>{report.question3}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
