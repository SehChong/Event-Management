import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const EditUserModal = ({ showModal, toggleModal, updateUser, handleInputChange, handleImageChange, editingUser, clearSelectedUsers }) => {
  const [updatedUser, setUpdatedUser] = useState(editingUser);

  useEffect(() => {
    const interval = setInterval(() => {
      if (JSON.stringify(updatedUser) !== JSON.stringify(editingUser)) {
        setUpdatedUser(editingUser);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [editingUser, updatedUser]);

  const handleUpdateUser = async () => {
    try {
      await fetch(`http://localhost:8000/user/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });

      await updateUser(updatedUser);
      toggleModal();
      clearSelectedUsers();

    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      {/* Dark semi-transparent background */}
      {showModal && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value to control transparency
            zIndex: 1000 // Ensure it's below the modal content
          }}
          onClick={toggleModal}
        ></div>
      )}

      {/* Modal content */}
      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none', zIndex: 1001 }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title w-100">Edit User</h5>
              <button type="button" className="close" aria-label="Close" onClick={toggleModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control" name="name" value={updatedUser.name} onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Student No:</label>
                  <input type="text" className="form-control" name="studentNo" value={updatedUser.studentNo} onChange={(e) => setUpdatedUser({ ...updatedUser, studentNo: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Role:</label>
                  <select className="form-control" name="role" value={updatedUser.role} onChange={(e) => setUpdatedUser({ ...updatedUser, role: e.target.value })}>
                    <option value="">Select Role</option>
                    <option value="Student">Student</option>
                    <option value="Lecturer">Lecturer</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer justify-content-end border-0">
              <button type="button" className="btn btn-secondary mr-2" onClick={toggleModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdateUser}>Update User</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
