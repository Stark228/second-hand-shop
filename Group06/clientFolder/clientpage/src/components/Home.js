import React,{useEffect,useState,useContext} from 'react'
import './Home.css'
import mobileImage from '../assets/Artboard_1-removebg-preview.png'
import { Tab,Tabs,TabList,TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import './productcard.css'
import './form.css'
import About from './aboutus'
import Contact from './contactus'
import { Modal, NavLink} from 'react-bootstrap';
import { AiOutlineArrowUp, AiOutlineClose, AiOutlineShareAlt } from 'react-icons/ai'
import {CiLocationOn } from 'react-icons/ci'
import { FaPhone, FaSearch, FaShare } from 'react-icons/fa'
import GoToTopButton from './GoButton'


import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify'

import TopNavbar from './navbar'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import styled,{keyframes} from 'styled-components'
import{CiDeliveryTruck} from 'react-icons/ci'
import{GiBoxUnpacking} from 'react-icons/gi'
import {RiCustomerService2Line} from 'react-icons/ri'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';

import { FaBars, FaCartPlus, FaTimes } from "react-icons/fa";
import Logo from '../assets/shop-01-removebg-preview.png'
import ThemeToggleButton from './ThemeToggleButton '






const TabButton = styled.button`
  border: 1px solid #dfdfdf;
  padding: 0.5rem;
  text-align: left;
  flex-grow: 1;

  @media (max-width: 767px) {
    font-size: 18px;
    width: auto;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 45px;
  border: 1px solid #dfdfdf;
  font-size: 24px;
  color: #808080;
  font-family: 'Titillium Web', sans-serif;
  padding: 15px;

  @media (max-width: 767px) {
    font-size: 18px;
  }
`;

const fade = keyframes`
  // from { opacity: 1; }
  // to { opacity: 1; }
`;

const zoom = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.5); }
`;

const SlideshowContainer = styled.div`
  position: relative;
 

`;

const Slide = styled.div`
  animation: ${fade} 1s;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const SlideImage = styled.img`
  animation: ${zoom} 6s linear;
  width:100%;
  object-fit:fill;


`;

const Arrow = styled.div`
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  margin: 10px;
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  transition: 0.4s;
  z-index: 1;
  width: 80px;
  height: 80px;

  &:hover {
    background: white;
    color: black;
  }
`;

const ArrowRight = styled(Arrow)`
  right: 0;
`;

const ArrowLeft = styled(Arrow)`
  left: 0;
`;

const Content = styled.div`
  font-size: 35px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 1;
`;

const Slide1Content = styled(Content)`
display:flex;
justify-content: center;
align-items: center;

 
 
 
`;

const Slide2Content = styled(Content)`
  right: 100px;

  @media (max-width: 900px) {
    right: 50%;
    transform: translate(50%, -50%);
  }
`;



const Link = styled.a`
  
`;

const Card = styled.div`
 
`;

const CardImage = styled.img`

  transition: 0.3s ease-in-out;
  border:1px solid white;
  // box-shadow: 0px 0px 25px 0px #A9A9A9;
  border:1px solid #dfdfdf;
  background:white;
  height:170px;


  &:hover {
    transform: scale(1.05, 1.05);
    border: 1px solid #F7931E  !important;
  }
`;

const CardTitle = styled.h5`
  /* Add the necessary styles for the card title */
`;

const ProductContainer = styled.div`


a {
  text-decoration: none;
}
  img {
    transition: all 0.3s;
    transform: scale(1);
    aspect-ratio: 1 !important;
    object-fit: cover;
    width:100%;

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
    }
  }

  .pt-3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.75rem;

    p {
     
      font-size:24px;
      color:#989898;
    }

    svg {
      width: 1.5rem;
      height: 1.5rem;
      fill: currentColor;
      color: #718096;
      transition: color 0.3s;

      &:hover {
        color: #000;
      }
    }
  }

  .pt-1 {
    margin-top:-1rem;
    color: #989898;
    font-size:24px;
  }
`;
















