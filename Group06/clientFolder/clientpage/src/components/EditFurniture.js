import React, { Fragment, useState } from "react";
import './form.css'
import styled from 'styled-components'
import './button.css'


const categoryOption=[
  {value:'vehicle',label:'Vehicle'},
  {value:'furniture',label:'Furniture'},
  {value:'cloth',label:'cloth'},
  {value:'electronic',label:'Electronic'},
]


const EditFurniture = ({ furniture }) => {

  

    const[title,setTitle]=useState(furniture.title)
    const[price,setPrice]=useState(furniture.price)
    const[location,setLocation]=useState(furniture.location)
    const[number,setNumber]=useState(furniture.number)
    const[used,setUsed]=useState(furniture.used)
    const[reason,setReason]=useState(furniture.reason)
    const[image,setImage]=useState(furniture.image)
    const[category,setCategory]=useState(furniture.category)

  //edit description function

  const updateFurniture = async e => {
    e.preventDefault();
    try {
      // const body = { title,price,location,number,used,reason,category};
      const formData = new FormData();
      formData.append('title', title);
      formData.append('price', price);
      formData.append('number', number);  
      formData.append('location',location);
      formData.append('used', used);
      formData.append('category',category);
      formData.append('image', image);
      formData.append('reason', reason);
      
      const response = await fetch(
        `http://localhost:5000/furnitures/${furniture.furn_id}`,
        {
          method: "PUT",
          // headers: { "Content-Type": "application/json" },
          body:formData
        }).then((resp)=>{
          alert('Successfully updated.')
        })

      window.location = "/furniture";
    } catch (err) {
      console.error(err.message);
    }
  };

 

  return (
    <Fragment>
 
        <button 
         data-bs-toggle="modal" 
         data-bs-target="#staticBackdrop"
         data-target={`#id${furniture.furn_id}`}>
            View Detail
            
          </button>
   

              <div class="modal fade" id="staticBackdrop" 
              data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLabel">{furniture.category}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id={`id${furniture.furn_id}`}>
                     <input placeholder="‎" type="text" required=""
                     value={title} onChange={event=>setTitle(event.target.value)}/>
                       <input placeholder="‎" type="text" required=""
                     value={price} onChange={event=>setPrice(event.target.value)}/>
                     
                  
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
                    

    </Fragment>
  );
};

export default EditFurniture;