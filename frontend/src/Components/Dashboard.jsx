import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsHouse, BsInfoCircle, BsGear, BsChatDots } from 'react-icons/bs'; // Import icons from react-icons library
import { Dropdown } from 'react-bootstrap'; // Import Dropdown component from react-bootstrap
import '../Assets/Styles/Dashboard.css'

export const Dashboard = () => {
  return (
    <div className="d-flex bg-light">
      <div className="sidebar-container bg-white text-dark" style={{ width: '250px', height: '100vh', padding: '20px' }}>
        <div className="sidebar">
          <ul className="nav flex-column">
            <li className="nav-item">
              <div className="media align-items-center">
                <img src='https://placehold.jp/150x150.png' alt="User Icon" className="mr-3 mt-4" style={{ width: '200px', height: '200px' }} />
                <div className="media-body mt-3">
                  <h5 className="mt-0 d-flex justify-content-center">User Name</h5>
                </div>
              </div>
            </li>
            <li className="nav-item sb-hover" style={{ marginTop: '10px' }}>
              <a className="nav-link active text-dark" href="#" style={{ padding: '10px', borderRadius: '5px', cursor: 'pointer', ':hover': { backgroundColor: '#f8f9fa' } }}>
                <BsHouse /> Home
              </a>
            </li>
            <li className="nav-item sb-hover" style={{ marginTop: '10px' }}>
              <Dropdown className="sb-hover">
                <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                  <BsInfoCircle /> About
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item sb-hover" style={{ marginTop: '10px' }}>
              <a className="nav-link text-dark sb-hover" href="#" style={{ padding: '10px', borderRadius: '5px', cursor: 'pointer'  }}>
                <BsGear /> Services
              </a>
            </li>
            <li className="nav-item sb-hover" style={{ marginTop: '10px' }}>
              <a className="nav-link text-dark" href="#" style={{ padding: '10px', borderRadius: '5px', cursor: 'pointer', hover: { backgroundColor: '#f8f9fa' } }}>
                <BsChatDots /> Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
