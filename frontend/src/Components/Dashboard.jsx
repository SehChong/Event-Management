import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsHouse, BsInfoCircle, BsGear, BsChatDots, BsList } from 'react-icons/bs';
import { CSSTransition } from 'react-transition-group'; 
import '../Assets/Styles/Dashboard.css';

export const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="d-flex bg-light">
      <CSSTransition
        in={sidebarVisible}
        timeout={300}
        classNames="sidebar"
        unmountOnExit
      >
        <div className="sidebar-container bg-light text-dark">
          <div className="sidebar">
            <ul className="nav flex-column">
              {/* Sidebar content */}
              <li className="nav-item">
                <div className="media align-items-center">
                  <img src="https://placehold.jp/150x150.png" alt="User Icon" className="mr-3 mt-4" style={{ width: '200px', height: '200px' }} />
                  <div className="media-body mt-3 mb-4">
                    <h5 className="mt-0 d-flex justify-content-center">User Name</h5>
                  </div>
                </div>
              </li>
              <li className="nav-item sb-hover">
                <a className="nav-link active text-dark" href="#" style={{ padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                  <BsHouse /> Home
                </a>
              </li>
              <li className="nav-item sb-hover">
                <a className="nav-link active text-dark" href="#" style={{ padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                  <BsInfoCircle /> About
                </a>
              </li>
              <li className="nav-item sb-hover">
                <a className="nav-link text-dark sb-hover" href="#" style={{ padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                  <BsGear /> Services
                </a>
              </li>
              <li className="nav-item sb-hover">
                <a className="nav-link text-dark" href="#" style={{ padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                  <BsChatDots /> Contact
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
