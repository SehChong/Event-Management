import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsHouse, BsInfoCircle, BsGear, BsChatDots } from 'react-icons/bs'; // Import icons from react-icons library
import { Dropdown } from 'react-bootstrap'; // Import Dropdown component from react-bootstrap
import Chart from 'chart.js/auto'; // Import Chart.js library
import '../Assets/Styles/Dashboard.css'

export const Dashboard = () => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  useEffect(() => {
    // Bar chart data
    const barChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    // Pie chart data
    const pieChartData = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: 'My First Dataset',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'red',
          'blue',
          'yellow',
          'green',
          'purple',
          'orange'
        ],
        borderWidth: 1
      }]
    };

    // Chart options
    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    // Initialize bar chart
    const barChart = new Chart(chartRef1.current, {
      type: 'bar',
      data: barChartData,
      options: options
    });

    // Initialize pie chart
    const pieChart = new Chart(chartRef2.current, {
      type: 'pie',
      data: pieChartData,
      options: options
    });

    // Cleanup function
    return () => {
      barChart.destroy();
      pieChart.destroy();
    };
  }, []);

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

      <div className=" w-100 mt-5">
        <div className='d-flex justify-content-start mx-4 gap-4'>
          <div className="card" style={{ width: '25%' }}>
            <div className="card-body">
              <h1>Testing</h1>
              <h1>Testing</h1>
            </div>
          </div>

          <div className="card" style={{ width: '25%' }}>
            <div className="card-body">
              <h1>Testing</h1>
              <h1>Testing</h1>
            </div>
          </div>
          <div className="card" style={{ width: '25%' }}>
            <div className="card-body">
              <h1>Testing</h1>
              <h1>Testing</h1>
            </div>
          </div>
          <div className="card" style={{ width: '25%' }}>
            <div className="card-body">
              <h1>Testing</h1>
              <h1>Testing</h1>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-between mx-4 my-4 gap-4'>
          <div className="card" style={{ width: '65%' }}>
            <div className="card-body">
              <canvas ref={chartRef1}></canvas>
            </div>
          </div>

          <div className="card" style={{ width: '35%' }}>
            <div className="card-body">
              <canvas ref={chartRef2}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
