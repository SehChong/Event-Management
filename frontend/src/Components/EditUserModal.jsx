import React from 'react';

const EditUserModal = ({ showModal, toggleModal, updateUser, handleInputChange, handleImageChange, editingUser }) => {
  return (
    <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit User</h5>
            <button type="button" className="close" aria-label="Close" onClick={toggleModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              {/* Form fields for editing the user */}
            </form>
          </div>
          <div className="modal-footer justify-content-end border-0">
            <button type="button" className="btn btn-secondary mr-2" onClick={toggleModal}>Close</button>
            <button type="button" className="btn btn-primary" onClick={updateUser}>Update User</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
