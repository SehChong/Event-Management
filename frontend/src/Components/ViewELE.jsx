import React, { useState, useEffect } from 'react';

export const ViewELE = ({ user, onClose }) => {
  const [userData, setUserData] = useState(user);
  const [confirmationLevel, setConfirmationLevel] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchUserData();
    }, 5000); // Refresh data every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const fetchUserData = () => {
    fetch(`http://localhost:8000/user/${user.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        // Handle error, display error message, etc.
      });
  };

  const handleRegisterClick = (level) => {
    // Construct the current date in the format "YYYY-MM-DD"
    const currentDate = new Date().toISOString().split('T')[0];
  
    // Define the status for registered and unregistered states
    const registeredStatus = ["Ongoing", 0, "Registered", currentDate];
  
    // Determine the ELE array to update based on the level
    let eleArrayToUpdate;
    if (level === 1) eleArrayToUpdate = 'ele1';
    else if (level === 2) eleArrayToUpdate = 'ele2';
    else if (level === 3) eleArrayToUpdate = 'ele3';
    else return; // Invalid level
  
    // Construct the updated ELE array for registration
    const updatedEle = registeredStatus;
  
    // Construct the updated user object with the modified ELE array
    const updatedUser = {
      ...userData,
      [eleArrayToUpdate]: updatedEle
    };
  
    // Update the database
    updateUserInDatabase(updatedUser);
  };

  const handleUnregisterClick = (level) => {
    // Set confirmation level to initiate double confirmation dialog
    setConfirmationLevel(level);
  };

  const confirmUnregister = () => {
    // Determine the ELE array to update based on the confirmation level
    let eleArrayToUpdate;
    if (confirmationLevel === 1) eleArrayToUpdate = 'ele1';
    else if (confirmationLevel === 2) eleArrayToUpdate = 'ele2';
    else if (confirmationLevel === 3) eleArrayToUpdate = 'ele3';
    else return; // Invalid level
  
    // Construct the updated ELE array for unregistration
    const unregisteredStatus = ["None", 0, "Unregistered", ""];
  
    // Construct the updated user object with the modified ELE array
    const updatedUser = {
      ...userData,
      [eleArrayToUpdate]: unregisteredStatus
    };
  
    // Update the database
    updateUserInDatabase(updatedUser);
  
    // Reset confirmation level after unregistering
    setConfirmationLevel(null);
  };

  const updateUserInDatabase = (updatedUser) => {
    fetch(`http://localhost:8000/user/${updatedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
      return response.json();
    })
    .then(data => {
      console.log('User data updated successfully:', data);
      // Fetch updated user data after updating
      fetchUserData();
    })
    .catch(error => {
      console.error('Error updating user data:', error);
      // Handle error, display error message, etc.
    });
  };

  return (
    <div>
      {/* Dark semi-transparent background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value to control transparency
          zIndex: 1000, // Ensure it's below the modal content
        }}
        onClick={onClose}
      ></div>

      <div className="modal" style={{ display: 'block' }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">ELE Details for {userData.name}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <h5>ELE Details: </h5>
              <p>Registered Event ID: <br/> {userData.registeredEvents.join(', ')}</p>
              <p>ELE 1: {userData.ele1?.join(', ')}</p>
              <p>ELE 2: {userData.ele2?.join(', ')}</p>
              <p>ELE 3: {userData.ele3?.join(', ')}</p>
              <br/>
              <h5>Registered for ELE Level:</h5>
              <table className="table">
                <tbody>
                  {[1, 2, 3].map(level => (
                    <tr key={level}>
                      <td>ELE Level {level}</td>
                      <td className="text-end"> {/* Align buttons to the right */}
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => handleRegisterClick(level)}
                          disabled={userData[`ele${level}`][2] === "Registered"} // Disable if already registered
                        >
                          Register
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleUnregisterClick(level)}
                          disabled={userData[`ele${level}`][2] === "Unregistered"} // Disable if already unregistered
                        >
                          Unregister
                        </button>

                        {confirmationLevel === level && (
                          <div className="modal" style={{ display: 'block', zIndex: 1001 }}>
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title">Confirmation</h5>
                                  <button type="button" className="btn-close" onClick={() => setConfirmationLevel(null)}></button>
                                </div>
                                <div className="modal-body text-center">
                                  Are you sure you want to unregister ELE Level {level}?
                                </div>
                                <div className="modal-footer justify-content-center">
                                  <button type="button" className="btn btn-secondary" onClick={() => setConfirmationLevel(null)}>Cancel</button>
                                  <button type="button" className="btn btn-danger" onClick={confirmUnregister}>Confirm</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
                     
