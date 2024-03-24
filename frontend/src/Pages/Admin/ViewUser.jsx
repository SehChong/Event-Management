import React, { useState, useEffect } from 'react';
import { Dashboard } from '../../Components/Dashboard';
import '../../Assets/Styles/ViewUser.css';
import AddUserModal from '../../Components/AddUserModal';
import DeleteConfirmationModal from '../../Components/DeleteConfirmationModal'; // Import the confirmation modal component
import EditUserModal from '../../Components/EditUserModal'; // Import the EditUserModal component
import { ViewELE } from '../../Components/ViewELE';
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
  const [showELEModal, setShowELEModal] = useState(false);
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
    setShowModal(!showModal);
    // Reset newUser state when opening the modal
    setNewUser({
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
    });
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
  
    const newUserWithELE = {
      ...newUser,
      ele1: ["None", 0, "Unregistered", ""],
      ele2: ["None", 0, "Unregistered", ""],
      ele3: ["None", 0, "Unregistered", ""]
    };
  
    fetch('http://localhost:8000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserWithELE) // Send the newUserWithELE object in the request body
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // If the request is successful, update the state and close the modal
      setUsers([...users, newUserWithELE]);
      toggleModal();
      setShowModal(false);
      toast.success("User added successfully");
  
      // Clear input fields after adding user
      setNewUser({
        name: '',
        studentNo: '',
        role: '',
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

  const handleViewELE = (userId) => {
    const selectedUser = users.find(user => user.id === userId);
    if (selectedUser) {
      setNewUser(selectedUser); // Assuming `setNewUser` updates the state to show in the modal
      setShowELEModal(true); // Open the modal to view ELE
    }
  };  

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
      <td className="pl-4 text-center">
        <img src={user.image} alt={user.name} className="rounded-circle" style={{ width: '50px', height: '50px' }} />
      </td>
      <td className='text-center'>{user.studentNo}</td>
      <td className='text-center'>
        <h5 className="font-medium mb-0">{capitalizeFirstLetter(user.name)}</h5>
      </td>
      <td className='text-center'>{capitalizeFirstLetter(user.role)}</td>
      <td style={{width:'20%'}}>
        <details>
          <summary className='text-center'>Show Details</summary>
          <ul>
            {user.id && <li>Username: {user.id}</li>}
            {user.password && <li>Password: {user.password}</li>}
            {user.program && <li>Program: {user.program}</li>}
            {user.address && <li>Address: {user.address}</li>}
            {user.email && <li>Email: {user.email}</li>}
            {user.phone && <li>Phone: {user.phone}</li>}
            {user.gender && <li>Gender: {user.gender}</li>}

          </ul>
        </details>
      </td>
      <td className='text-center'>
        <button className="btn btn-success" onClick={() => handleViewELE(user.id)}>View</button> 
      </td>
      <td className='text-center'>
        <input type="checkbox" onChange={() => toggleSelectUser(user.id)} checked={selectedUsers.includes(user.id)} />
      </td>      
    </tr>
  );
  

  return (
    <div className="d-flex bg-light" style={{ height: '100%' }}>
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
              <button className={`btn btn-primary mx-3 ${showModal || selectedUsers.length > 0 ? 'disabled' : ''}`} onClick={toggleModal}>Add User</button>
                <button className={`btn btn-danger mx-3 ${isDeleteButtonClickable ? '' : 'disabled'}`} onClick={toggleDeleteModal}>Delete User</button>
                <button className={`btn btn-secondary mx-3 ${selectedUsers.length === 1 ? '' : 'disabled'}`} onClick={() => handleEditUser(selectedUsers[0])}>Edit User</button>
              </div>
            </div>
            <div className="table-responsive">
            <table className="table table-sm table-striped">
              <thead>
                <tr>
                  <th scope="col" className="border-0 text-uppercase font-medium text-center">Index</th>
                  <th scope="col" className="border-0 text-uppercase font-medium text-center">Image</th>
                  <th scope="col" className="border-0 text-uppercase font-medium text-center">Student No</th>
                  <th scope="col" className="border-0 text-uppercase font-medium text-center">Name</th>
                  <th scope="col" className="border-0 text-uppercase font-medium text-center">Category</th>
                  <th scope="col" className="border-0 text-uppercase font-medium text-center">Details</th>
                  <th scope="col" className="border-0 text-uppercase font-medium text-center">View ELE</th>
                  <th scope="col" className="border-0 text-uppercase font-medium text-center">Select</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user, index) => (
                  <UserRow key={user.id} index={index + 1} user={user} selectedUsers={selectedUsers} toggleSelectUser={toggleSelectUser}  handleViewELE={() => handleViewELE(user.id)} />
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
        <AddUserModal
          showModal={showModal}
          toggleModal={toggleModal}
          newUser={newUser}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          addUser={addUser}
        />
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

    {showELEModal && (
      <ViewELE
        user={newUser}
        onClose={() => setShowELEModal(false)}
      />
    )}

    </div>
  );
};
 