import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import '../Assets/Styles/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    sessionStorage.clear();
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (validate()) {
      // First, try to authenticate as a user
      fetch("http://localhost:8000/user")
        .then((res) => res.json())
        .then((users) => {
          const user = users.find((user) => user.id === username);
          if (user) {
            if (user.password === password) {
              toast.success("Login successful");
              sessionStorage.setItem("username", username);
              sessionStorage.setItem("userrole", user.role);
              if (user.role === "admin") {
                navigate("/adminHome");
              } else {
                navigate("/home");
              }
            } else {
              toast.error("Invalid credentials");
            }
          } else {
            // If not found as a user, try to authenticate as an admin
            fetch("http://localhost:8000/admins")
              .then((res) => res.json())
              .then((admins) => {
                const admin = admins.find((admin) => admin.username === username);
                if (admin) {
                  if (admin.password === password) {
                    toast.success("Login successful");
                    sessionStorage.setItem("username", username);
                    navigate("/adminHome");
                  } else {
                    toast.error("Invalid credentials");
                  }
                } else {
                  toast.error("Invalid username");
                }
              })
              .catch((err) => {
                toast.error("Login failed due to: " + err.message);
              });
          }
        })
        .catch((err) => {
          toast.error("Login failed due to: " + err.message);
        });
    }
  };
  
  const validate = () => {
    let result = true;
    if (!username) {
      result = false;
      toast.warning('Please Enter Username');
    }
    if (!password) {
      result = false;
      toast.warning('Please Enter Password');
    }
    return result;
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignIn(e);
    }
  };

  return (
    <MDBContainer className="margin-screen gradient-form rounded">
      <MDBRow>
        <MDBCol className="pb-5 col-md-6 col-12">
          <div className="d-flex flex-column mx-5">
            <div className="text-center">
              <img src={require('../Assets/img/ucsi.png')} style={{ width: '185px' }} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1 fs-3">UCSI'S Event Management System</h4>
            </div>
            <p className='fs-5 text-center'>Please login to your account</p>
            <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='username' value={username} onChange={e => setUsername(e.target.value)} onKeyPress={handleKeyPress} />
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={e => setPassword(e.target.value)} onKeyPress={handleKeyPress} />
            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2" onClick={handleSignIn}>Sign in</MDBBtn>
              <a className="text-muted" href="#!">Forgot password?</a>
            </div>
          </div>
        </MDBCol>
        <MDBCol className="p-0 col-md-6 col-12">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 ">
            <div className="text-white p-5 p-md-4 mx-md-4 ">
              <h3 className="mb-4 text-center">We are welcoming you to join more events in UCSI!</h3>
              <p className="small-mb-0 text-justify fs-5" >Welcome to the UCSI University Event Management System! Our platform is designed to simplify the process of 
              planning, organizing, and managing events within our university community. From creating event listings to tracking attendance and 
              gathering feedback, our system streamlines every step of the event lifecycle. Join us in making events at UCSI University memorable 
              and successful!.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default LoginForm;
