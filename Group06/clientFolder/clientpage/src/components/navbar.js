import { useRef, useState, useEffect } from "react";
import { FaBars, FaCartPlus, FaTimes } from "react-icons/fa";
// // import './main.css'
import Logo from '../assets/shop-01-removebg-preview.png'
// import { Modal, NavLink } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { css } from "@emotion/react";

// // function Navbar() {
  // const [showConfirmation, setShowConfirmation] = useState(false);
//   const navigate = useNavigate();

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [products, setProducts] = useState([]);

//   const [selectedCategory1, setSelectedCategory1] = useState(null);
//   const [products1, setProducts1] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/cashs')
//       .then(response => response.json())
//       .then(data => setProducts(data))
//       .catch(error => console.error(error));
//   }, []);

//   const filteredProducts = selectedCategory
//     ? products.filter(product => product.category === selectedCategory)
//     : products;

//   const contentCount = filteredProducts.length;

//   useEffect(() => {
//     fetch('http://localhost:5000/cashpayments')
//       .then(response => response.json())
//       .then(data => setProducts1(data))
//       .catch(error => console.error(error));
//   }, []);

//   const filteredProducts1 = selectedCategory1
//     ? products1.filter(product => product.category === selectedCategory1)
//     : products1;

//   const contentCount1 = filteredProducts1.length;

//   const handleLogout = () => {
//     const confirmLogout = window.confirm("Are you sure you want to logout?");
//     if (confirmLogout) {
//       toast.success('Successfully Logout!');
//       setTimeout(() => {
//         navigate('/');
//       }, 2000);
//     }
//   };

//   const navRef = useRef();
// ;

//   const responsiveStyles = css`
//   @media (max-width: 768px) {
//     header {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//     }

//     nav {
//       margin-top: 20px;
//     }

//     .nav-link {
//       display: block;
//       margin-bottom: 10px;
//     }
//   }
// `;

// //   return (
// //     <div style={{ position: 'sticky', top: '0px' }}>
// //       <ToastContainer position="top-center" />

// //       <div class="container" style={{ borderBottom: '1px solid #F7931E' }}>
// //         <div class="row">
// //           <div class="col"></div>
// //           <div class="col" style={{ textAlign: 'center' }}>
// //             <img src={Logo} width={200} height={100} alt="" />
// //           </div>
// //           <div class="col"></div>
// //         </div>
// //       </div>

// //       <header style={{ width: '100%' }} css={responsiveStyles}>
// //         <h3></h3>
//         // <nav >
//         //   <NavLink className="nav-link" style={{ fontSize: '24px', color: '#808080' }}>Home</NavLink>
//         //   <NavLink className="nav-link" style={{ fontSize: '24px', color: '#808080' }} href="#about">About Us</NavLink>
//         //   <NavLink className="nav-link" style={{ fontSize: '24px', color: '#808080' }} href="#contact">Contact Us</NavLink>
//         //   <NavLink className="nav-link" style={{ fontSize: '24px', color: '#808080' }} href="#feedback">Feedback</NavLink>
//         //   <NavLink style={{ fontSize: '24px', color: '#808080' }} href="/His">
//         //     Cart&nbsp;
//         //     <FaCartPlus size={32} color="#F7931E" />
//         //     <span style={{ position: 'relative', bottom: '10px', right: '-7px', fontSize: '20px', background: 'white', color: 'red' }}>{contentCount}</span>
//         //   </NavLink>
//         //   <a className="nav-link" style={{ fontSize: '24px', color: '#808080' }} href="/ord">
//         //     MyOrder
//         //     <span style={{ color: 'red', position: 'relative', bottom: '10px', left: '5px', fontSize: '20px', width: '50px', background: 'white' }}>{contentCount1}</span>
//         //   </a>
//         //   <NavLink style={{ fontSize: '24px', color: '#808080' }} onClick={handleLogout}>Logout</NavLink>
       
//         // </nav>
// //       </header>
// //     </div>
// //   );
// // }

// // export default Navbar;


// import { css } from "@emotion/react";
// import styled from 'styled-components'

// const NavContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 10px;

//   @media (max-width: 768px) {
//     flex-wrap: wrap;
//     justify-content: flex-start;

//     a.nav-link {
//       flex: 0 0 auto;
//       font-size: 18px;
//       margin-right: 10px;
//     }
//   }

//   @media (max-width: 480px) {
//     a.nav-link {
//       font-size: 16px;
//     }
//   }
// `;


// // Define the CSS for responsive styles
// const responsiveStyles = css`
//   @media (max-width: 768px) {
//     .container {
//       padding: 10px;
//     }

//     .row {
//       flex-direction: column;
//       align-items: center;
//     }

//     .col {
//       text-align: center;
//     }

//     header {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//     }

//     nav {
//       margin-top: 20px;
//       flex-direction: column;
//       align-items: center;
//     }

//     .nav-link {
//       display: block;
//       margin-bottom: 10px;
//     }
//     .nav-links-row {
//       flex-direction: column;
//       justify-content: center;
//     }

    
//   }
// `;

// function Navbar() {
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const navigate = useNavigate();

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [products, setProducts] = useState([]);

//   const [selectedCategory1, setSelectedCategory1] = useState(null);
//   const [products1, setProducts1] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/cashs')
//       .then(response => response.json())
//       .then(data => setProducts(data))
//       .catch(error => console.error(error));
//   }, []);

//   const filteredProducts = selectedCategory
//     ? products.filter(product => product.category === selectedCategory)
//     : products;

//   const contentCount = filteredProducts.length;

