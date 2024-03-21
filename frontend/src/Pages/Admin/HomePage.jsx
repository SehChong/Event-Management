import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'chart.js/auto';
import '../../Assets/Styles/Dashboard.css';
import { Dashboard } from '../../Components/Dashboard';

export const HomePage = () => {
  const [userData, setUserData] = useState({ users: 0, male: 0, female: 0 });
  const [eventData, setEventData] = useState({ events: 0, approved: 0, pending: 0, rejected: 0 });
  const [reportData, setReportData] = useState({ reports: 0, approved: 0, pending: 0, rejected: 0 });
  const [clubData, setClubData] = useState({ clubs: 0, approved: 0, pending: 0, rejected: 0 });

  const [chartsInitialized, setChartsInitialized] = useState(false);

  const userPieChartRef = useRef(null);
  const eventsBarChartRef = useRef(null);
  const reportsBarChartRef = useRef(null);
  const clubsBarChartRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/user');
        const data = await response.json();
        const maleCount = data.filter(user => user.gender === 'male').length;
        const femaleCount = data.filter(user => user.gender === 'female').length;
        const totalUsers = data.length;
        setUserData({ users: totalUsers, male: maleCount, female: femaleCount });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchEventData = async () => {
      try {
        const response = await fetch('http://localhost:8000/events');
        const data = await response.json();
        const totalEvents = data.length;
        const approvedCount = data.filter(event => event.status === 'Approved').length;
        const pendingCount = data.filter(event => event.status === 'Pending').length;
        const rejectedCount = data.filter(event => event.status === 'Rejected').length;
        setEventData({ events: totalEvents, approved: approvedCount, pending: pendingCount, rejected: rejectedCount });
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    const fetchReportData = async () => {
      try {
        const response = await fetch('http://localhost:8000/reports');
        const data = await response.json();
        const totalReports = data.length;
        const approvedCount = data.filter(report => report.submissionStatus === 'Approved').length;
        const pendingCount = data.filter(report => report.submissionStatus === 'Pending').length;
        const rejectedCount = data.filter(report => report.submissionStatus === 'Rejected').length;
        setReportData({ reports: totalReports, approved: approvedCount, pending: pendingCount, rejected: rejectedCount });
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    const fetchClubData = async () => {
      try {
        const response = await fetch('http://localhost:8000/clubs');
        const data = await response.json();
        const totalClubs = data.length;
        const approvedCount = data.filter(club => club.status === 'Approved').length;
        const pendingCount = data.filter(club => club.status === 'Pending').length;
        const rejectedCount = data.filter(club => club.status === 'Rejected').length;
        setClubData({ clubs: totalClubs, approved: approvedCount, pending: pendingCount, rejected: rejectedCount });
      } catch (error) {
        console.error('Error fetching club data:', error);
      }
    };

    fetchUserData();
    fetchEventData();
    fetchReportData();
    fetchClubData();
  }, []);

  useEffect(() => {
    if (userData.users > 0 && !chartsInitialized) {
      const initializeCharts = () => {
        // Initialize user pie chart
        const userPieChartCanvas = userPieChartRef.current;
        new Chart(userPieChartCanvas, {
          type: 'pie',
          data: {
            labels: ['Male', 'Female'],
            datasets: [{
              label: 'User Gender Distribution',
              data: [userData.male, userData.female],
              backgroundColor: ['blue', 'pink'],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: 'white' // Change legend text color
                }
              }
            },
            datalabels: {
              color: 'white' // Change data labels color to white
            }
          }
        });

        // Initialize events bar chart
        const eventsBarChartCanvas = eventsBarChartRef.current;
        new Chart(eventsBarChartCanvas, {
          type: 'bar',
          data: {
            labels: ['Approved', 'Pending', 'Rejected'],
            datasets: [{
              label: 'Event Status Distribution',
              data: [eventData.approved, eventData.pending, eventData.rejected],
              backgroundColor: ['green', 'yellow', 'red'],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              },
              x: {
                ticks: {
                  color: 'white' // Change x-axis labels color to white
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: 'white' // Change legend text color
                }
              }
            },datalabels: {
              color: 'white' // Change data labels color to white
            }
          }
        });

        // Initialize reports bar chart
        const reportsBarChartCanvas = reportsBarChartRef.current;
        new Chart(reportsBarChartCanvas, {
          type: 'bar',
          data: {
            labels: ['Approved', 'Pending', 'Rejected'],
            datasets: [{
              label: 'Report Status Distribution',
              data: [reportData.approved, reportData.pending, reportData.rejected],
              backgroundColor: ['green', 'yellow', 'red'],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              },
              x: {
                ticks: {
                  color: 'white' // Change x-axis labels color to white
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: 'white' // Change legend text color
                }
              }
            },
            datalabels: {
              color: 'white' // Change data labels color to white
            }
          }
        });

        // Initialize clubs bar chart
        const clubsBarChartCanvas = clubsBarChartRef.current;
        new Chart(clubsBarChartCanvas, {
          type: 'bar',
          data: {
            labels: ['Approved', 'Pending', 'Rejected'],
            datasets: [{
              label: 'Club Status Distribution',
              data: [clubData.approved, clubData.pending, clubData.rejected],
              backgroundColor: ['green', 'yellow', 'red'],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              },
              x: {
                ticks: {
                  color: 'white' // Change x-axis labels color to white
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: 'white' // Change legend text color
                }
              }
            },
            datalabels: {
              color: 'white' // Change data labels color to white
            }
          }
        });
      };
      initializeCharts();
      setChartsInitialized(true);
    }
  }, [userData, eventData, reportData, clubData, chartsInitialized]);

  return (
    <div className="d-flex bg-light" style={{ height: '100vh' }}>
      <div style={{ width: '20%' }}>
        <Dashboard />
      </div>
      <div className="w-75 mt-5" style={{ position: 'relative' }}>
        <div className="d-flex justify-content-start m-4 gap-4">
          <div className="card" style={{ width: '25%' }}>
            <div className="card-body rounded bg-secondary text-light">
              <h5 className="card-title">Users: {userData.users}</h5>
              <p className="card-text">Male: {userData.male}</p>
              <p className="card-text">Female: {userData.female}</p>
            </div>
          </div>
          <div className="card" style={{ width: '25%' }}>
            <div className="card-body rounded bg-secondary text-light">
              <h5 className="card-title">Events: {eventData.events}</h5>
              <p className="card-text">Approved: {eventData.approved}</p>
              <p className="card-text">Pending: {eventData.pending}</p>
              <p className="card-text">Rejected: {eventData.rejected}</p>
            </div>
          </div>
          <div className="card" style={{ width: '25%' }}>
            <div className="card-body rounded bg-secondary text-light">
              <h5 className="card-title">Reports: {reportData.reports}</h5>
              <p className="card-text">Approved: {reportData.approved}</p>
              <p className="card-text">Pending: {reportData.pending}</p>
              <p className="card-text">Rejected: {reportData.rejected}</p>
            </div>
          </div>
          <div className="card" style={{ width: '25%' }}>
            <div className="card-body rounded bg-secondary text-light">
              <h5 className="card-title">Clubs: {clubData.clubs}</h5>
              <p className="card-text">Approved: {clubData.approved}</p>
              <p className="card-text">Pending: {clubData.pending}</p>
              <p className="card-text">Rejected: {clubData.rejected}</p>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-around m-4 gap-4">
          <div className="card" style={{ width: '50%' }}>
            <div className="card-body rounded bg-dark">
              <canvas ref={userPieChartRef}></canvas>
            </div>
          </div>
          <div className="card" style={{ width: '50%' }}>
            <div className="card-body rounded bg-dark">
              <canvas ref={eventsBarChartRef}></canvas>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-around m-4 gap-4" style={{height:300}}>
          <div className="card" style={{ width: '50%' }}>
            <div className="card-body rounded bg-dark">
              <canvas ref={reportsBarChartRef}></canvas>
            </div>
          </div>
          <div className="card" style={{ width: '50%' }}>
            <div className="card-body rounded bg-dark">
              <canvas ref={clubsBarChartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};