function Home({id}){

   
const [showModal, setShowModal] = useState(false);
const [selectedFurniture, setSelectedFurniture] = useState(null);

const [feedback, setFeedback] = useState("");
const [loading, setLoading] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(true); // Set the initial login state
const navigate = useNavigate();
const [isLoading, setIsLoading] = useState(false);
const[book,setBook]=useState('Booked');
const[title,setTitle]=useState('');
const[price,setPrice]=useState('');
const[errors,setErrors]=useState({})



// const navigate=useNavigate();


//userdetails

const [selectedCategory4, setSelectedCategory4] = useState(null);
  const [products4, setProducts4] = useState([]);

  const [selectedCategory5, setSelectedCategory5] = useState(null);
  const [products5, setProducts5] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/cashs')
      .then(response => response.json())
      .then(data => setProducts4(data))
      .catch(error => console.error(error));
  }, []);

  const filteredProducts4 = selectedCategory4
    ? products4.filter(product => product.category === selectedCategory4)
    : products4;

  const contentCount4 = filteredProducts4.length;

  useEffect(() => {
    fetch('http://localhost:5000/cashpayments')
      .then(response => response.json())
      .then(data => setProducts5(data))
      .catch(error => console.error(error));
  }, []);

  const filteredProducts5 = selectedCategory5
    ? products5.filter(product => product.category === selectedCategory5)
    : products5;

  const contentCount5 = filteredProducts5.length;

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('authToken');

      toast.success('Successfully Logout!');
      setTimeout(() => {
        
        navigate('/');
      }, 2000);
    }
  };

  





const validateForm = () => {
  const newErrors = {};

  if (feedback.trim() === '') {
    newErrors.location = 'Feedback is required';
  }
  setErrors(newErrors);

  // Return true if there are no errors
  return Object.keys(newErrors).length === 0;
};





//payment
const handlePaymentSelection = (paymentMethod) => {

  const { title, price } = selectedFurniture;
  if (paymentMethod === 'online') {
    
    const queryParams = new URLSearchParams();
    queryParams.append('title',selectedFurniture.title);
    queryParams.append('price',selectedFurniture.price);
    const queryString = queryParams.toString();
    window.location.href = `/payment-form?${queryString}`;
    window.location.href = `/pay?title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}`;
  } else if (paymentMethod === 'cash-on-delivery') {
    const queryParams = new URLSearchParams();
    queryParams.append('title',selectedFurniture.title);
    queryParams.append('price',selectedFurniture.price);
    const queryString = queryParams.toString();
    window.location.href = `/payment-form?${queryString}`;
    window.location.href = `/cash?title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}`;
   
  }
};

