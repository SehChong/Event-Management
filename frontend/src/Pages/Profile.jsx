import React, { useState, useEffect } from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../Components/Footer';

export const Profile = () => {
    const [user, setUser] = useState(null);
    const [createdEventsCount, setCreatedEventsCount] = useState(0);
    const [joinedEventsCount, setJoinedEventsCount] = useState(0);
    const [submittedReportsCount, setSubmittedReportsCount] = useState(0);
    const [notSubmittedReportsCount, setNotSubmittedReportsCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUserData = async () => {
          try {
              const response = await fetch(`http://localhost:8000/user/${sessionStorage.getItem("username")}`);
              if (!response.ok) {
                  throw new Error('Failed to fetch user data');
              }
              const userData = await response.json();
              setUser(userData);
              // Calculate the number of events joined
              setJoinedEventsCount(userData.registeredEvents.length);
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      };

      fetchUserData();
  }, []);

  useEffect(() => {
    const fetchEventsData = async () => {
        try {
            const userId = sessionStorage.getItem("username");
            const response = await fetch(`http://localhost:8000/events`);
            if (!response.ok) {
                throw new Error('Failed to fetch events data');
            }
            const eventsData = await response.json();
            // Calculate the number of events created by the current user
            const createdEvents = eventsData.filter(event => event.userId === userId);
            setCreatedEventsCount(createdEvents.length);
        } catch (error) {
            console.error('Error fetching events data:', error);
        }
    };

    fetchEventsData();
  }, []);

  useEffect(() => {
    const fetchReportsData = async () => {
        try {
            const userId = sessionStorage.getItem("username");

            // Fetch all reports
            const response = await fetch(`http://localhost:8000/reports`);
            if (!response.ok) {
                throw new Error('Failed to fetch reports data');
            }
            const reportsData = await response.json();

            // Initialize counts
            let submittedReportsCount = 0;
            let notSubmittedReportsCount = 0;

            // Count submitted reports for the current user
            reportsData.forEach(report => {
                if (report.userId === userId && report.submittedReport) {
                    submittedReportsCount++;
                }
            });

            // Fetch user data
            const userResponse = await fetch(`http://localhost:8000/user/${userId}`);
            if (!userResponse.ok) {
                throw new Error('Failed to fetch user data');
            }
            const userData = await userResponse.json();

            // Fetch all events
            const eventsResponse = await fetch(`http://localhost:8000/events`);
            if (!eventsResponse.ok) {
                throw new Error('Failed to fetch events data');
            }
            const eventsData = await eventsResponse.json();

            // Filter events registered by the user and are approved, and not marked as rejected after 7 days
            const userEvents = eventsData.filter(event => {
              if (
                  userData.registeredEvents.includes(event.id) &&
                  event.status === "Approved" &&
                  event.elePointRequest === "Required"
              ) {
                  const currentDate = new Date();
                  const eventEndDate = new Date(event.eventEndDate);
                  const daysDifference = Math.floor((currentDate - eventEndDate) / (1000 * 60 * 60 * 24));
                  return eventEndDate < currentDate && daysDifference <= 8;
              }
              return false;
            });

            console.log(userEvents);
            
            // Count not submitted reports for the current user
            notSubmittedReportsCount = userEvents.length;

            // Adjust notSubmittedReportsCount by subtracting the submittedReportsCount
            notSubmittedReportsCount -= submittedReportsCount;

            // Ensure notSubmittedReportsCount is non-negative
            notSubmittedReportsCount = Math.max(0, notSubmittedReportsCount);

            // Set the state with the counts
            setSubmittedReportsCount(submittedReportsCount);
            setNotSubmittedReportsCount(notSubmittedReportsCount);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchReportsData();
  }, []);

    const toHome = () => {
        navigate("/home");
      };
    
      const toClub = () => {
        navigate("/club");
      };
    
      const toEvent = () => {
        navigate("/event");
      };

      const toAttendance = () => {
        navigate("/attendance")
      }
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5" style={{height:"100"}}>
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a onClick={toHome} className='text-primary' style={{ cursor: 'pointer' }}>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a onClick={toClub} className='text-primary' style={{ cursor: 'pointer' }}>Club</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a onClick={toEvent} className='text-primary' style={{ cursor: 'pointer' }}>Event</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a onClick={toAttendance} className='text-primary' style={{ cursor: 'pointer' }}>Attendance</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
          {user && (
            <MDBCard className="mb-4 rounded">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">Student</p>
                <p className="text-muted mb-4">{user.program}</p>
                <div className="d-flex justify-content-center mb-2">
                  {/* <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn> */}
                </div>
              </MDBCardBody>
            </MDBCard>
          )}
          
            {/* Ele points card */}
            <MDBCard className="mb-4 mb-lg-0 rounded">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <div className="d-flex align-items-center">
                      <span className="me-3">Ele 1</span>
                      <MDBIcon fas icon="globe fa-lg text-warning" />
                    </div>
                    <MDBProgress style={{ height: '25px', width: '200px' }}>
                      <MDBProgressBar className="progress-bar" style={{ width: `${(user && user.ele1[1]) || 0}%` }} animated striped>
                        {(user && user.ele1[1]) && <span className="progress-text">{(user && user.ele1[1])}%</span>}
                      </MDBProgressBar>
                    </MDBProgress>
                  </MDBListGroupItem>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <div className="d-flex align-items-center">
                      <span className="me-3">Ele 2</span>
                      <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                    </div>
                    <MDBProgress style={{ height: '25px', width: '200px' }}>
                      <MDBProgressBar className="progress-bar" style={{ width: `${(user && user.ele2[1]) || 0}%` }} animated striped>
                        {(user && user.ele2[1]) && <span className="progress-text">{(user && user.ele2[1])}%</span>}
                      </MDBProgressBar>
                    </MDBProgress>
                  </MDBListGroupItem>

                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <div className="d-flex align-items-center">
                      <span className="me-3">Ele 3</span>
                      <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                    </div>
                    <MDBProgress style={{ height: '25px', width: '200px' }}>
                      <MDBProgressBar className="progress-bar" style={{ width: `${(user && user.ele3[1]) || 0}%` }} animated striped>
                        {(user && user.ele3[1]) && <span className="progress-text">{(user && user.ele3[1])}%</span>}
                      </MDBProgressBar>
                    </MDBProgress>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
          {user && (
            <MDBCard className="mb-4 rounded">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Gender</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.gender}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          )}
            <MDBRow>
            <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0 rounded">
                    <MDBCardBody>
                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Events</span> Information Panel</MDBCardText>
                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Events Created: {createdEventsCount}</MDBCardText>
                        <MDBProgress className="rounded">
                            <MDBProgressBar width={(createdEventsCount)} valuemin={0} valuemax={100} />
                        </MDBProgress>

                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Events Joined: {joinedEventsCount}</MDBCardText>
                        <MDBProgress className="rounded">
                            <MDBProgressBar width={(joinedEventsCount)} valuemin={0} valuemax={100} />
                        </MDBProgress>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>

            <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0 rounded">
                    <MDBCardBody>
                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Reports</span> Information Panel</MDBCardText>
                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Submitted Reports: {submittedReportsCount}</MDBCardText>
                        <MDBProgress className="rounded">
                            <MDBProgressBar width={(submittedReportsCount)} valuemin={0} valuemax={100} />
                        </MDBProgress>

                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Not Submitted Reports: {notSubmittedReportsCount}</MDBCardText>
                        <MDBProgress className="rounded">
                            <MDBProgressBar width={(notSubmittedReportsCount)} valuemin={0} valuemax={100} />
                        </MDBProgress>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer/>
    </section>
  )
}
