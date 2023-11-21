// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { Settings, Mail } from 'react-feather';

const Login = ({ onLogin }) => {
  const [action, setAction] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    console.log("handling submit");
    event.preventDefault();
    try {
      if (action === "Login") {
        console.log("Came to login");
        const response = await axios.post('http://localhost:8080/api/login', { email, password });
        if (response.data.success) {
          onLogin();
          navigate('/');
        } else {
          console.log('Login failed');
        }
      } else if (action == "Sign up") {
        console.log("Came to sign up");
        console.log('Signup Data:', { name, email, password });
        const response = await axios.post(
          'http://localhost:8080/api/signup',
          { name, email, password },
          { headers: { 'Content-Type': 'application/json' } }
        );
        if (response.data.success) {
          onLogin();
          navigate('/');
        } else {
          console.log('Signup failed');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='container'>
        <div className='header'>
          <div className='text'>{action}</div>
          <div className='underline'></div>
        </div>
        <div className='inputs'>
          {action === "Login" ? null : (
            <div className='input'>
              <img src={<Settings />} alt="" />
              <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          <div className='input'>
            <img src={<Mail />} alt="" />
            <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='input'>
            <img src={<Settings />} alt="" />
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        
        <div className="submit-container">
          <button className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign up") }}>Sign Up</button>
          <button  className={action === "Sign up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</button>
        </div>
      </div>
    </form>
  );
}

export default Login;
