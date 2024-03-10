import React, { useState, useEffect } from 'react';
import { Dashboard } from '../../Components/Dashboard';
import '../../Assets/Styles/EventValidation.css';

const EventRow = ({ id, eventType, eventName, organizedBy, eventDate, eventEndDate, eventTime, eventEndTime, publicityPeriod, endPeriod, venue, estimatedAttendance, totalHours, elePointRequest, totalELEPoints, eventLevel, eventCategory, pdfFile, userId, status, mode, link, platform }) => (
  <tr>
    <td className="pl-2">{id}</td>
    <td>
      <h6 className="font-medium mb-0">{eventName}</h6>
      <span className="text-muted">Type: {eventType}</span><br />
      <span className="text-muted">Organized by: {organizedBy}</span><br />
      <span className="text-muted">Category: {eventCategory}</span>
    </td>
    <td className="details-column">
      <div className="details-grid">
        <div>
          <strong>Date:</strong> {eventDate}<br />
          <strong>End Date:</strong> {eventEndDate}<br />
          <strong>Time:</strong> {eventTime} - {eventEndTime}<br />
          <strong>Venue:</strong> {venue}<br />
          <strong>Publicity Period:</strong> {publicityPeriod}<br />
        </div>
        <div>
          <strong>End Period:</strong> {endPeriod}<br />
          <strong>Estimated Attendance:</strong> {estimatedAttendance}<br />
          <strong>Total Hours:</strong> {totalHours}<br />
          <strong>ELE Point Request:</strong> {elePointRequest}<br />
          <strong>Total ELE Points:</strong> {totalELEPoints}<br />
          <strong>Event Level:</strong> {eventLevel}<br />
        </div>
        <div>
          <strong>PDF File:</strong> {pdfFile}<br />
          <strong>User ID:</strong> {userId}<br />
          <strong>Status:</strong> {status}<br />
          <strong>Mode:</strong> {mode}<br />
          <strong>Link:</strong> {link}<br />
          <strong>Platform:</strong> {platform}<br />
        </div>
      </div>
    </td>
    <td>
      <button type="button" className="btn btn-success btn-circle btn-sm"><i className="fas fa-check"></i> </button>
      <button type="button" className="btn btn-danger btn-circle btn-sm ml-2"><i className="fas fa-times"></i> </button>
    </td>
  </tr>
);

export const EventValidation = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('http://localhost:8000/events')
      .then(response => response.json())
      .then(data => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const filtered = events.filter(event =>
      event.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  const eventsPerPage = 3;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleSearch = event => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset pagination when searching
  };

  return (
    <div className="d-flex bg-light" style={{ height: '100vh' }}>
      <div style={{ width: "15%" }}><Dashboard /></div>
      <div className="container my-4">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title text-uppercase mb-0">Manage Events</h5>
                  <div className="search-box custom-rounded">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-sm table-striped">
                    <thead>
                      <tr>
                        <th scope="col" className="pl-2">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Details</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentEvents.map(event => (
                        <EventRow
                          key={event.id}
                          {...event}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <ul className="pagination justify-content-center">
                  {Array.from({ length: Math.ceil(filteredEvents.length / eventsPerPage) }).map((_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
