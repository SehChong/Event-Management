import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUserModal = ({ showModal, toggleModal, updateUser, handleImageChange, editingUser, clearSelectedUsers }) => {
  const [updatedUser, setUpdatedUser] = useState(editingUser);
  const [updatedPassword, setUpdatedPassword] = useState(editingUser.password);

  useEffect(() => {
    setUpdatedUser(editingUser);
    setUpdatedPassword(editingUser.password);
  }, [editingUser]);

  const handleUpdateUser = async () => {
    // Validation for required fields
    if (!updatedUser.name || !updatedUser.studentNo || !updatedPassword) {
      toast.error('Please enter Name, Student No, and Password');
      return;
    }

    try {
      const updatedUserData = {
        ...updatedUser,
        password: updatedPassword
      };
  
      await fetch(`http://localhost:8000/user/${updatedUserData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUserData)
      });
  
      await updateUser(updatedUserData);
      toggleModal();
      clearSelectedUsers();
      
      // Show toast notification
      toast.success('User updated successfully');
  
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user');
    }
  };

  return (
    <div>
      {showModal && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
          }}
          onClick={toggleModal}
        ></div>
      )}

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
                  <label>* Name:</label>
                  <input type="text" className="form-control" name="name" value={updatedUser.name} onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>* Student No:</label>
                  <input type="text" className="form-control" name="studentNo" value={updatedUser.studentNo} onChange={(e) => setUpdatedUser({ ...updatedUser, studentNo: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>* Password:</label>
                  <input type="password" className="form-control" name="password" value={updatedPassword} onChange={(e) => setUpdatedPassword(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Program:</label>
                  <input type="text" className="form-control" name="program" value={updatedUser.program} onChange={(e) => setUpdatedUser({ ...updatedUser, program: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Address:</label>
                  <input type="text" className="form-control" name="address" value={updatedUser.address} onChange={(e) => setUpdatedUser({ ...updatedUser, address: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="text" className="form-control" name="email" value={updatedUser.email} onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input type="text" className="form-control" name="phone" value={updatedUser.phone} onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Gender:</label>
                  <select className="form-control" name="gender" value={updatedUser.gender} onChange={(e) => setUpdatedUser({ ...updatedUser, gender: e.target.value })}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Image:</label>
                  <input type="file" className="form-control-file mt-3 mx-2" name="image" onChange={(e) => handleImageChange(e)} />
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