const onSubmitForm = async (e) => {
  e.preventDefault();
  if (validateForm()) {
  try {
    setLoading(true);
    const body = {feedback};
    const response = await fetch('http://localhost:5000/feedbacks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  
    toast.success('Thank You for your Feedback!');
    // window.location('/');
    setTimeout(() => {
      window.location.reload('/');
    },2000);
    setIsLoading(false)
  } catch (err) {
    console.error(err.message);
    setIsLoading(false)
   
  }
}
};
const handleFurnitureClick = (furniture) => {
  setSelectedFurniture(furniture);
  setShowModal(true);
};




  const headingStyle = {
    textAlign: 'center',
    position: 'relative',
    lineHeight:2,
    fontFamily:"'Roboto Slab',fantasy",
    fontWeight:'300',
    fontSize:'34px',
    color:'#808080'
  };
  
  const beforeStyle = {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '1px',
    top: 'auto',
    left: 0,
    bottom: 0,
    right: 0,
    margin: '0 auto',
    backgroundColor:'#dfdfdf',
  };
  
  const afterStyle = {
    content: '""',
    position: 'absolute',
    width: '10%',
    height: '2px',
    top: 'auto',
    left: 0,
    right: 0,
    bottom: 0,
    margin: '0 auto',
    backgroundColor: '#F7931E',
    transition: 'all 0.3s ease 0s'
  };
  
  const hoverAfterStyle = {
    width: '30%'
  };

  const Button = styled.button`
  outline: 0;
  background:#F7931E;
  width: 5%;
  border:0;
  border-radius:3px;
  padding: 10px;
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



  
  
   
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [newFurnitureAdded, setNewFurnitureAdded] = useState(false);
  
    const handleCategorySelect = (event) => {
      setSelectedCategory(event.target.value);
    }
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    }


    



 

  
    useEffect(() => {
      const getProducts = async () => {
        try {
          const response = await fetch("http://localhost:5000/furnitures");
          const data = await response.json();
  
          setProducts(data);
        } catch (error) {
          console.error(error);
        }
      };
     
      getProducts();
   
    }, []);


   


    useEffect(() => {
      const filterProducts = () => {
        let filtered = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;
        
        if (searchTerm) {
          filtered = filtered.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
  
        setFilteredProducts(filtered);
      };
  
      filterProducts();
    }, [selectedCategory, products, searchTerm]);
  
    console.log(filteredProducts);


  

  

    
   

    

 
  
  



      
// Timeout duration in milliseconds
const SESSION_TIMEOUT_DURATION = 200000; // 5 minutes


const handleSessionTimeout = () => {
  setIsLoggedIn(false);
  notify('Due to inactivity, you have been logged out.');
  navigate('/');
 

};

useEffect(() => {
  let timeoutId;

  // Start the session timeout timer
  const startSessionTimeout = () => {
    timeoutId = setTimeout(handleSessionTimeout, SESSION_TIMEOUT_DURATION);
  };

  // Reset the session timeout on user activity
  const resetSessionTimeout = () => {
    clearTimeout(timeoutId);
    startSessionTimeout();
  };

  // Attach event listeners to reset session timeout on user activity
  window.addEventListener('mousemove', resetSessionTimeout);
  window.addEventListener('keypress', resetSessionTimeout);

  // Start the session timeout timer when the component mounts
  startSessionTimeout();

  // Clean up event listeners and clear the timeout when the component unmounts
  return () => {
    clearTimeout(timeoutId);
    window.removeEventListener('mousemove', resetSessionTimeout);
    window.removeEventListener('keypress', resetSessionTimeout);
  };
}, []);

if (!isLoggedIn) {
  navigate('/');
  return null;
}

const notify = (message) => {
  toast.error(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};








const onForm = async (e) => {
  
  const { title, price } = selectedFurniture;
  
  e.preventDefault();

    try {
      setIsLoading(true);
      const body = {title,price};
      const response = await fetch('http://localhost:5000/cashs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      
      
      toast.success('Successfully Added!');
      setTimeout(() => {
        window.location.reload('/home');
      },2000);
      
    } catch (err) {
      console.error(err.message);
      setIsLoading(false);
    }
};

const ResponsiveImage = styled.img`
  width: 100%;
  height: auto;
  margin-top: 2rem;

  @media (min-width: 768px) {
    /* Adjust styles for medium-sized screens (tablets) */
    width: 150%;
    height: 500px;
    margin-top: 5rem;
  }

  @media (min-width: 1024px) {
    /* Adjust styles for large screens (desktops) */
    width: 200%;
    height: 650px;
    margin-top: 8rem;
  }
`;


const StyledHeading = styled.h1`
  font-family: fantasy;
  font-weight: 200;
  font-size: 36px;
  letter-spacing: 2px;
  color: #808080;
  position: relative;
  top: -13rem;

  @media (min-width: 768px) {
    /* Adjust styles for medium-sized screens (tablets) */
    font-size: 42px;
    top: -13rem;
  }

  @media (min-width: 1024px) {
    /* Adjust styles for large screens (desktops) */
    font-size: 48px;
    top: -13rem;
  }
`;

const StyledParagraph = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 24px;
  font-weight: normal;
  color: #808080;
  position: relative;
  top: -12rem;

  @media (min-width: 768px) {
    /* Adjust styles for medium-sized screens (tablets) */
    font-size: 28px;
    top: -12rem;
  }

  @media (min-width: 1024px) {
    /* Adjust styles for large screens (desktops) */
    font-size: 32px;
    top: -12rem;
  }
`;
















   
    return(
        <>
        <div>
       

       
          <section id='hero'>
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
          <NavLink exact to="/home" className="nav-link me-5">
            <p style={{fontSize:'24px'}}>Home</p></NavLink>
          
        
          <NavLink href="#contact"   className="nav-link me-5">
             <p style={{fontSize:'24px'}}>Contact Us</p>
          </NavLink>
         
          <NavLink  href="#about" className="nav-link me-5">
          <p style={{fontSize:'24px'}}>About Us</p></NavLink>
          <NavLink href="/His"className="nav-link me-5">
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
          {contentCount4}
        </span></p></NavLink>
          <NavLink href="/ord" className="nav-link me-5">
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
          {contentCount5}
        </span>
          </p></NavLink>
       

          <NavLink  href="#feedback" className="nav-link me-5">
          <p style={{fontSize:'24px'}}>Feedback</p></NavLink>
          <NavLink exact  onClick={handleLogout}  className="nav-link me-5">
          <p style={{fontSize:'24px'}}>Logout</p></NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
          </section>
          <ToastContainer position='top-center'/>
    
    
      <section  style={{background:'white'}}>
 

      <SlideshowContainer className="slideshow">
      <Slide className="slide slide1">
        <ResponsiveImage
          src={mobileImage}
          alt=""
          class="img-fluid"
          
        />
          <div
    style={{
      position: 'absolute',
      top: '22%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      width: '100%',
      padding: '20px',
      width: 'calc(100% - 40px)', // Adjust the width to account for padding
      boxSizing: 'border-box', // Include padding in the width calculation
    }}
  >
        
        <h1
   className="card-text"
  style={{
    fontFamily: 'fantasy',
    fontWeight: '200',
    fontSize: 'calc(2vw + 16px)', // Responsive font size based on viewport width
    letterSpacing: '2px',
    color: '#333333',
    textAlign: 'center', // Center align the text horizontally
  }}
>
  Second Hand Buying And Selling
</h1>

<p
  className="card-text"
  style={{
    fontFamily: 'Roboto, sans-serif',
    fontSize: 'calc(1.2vw + 12px)', // Responsive font size based on viewport width
    fontWeight: '200',
    color: '#333333',
    textAlign: 'center', // Center align the text horizontally
  }}
>
  Buying Second Hand Items Can Be A Great Way To Save Money And Reduce Waste.
</p>
</div>


      
      </Slide>
    </SlideshowContainer>
    </section>

        



<div class="container container-fluid homepage-bgimage" style={{marginTop:'2rem',}}>

  <section style={{marginTop:'1rem'}}>
  <div className="container-fluid homepage-bgimage">
      <div className="container text-center" style={{ marginTop: '2rem' }}>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <div className="h-100">
              <div className="card-body">
                <div className="circle-icon"
                 style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: '#F7931E',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '1.5rem',
                margin: '0 auto',
              }}>
                  <CiDeliveryTruck size={64} color="white" />
                </div>
                <h4 className="card-title"
                 style={{fontFamily:'fantasy',
                 fontWeight:'300',color:'#989898',fontSize:'24px'}}>Free Delivery</h4>
                <div
              className="underline1"
              style={{
                height: '2px',
                width: '100px',
                backgroundColor: '#F7931E',
                margin: 'auto',
                marginTop: '0.5rem',
              }}
            ></div>
            <div
              className="underline2"
              style={{
                height: '10px',
                width: '10px',
                backgroundColor: '#F7931E',
                margin: 'auto',
                marginTop: '-6px',
                transform: 'rotate(-135deg)',
              }}
            ></div>
                <p className="card-text"  style={{fontSize:'24px',color:'#989898',marginTop:'0.5rem'}}>
                  We offer free delivery within a 5km radius for your convenience.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <div className="h-100">
              <div className="card-body">
                <div className="circle-icon"
                 style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: '#F7931E',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom:'1.5rem',
                  margin: '0 auto',
                }}>
                  <GiBoxUnpacking size={40} color="white" />
                </div>
                <h4 className="card-title"
                 style={{fontFamily:'fantasy',
                 fontWeight:'300',color:'#989898',fontSize:'24px'}}>Free Returns</h4>
                <div
              className="underline1"
              style={{
                height: '2px',
                width: '100px',
                backgroundColor: '#F7931E',
                margin: 'auto',
                marginTop: '0.5rem',
              }}
            ></div>
            <div
              className="underline2"
              style={{
                height: '10px',
                width: '10px',
                backgroundColor: '#F7931E',
                margin: 'auto',
                marginTop: '-6px',
                transform: 'rotate(-135deg)',
              }}
            ></div>
                <p className="card-text"  style={{fontSize:'24px',color:'#989898',marginTop:'0.5rem'}}>
                  Your satisfaction is our priority. If for any reason you are not happy with your purchase, we gladly accept returns.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <div className="h-100">
              <div className="card-body">
                <div className="circle-icon"
                 style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: '#F7931E',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom:'1.5rem',
                  margin: '0 auto',
                }}>
                  <RiCustomerService2Line size={50} color="white" />
                </div>
                <h4 className="card-title" style={{fontFamily:'fantasy',
                fontWeight:'300',color:'#989898',fontSize:'24px'}}>Contact Us</h4>
                <div
              className="underline1"
              style={{
                height: '2px',
                width: '100px',
                backgroundColor: '#F7931E',
                margin: 'auto',
                marginTop: '0.5rem',
              }}
            ></div>
            <div
              className="underline2"
              style={{
                height: '10px',
                width: '10px',
                backgroundColor: '#F7931E',
                margin: 'auto',
                marginTop: '-6px',
                transform: 'rotate(-135deg)',
              }}
            ></div>
                <p className="card-text" style={{fontSize:'24px',color:'#989898',marginTop:'0.5rem'}}>
                  Don't let your unwanted items gather dust, get in touch with us and turn them into value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>


         <section style={{marginTop:'5rem'}}>
            <h3  style={headingStyle}>
              Category
              <span style={beforeStyle}>
           
           <div className='underline1' style={{
             height:'2px',
             width:'100px',
             backgroundColor:'#F7931E',
             margin:'auto',
             marginTop:'0px',
             position:'relative'
           }}></div>
           <div className='underlne2'
           style={{
             height:'10px',
             width:'10px',
             backgroundColor:'#F7931E',
             margin:'auto',
             marginTop:'-6px',
             transform:'rotate(-135deg)'
           }}></div>
           </span>
            </h3>

           
          
    <div>
    <div className="container-fluid homepage-bgimage" style={{ marginTop: '2rem' }}>
  <div className="row">
    <div className="col-lg-8">
      <select
        className="card-text"
        value={selectedCategory}
        onChange={handleCategorySelect}
        style={{ padding: '10px', width: '100%',
        borderRadius:'6px',maxWidth: '300px', fontSize: '20px', color: '#989898' }}
      >
        <option value="" style={{ fontSize: '19px' }}>All products</option>
        <option value="furniture" style={{ fontSize: '19px' }}>Furniture</option>
        <option value="cloth" style={{ fontSize: '19px' }}>Clothes</option>
        <option value="vehicle" style={{ fontSize: '19px' }}>Vehicle</option>
        <option value="electronic" style={{ fontSize: '19px' }}>Electronic</option>
      </select>
    </div>

    <div className="col-lg-4">
      <div className="row align-items-center">
        <div className="col-sm-8 col-md-10">
          <input
            className="card-text"
            style={{ padding: '7px',borderRadius:'6px',width: '105%', maxWidth: '450px',fontSize: '20px' }}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-sm-4 col-md-2" style={{ textAlign: 'center' }}>
          <FaSearch
            color="#F7931E"
            size={30}
            onClick={handleSearch}
          />
        </div>
      </div>
    </div>
  </div>
