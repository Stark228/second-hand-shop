import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer,toast } from 'react-toastify';



function LoginForm({setIsLoggedIn, setShowLoginForm}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const[errorMessage,setErrorMessage]=useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [incorrectPasswordError, setIncorrectPasswordError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };
  
  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    validateEmail();
    validatePassword();
    
    if (!emailError && !passwordError) {
      try {
        setIsLoading(true);
        // used to send a POST request to the endpoint with the email and password values as the request body.
        const response = await axios.post('http://localhost:5000/logins', {
          email,
          password,
        });
        console.log(response.data); 

        const authToken = response.data.authToken;
        localStorage.setItem('useremail', response.data.email);
        Cookies.set('authToken', authToken);
        localStorage.setItem('authToken', authToken);
        console.log(authToken);
        setIsLoading(true);

        toast.success('Successfully Login.')
   
       setTimeout(() => {
        navigate('/home');
        }, 2000);
      
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          setIncorrectPasswordError('Incorrect email or password');
        } else {
          setErrorMessage('Error occurred while logging in');
        }
      }finally{
        setIsLoading(false)
      }
    }
  };
  
  
  
  









  const Button = styled.button`
  outline: 0;
  background:#F7931E;
  width: 100%;
  border:0;
  border-radius: 3px;
  padding: 15px;
  color: #ffffff;
  font-size: 18px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  &:active,
  &:focus {
    background:#F7931E;
    color:#F7931E;
    border: 1px solid #F7931E;
  }
`;

  




 
  
  return (
    <>
    <ToastContainer  position="top-center"/>
   
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',
 
    height:'100vh',width:'100%'}}>
      <form style={{width:'500px',height:'550px',
         background:'white',
      boxShadow:'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
      padding:'40px'}} onSubmit={handleSubmit}>
      <div className='cont'>
       <h1 style={{color:'#989898',fontFamily:'fantasy',fontWeight:'400',textAlign:'center'}}>Admin login</h1>
        <br/>
        <input 
        style={{width:'100%',padding:'10px',borderRadius:'4px',
        margin:'15px 0',
        fontSize:'18px',
        fontFamily:"Titillium Web, sans-serif"}}
        type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail} placeholder='Email' className='input'/>
        <div>
      
          {emailError && <span style={{color:'red'}}>{emailError}</span>}
          <br/>
         

<div class="row">
    <div class="col-11" >
    <input
          style={{width:'110%',padding:'10px',
          fontSize:'18px',
          borderRadius:'4px',
          margin:'15px 0',
          fontFamily:"Titillium Web, sans-serif"}}
          type={showPassword ? 'text' : 'password'} id="password" 
       
          value={password} onChange={(e) => setPassword(e.target.value)} onBlur={validatePassword} placeholder='Password' className='input'
          />
    </div>
    <div class="col-1" style={{display:'flex',alignItems:'center'}}>
    <FontAwesomeIcon
          style={{position:'relative',right:'1rem'}}
          icon={showPassword ? faEyeSlash : faEye}
          onClick={togglePasswordVisibility}
        />
    </div>
  </div>
         
       
  <div class="row">
    <div class="col" style={{display:'flex',justifyContent:'end'}}>
    <NavLink to="/Reset" className='navlink'>Forgot password?
    </NavLink>
    </div>
  </div>  

           
           
        </div>
        <span style={{color:'red'}} className="error">{passwordError}</span>
        {incorrectPasswordError && <span style={{ color: 'red' }}>{incorrectPasswordError}</span>}
        <Button style={{marginTop:'4rem',padding:'15px',width:'100%'}} type="submit">
          {isLoading ?'Loading...':'Log In'}</Button>
         
        
      </div>
     
      </form>
    </div>
    </>

  );
}

export default LoginForm;

