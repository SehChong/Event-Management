import React from 'react';
import { Dashboard } from '../../Components/Dashboard';
import '../../Assets/Styles/EventValidation.css';

const EventRow = ({ index, name, location, date, organizer }) => (
  <tr>
    <td className="pl-4">{index}</td>
    <td>
      <h5 className="font-medium mb-0">{name}</h5>
      <span className="text-muted">{location}</span>
    </td>
    <td>
      <span className="text-muted">{date}</span><br />
      <span className="text-muted">Organized by: {organizer}</span>
    </td>
    <td>
      <button type="button" className="btn btn-success btn-circle btn-lg btn-circle"><i className="fas fa-check"></i> </button>
      <button type="button" className="btn btn-danger btn-circle btn-lg btn-circle ml-2"><i className="fas fa-times"></i> </button>
    </td>
  </tr>
);

export const EventValidation = () => {
const events = [
  { index: 1, name: 'Event 1', location: 'New York, United States', date: '15 Mar 2024', organizer: 'Organizer 1' },
  { index: 2, name: 'Event 2', location: 'Los Angeles, United States', date: '20 Mar 2024', organizer: 'Organizer 2' },
  { index: 3, name: 'Event 3', location: 'Chicago, United States', date: '25 Mar 2024', organizer: 'Organizer 3' },
  { index: 4, name: 'Event 4', location: 'Houston, United States', date: '30 Mar 2024', organizer: 'Organizer 4' },
  { index: 5, name: 'Event 5', location: 'Miami, United States', date: '5 Apr 2024', organizer: 'Organizer 5' },
  { index: 6, name: 'Event 6', location: 'San Francisco, United States', date: '10 Apr 2024', organizer: 'Organizer 6' },
  { index: 7, name: 'Event 7', location: 'Seattle, United States', date: '15 Apr 2024', organizer: 'Organizer 7' },
  { index: 8, name: 'Event 8', location: 'Dallas, United States', date: '20 Apr 2024', organizer: 'Organizer 8' },
  { index: 9, name: 'Event 9', location: 'Philadelphia, United States', date: '25 Apr 2024', organizer: 'Organizer 9' },
  { index: 10, name: 'Event 10', location: 'Boston, United States', date: '30 Apr 2024', organizer: 'Organizer 10' },
];


  return (
    <div className="d-flex bg-light" style={{ height: '100vh' }}>
      <div style={{width:"15%"}}><Dashboard /></div>
      <div className="container my-4"> {/* Added my-4 class for margin */}
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-uppercase mb-0">Manage Events</h5>
              </div>
              <div className="table-responsive">
                <table className="table no-wrap event-table mb-0 rounded">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0 text-uppercase font-medium pl-4">#</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Name</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Date</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map(event => (
                      <EventRow
                        key={event.index}
                        index={event.index}
                        name={event.name}
                        location={event.location}
                        date={event.date}
                        organizer={event.organizer}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
