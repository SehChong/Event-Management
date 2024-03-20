import React from 'react';

const DeleteConfirmationModal = ({ selectedUsers, onDeleteConfirm, onClose, toggle }) => {
  const handleDeleteConfirm = () => {
    onDeleteConfirm(selectedUsers);
    onClose();
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
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
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={toggle}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
