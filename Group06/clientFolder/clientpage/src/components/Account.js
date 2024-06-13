import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components
const CardContainer = styled.div`
  display: flex;
  padding: 2.5rem 2rem;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  max-width: 500px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
  margin: 1rem;
  position: relative;
  transform-style: preserve-3d;
  overflow: hidden;

  &:before,
  &:after {
    content: '';
    position: absolute;
    z-index: -1;
  }

  &:before {
    width: 100%;
    height: 100%;
    border: 1px solid #fff;
    border-radius: 10px;
    top: -0.7rem;
    left: -0.7rem;
  }

  &:after {
    height: 15rem;
    width: 15rem;
    background-color: #4172f5aa;
    top: -8rem;
    right: -8rem;
    box-shadow: 2rem 6rem 0 -3rem #fff;
  }
`;

const Image = styled.img`
  max-width: 100%;
  display: block;
  border-radius: 50%;
`;

const Infos = styled.div`
  margin-left: 1.5rem;
`;

const Name = styled.div`
  margin-bottom: 1rem;
`;

const Heading2 = styled.h2`
  font-size: 1.3rem;
`;

const Heading4 = styled.h4`
  font-size: 0.8rem;
  color: #333;
`;

const Text = styled.p`
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Stats = styled.ul`
  margin-bottom: 1rem;
`;

const StatsItem = styled.li`
  min-width: 5rem;
`;

const StatsHeading3 = styled.h3`
  font-size: 0.99rem;
`;

const StatsHeading4 = styled.h4`
  font-size: 0.75rem;
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  font-family: 'Poppins', sans-serif;
  min-width: 120px;
  padding: 0.5rem;
  border: 1px solid #222;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.25s linear;

  &.follow,
  &.view {
    &:hover {
      background-color: #222;
      color: #fff;
    }
  }

  &.view,
  &.follow {
    &:hover {
      background-color: transparent;
      color: #222;
    }
  }
`;

// React component
const Account = () => {
  const [user, setUser] = useState(null);

  const getLoggedInUser = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual backend endpoint to fetch user details
      const response = await fetch('http://localhost:5000/signup', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer YOUR_AUTH_TOKEN`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        throw new Error('Failed to fetch user details');
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(user)

  useEffect(() => {
    getLoggedInUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardContainer>
          <Infos>
            <Name>
              <Heading2>{user.first_name}</Heading2>
              <Heading4>{user.email}</Heading4>
            </Name>
            <Text>{user.phone_number}</Text>
          </Infos>
        </CardContainer>
      </div>
    );
  };
  
  export default Account;