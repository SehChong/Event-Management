import React, { useState, useEffect } from 'react';
import { Back } from '../Components/Back';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AccordionForm = () => {
    const { state } = useLocation(); // Extract location state
    const navigate = useNavigate();

    // Check if eventDetails object exists in state
    const eventDetails = state ? state.eventDetails : null;

    // Extract event name from eventDetails
    const eventName = eventDetails ? eventDetails.eventName : null;

    const userId = sessionStorage.getItem("username");

    // Initialize formData with empty values or values from eventDetails
    const [formData, setFormData] = useState({
        question1: '',
        question2: '',
        question3: '',
        userId,
        eventId: null, // Initialize eventId as null
        ...(eventDetails || {}) // Spread eventDetails if it exists, otherwise use an empty object
    });

    // State for modal visibility
    const [showModal, setShowModal] = useState(false);

    // State for selected ELE
    const [selectedELE, setSelectedELE] = useState('');

    useEffect(() => {
        // Fetch event ID based on the event name
        const fetchEventId = async () => {
            try {
                const response = await fetch(`http://localhost:8000/events`);
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const events = await response.json();
                // Find the event with the matching name
                const matchingEvent = events.find(event => event.eventName === eventName);
                if (matchingEvent) {
                    // Update formData with the event ID
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        eventId: matchingEvent.id
                    }));
                } else {
                    console.error('Event not found');
                }
            } catch (error) {
                console.error('Error fetching event ID:', error);
            }
        };

        if (eventName) {
            fetchEventId();
        }
    }, [eventName]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleModalFormSubmit = async (eventDetails) => {
      try {
          const userId = sessionStorage.getItem("username");
          const eventId = eventDetails.eventId;
  
          // Check if the user is registered for the selected ELE
          const userResponse = await fetch(`http://localhost:8000/user/${userId}`);
          if (!userResponse.ok) {
              throw new Error('Failed to fetch user data');
          }
          const userData = await userResponse.json();
          const eleIndex = selectedELE.charAt(selectedELE.length - 1);
          const eleKey = `ele${eleIndex}`;
          if (userData[eleKey][2] !== 'Registered') {
              throw new Error(`User is not registered for ${selectedELE}`);
          }
  
          const updatedFormData = {
              ...formData,
              submissionStatus: "Approved",
              submittedReport: true
          };
          setFormData(updatedFormData);
  
          // Combine event details with form data
          const reportData = {
              eventId: eventId,
              userId: userId,
              ele: selectedELE,
              ...updatedFormData
          };
  
          // Send POST request to create new report entry
          const response = await fetch('http://localhost:8000/reports', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(reportData)
          });
  
          if (!response.ok) {
              throw new Error('Failed to submit report');
          }
  
          // If successful, show success message
          toast.success('Report submitted successfully!');
      } catch (error) {
          console.error('Error submitting report:', error);
          // Show error message
          toast.error('Failed to submit report. ' + error.message);
      }
  };  

    const handleFormSubmit = async () => {
        // Check if all textareas are filled in
        if (formData.question1.trim() === '' || formData.question2.trim() === '' || formData.question3.trim() === '') {
          alert('Please fill in all questions before submitting.');
          return;
      }

      // Show the modal for selecting ELE
      setShowModal(true);
    };

    // Function to handle ELE selection
    const handleELESelection = (eleOption) => {
        setSelectedELE(eleOption);
    };

    // Function to handle saving ELE points and navigate back
    const handleSaveELEPoints = async () => {
        try {
            if (!eventDetails) {
              console.error('Event details not found');
              return;
            }

            // Check if eventDetails contains the totalELEPoints property
            if (!eventDetails.hasOwnProperty('totalELEPoints')) {
                console.error('totalELEPoints not found in event details');
                return;
            }

            const eleIndex = selectedELE.charAt(selectedELE.length - 1); // Extract ELE index (1, 2, or 3)
            const eleKey = `ele${eleIndex}`;
    
            // Fetch user data to get the current ELE points
            const response = await fetch(`http://localhost:8000/user/${sessionStorage.getItem("username")}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const userData = await response.json();
    
            // Check if the selected ELE option is registered
            if (userData[eleKey][2] === 'Registered') {
                // Increment ELE points based on selected option
                const updatedELE = [...userData[eleKey]];
                updatedELE[1] = parseInt(updatedELE[1]) + parseInt(eventDetails.totalELEPoints); // Parse to integers and add points
                // updatedELE[2] = 'Registered';
                // updatedELE[3] = eventDetails.eventName; // Assuming you want to store the event name
    
                // Update formData with the updated ELE points
                userData[eleKey] = updatedELE;
    
                // Send PUT request to update user object with new ELE points
                const response = await fetch(`http://localhost:8000/user/${sessionStorage.getItem("username")}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update user data');
                }
                // If successful, navigate to the previous page
                navigate(-1);
            } else {
                alert(`ELE ${eleIndex} is not registered yet.`);
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

  const handleSaveAndSubmit = async () => {
      await handleSaveELEPoints(); // First, handle ELE points saving
      handleModalFormSubmit(eventDetails); // Then, show the modal for form submission
  };

  return (
    <div>
      <Back to="/attendance" />
      <div className="container mt-5">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Question 1
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <form className='p-3'>
                  <div className="form-group">
                    <label htmlFor="Textarea1" className='mb-3'>What knowledge/skills will you gain from attending the event?</label>
                    <textarea id="Textarea1" className="form-control" rows="5" name="question1" value={formData.question1} onChange={handleInputChange} required></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Question 2
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <form className='p-3'>
                  <div className="form-group">
                    <label htmlFor="Textarea2" className='mb-3'>How do you think you can apply the knowledge/skills learnt from the event to use in the future?</label>
                    <textarea id="Textarea2" className="form-control" rows="5" name="question2" value={formData.question2} onChange={handleInputChange} required></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Question 3
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <form className='p-3'>
                  <div className="form-group">
                    <label htmlFor="Textarea3" className='mb-3'>How do you feel about the event after attending it?</label>
                    <textarea id="Textarea3" className="form-control" rows="5" name="question3" value={formData.question3} onChange={handleInputChange} required></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-end'>
          <Button variant="primary" className='my-5' onClick={handleFormSubmit}>Submit</Button>
        </div>
      </div>
      {/* Modal for selecting ELE */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select ELE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="primary" onClick={() => handleELESelection('ele1')}>ELE 1</Button>{' '}
                    <Button variant="primary" onClick={() => handleELESelection('ele2')}>ELE 2</Button>{' '}
                    <Button variant="primary" onClick={() => handleELESelection('ele3')}>ELE 3</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSaveAndSubmit}>Save</Button>
                </Modal.Footer>
        </Modal>
    </div>
  );
};
