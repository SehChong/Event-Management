// HomePage.jsx

import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'chart.js/auto'; // Import Chart.js library
import '../../Assets/Styles/Dashboard.css'
import { Dashboard } from '../../Components/Dashboard';

export const HomePage = () => {

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
    <div className="d-flex bg-light" style={{ height: '100vh' }}>
      <div style={{width:"18%"}}><Dashboard /></div>
      <div className="w-75 mt-5 " style={{ position: 'relative' }}> {/* Ensure the position of HomePage is fixed */}
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
  )
}
