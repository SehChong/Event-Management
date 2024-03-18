import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const EditUserModal = ({ showModal, toggleModal, updateUser, handleInputChange, handleImageChange, editingUser, clearSelectedUsers }) => {
  const [updatedUser, setUpdatedUser] = useState(editingUser);


  useEffect(() => {
    // Set an interval to check for changes in editingUser
    const interval = setInterval(() => {
      if (JSON.stringify(updatedUser) !== JSON.stringify(editingUser)) {
        // If editingUser has changed, update updatedUser state
        setUpdatedUser(editingUser);
      }
    }, 1000); // Check every second

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [editingUser, updatedUser]);

  const handleUpdateUser = async () => {
       // Implement logic to send updatedUser data to the server
       fetch(`http://localhost:8000/user/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      })
    try {
      // Implement logic to update user data
      await updateUser(updatedUser);
      // Close the modal after successful update
      toggleModal();
      // Clear selected users state in parent component
      clearSelectedUsers(); // Call the function passed from props
      //toast.success('User updated successfully');
  
    } catch (error) {
      console.error('Error updating user:', error);
      // toast.error('Failed to update user');
      // Handle error if necessary
    }
  };
  

  return (
    <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
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
              {/* Add other form fields */}
            </form>
          </div>
          <div className="modal-footer justify-content-end border-0">
            <button type="button" className="btn btn-secondary mr-2" onClick={toggleModal}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleUpdateUser}>Update User</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