</div>


  <section id='product' style={{ marginTop: '3rem' }}>
  <div className="container" style={{ minHeight: '100vh' }}>
  
  <main className="grid">
   
    {filteredProducts.length === 0 ? (
  
           <p
        className="no-data-message"
        style={{
        
          textAlign: 'center',
          position:'relative',
          left:'30rem',
          fontSize: '24px',
          color: '#989898',
        }}
      >
        Product not available.
      </p>

     
   
    ) : (
      filteredProducts.map((furniture) => (
        <ProductContainer key={furniture.id}>
          <a onClick={() => handleFurnitureClick(furniture)}>
            <CardImage
              className="hover:grow hover:shadow-lg"
              src={`http://localhost:5000/image/${furniture.image}`}
            />
            <div className="pt-3">
              <p className="">{furniture.title}</p>
            </div>
            <p className="pt-1 text-gray-900">Nu.{furniture.price}</p>
          </a>
        </ProductContainer>
      ))
    )}
  </main>
 
</div>

  </section>
</div>


<Modal show={showModal} onHide={() => setShowModal(false)}   size="lg"
style={{marginTop:'2rem'}}>
 
  <Modal.Header>
    <AiOutlineClose size={32} color='red' onClick={() => setShowModal(false)}/>
  </Modal.Header>

  <Modal.Body>
   
    {selectedFurniture && (
      <form onSubmit={onForm}>
      <table class="table" style={{border:'1px white'}}>
  <tbody>
 
    <tr>
      <th scope="row" rowSpan='6'align='center' 
      style={{width:'65%'}}>
      <img  style={{height:'300px'}} src={`http://localhost:5000/image/${selectedFurniture.image}`} 
        class="rounded"  alt="..."></img>
      </th>
    </tr>
    <tr>
      <td  scope="row"  style={{fontSize:'20px',
        fontFamily:"Titillium Web, sans-serif",fontWeight:'400', color:'#808080',}}>Nu.<input disabled style={{border:'1px solid white'}} value={selectedFurniture.price} onChange={(e)=>setPrice(e.target.value)}
       />
      </td>
    </tr>
    <tr>
      <td style={{fontSize:'20px',
        fontFamily:"Titillium Web, sans-serif",fontWeight:'400', color:'#808080',}} scope="row">
        <input disabled style={{border:'1px solid white'}} value={selectedFurniture.title} onChange={(e)=>setTitle(e.target.value)}/>
        </td>
     
    </tr>
    <tr>
      <td style={{fontSize:'20px',
        fontFamily:"Titillium Web, sans-serif",fontWeight:'400', color:'#808080',}} scope="row"><CiLocationOn size={32} color='green'/> {selectedFurniture.location}</td>
    </tr>
    <tr>
      <td style={{fontSize:'20px',
        fontFamily:"Titillium Web, sans-serif",fontWeight:'400', color:'#808080',}} scope="row">Used: {selectedFurniture.used}</td>
    
    </tr>
    <tr>
      <td style={{fontSize:'20px',
        fontFamily:"Titillium Web, sans-serif",fontWeight:'400'}} scope="row"><FaPhone size={24} color='orange'/>  {selectedFurniture.number}</td>
    </tr>
    <tr>
    <th style={{fontSize:'20px',
        fontFamily:"Titillium Web, sans-serif",fontWeight:'400', color:'#808080',}} colSpan='2'>Reason for sale:<br></br>
    <td style={{fontSize:'20px',
        fontFamily:"Titillium Web, sans-serif",fontWeight:'400'}} scope="row">{selectedFurniture.reason}</td>
    </th>
    </tr>
    
  </tbody>

      
 </table>
 <button style={{position:'relative',left:'33rem',bottom:'1rem'}} type='submit'>Add Cart</button>
</form>


    )}
  </Modal.Body>
 
