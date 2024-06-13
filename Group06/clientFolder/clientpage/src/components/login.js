import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import ig from '../assets/shop-01-removebg-preview.png'
import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';



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
        const response = await axios.post('http://localhost:5000/login', {
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

       
        toast.success('Login Successfully.')
        setTimeout(()=>{
            navigate('/home');

        },2000);
      

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
  

  
  
  
  




const Image = styled.img`
      width:30%;
      position:relative;
      left:10rem;

`;




const Button = styled.button`
  outline: 0;
  background:#F7931E;
  width: 100%;
  border:0;
  border-radius: 3px;
  padding: 15px;
  color: #ffffff;
  font-size: 15px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    background:#F7931E;
    color:#F7931E;
    border: 1px solid #F7931E;
  }
`;


  




 
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%',
    }}>
      <ToastContainer position='top-center' />
      <form style={{
        width: '90%',
        maxWidth: '500px',
        height: 'auto',
        background: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
        padding: '40px',
      }} onSubmit={handleSubmit}>
        <div className='cont'>
        <img
          src={ig}
          alt="Image"
          style={{
            maxWidth: '50%',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
          }}
        />
          <br />
          <input
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '18px',
          borderRadius: '4px',
          margin: '15px 0',
          fontFamily: 'Titillium Web, sans-serif',
          paddingRight: '40px', // Add padding to accommodate the icon
        }}
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={validateEmail}
        placeholder='Email'
        className='input'
      />
          {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
          <br />
          <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="col-12 col-md-11" style={{ position: 'relative' }}>
        <input
          style={{
            width: '110%',
            padding: '10px',
            fontSize: '18px',
            borderRadius: '4px',
            margin: '15px 0',
            fontFamily: 'Titillium Web, sans-serif',
            paddingRight: '40px', // Add padding to accommodate the icon
          }}
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePassword}
          placeholder="Password"
          className="input"
        />
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
          
            height: '50px',
            width: '10%',
            position: 'absolute',
            top: '50%',
            right: '-27px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}
        >
          <FontAwesomeIcon
            color="black"
            icon={showPassword ? faEyeSlash : faEye}
            onClick={togglePasswordVisibility}
          />
        </div>
      </div>
      </div>
            
         
          <div className="row">
            <div className="col" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <NavLink to="/for" className='navlink'>
              <p style={{
                fontSize: '16px',
                textAlign: 'center',
                
              }}>
                Forgot password?
              </p>
              </NavLink>
            </div>
          </div>
    
          <span style={{ color: 'red' }} className="error">{passwordError}</span>
          {incorrectPasswordError && <span style={{ color: 'red' }}>{incorrectPasswordError}</span>}
          <Button style={{ marginTop: '3rem', padding: '15px', width: '100%' }} type="submit">
            {isLoading ? 'Loading...' : 'Log In'}
          </Button>
    
          <p style={{
            color: '#989898',
            fontSize: '16px',
            position: 'relative',
            marginTop: '2rem',
            fontFamily: "Titillium Web, sans-serif",
            fontSize: '18px',
            textAlign: 'center'
          }}>
            If you don't have an account&nbsp;
            <NavLink to="/signup">
              Register
            </NavLink>
          </p>
        </div>
      </form>
    </div>
    

  );
}

export default LoginForm;

