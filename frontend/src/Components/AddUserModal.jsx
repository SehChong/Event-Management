// AddUserModal.js

import React from 'react';

const AddUserModal = ({ showModal, toggleModal, newUser, handleInputChange, handleImageChange, addUser }) => {
  return (
    <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title w-100">Add User</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggleModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>* Name:</label>
                    <input type="text" className="form-control" name="name" value={newUser.name} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>* Student No:</label>
                    <input type="text" className="form-control" name="studentNo" value={newUser.studentNo} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Role:</label>
                    <select className="form-control" name="role" value={newUser.role} onChange={handleInputChange}>
                      <option value="">Select Role</option>
                      <option value="Student">Student</option>
                      <option value="Lecturer">Lecturer</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>* ID:</label>
                    <input type="text" className="form-control" name="id" value={newUser.id} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>* Password:</label>
                    <input type="password" className="form-control" name="password" value={newUser.password} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Program:</label>
                    <input type="text" className="form-control" name="program" value={newUser.program} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Address:</label>
                    <input type="text" className="form-control" name="address" value={newUser.address} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input type="text" className="form-control" name="email" value={newUser.email} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input type="text" className="form-control" name="phone" value={newUser.phone} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Gender:</label>
                    <select className="form-control" name="gender" value={newUser.gender} onChange={handleInputChange}>
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
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={toggleModal}>Close</button>
            <button type="button" className="btn btn-primary" onClick={addUser}>Add User</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
