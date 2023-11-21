import React, { useState } from 'react';
import './Login.css'

import email from '../Assets/email.png'
import user from '../Assets/person.png'
import password from '../Assets/password.png'

const Login = () => {
    const [action,setAction]=useState("Sign Up");
    const [email,setEmail]=useState("");
    const [password,setpassword]=useState("");

    function Handlesubmit(event){
      event.preventDefault();
    }

  return (
    
    <form onSubmit={Handlesubmit}>
    <div className='container'>
        <div className='header'>
            <div className='text'>{action}</div>
            <div className='underline'></div>
        </div>
      <div className='inputs'>
        {action==="Login"?<div></div>:<div className='input'>
            <img src={user} alt="" />
            <input type="text" placeholder='Name' onChange={e=>setEmail(e.target.value)} />
        </div> }
        
        <div className='input'>
            <img src={email} alt="" />
            <input type="email" placeholder='Email' />
        </div>
        <div className='input'>
            <img src={password} alt="" />
            <input type="password" placeholder='Password' onChange={e=>setpassword(e.target.value)} />
        </div>
      </div>

      {action==="Sign up" ? <div></div>:<div className="forgot-password">Lost Password? <span>Click Here </span></div>
}

      <div className="submit-container">
        <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign up")}}>Sign Up</div>
        <div className={action==="Sign up" ?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
      </div>
    </div>
    </form>
  );
}

export default Login;