</Modal>



      
</section>  
     

     
     

      </div>
      <section id='about' style={{marginTop:'5rem'}}>
        
      <div class="container container-fluid homepage-bgimage">
          
      <h3 style={headingStyle}>
              About Us
              <span style={beforeStyle}>
           
           <div className='underline1' style={{
             height:'2px',
             width:'100px',
             backgroundColor:'#F7931E',
             margin:'auto',
             marginTop:'0px',
             position:'relative'
           }}></div>
           <div className='underlne2'
           style={{
             height:'10px',
             width:'10px',
             backgroundColor:'#F7931E',
             margin:'auto',
             marginTop:'-6px',
             transform:'rotate(-135deg)'
           }}></div>
           </span>
      </h3>
         
            <About/>
           
      </div>      
    
      </section>
           
      <section style={{ marginTop: '5rem' }} id="contact">
  <div className="container homepage-bgimage" style={{ minHeight: 'auto' }}>
    <h3 style={headingStyle}>
      Contact Us
      <span style={beforeStyle}>
        <div
          className="underline1"
          style={{
            height: '2px',
            width: '100px',
            backgroundColor: '#F7931E',
            margin: 'auto',
            marginTop: '0px',
            position: 'relative',
          }}
        ></div>
        <div
          className="underlne2"
          style={{
            height: '10px',
            width: '10px',
            backgroundColor: '#F7931E',
            margin: 'auto',
            marginTop: '-6px',
            transform: 'rotate(-135deg)',
          }}
        ></div>
      </span>
    </h3>
    <Contact/>
  </div>
