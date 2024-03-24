import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsList, BsHouse, BsPerson, BsCalendar, BsBoxArrowRight, BsFillArchiveFill } from 'react-icons/bs';
import { CSSTransition } from 'react-transition-group'; 
import '../Assets/Styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const navigateHome = () => {
    navigate("/adminHome");
  };

  const navigateManageUsers = () => {
    navigate("/ManageUsers");
  };

  const navigateManageEvent = () => {
    navigate("/ManageEvent");
  };

  const navigateManageReport = () => {
    navigate("/ManageReport");
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="d-flex bg-light">
      <CSSTransition
        in={sidebarVisible}
        timeout={300}
        classNames="sidebar"
        unmountOnExit
      >
        <div className="sidebar-container bg-secondary text-dark">
          <div className="sidebar" style={{ height: '100%'}}>
            <ul className="nav flex-column" >
              {/* Sidebar content */}
              <li className="nav-item">
                <div className="media align-items-center">
                  <img src="https://placehold.jp/150x150.png" alt="User Icon" className="mr-3 mt-4" style={{ width: '200px'}} />
                  <div className="media-body mt-3 mb-4">
                    <h5 className="mt-0 d-flex justify-content-center">{username}</h5>
                  </div>
                </div>
              </li>
              <li className="nav-item sb-hover" style={{ margin: '10px 0' }}>
                <a className="nav-link active text-dark" href="#" style={{ padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={navigateHome}>
                  <BsHouse /> Home
                </a>
              </li>
              <li className="nav-item sb-hover" style={{ margin: '10px 0' }}>
                <a className="nav-link active text-dark" href="#" style={{ padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={navigateManageUsers}>
                  <BsPerson /> Manage Users
                </a>
              </li>
              <li className="nav-item sb-hover" style={{ margin: '10px 0' }}>
                <a className="nav-link text-dark sb-hover" href="#" style={{ padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={navigateManageEvent}>
                  <BsCalendar /> Manage Event
                </a>
              </li>
              <li className="nav-item sb-hover" style={{ margin: '10px 0' }}>
                <a className="nav-link text-dark sb-hover" href="#" style={{ padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={navigateManageReport}>
                  <BsFillArchiveFill /> Manage Reports
                </a>
              </li>
              <li className="nav-item sb-hover" style={{ margin: '10px 0' }}>
                <a className="nav-link text-dark" href="#" style={{ padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={logout}>
                  <BsBoxArrowRight /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </CSSTransition>
      <div>
        <button onClick={toggleSidebar} className={`toggle-button ${sidebarVisible ? 'visible' : ''}`}>
          <BsList /> {/* Use BsList icon for three dash lines */}
        </button>
      </div>
    </div>
  );
};