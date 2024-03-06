import React, { useState, useEffect } from 'react';

const ITEMS_PER_PAGE = 9;

export const CardEventSlider = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
    fetchEvents();
  }, []);

  useEffect(() => {
    const indexOfLastEvent = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstEvent = indexOfLastEvent - ITEMS_PER_PAGE;
    setFilteredEvents(events.slice(indexOfFirstEvent, indexOfLastEvent));
  }, [events, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='m-5 p-5'>
      <div className="row row-cols-1 row-cols-md-3 g-5">
        {filteredEvents.map((event) => (
          <div className="col" key={event.id}>
            <div className="card h-100">
              <img src={event.image} className="card-img-top" alt="Event" />
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <ul className="list-unstyled">
                  <li><strong>Event Date:</strong> {event.eventDate}</li>
                  <li><strong>Event End:</strong> {event.eventEndDate}</li>
                  <strong>Event Points:</strong> {event.elePointRequest === 'Required' ? 'Yes' : 'No'}
                  <li><strong>Mode:</strong> {event.mode}</li>
                  {event.mode === 'Physical' && <li className="physical"><strong>Venue:</strong> {event.venue}</li>}
                  {event.mode === 'Online' && (
                    <div>
                      <li className="online"><strong>Platform:</strong> {event.platform}</li>
                      <li><strong>Link:</strong> <a href={event.link} className="online">Meetings Link for the Events</a></li>
                    </div>
                  )}                  
                  <li><strong>Registration Date:</strong> {event.publicityPeriod}</li>
                  <li><strong>Registration Close:</strong> {event.endPeriod}</li>
                </ul>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary d-flex mx-auto">Register</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation example" className='mt-5'>
        <ul className="pagination justify-content-end">
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