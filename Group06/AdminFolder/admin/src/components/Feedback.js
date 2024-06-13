

import React, { Fragment, useEffect, useState } from "react";
import './admin.css'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './table.css'
import Admin from "./sidepage";
import styled from 'styled-components'


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


// import EditFurniture from "./Editfurniture";

const Feedbcak = ({feedback}) => {


const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/feedbacks')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;


  const [furnitures, setFurniture] = useState([]);

 

  //delete function

  const deleteFeedback = async id => {
    if(window.confirm('Do you want to delete?')){
      try {
        const deleteFeedback = await fetch(`http://localhost:5000/feedbacks/${id}`, {
          method: "DELETE"
        }).then((resp)=>{
          toast.success('Successfully Deleted!')
          setTimeout(()=>{
            window.location.reload();
          },2000)
          
        })
  
        setFurniture(furnitures.filter(furniture => furniture.feed_id !== id));
      } catch (err) {
        console.error(err.message);
      }

    }
   
  };

  const getFeedback = async () => {
    try {
      const response = await fetch("http://localhost:5000/feedbacks");
      const jsonData = await response.json();

      setFurniture(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  console.log(furnitures);

  return (
    <Fragment>
      <ToastContainer position="top-center"/>
      <Admin/>
       

      <h3  style={headingStyle}>
              User's Feedback
            
           
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
     
            </h3>

                    <table style={{marginTop:'3rem',width:'85%',marginLeft:'13rem'}}>
                   
                      <thead>
                        <tr>
                         
                          {/* <th  scope="col">S/N</th>
                          <th  scope="col">Email</th>
                          <th  scope="col">Mobilenumber</th> */}
                          <th  scope="col" style={{fontSize:'19px',color:'#989898'}}>Feedback</th>
                          <th  scope="col" style={{fontSize:'19px',color:'#989898'}}>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                      {filteredProducts.length === 0 ? (
                            <tr>
                            <td colSpan="2" className="no-data-message"
                            style={{fontSize:'19px',color:'#989898'}}>
                                No data available
                            </td>
                            </tr>
                        ) : (
                      

                              filteredProducts.map(furniture => (
                              <tr key={furniture.furn_id} class="winner__table">
                              {/* <td data-label='S/N'>{furniture.feed_id}</td>    
                              <td data-label='Title'>{furniture.email}</td>
                              <td data-label='Number'>{furniture.number}</td> */}
                              <td data-label='Used'
                              style={{fontSize:'19px',color:'#989898'}}>{furniture.feedback}</td>
                         
                             
                
                              <td>
                                  <button
                                  className="btn btn-danger"
                                  onClick={() => deleteFeedback(furniture.feed_id)}
                                  >
                                  Delete
                                  </button>
                              </td>
                              </tr>
                          )))}

                      </tbody>
                    </table>



   
   
     
    </Fragment>
  );
};

export default Feedbcak;