import React, { useState } from 'react';
// import './register.scss'
import { NavLink, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import axios from 'axios';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';





const RegistrationForm = () => {


  const [firstname, setFirstname] = useState('');
  // const [secondname, setSecondname] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const navigate =useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };



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

  async function createUser(email, firstName, password ,phonenumber) {
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        email,
        firstName,
        password,
        phonenumber
      });
      setIsLoading(false)
      console.log(response.data);
   
      toast.success('Account created successfully!');
      setTimeout(()=>{
        navigate('/home');

      },2000)
    } catch (error) {
      console.error(error);
      setIsLoading(false)
      toast.error('Sorry! Email already exists');
    }
  }

  async function handleSubmit (e) {
    e.preventDefault();
    // Does something with the registration data, like submit to server
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('firstname').value;
  
    const password = document.getElementById('password').value;
    const phonenumber =document.getElementById('phoneNumber').value;

    if (!firstName || !email || !password || !phonenumber) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    const nameRegex = /^[a-zA-Z]+$/;
    if (!firstName.match(nameRegex)) {
      setErrorMessage('Username should contain only letters.');
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage('Password should contain at least 8 characters,including(one special character,one lowercase,one uppercase and one digit).');
      return;
    }
    if (isNaN(phoneNumber)) {
      setErrorMessage('Phonenumber should contain only numbers.');
      return;
    }
    if(phoneNumber.length !=8){
      setErrorMessage('Phone number must be 8 digits long.')
    }
    const validStartDigits=['17','77'];
    const phoneNumberStart=phoneNumber.slice(0,2);
    if(!validStartDigits.includes(phoneNumberStart)){
      setErrorMessage('Phonenumber must start with either 17 or 77');
      return
    }
  
  
  

    await createUser(email, firstName,  password,phonenumber);
  }

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',
 
    height:'100vh',width:'100%'}}>
      <ToastContainer position='top-center'
       width='100%'/>
    <form onSubmit={handleSubmit}
    style={{width:'500px',height:'650px',
    background:'white',
 boxShadow:'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
 padding:'40px'}}>
      <div className='contant'>
      <h1 style={{textAlign:'center',color:'#989898'}} className='heading'>Create new account</h1>
    
        <input 
          style={{width:'100%',padding:'10px',borderRadius:'4px',
          margin:'15px 0',
          fontSize:'18px',
          fontFamily:"Titillium Web, sans-serif"}}
        type="text" id="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder='Username' className='inputfild'/>
      </div>
      <div>
        <input
          style={{width:'100%',padding:'10px',borderRadius:'4px',
          margin:'15px 0',
          fontSize:'18px',
          fontFamily:"Titillium Web, sans-serif"}}
         type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Phone Number' className='inputfild'/>
      </div>
      <div>
        <input 
          style={{width:'100%',padding:'10px',borderRadius:'4px',
          margin:'15px 0',
          fontSize:'18px',
          fontFamily:"Titillium Web, sans-serif"}}
        type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='inputfild'/>
      </div>
     

      
<div class="row" >
    <div class="col-11" >
  
         <input 
         style={{width:'110%',padding:'10px',borderRadius:'4px',
         margin:'15px 0',
         fontSize:'18px',
         fontFamily:"Titillium Web, sans-serif"}}
         type={showPassword ? 'text' : 'password'}id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='inputfild'/>
    </div>
    <div class="col-1" style={{display:'flex',alignItems:'center'}}>
    <FontAwesomeIcon
          style={{position:'relative',right:'10px'}}
           
          icon={showPassword ? faEyeSlash : faEye}
          onClick={togglePasswordVisibility}
        />
    </div>
  </div>
        
<div class="row">
    <div class="col-11" >
  
    <input
          style={{width:'110%',padding:'10px',borderRadius:'4px',
          margin:'15px 0',
          fontSize:'18px',

          fontFamily:"Titillium Web, sans-serif"}}
         type={showPassword1 ? 'text' : 'password'} id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' className='inputfild'/>
    </div>
    <div class="col-1" style={{display:'flex',alignItems:'center'}}>
    <FontAwesomeIcon
           style={{position:'relative',right:'10px'}}
          icon={showPassword1 ? faEyeSlash : faEye}
          onClick={togglePasswordVisibility1}
        />
    </div>
  </div>
    

      
      {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} */}

      <Button style={{marginTop:'4rem',padding:'15px',width:'100%'}} type="submit">
          {isLoading ?'Loading...':'Register'}</Button>
        <p style={{position:'relative',bottom:'2rem',
      fontSize:'19px',
      color:'#989898'}}>Already a member?<NavLink to='/' className='loginlink'> LogIn</NavLink></p> 
    </form>
    </div>
  );
}

export default RegistrationForm;