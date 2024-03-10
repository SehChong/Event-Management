import React, { useState, useEffect } from 'react';
import { Dashboard } from '../../Components/Dashboard';
import '../../Assets/Styles/ViewUser.css';

const UserRow = ({ user }) => (
  <tr>
    <td className="pl-4">{user.id}</td>
    <td>
      <h5 className="font-medium mb-0">{user.name}</h5>
      <span className="text-muted">{user.location}</span>
    </td>
    <td>
      <span className="text-muted">{user.occupation}</span><br />
      {/* <span className="text-muted">Past: teacher</span> */}
    </td>
    <td>
      <span className="text-muted">{user.email}</span><br />
      {/* <span className="text-muted">999 - 444 - 555</span> */}
    </td>
    <td>
      <span className="text-muted">{user.added}</span><br />
      {/* <span className="text-muted">10: 55 AM</span> */}
    </td>
    <td>
      <select className="form-control category-select" id={`categorySelect${user.id}`}>
        <option>Modulator</option>
        <option>Admin</option>
        <option>User</option>
        <option>Subscriber</option>
      </select>
    </td>
    <td>
      <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle"><i className="fas fa-key"></i> </button>
      <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"><i className="fas fa-trash"></i> </button>
      <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"><i className="fas fa-edit"></i> </button>
      <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"><i className="fas fa-cloud-upload-alt"></i> </button>
    </td>
  </tr>
);

export const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users to display per page
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchData();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Logic for pagination based on filtered users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            </div>
            <div className="table-responsive">
              <table className="table no-wrap user-table mb-0 rounded">
                <thead>
                  <tr>
                    <th scope="col" className="border-0 text-uppercase font-medium pl-4">#</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Name</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Occupation</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Email</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Added</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Category</th>
                    <th scope="col" className="border-0 text-uppercase font-medium">Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map(user => (
                    <UserRow key={user.id} user={user} />
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
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
    </div>
  );
};
