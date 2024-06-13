import React, { Fragment, useEffect, useState } from "react";
import styled from 'styled-components';
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-bootstrap";
import { FaAccusoft } from "react-icons/fa";
import{BsExclamationTriangle} from 'react-icons/bs'
import { MdDeleteForever } from "react-icons/md";
import {toast,ToastContainer} from 'react-toastify'




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
  width: '90%',
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


const Table = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
`;

const Caption = styled.caption`
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
`;

const TableRow = styled.tr`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
`;

const TableHeader = styled.th`
  padding: 0.625em;
  text-align: center;
  font-size: 1.3em;
  color:white;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const TableCell = styled.td`
  padding: 0.625em;
  text-align: center;
  color:#989898;
  font-family:"Titillium Web, sans-serif";
  font-size:24px;
`;

const NoDataMessage = styled.td`
  padding: 0.625em;
  text-align: center;
`;



const Button1 = styled.button`
  outline: 0;
  background: green;
  width: 55%;
  border: 0;
  border-radius: 3px;
  padding: 15px;
  color: #ffffff;
  font-size: 15px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    background: green;
    color: green;
    border: 1px solid green;
  }
`;

const Container = styled.div`
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
  border: 2px solid #F7931E;
  background:#F7931E;
  border-radius: 50%;
  touch-callout: none;

  &:hover {
    background:white;
    color:#F7931E;
  }

  &:active {
    position: relative;
    right: 2px;
  }
`;

const History = () => {
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/cashs')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const contentCount = filteredProducts.length;
  console.log(contentCount);

  const [furnitures, setFurniture] = useState([]);
  console.log('g',furnitures)

  // delete function
  const deleteFeedback = async id => {
    if (window.confirm('Do you want to remove?')) {
      try {
        await fetch(`http://localhost:5000/cashs/${id}`, {
          method: "DELETE"
        });
        toast.success('Successfully remove!');
        setTimeout(()=>{
          window.location.reload();

        },2000)
     
        setFurniture(furnitures.filter(furniture => furniture.cash_id !== id));
      } catch (err) {
        console.error(err.message);
      }
    }
  };


  //clear

  const Clear = async id => {
  
      try {
        await fetch(`http://localhost:5000/cashs/${id}`, {
          method: "DELETE"
        });
        setFurniture(furnitures.filter(furniture => furniture.cash_id !== id));
      } catch (err) {
        console.error(err.message);
      }
  };


  const getFeedback = async () => {
    try {
      const response = await fetch("http://localhost:5000/cashs");
      const jsonData = await response.json();
      setFurniture(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  //payment

  const deleteCompletedData = () => {
    filteredProducts.forEach(furniture => {
      Clear(furniture.cash_id);
    });
  };
  const handlePaymentSelection = (paymentMethod, titles, price) => {
    if (paymentMethod === 'online') {
      const queryParams = new URLSearchParams();
      titles.forEach(title => queryParams.append('title', title));
      queryParams.append('price', price);
      const queryString = queryParams.toString();
      window.location.href = `/pay?${queryString}`;
    } else if (paymentMethod === 'cash-on-delivery') {
      const queryParams = new URLSearchParams();
      titles.forEach(title => queryParams.append('title', title));
      queryParams.append('price', price);
      const queryString = queryParams.toString();
      window.location.href = `/cash?${queryString}`;
      deleteCompletedData(); 
   
    }
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = filteredProducts.reduce((sum, product) => sum + parseFloat(product.price), 0);
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [filteredProducts]);

  return (
    <Fragment>
      <ToastContainer position="top-center"/>
        <div style={{position:'fixed',top:'-30px',left:'10px',}} >
      <NavLink href="/home">
      <Container>
      <BackArrow title="Back to Menu" href='/home'>&#10140;</BackArrow>
    </Container>
      </NavLink> 
      
     
    
    
       
    </div>
    <div style={{marginTop:'5rem',width:'100%'}}>
    
    <h3  style={headingStyle}>
              Cart
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
      </div>
      <div style={{ overflowX: 'auto' }}>             
      <Table style={{ 
      marginTop: '3rem',
      width: '90%',
      boxShadow: '0px 0px 25px 0px #A9A9A9',
      marginLeft: 'auto',
      marginRight: 'auto' }}>
        <thead>
          <TableRow style={{
              background:'#F7931E',
          }}>
            <TableHeader>Title</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader></TableHeader>
            
          </TableRow>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <>
            <TableRow>
              <NoDataMessage colSpan="3" className="no-data-message"
               style={{fontSize:'20px',color:'#989898'}}>
                
                
                <div>
                    <div>
                    <BsExclamationTriangle size={32} color='red'/>
                    </div>
                    
                      <p style={{fontSize:'24px'}}>
                      There is nothing in your shopping cart.
                      </p>
                 
                
                    <div style={{position:'relative',top:'3rem'}}>
                      <NavLink href="/home">
                      <button style={{padding:'20px'}}>
                        <p style={{marginTop:'-0.96rem'}}>
                        Continue Shopping
                        </p>
                        </button>

                      </NavLink>
                     
                    </div>
                </div>              

              </NoDataMessage>
            
            </TableRow>
          
            </>
            
           
          ) : (
            filteredProducts.map(furniture => (
              <TableRow key={furniture.cash_id} className="winner__table">
                <TableCell data-label='Title'>{furniture.title}</TableCell>
                <TableCell data-label='Price'>{furniture.price}</TableCell>
                <TableCell>
               
                  
                    <MdDeleteForever size={32} color="red"   onClick={() => deleteFeedback(furniture.cash_id)}/>
                </TableCell>
              </TableRow>
            ))
          )}
        </tbody>
      </Table>
      </div> 
    
      <div className="container text-center" style={{ marginTop: '2rem' }}>
      <div className="row">
        <div className="col-md-6">
          <p
            style={{
              fontSize: '24px',
              color: '#989898',
              fontFamily: 'fantasy',
          
              fontWeight: '300',
             
            }}
          >
            Total Price: Nu. {totalPrice}
          </p>
        </div>
        <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
          <Button1
            style={{ marginTop: '3rem' }}
            type="submit"
            onClick={() =>
              handlePaymentSelection(
                'cash-on-delivery',
                filteredProducts.map((product) => product.title),
                totalPrice
              )
            }
          >
             <p
             className="card-text"
              style={{
                fontSize: 'calc(0.4vw + 12px)',
                position:'relative',
                bottom:'0.6rem'
              }}
            >
              Buy
            </p>
          </Button1>
        </div>
      </div>
    </div>
 
     
    </Fragment>
  );
};

export default History;
