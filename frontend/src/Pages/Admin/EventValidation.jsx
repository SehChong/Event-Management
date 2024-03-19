import React, { useState, useEffect } from 'react';
import { Dashboard } from '../../Components/Dashboard';
import '../../Assets/Styles/EventValidation.css';

const EventRow = ({ id, eventType, eventName, organizedBy, eventDate, eventEndDate, eventTime, eventEndTime, publicityPeriod, endPeriod, venue, estimatedAttendance, totalHours, elePointRequest, totalELEPoints, eventLevel, eventCategory, pdfFile, userId, status, mode, link, platform, onApprove, onReject }) => (
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
      <button type="button" className="btn btn-success btn-circle btn-sm" onClick={() => onApprove(id)}><i className="fas fa-check"></i> </button>
      <button type="button" className="btn btn-danger btn-circle btn-sm ml-2" onClick={() => onReject(id)}><i className="fas fa-times"></i> </button>
    </td>
  </tr>
);

export const EventValidation = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('All'); // Track selected status filter

  useEffect(() => {
    fetch('http://localhost:8000/events')
      .then(response => response.json())
      .then(data => {
        // Sort events by the createdAt timestamp in descending order
        const sortedEvents = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setEvents(sortedEvents);
        setFilteredEvents(sortedEvents);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const filtered = events.filter(event =>
      (statusFilter === 'All' || event.status === statusFilter) && // Consider status filter
      (event.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.eventName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredEvents(filtered);
  }, [searchQuery, events, statusFilter]); // Include statusFilter in dependencies

  const eventsPerPage = 3;
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleSearch = event => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset pagination when searching
  };

  const handleStatusFilterChange = event => {
    setStatusFilter(event.target.value);
    setCurrentPage(1); // Reset pagination when changing status filter
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  
  const handleApprove = (eventId) => {
    // Find the event by ID
    const eventToUpdate = events.find(event => event.id === eventId);
    if (!eventToUpdate) return;
  
    // Update the status of the event to "Approved"
    const updatedEvent = { ...eventToUpdate, status: 'Approved' };
  
    // Make a PATCH request to update the event in the database
    fetch(`http://localhost:8000/events/${eventId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update event');
        }
        // Update the events state with the updated event
        const updatedEvents = events.map(event =>
          event.id === eventId ? updatedEvent : event
        );
        setEvents(updatedEvents);
        setFilteredEvents(updatedEvents);
      })
      .catch(error => console.error('Error updating event:', error));
  };
  
  const handleReject = (eventId) => {
    // Find the event by ID
    const eventToUpdate = events.find(event => event.id === eventId);
    if (!eventToUpdate) return;
  
    // Update the status of the event to "Rejected"
    const updatedEvent = { ...eventToUpdate, status: 'Rejected' };
  
    // Make a PATCH request to update the event in the database
    fetch(`http://localhost:8000/events/${eventId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update event');
        }
        // Update the events state with the updated event
        const updatedEvents = events.map(event =>
          event.id === eventId ? updatedEvent : event
        );
        setEvents(updatedEvents);
        setFilteredEvents(updatedEvents);
      })
      .catch(error => console.error('Error updating event:', error));
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
                  <div className="dropdown ml-2">
                    <select className="form-control" onChange={handleStatusFilterChange}>
                      <option value="All">All</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
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
                          onApprove={handleApprove}
                          onReject={handleReject}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <ul className="pagination justify-content-center">
                  {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                      <button onClick={() => paginate(number)} className="page-link">{number}</button>
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
