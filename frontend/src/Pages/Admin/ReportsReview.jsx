import React, { useState, useEffect } from 'react';
import { Dashboard } from '../../Components/Dashboard';
import { ViewReports } from '../../Components/ViewReports';

const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const ReportsReview = () => {
  const [reports, setReports] = useState([]);
  const [filterELE, setFilterELE] = useState('All');
  const [selectedReport, setSelectedReport] = useState(null); // State for selected report
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [currentPage, setCurrentPage] = useState(1); // Current page of pagination
  const [itemsPerPage] = useState(10); // Number of items per page

  useEffect(() => {
    fetch('http://localhost:8000/reports')
      .then(response => response.json())
      .then(data => setReports(data))
      .catch(error => console.error('Error fetching reports:', error));

    const interval = setInterval(() => {
      fetch('http://localhost:8000/reports')
        .then(response => response.json())
        .then(data => setReports(data))
        .catch(error => console.error('Error fetching reports:', error));
    }, 60000); // Refresh data every 1 minute (adjust interval as needed)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handleELEFilterChange = (event) => {
    setFilterELE(event.target.value);
    setCurrentPage(1); // Reset current page when filter changes
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const filteredReports = filterELE === 'All' ? reports : reports.filter(report => report.ele === filterELE);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage + 1;
  const currentItems = filteredReports.slice(indexOfFirstItem - 1, indexOfLastItem);
  

  const paginate = pageNumber => setCurrentPage(pageNumber);

    // Function to update the reports state
    const updateReportSubmissionStatus = (updatedReport) => {
      // Find the index of the updated report in the reports array
      const index = reports.findIndex(report => report.id === updatedReport.id);
      if (index !== -1) {
        // Create a new array with the updated report
        const updatedReports = [...reports];
        updatedReports[index] = updatedReport;
        // Update the reports state with the new array
        setReports(updatedReports);
      }
    };

  return (
    <div className="d-flex bg-light" style={{ height: '100vh' }}>
      <div style={{ width: "15%" }}>
        <Dashboard />
      </div>
      <div className="container my-4">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title text-uppercase mb-0">Manage Reports</h5>
                  <div className="dropdown ml-2">
                    <select className="form-control" onChange={handleELEFilterChange}>
                      <option value="All">All</option>
                      <option value="ele1">ELE 1</option>
                      <option value="ele2">ELE 2</option>
                      <option value="ele3">ELE 3</option>
                    </select>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-sm table-striped">
                    <thead>
                      <tr>
                        <th scope="col" className='text-center'>Index</th>
                        <th scope="col" className='text-center'>ELE</th>
                        <th scope="col" className='text-center'>Event Name</th>
                        <th scope="col" className='text-center'>Event Date</th>
                        <th scope="col" className='text-center'>Total ELE Points</th>
                        <th scope="col" className='text-center'>Submission Status</th>
                        <th scope="col" className='text-center'>Submitted Report</th>
                        <th scope="col" className='text-center'>View Reports</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((report, index) => (
                        <tr key={report.id}>
                          <td className='text-center'>{indexOfFirstItem + index}</td>
                          <td className='text-center'>{report.ele}</td>
                          <td className='text-center'>{report.eventName}</td>
                          <td className='text-center'>{report.eventDate}</td>
                          <td className='text-center'>{report.totalELEPoints}</td>
                          <td className='text-center'>{report.submissionStatus}</td>
                          <td className='text-center'>{capitalizeFirstLetter(report.submittedReport ? report.submittedReport.toString() : '')}</td>
                          <td className='text-center'>
                            <button className="btn btn-success" onClick={() => handleViewReport(report)}>View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <nav>
                  <ul className="pagination justify-content-center">
                    {Array.from({ length: Math.ceil(filteredReports.length / itemsPerPage) }, (_, i) => (
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
        </div>
      </div>
      {/* Modal for displaying detailed report */}
      {showModal && (
        <ViewReports
          report={selectedReport}
          onClose={() => setShowModal(false)}
          updateReportSubmissionStatus={updateReportSubmissionStatus} // Pass the function as prop
        />
      )}
    </div>
  );
};
