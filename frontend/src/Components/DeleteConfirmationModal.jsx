import React from 'react';

// Inside the DeleteConfirmationModal component
const DeleteConfirmationModal = ({ selectedUsers, onDeleteConfirm, onClose, toggle }) => {
  const handleDeleteConfirm = () => {
    onDeleteConfirm(selectedUsers);
    onClose();
  };

  return (
    <div>
      {/* Dark semi-transparent background */}
      <div
        className="modal-overlay"
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

      {/* Modal content */}
      <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', zIndex: 1001 }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title w-100">Delete User(s)</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the selected user(s)?</p>
              {/* Display selected user names */}
              <ul>
                {selectedUsers.map(user => (
                  <li key={user}>{user}</li> // Assuming each user object has an ID and name property
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={toggle}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