//   useEffect(() => {
//     fetch('http://localhost:5000/cashpayments')
//       .then(response => response.json())
//       .then(data => setProducts1(data))
//       .catch(error => console.error(error));
//   }, []);

//   const filteredProducts1 = selectedCategory1
//     ? products1.filter(product => product.category === selectedCategory1)
//     : products1;

//   const contentCount1 = filteredProducts1.length;

//   const handleLogout = () => {
//     const confirmLogout = window.confirm("Are you sure you want to logout?");
//     if (confirmLogout) {
//       toast.success('Successfully Logout!');
//       setTimeout(() => {
//         navigate('/');
//       }, 2000);
//     }
//   };


//   return (
    // <div style={{ position: 'sticky', top: '0px' }}>
    //   <ToastContainer position="top-center" />

      // <div className="container" style={{ borderBottom: '1px solid #F7931E' }}>
      //   <div className="row">
      //     <div className="col"></div>
      //     <div className="col" style={{ textAlign: 'center' }}>
      //       <img src={Logo} width={200} height={100} alt="" />
      //     </div>
      //     <div className="col"></div>
      //   </div>
      // </div>

//       <header style={{ width: '100%' }} css={responsiveStyles}>
//         <h3></h3>
//         <nav>
//         <NavContainer>
//       <NavLink style={{ fontSize: '24px', color: '#808080' }}>Home</NavLink>
//       <NavLink style={{ fontSize: '24px', color: '#808080' }} href="#about">
//         About Us
//       </NavLink>
//       <NavLink style={{ fontSize: '24px', color: '#808080' }} href="#contact">
//         Contact Us
//       </NavLink>
//       <NavLink style={{ fontSize: '24px', color: '#808080' }} href="#feedback">
//         Feedback
//       </NavLink>
//       <NavLink style={{ fontSize: '24px', color: '#808080' }} href="/His">
        // Cart&nbsp;
        // <FaCartPlus size={32} color="#F7931E" />
        // <span
        //   style={{
        //     position: 'relative',
        //     bottom: '10px',
        //     right: '-7px',
        //     fontSize: '20px',
        //     background: 'white',
        //     color: 'red',
        //   }}
        // >
        //   {contentCount}
        // </span>
//       </NavLink>
//       <a
//         className="nav-link"
//         style={{ fontSize: '24px', color: '#808080' }}
//         href="/ord"
//       >
//         MyOrder
//         <span
//           style={{
//             color: 'red',
//             position: 'relative',
//             bottom: '10px',
//             left: '5px',
//             fontSize: '20px',
//             width: '50px',
//             background: 'white',
//           }}
//         >
//           {contentCount1}
//         </span>
//       </a>
//       <NavLink
//         style={{ fontSize: '24px', color: '#808080' }}
//         onClick={handleLogout}
//       >
//         Logout
//       </NavLink>
//     </NavContainer>
        
//         </nav>
//       </header>
//     </div>
//   );
// }

// export default Navbar;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


export default function TopNavbar() {

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  const [selectedCategory1, setSelectedCategory1] = useState(null);
  const [products1, setProducts1] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/cashs')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const contentCount = filteredProducts.length;

  useEffect(() => {
    fetch('http://localhost:5000/cashpayments')
      .then(response => response.json())
      .then(data => setProducts1(data))
      .catch(error => console.error(error));
  }, []);

  const filteredProducts1 = selectedCategory1
    ? products1.filter(product => product.category === selectedCategory1)
    : products1;

  const contentCount1 = filteredProducts1.length;

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      toast.success('Successfully Logout!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };






  return (
    <>
     <div className="container" style={{ borderBottom: '1px solid #F7931E' }}>
        <div className="row">
          <div className="col"></div>
          <div className="col" style={{ textAlign: 'center' }}>
            <img src={Logo} width={200} height={100} alt="" />
          </div>
          <div className="col"></div>
        </div>
      </div>
  
    <div style={{width:'100%'}}>
    <Navbar expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto d-flex justify-content-center flex-wrap">
          <NavLink exact to="/emp" className="nav-link me-5">
            <p style={{fontSize:'24px'}}>Home</p></NavLink>
          
          <a href="#contact" >
          <NavLink  className="nav-link me-5">
             <p style={{fontSize:'24px'}}>Contact Us</p>
          </NavLink>
          </a>
          <NavLink  href="#about" className="nav-link me-5">
          <p style={{fontSize:'24px'}}>About Us</p></NavLink>
          <NavLink to="/His"className="nav-link me-5">
          <p style={{fontSize:'24px'}}>Cart
          &nbsp;
        <FaCartPlus size={32} color="#F7931E" />
        <span
          style={{
            position: 'relative',
            bottom: '10px',
            right: '-7px',
            fontSize: '20px',
            background: 'white',
            color: 'red',
          }}
        >
          {contentCount}
        </span></p></NavLink>
          <NavLink exact to="/ord" className="nav-link me-5">
          <p style={{fontSize:'24px'}}>My Order
          <span
                style={{
                  color: 'red',
                  position: 'relative',
                  bottom: '10px',
                  left: '5px',
                  fontSize: '20px',
                  width: '50px',
                  background: 'white',
                }}
              >
          {contentCount1}
        </span>
          </p></NavLink>
          <NavLink exact to="/contact" className="nav-link me-5">
          <p style={{fontSize:'24px'}}>Account</p></NavLink>

          <NavLink  href="#feedback" className="nav-link me-5">
          <p style={{fontSize:'24px'}}>Feedback</p></NavLink>
          <NavLink exact  onClick={handleLogout}  className="nav-link me-5">
          <p style={{fontSize:'24px'}}>Logout</p></NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
  
    </>
  );
}

