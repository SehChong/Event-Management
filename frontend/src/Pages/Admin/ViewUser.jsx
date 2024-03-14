import React, { useState, useEffect } from 'react';
import { Dashboard } from '../../Components/Dashboard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Assets/Styles/ViewUser.css';
import DeleteConfirmationModal from '../../Components/DeleteConfirmationModal'; // Import the confirmation modal component

const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const UserRow = ({ user, selectedUsers, toggleSelectUser }) => (
  <tr>
    <td className="pl-4">
      <img src={user.image} alt={user.name} className="rounded-circle" style={{ width: '50px', height: '50px' }} />
    </td>
    <td>{user.studentNo}</td>
    <td>
      <h5 className="font-medium mb-0">{capitalizeFirstLetter(user.name)}</h5>
    </td>
    <td>{capitalizeFirstLetter(user.role)}</td>
    <td></td>
    <td>
      <details>
        <summary>Show Details</summary>
        <ul>
          {user.id && <li>Username: {user.id}</li>}
          {user.password && <li>Password: {user.password}</li>}
          {user.program && <li>Program: {user.program}</li>}
          {user.registeredEvents && user.registeredEvents.length > 0 && <li>Registered Events: {user.registeredEvents.join(', ')}</li>}
          {user.ele1 && <li>ELE 1: {user.ele1.join(', ')}</li>}
          {user.ele2 && <li>ELE 2: {user.ele2.join(', ')}</li>}
          {user.ele3 && <li>ELE 3: {user.ele3.join(', ')}</li>}
        </ul>
      </details>
    </td>
    <td>
      <input type="checkbox" onChange={() => toggleSelectUser(user.id)} checked={selectedUsers.includes(user.id)} />
    </td>
  </tr>
);

export const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control delete confirmation modal
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
  

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser).filter(user => user.role.toLowerCase() !== 'admin'); // Filter admin users from currentUsers

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      toast.warning("Please fill in all required fields");
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
      toast.success("User(s) deleted successfully"); // Show success toast here
    })
    .catch(error => {
      console.error('Error deleting user(s):', error);
      toast.error("Failed to delete user(s)");
    });
  };
  
  
  const editUser = () => {};

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
                <button className={`btn btn-secondary mx-3 ${selectedUsers.length === 1 ? '' : 'disabled'}`} onClick={() => editUser()}>Edit User</button>              </div>
            </div>
            <div className="table-responsive">
              <table className="table no-wrap user-table mb-0 rounded">
                <thead>
                  <tr>
                    <th scope="col" className="border-0 text-uppercase font-medium pl-4">Image</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Student No</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Name</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Category</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Blank</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Details</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Select</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map(user => (
                    <UserRow key={user.id} user={user} selectedUsers={selectedUsers} toggleSelectUser={toggleSelectUser} />
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="pagination justify-content-center mt-4">
              {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add User</h5>
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
        selectedUsers={selectedUsers}
        onDeleteConfirm={handleDeleteConfirm}
        toggle={toggleDeleteModal} // Pass toggleDeleteModal as the toggle prop
      />
    )}
      {showModal && <div className="modal-backdrop fade show"></div>}
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};