</section>

<section style={{ width: '100%',marginTop:'2rem'}}>

      <div className="row">
        <div className="col">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5163.716539918308!2d91.19451771062073!3d27.239436991776305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375eaa1550000001%3A0xc997cc9c1da87334!2sGyelpozhing%20Higher%20Secondary%20School!5e0!3m2!1sen!2sbt!4v1684833870841!5m2!1sen!2sbt"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen=""
              aria-hidden="false"
              tabIndex="0"
              className="embed-responsive-item"
              style={{ width:'100%',minHeight: '400px' }} // Set a minimum height for the map
            ></iframe>
          </div>
        </div>
      </div>
  
</section>






      <section style={{marginTop:'5rem'}} id='feedback'>

      <div className="container-fluid homepage-bgimage" style={{width:'70%'}}>
      <div className="row">
        <div className="col">
          <h3 style={headingStyle}>
            Feedback
            <span style={beforeStyle}>
              <div
                className="underline1"
                style={{
                  height: '2px',
                  width: '100px',
                  backgroundColor: '#F7931E',
                  margin: 'auto',
                  marginTop: '0px',
                  position: 'relative',
                }}
              ></div>
              <div
                className="underlne2"
                style={{
                  height: '10px',
                  width: '10px',
                  backgroundColor: '#F7931E',
                  margin: 'auto',
                  marginTop: '-6px',
                  transform: 'rotate(-135deg)',
                }}
              ></div>
            </span>
          </h3>
        </div>
      </div>
      <div
        className="container homepage-bgimage"
        style={{
          marginTop: '2rem',
          background: '#fcfcfc',
          border: '1px solid #dfdfdf',
        }}
      >
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="contact-page-form" method="post">
              <form onSubmit={onSubmitForm}>
                <div className="row">
                  <div className="col-md-12 message-input">
                    <div className="single-input-field">
                      <textarea
                        style={{ fontSize: '18px' }}
                        placeholder="Write Your Feedback"
                        name="message"
                        type="text"
                        className="form-control"
                        required
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12 single-input-fieldsbtn">

                  <Button
  style={{
    marginTop: '4rem',
    padding: '15px',
    width: '20%',
    maxWidth: '200px', // Set a maximum width for the button
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }}
  type="submit"
  className="btn btn-primary"
  disabled={isLoading}
>
  {isLoading ? 'Loading...' :
   <span style={{
    width: '100%',
    maxWidth: '100%',
    fontSize: '1rem', // Adjust the font size as needed
  }}>Send Now</span>}
</Button>

                  
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
      </section>
      <Footer/>
  
       <GoToTopButton/>
       
        </div>
      
       </>

       
               
    
    )
}
export default Home