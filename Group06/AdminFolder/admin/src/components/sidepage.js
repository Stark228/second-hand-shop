

import React,{useEffect,useState,useRef} from "react";
import './admin.css'
import Form from "./Form";
import Furniture from "./furniturn";
import Feedbcak from "./Feedback";
import{AiOutlineFileAdd,AiOutlineAppstore} from 'react-icons/ai'
import{BsBoxArrowDownRight, BsBoxArrowRight, BsCash, BsFillChatSquareDotsFill} from 'react-icons/bs'
import {FaHome} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";




   

function Admin(){

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
  
    const [selectedCategory1, setSelectedCategory1] = useState(null);
    const [products1, setProducts1] = useState([]);
  
  
    useEffect(() => {
      fetch('http://localhost:5000/feedbacks')
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

    const navigate=useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
          navigate('/')
          // Perform your logout logic here
          // Clear any user-related data or tokens from storage
          // Redirect the user to the login page or any other desired page
        }
      };
   
    return(
        <>
        <nav class="nav-link">
    
        <div class="brand-logo">
           
            {/* <div class="toggle-menu">
                <i class="fa-solid fa-bars btn-open"></i>
                <i class="fa-solid fa-close btn-close"></i>
            </div> */}
          
            <a href="#">
                {/* <h1><i class="fa-solid fa-rocket"></i> My Side Navbar</h1> */}
            </a>
        </div>
      

       
        <ul class="toggle-nav-item">
            <a href="/home" style={{textDecoration:'none',color:'white'}}>
                <li>
                    
                     <FaHome size={32} style={{marginLeft:'2.5rem'}}/>
                     <p style={{fontSize:'16px'}}> Home</p>
                </li>
                
            </a>
            <a href="/form" style={{textDecoration:'none',color:'white'}}>
                <li>
               
                <AiOutlineFileAdd  size={32} style={{marginLeft:'2.4rem'}}/>
                <p style={{fontSize:'16px'}}>Add Product</p>
                </li>
            
                
            </a>
            <a href="/furn" style={{textDecoration:'none',color:'white'}}>
                <li>
                <AiOutlineAppstore size={32} style={{marginLeft:'2.4rem'}} />
                <p style={{fontSize:'16px'}}>View Product</p>
                </li>
            
                
            </a>
            <a href="/feed" style={{textDecoration:'none',color:'white'}}>
                <li>
                <p style={{color:'red',background:'white',width:'30px',height:'30px',
                borderRadius:'40px',
                fontSize:'17px',position:'absolute',
                textAlign:'center',
                left:'5.8rem',top:'18.5rem'}}>{contentCount}</p>
             
                <BsFillChatSquareDotsFill
                 size={32} style={{marginLeft:'2.4rem'}}/>
                   <p  style={{fontSize:'16px'}}>View Feedback</p> 
                </li>
            </a>
            {/* <a href="/pay" style={{textDecoration:'none',color:'white'}}>
                <li><i class="fa-solid fa-folder"></i>OnlinePayment</li>
            </a> */}
            <a href="/cash" style={{textDecoration:'none',color:'white'}} >
                <li>
                <p style={{color:'red',background:'white',width:'30px',height:'30px',
                borderRadius:'40px',
                fontSize:'17px',position:'absolute',
                textAlign:'center',
                left:'6rem',top:'25rem'}}>{contentCount1}</p>
                    <BsCash size={32} style={{marginLeft:'2.5rem'}}/>
                
                  
                   <p style={{fontSize:'16px'}}>
                
                   Cash on Delivery
                   </p> 
                    </li>
            </a>
            <a  onClick={handleLogout} style={{textDecoration:'none',color:'white'}}>
                <li>
                    <BsBoxArrowRight size={32} style={{marginLeft:'2.5rem'}}/>
                    
                   <p style={{fontSize:'16px'}} >Logout</p> 
                    </li>
            </a>
        </ul>

    
        <ul class="full-nav-item">
            <a href="/">
                <li><i class="fa-solid fa-house"></i> Home</li>
            </a>
            <a href="/furn">
                {/* <li><i class="fa-solid fa-user"></i> View Product</li> */}
            
                
                
            </a>
            <a href="/feed">
                <li><i class="fa-solid fa-folder"></i> View Feedback</li>
            </a>
            <a href="/pay">
                <li><i class="fa-solid fa-folder"></i> View</li>
            </a>
        </ul>
    </nav>
  
   
    </>
   
    )
}
export default Admin;