import React, { useState, useEffect } from 'react';
import { Dashboard } from '../../Components/Dashboard';
import '../../Assets/Styles/ViewUser.css';
import DeleteConfirmationModal from '../../Components/DeleteConfirmationModal'; // Import the confirmation modal component
import EditUserModal from '../../Components/EditUserModal'; // Import the EditUserModal component
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS


const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};


export const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control delete confirmation modal
  const [showEditModal, setShowEditModal] = useState(false); // State to control edit user modal
  const [editUserId, setEditUserId] = useState(null); // State to keep track of which user is being edited
  const [currentPage, setCurrentPage] = useState(1); // Current page of pagination
  const [itemsPerPage] = useState(5); // Number of items per page
  const [newUser, setNewUser] = useState({
    name: '',
    studentNo: '',
    role: '', // Changed to dropdown
    id: '',
    password: '',
    program: '',
    gender: '', // Made it required
    image: null, // Modified to handle file
    registeredEvents: [],
    ele1: [],
    ele2: [],
    ele3: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/user');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          throw new Error('Fetched data is not an array');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchData();
  }, []);

  const filteredUsers = users.filter(user => {
    return (
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.program && user.program.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ((user.role && user.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
      user.role.toLowerCase() !== 'admin') // Exclude admin users
    );
  });

  const toggleModal = () => {
    // Reset newUser state when closing the modal
    const resetNewUser = {
      name: '',
      studentNo: '',
      role: '',
      id: '',
      password: '',
      program: '',
      gender: '',
      image: null,
      registeredEvents: [],
      ele1: [],
      ele2: [],
      ele3: []
    };
    setNewUser(showModal ? resetNewUser : newUser);
    setShowModal(!showModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewUser({ ...newUser, image: file });
  };

  const addUser = () => {
    if (!newUser.name.trim() || !newUser.studentNo.trim() || !newUser.id.trim() || !newUser.password.trim()) {
      //toast.warning("Please fill in all required fields");
      return;
    }
  
    fetch('http://localhost:8000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // If the request is successful, update the state and close the modal
      setUsers([...users, newUser]);
      toggleModal();
      setShowModal(false);
      toast.success("User added successfully");
    })
    .catch(error => {
      console.error('Error adding user:', error);
      toast.error("Failed to add user");
    });
  };

  const deleteUser = () => {
    fetch(`http://localhost:8000/user/${selectedUsers}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // If the request is successful, update the state with the users after deletion
      const updatedUsers = users.filter(user => !selectedUsers.includes(user.id));
      setUsers(updatedUsers);
      setSelectedUsers([]); // Clear selected users after deletion
      setShowDeleteModal(false); // Close the delete confirmation modal
    })
    .catch(error => {
      console.error('Error deleting user(s):', error);
    });
  };

    // Function to handle editing user
    const handleEditUser = (userId) => {
      setEditUserId(userId);
      setShowEditModal(true);
    };
  
    // Function to save edited user
    const saveEditedUser = (editedUser) => {
      // Implement logic to save edited user
      // Example:
      const updatedUsers = users.map(user => user.id === editedUser.id ? editedUser : user);
      setUsers(updatedUsers);
    };

  const toggleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const isDeleteButtonClickable = selectedUsers.length > 0;

  const handleDeleteConfirm = () => {
    deleteUser(selectedUsers);
    setShowDeleteModal(false);
  };
  
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  const clearSelectedUsers = () => {
    setSelectedUsers([]);
  };  
  
// Pagination logic
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = currentPage * itemsPerPage - itemsPerPage;
const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const UserRow = ({ index, user, selectedUsers, toggleSelectUser }) => (
    <tr style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
    <td className='text-center'>{indexOfFirstItem + index}</td>
      <td className="pl-4">
        <img src={user.image} alt={user.name} className="rounded-circle" style={{ width: '50px', height: '50px' }} />
      </td>
      <td>{user.studentNo}</td>
      <td>
        <h5 className="font-medium mb-0">{capitalizeFirstLetter(user.name)}</h5>
      </td>
      <td>{capitalizeFirstLetter(user.role)}</td>
      <td className='text-center'>
        <label>
          <input
            type="checkbox"
            checked={user.ele1 && user.ele1.length > 0}
            onChange={() => {}}
          />
          ELE 1
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={user.ele2 && user.ele2.length > 0}
            onChange={() => {}}
          />
          ELE 2
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={user.ele3 && user.ele3.length > 0}
            onChange={() => {}}
          />
          ELE 3
        </label>
      </td>
      <td style={{width:'30%'}}>
        <details>
          <summary >Show Details</summary>
          <ul>
            {user.id && <li>Username: {user.id}</li>}
            {user.password && <li>Password: {user.password}</li>}
            {user.program && <li>Program: {user.program}</li>}
            {user.address && <li>Address: {user.address}</li>}
            {user.email && <li>Email: {user.email}</li>}
            {user.phone && <li>Phone: {user.phone}</li>}
            {user.gender && <li>Gender: {user.gender}</li>}
            {user.registeredEvents && user.registeredEvents.length > 0 && <li>Registered Events: {user.registeredEvents.join(', ')}</li>}
            {user.ele1 && <li>ELE 1: {user.ele1.join(', ')}</li>}
            {user.ele2 && <li>ELE 2: {user.ele2.join(', ')}</li>}
            {user.ele3 && <li>ELE 3: {user.ele3.join(', ')}</li>}
          </ul>
        </details>
      </td>
      <td className='text-center'>
        <input type="checkbox" onChange={() => toggleSelectUser(user.id)} checked={selectedUsers.includes(user.id)} />
      </td>
    </tr>
  );

  return (
    <div className="d-flex bg-light" style={{ height: '100vh' }}>
      <div style={{ width: "15%" }}><Dashboard /></div>
      <div className="container my-4">
        <div className="table-container">
          <div className="card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h5 className="card-title text-uppercase mb-0">Manage Users</h5>
              <div className="search-box custom-rounded">
                <input type="text" className="form-control" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div>
                <button className={`btn btn-primary mx-3 ${showModal ? 'disabled' : ''}`} onClick={toggleModal}>Add User</button>
                <button className={`btn btn-danger mx-3 ${isDeleteButtonClickable ? '' : 'disabled'}`} onClick={toggleDeleteModal}>Delete User</button>
                <button className={`btn btn-secondary mx-3 ${selectedUsers.length === 1 ? '' : 'disabled'}`} onClick={() => handleEditUser(selectedUsers[0])}>Edit User</button>
              </div>
            </div>
            <div className="table-responsive">
            <table className="table table-sm table-striped">
              <thead>
                <tr>
                  <th scope="col" className="border-0 text-uppercase font-medium">Index</th>
                  <th scope="col" className="border-0 text-uppercase font-medium">Image</th>
                  <th scope="col" className="border-0 text-uppercase font-medium">Student No</th>
                  <th scope="col" className="border-0 text-uppercase font-medium">Name</th>
                  <th scope="col" className="border-0 text-uppercase font-medium">Category</th>
                  <th scope="col" className="border-0 text-uppercase font-medium">ELE</th>
                  <th scope="col" className="border-0 text-uppercase font-medium">Details</th>
                  <th scope="col" className="border-0 text-uppercase font-medium">Select</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user, index) => (
                  <UserRow key={user.id} index={index + 1} user={user} selectedUsers={selectedUsers} toggleSelectUser={toggleSelectUser} />
                ))}
              </tbody>
              </table>
            </div>
            {/* Pagination */}
            <nav>
                  <ul className="pagination justify-content-center">
                    {Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }, (_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button onClick={() => paginate(i + 1)} className="page-link">
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
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
      )}

    {showDeleteModal && (
      <DeleteConfirmationModal
        selectedUsers={selectedUsers} // Pass the selectedUsers array containing user objects
        onDeleteConfirm={handleDeleteConfirm}
        onClose={toggleDeleteModal}
        toggle={toggleDeleteModal}
      />
    )}

    {showModal && <div className="modal-backdrop fade show"></div>}
    {showEditModal && editUserId && (
      <EditUserModal
        showModal={showEditModal}
        toggleModal={() => setShowEditModal(false)}
        updateUser={saveEditedUser}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        editingUser={users.find(user => user.id === editUserId)}
        clearSelectedUsers={clearSelectedUsers} // Pass clearSelectedUsers as a prop
      />
  )}
    </div>
  );
};
 