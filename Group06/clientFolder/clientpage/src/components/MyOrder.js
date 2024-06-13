import React, { Fragment, useEffect, useState } from "react";
import styled from 'styled-components';
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { NavLink, Toast } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify'
import {BsExclamationTriangle} from 'react-icons/bs'
import {MdDeleteForever} from 'react-icons/md'



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
  font-size:1.3em;
`;

const NoDataMessage = styled.td`
  padding: 0.625em;
  text-align: center;
`;

const Button = styled.button`
  outline: 0;
  background: #F7931E;
  width: 50%;
  border: 0;
  border-radius: 3px;
  padding: 10px;
  color: #ffffff;
  font-size: 15px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    background: #F7931E;
    color: #F7931E;
    border: 1px solid #F7931E;
  }
`;

const Button1 = styled.button`
  outline: 0;
  background: green;
  width: 50%;
  border: 0;
  border-radius: 3px;
  padding: 10px;
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
}`;


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

const MyOrder = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/cashpayments')
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
 

  // delete function
  const deleteFeedback = async id => {
    if (window.confirm('Do you want to cancel order?')) {
      try {
        await fetch(`http://localhost:5000/cashpayments/${id}`, {
          method: "DELETE"
        });
        toast.success('Successfully Cancel!');
        setTimeout(()=>{
           window.location.reload();
        },2000)
      
        setFurniture(furnitures.filter(furniture => furniture.cashpay_id !== id));
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const getFeedback = async () => {
    try {
      const response = await fetch("http://localhost:5000/cashpayments");
      const jsonData = await response.json();
      setFurniture(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <Fragment>
      <ToastContainer position="top-center"/>
      <div style={{ position: 'fixed', top: '-30px', left: '10px' }}>
        <NavLink href='/home'>
        <Container >
      <BackArrow title="Back to Menu">&#10140;</BackArrow>
    </Container>

        </NavLink>
   
      </div>
      <div style={{marginTop:'5rem',width:'100%'}}>
    
    <h3  style={headingStyle}>
              My Order
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
      <Table  style={{ 
      marginTop: '3rem',
      width: '90%',
      boxShadow: '0px 0px 25px 0px #A9A9A9',
      marginLeft: 'auto',
      marginRight: 'auto' }}>
        <thead>
          <TableRow style={{
            background:'#F7931E'
          }}>
            <TableHeader className="cart-text"
            style={{  fontSize: 'calc(0.6vw + 12px)'}}>Title</TableHeader>
            <TableHeader style={{  fontSize: 'calc(0.6vw + 12px)'}}>Price</TableHeader>
            <TableHeader style={{  fontSize: 'calc(0.6vw + 12px)'}}>Name</TableHeader>
            <TableHeader style={{  fontSize: 'calc(0.6vw + 12px)'}}>Location</TableHeader>
            <TableHeader style={{  fontSize: 'calc(0.6vw + 12px)'}}>Phonenumber</TableHeader>
            <TableHeader style={{  fontSize: 'calc(0.6vw + 12px)'}}>Status</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </thead>
        <tbody>
            {filteredProducts.length === 0 ? (
                <TableRow>
                <NoDataMessage colSpan="7" className="no-data-message"
                style={{fontSize:'20px',color:'#989898'}}>
                  
                    <div>
                    <div>
                    <BsExclamationTriangle size={32} color='red'/>
                    </div>
                    
                      <p style={{fontSize:'24px'}}>
                      Sorry! You didn't order anything.
                      </p>
                 
                
                </div>  
                </NoDataMessage>
                </TableRow>
            ) : (
                filteredProducts.map(furniture => {
               
                return (
                    <TableRow key={furniture.cashpay_id} className="winner__table">
                    <TableCell data-label='Title'>
                    {furniture.titles ? furniture.titles.replace(/["{}]/g, '').split(',').join(', ') : ''}
                    </TableCell>
                    <TableCell data-label='Price'>{furniture.price}</TableCell>
                    <TableCell data-label='Title'>{furniture.name}</TableCell>
                    <TableCell data-label='Price'>{furniture.location}</TableCell>
                    <TableCell data-label='Price'>{furniture.phonenumber}</TableCell>
                    <TableCell data-label='Price'>{furniture.book}</TableCell>
                    <TableCell>
                        {/* <AiOutlineClose size={32} onClick={() => deleteFeedback(furniture.cashpay_id)} /> */}
                        <MdDeleteForever size={32} onClick={() => deleteFeedback(furniture.cashpay_id)}
                        color="red"/>
                    </TableCell>
                    </TableRow>
                );
                })
            )}
            </tbody>
      </Table>
    </Fragment>
  );
};

export default MyOrder;
