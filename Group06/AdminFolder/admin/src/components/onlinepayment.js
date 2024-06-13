

import React, { Fragment, useEffect, useState } from "react";
import './admin.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './table.css'


// import EditFurniture from "./Editfurniture";

const OnlinePayment = ({payment}) => {


const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/payments')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;


  const [furnitures, setFurniture] = useState([]);

  const showToastMessage = () => {
    toast.success('Successfully Deleted!', {
      position: toast.POSITION.TOP_CENTER
    });
  };


  //delete function

  const deleteFeedback = async id => {
    if(window.confirm('Do you want to remove?')){
      try {
        const deleteFeedback = await fetch(`http://localhost:5000/payments/${id}`, {
          method: "DELETE"
        }).then((resp)=>{
          window.alert('Successfully Deleted!')
          window.location.reload();
        })
  
        setFurniture(furnitures.filter(furniture => furniture.pay_id !== id));
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
       

               

                    <table style={{marginTop:'10rem',width:'90%',marginLeft:'9.5rem'}}>
                      <thead>
                        <tr>
                         
                          <th  scope="col">S/N</th>
                          <th  scope="col">Title</th>
                          <th  scope="col">Price</th>
                          <th  scope="col">Phonenumber</th>
                          <th  scope="col">Location</th>
                          <th  scope="col">Accountname</th>
                          <th  scope="col">Accountnumber</th>
                          <th  scope="col">Code</th>
                          <th  scope="col">Status</th>
                          <th  scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                      {filteredProducts.length === 0 ? (
                            <tr>
                            <td colSpan="10" className="no-data-message">
                                No data available
                            </td>
                            </tr>
                        ) : (
                      

                              filteredProducts.map(furniture => (
                              <tr key={furniture.furn_id} class="winner__table">
                              <td data-label='S/N'>{furniture.pay_id}</td> 
                              <td data-label='Title'>{furniture.title}</td>   
                              <td data-label='Title'>{furniture.price}</td>
                              <td data-label='Number'>{furniture.phonenumber}</td>
                              <td data-label='location'>{furniture.location}</td>
                              <td data-label='Number'>{furniture.accountname}</td>
                              <td data-label='Number'>{furniture.accountnumber}</td>
                              <td data-label='Number'>{furniture.code}</td>
                              <td data-label='Number'>{furniture.book}</td>
                             
                         
                             
                
                              <td>
                                  <button
                                  className="btn btn-danger"
                                  onClick={() => deleteFeedback(furniture.pay_id)}
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

export default OnlinePayment;