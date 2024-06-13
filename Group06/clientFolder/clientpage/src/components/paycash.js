import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-bootstrap';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import styled from 'styled-components';
import validator from 'validator';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';


const Container = styled.div`
  width: 90%;
  max-width: 600px;
  height: auto;
  margin: 100px auto;
  border-radius: 5px;
  background-color: white;
  border: 1px solid #dfdfdf;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 20px;
`;

const Title = styled.h1`
  color: #515751;
  margin: 0;
  padding: 10px 0;
  font-size: 24px;
  font-weight: normal;
`;

const Form = styled.form`
  text-align: left;
`;

const Input = styled.input`
  height: 50px;
  width: 100%;
  font-size: 16px;
  border-radius: 6px;
  margin-top: 1rem;
  border: 1px solid #dfdfdf;
  padding: 5px;
`;

const Button = styled.button`
  outline: 0;
  background: #2ecc71;
  width: 100%;
  height: 50px;
  border: 0;
  border-radius: 3px;
  margin-top: 2rem;
  padding: 10px;
  color: #ffffff;
  font-size: 24px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    background: #2ecc71;
    color: #2ecc71;
    border: 1px solid #2ecc71;
  }
`;

const Container1 = styled.div`
  padding-top: 2em;
  margin: auto 49%;
`;

const BackArrow = styled.div`
  font-size: 25px;
  line-height: 25px;
  width: 1.5em;
  height: 1.5em;
  padding: 6px;
  cursor: pointer;
  user-select: none;
  transform: rotate(180deg);
  color: white;
  border: 2px solid #f7931e;
  background: #f7931e;
  border-radius: 50%;
  touch-callout: none;

  &:hover {
    background: white;
    color: #f7931e;
  }

  &:active {
    position: relative;
    right: 2px;
  }
`;

const Cash = () => {
  const navigate = useNavigate();

  const [price, setPrice] = useState('');
  const [book, setBook] = useState('Booked');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [titles, setTitles] = useState([]);

  const validateForm = () => {
    const newErrors = {};

    // Perform validation checks for each form field
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!isNaN(name)) {
      newErrors.name = 'Name should not be a number';
    }

    if (location.trim() === '') {
      newErrors.location = 'Location is required';
    }

    if (price == 0) {
    
      toast.error('Sorry! No item selected.')
      setTimeout(()=>{
        navigate('/his');
      },3000)
    } else if (price.trim() === '') {
      newErrors.price = 'Price is required';
    }

    if (!phonenumber.trim()) {
      newErrors.phonenumber = 'Phone Number is required';
    } else if (phonenumber.length !== 8) {
      newErrors.phonenumber = 'Phone Number must be 8 characters long';
    } else if (!phonenumber.startsWith('17') && !phonenumber.startsWith('77')) {
      newErrors.phonenumber = 'Phone Number must start with 17 or 77';
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setIsLoading(true);
        const body = { titles, price, name, location, phonenumber, book };
        const response = await fetch('http://localhost:5000/cashpayments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        toast.success('Checkout Successfully!');
        setTimeout(() => {
          navigate('/home');
        }, 2000);

        setIsLoading(false);
        setTitles([]);
        setPrice('');
        setBook('');
        setName('');
        setLocation('');
        setPhoneNumber('');
        setErrors({});
        e.target.reset();
      } catch (err) {
        console.error(err.message);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    // Retrieve the title and price values from the query string
    const urlParams = new URLSearchParams(window.location.search);
    const priceParam = urlParams.get('price');
    const titleParams = urlParams.getAll('title');

    setPrice(priceParam || '');
    setTitles(titleParams);
  }, []);

  return (
    <>
      <ToastContainer position='top-center' />
      <div style={{ position: 'fixed', top: '-30px', left: '10px' }}>
        <NavLink href='/his'>
          <Container1>
            <BackArrow title='Back to Menu' href='/home'>
              &#10140;
            </BackArrow>
          </Container1>
        </NavLink>
      </div>
      <Container>
        <Title style={{ fontFamily: 'fantasy', color: '#989898', textAlign: 'center', fontSize: '30px' }}>Details</Title>
        <Form onSubmit={onSubmitForm}>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '23px', color: '#989898'}}>Status:
            <Input disabled  style={{border:'1px solid white',background:'white',fontSize:'20px',width:'100px'}}value={book} onChange={(e) => setBook(e.target.value)} />
            </p>
          </div>
          <div style={{ marginBottom: '1rem' }}>
          
            <Input
              disabled
              style={{border:'1px solid white',fontSize:'20px',width:'50%'}}
              value={titles}

              
             
            />
        
            {errors.price && (
              <span style={{ color: 'red', marginLeft: '2rem', fontSize: '16px' }}>{errors.price}</span>
            )}
          </div>


        
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#989898', fontSize: '23px' }}>Total Nu:
            <Input
              disabled
              style={{border:'1px solid white',background:'white',fontSize:'20px',width:'70%'}}
              value={price}
              placeholder='&#xf041;'
              onChange={(e) => setPrice(e.target.price)}
            />
            </p>
            {errors.price && (
              <span style={{ color: 'red', marginLeft: '2rem', fontSize: '16px' }}>{errors.price}</span>
            )}
          </div>
          <Input
            value={name}
            style={{ fontSize:'23px', color: '#989898',width:'100%',background:'white' }}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
          />
          {errors.name && (
            <span style={{ color: 'red', marginLeft: '2rem', fontSize: '18px' }}>{errors.name}</span>
          )}

          <Input
            value={location}
            style={{ fontSize: '23px', color: '#989898' }}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='Location'
          />
          {errors.location && (
            <span style={{ color: 'red', marginLeft: '2rem', fontSize: '18px' }}>{errors.location}</span>
          )}
          <Input
            value={phonenumber}
            style={{ fontSize: '23px', color: '#989898' }}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder='Phonenumber'
          />
          {errors.phonenumber && (
            <span style={{ color: 'red', marginLeft: '2rem', fontSize: '18px' }}>{errors.phonenumber}</span>
          )}

          <Button
            style={{marginTop:'5rem'}}
           type='submit'>{isLoading ? 'Loading...': 'CheckOut'}</Button>
        </Form>
      </Container>
    </>
  );
};

export default Cash;
