// Import necessary modules
import React, { useState, useEffect } from 'react';

const ITEMS_PER_PAGE = 9;

// Define the component
export const CardEventSlider = () => {
  // Define state variables
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);

  // Fetch events from the server on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8000/events?status=Approved');
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events data:', error);
      }
    };
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/user');
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };
    fetchEvents();
    fetchUsers();
  }, []);

  // Filter events based on registration date and end date
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    const filtered = events.filter(event => {
      const registrationDate = event.publicityPeriod;
      const endDate = event.endPeriod;
      return currentDate >= registrationDate && currentDate <= endDate;
    });
    setFilteredEvents(filtered);
  }, [events]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const registerForEvent = async (eventId) => {
    try {
      // Get the user's ID from session or local storage
      const userId = sessionStorage.getItem("userId"); // Make sure to replace "userId" with the actual key you use to store the user's ID
      // Fetch the user data
      const response = await fetch(`http://localhost:8000/user/${sessionStorage.getItem("username")}`);
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      const userData = await response.json();
      // Check if the user is already registered for the event
      if (userData.registeredEvents && userData.registeredEvents.includes(eventId)) {
        alert('You have already registered for this event.');
        return;
      }
      // Add the event ID to the user's registeredEvents array
      const updatedUserData = {
        ...userData,
        registeredEvents: userData.registeredEvents ? [...userData.registeredEvents, eventId] : [eventId]
      };
      // Update the user data in the database
      await fetch(`http://localhost:8000/user/${sessionStorage.getItem("username")}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });
      alert('Registration successful!');
    } catch (error) {
      console.error('Error registering for event:', error);
      alert('Failed to register for event. Please try again.');
    }
  };

  // Count participants for each event
  const countParticipants = (eventId) => {
    if (!users.length) return 0;
    return users.reduce((count, user) => {
      return count + (user.registeredEvents && user.registeredEvents.includes(eventId) ? 1 : 0);
    }, 0);
  };

  // Poll for updated participant counts periodically
  useEffect(() => {
    const interval = setInterval(() => {
      fetchParticipantCounts();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Fetch updated participant counts
  const fetchParticipantCounts = async () => {
    try {
      const response = await fetch('http://localhost:8000/user');
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching participant counts:', error);
    }
  };

  const indexOfLastEvent = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstEvent = indexOfLastEvent - ITEMS_PER_PAGE;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Render the component
  return (
    <div className='m-5 p-5'>
      <div className="row row-cols-1 row-cols-md-3 g-5">
        {currentEvents.map((event) => (
          <div className="col" key={event.id}>
            <div className="card h-100 rounded">
              <img src={event.image} className="card-img-top" alt="Event" />
              <div className="card-body">
                <h5 className="card-title">{event.eventName}</h5>
                <ul className="list-unstyled">
                  <li><strong>Event Date:</strong> {event.eventDate}</li>
                  <li><strong>Event End:</strong> {event.eventEndDate}</li>
                  <li>
                    {event.totalELEPoints != null && (
                      <>
                        <strong>ELE Points:</strong> {event.totalELEPoints}
                      </>
                    )}
                  </li>
                  <li>
                    {event.paymentRequired != null && (
                      <>
                        <li><strong>Total:</strong> {event.paymentAmount}</li>
                        <li><strong>Payment Link:</strong> {event.paymentLink}</li>
                      </>
                    )}
                  </li>
                  <li><strong>Participants:</strong>  {countParticipants(event.id)} / {event.estimatedAttendance}</li>
                  <li><strong>Mode:</strong> {event.mode}</li>
                  {event.mode === 'Physical' && <li className="physical"><strong>Venue:</strong> {event.venue}</li>}
                  {event.mode === 'Online' && (
                    <div>
                      <li className="online"><strong>Platform:</strong> {event.platform}</li>
                      <li><strong>Link:</strong> <a href={event.link} className="online">Meetings Link for the Events</a></li>
                    </div>
                  )}
                  <li><strong>Registration Close (After):</strong> {event.endPeriod}</li>
                </ul>
              </div>
              <div className="card-footer">
              <button className={`btn btn-primary d-flex mx-auto ${countParticipants(event.id) >= event.estimatedAttendance ? 'disabled' : ''}`} 
                      disabled={countParticipants(event.id) >= event.estimatedAttendance}
                      onClick={() => countParticipants(event.id) < event.estimatedAttendance && registerForEvent(event.id)}>
                {countParticipants(event.id) >= event.estimatedAttendance ? 'Registration Closed' : 'Register'}
              </button>             
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation example" className='mt-5'>
        <ul className="pagination justify-content-end">
          {/* Pagination controls */}
          {currentPage > 1 && (
            <li className="page-item">
              <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
            </li>
          )}
          {Array.from({ length: Math.ceil(events.length / ITEMS_PER_PAGE) }, (_, i) => i + 1).map(page => (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <a className="page-link" href="#" onClick={() => handlePageChange(page)}>{page}</a>
            </li>
          ))}
          {currentPage < Math.ceil(events.length / ITEMS_PER_PAGE) && (
            <li className="page-item">
              <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
