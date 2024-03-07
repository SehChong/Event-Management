import React from 'react';
import { Dashboard } from '../../Components/Dashboard';
import '../../Assets/Styles/ViewUser.css';

const UserRow = ({ index, name, location, occupation, email, added, category }) => (
  <tr>
    <td className="pl-4">{index}</td>
    <td>
      <h5 className="font-medium mb-0">{name}</h5>
      <span className="text-muted">{location}</span>
    </td>
    <td>
      <span className="text-muted">{occupation}</span><br />
      <span className="text-muted">Past: teacher</span>
    </td>
    <td>
      <span className="text-muted">{email}</span><br />
      <span className="text-muted">999 - 444 - 555</span>
    </td>
    <td>
      <span className="text-muted">{added}</span><br />
      <span className="text-muted">10: 55 AM</span>
    </td>
    <td>
      <select className="form-control category-select" id={`categorySelect${index}`}>
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
  const users = [
    { index: 1, name: 'Daniel Kristeen', location: 'Texas, United States', occupation: 'Visual Designer', email: 'daniel@website.com', added: '15 Mar 1988', category: 'Modulator' },
    { index: 2, name: 'Emma Smith', location: 'Texas, United States', occupation: 'Visual Designer', email: 'emma@website.com', added: '15 Mar 1855', category: 'Admin' },
    { index: 3, name: 'Olivia Johnson', location: 'Texas, United States', occupation: 'Visual Designer', email: 'olivia@website.com', added: '17 Aug 1988', category: 'User' },
    { index: 4, name: 'Isabella Williams', location: 'Texas, United States', occupation: 'Visual Designer', email: 'isabella@website.com', added: '26 Mar 1999', category: 'Subscriber' },
    { index: 5, name: 'Sophia Jones', location: 'Texas, United States', occupation: 'Visual Designer', email: 'sophia@website.com', added: '16 Aug 2001', category: 'User' },
    { index: 6, name: 'Charlotte Brown', location: 'Texas, United States', occupation: 'Visual Designer', email: 'charlotte@website.com', added: '15 Mar 1988', category: 'Admin' },
    { index: 7, name: 'Daniel Kristeen', location: 'Texas, United States', occupation: 'Visual Designer', email: 'daniel@website.com', added: '15 Mar 1988', category: 'Modulator' },
    { index: 8, name: 'Emma Smith', location: 'Texas, United States', occupation: 'Visual Designer', email: 'emma@website.com', added: '15 Mar 1855', category: 'Admin' },
    { index: 9, name: 'Olivia Johnson', location: 'Texas, United States', occupation: 'Visual Designer', email: 'olivia@website.com', added: '17 Aug 1988', category: 'User' },
    { index: 10, name: 'Isabella Williams', location: 'Texas, United States', occupation: 'Visual Designer', email: 'isabella@website.com', added: '26 Mar 1999', category: 'Subscriber' },
  ];

  return (
    <div className="d-flex bg-light" style={{ height: '100vh' }}>
      <div style={{width:"15%"}}><Dashboard /></div>
      <div className="container my-4"> {/* Added my-4 class for margin */}
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-uppercase mb-0">Manage Users</h5>
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
                    {users.map(user => (
                      <UserRow
                        key={user.index}
                        index={user.index}
                        name={user.name}
                        location={user.location}
                        occupation={user.occupation}
                        email={user.email}
                        added={user.added}
                        category={user.category}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
