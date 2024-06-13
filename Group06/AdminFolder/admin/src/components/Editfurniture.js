import React, { Fragment, useState } from "react";
import './form.css'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




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

  const updateFurniture = async (e) => {
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
      // formData.append('image', image);
      formData.append('reason', reason);

      if(image){
        formData.append('image',image);
      }else{
        formData.append('image',furniture.image)
      }


      const response = await fetch(
        `http://localhost:5000/furnitures/${furniture.furn_id}`,
        {
          method:'PUT',
          // headers: { "Content-Type": "application/json" },
          body:formData,
        })
        .then((resp)=>{
          
          toast.success('Successfully updated!')
          setTimeout(()=>{
            window.location.reload('');

          },2000)
         
        })

     
    } catch (err) {
      console.error(err.message);
    }
  };

 

  return (
    <Fragment>
      <ToastContainer position="top-center"/>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${furniture.furn_id}`}
      >
        Edit
      </button>

    
    
      <div className="modal"
        id={`id${furniture.furn_id}`}
        // onClick={() => setTitle(furniture.title)}
      >
        
        <div class="modal-dialog modal-lg" style={{height:'10rem'}}>
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Furniture</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => {setTitle(furniture.title);setPrice(furniture.price);setLocation(furniture.location);
                setNumber(furniture.number);setUsed(furniture.used);setReason(furniture.reason);setImage(furniture.image);setCategory(furniture.category)}}
              >
                &times;
              </button>
            </div>


            <div className="modal-body">
            <div class="card" 
            style={{position:'relative',
            bottom:'30px'}}>
                <form class="form" style={{position:'relative',
            bottom:'20px',height:'50%'}}>
                    <div style={{display:'flex',flexDirection:'row',}}>
                        <div class="group"  style={{width:'94%'}}>
                        <input placeholder="‎" type="text" required=""
                        value={title} onChange={event=>setTitle(event.target.value)}/>
                        <label for="title">Title</label>
                        </div>
                        <div class="group"  style={{width:'94%'}}>
                        <input placeholder="‎" type="number" required=""
                        style={{border: 'none'}} 
                        value={price} onChange={event=>setPrice(event.target.value)}/>
                        <label for="price">Price</label>
                        </div>
                        <div class="group"  style={{width:'94%'}}>
                        <input placeholder="‎" type="text" required=""
                        value={location} onChange={event=>setLocation(event.target.value)}/>
                        <label for="location">Location</label>
                        </div>
                    </div>

                    <div style={{display:'flex',flexDirection:'row'}}>
                        <div class="group"  style={{width:'100%'}}>
                        <input placeholder="‎" type="number" required=""
                        value={number} onChange={event=>setNumber(event.target.value)}/>
                        <label for="number">Phone Number</label>
                        </div>
                        <div class="group"  style={{width:'100%'}}>
                        <input placeholder="‎" type="text" required=""
                        value={used} onChange={event=>setUsed(event.target.value)}/>
                        <label for="used">Used</label>
                        </div>
                        <div class="group"  style={{width:'100%'}}>
                          <select name="Select Category" id="category"
                          style={{width:'100%',height:'65%',borderRadius:'6px',
                          border:'1px solid rgba(0, 0, 0, 0.2)',
                          fontSize:'14px',
                          color:'rgb(99, 102, 102)'}}
                          value={category} onChange={event=>setCategory(event.target.value)}>

                              <option value="" >Select Category</option>
                              {categoryOption.map((option)=>(
                                  <option key={option.value} value={option.value}>
                                      {option.label}
                                  </option>   

                              ))}

                            
                          </select>
                          </div>
                        </div>

                        <div style={{display:'flex',flexDirection:'row'}}>
                            <div class="group" style={{width:'100%'}}>
                            <input placeholder="‎"
                         
                             onChange={event=>setImage(event.target.files[0])} type="file" required="" style={{width:'100%'}}/>
                          
                            </div>
                        </div>

                        <div style={{display:'flex',flexDirection:'row'}}>
                            <div class="group" style={{width:'100%'}}>
                            <textarea placeholder="‎" type="text" required="" style={{width:'100%'}}
                            value={reason} onChange={event=>setReason(event.target.value)}/>
                            <label for="description">Reason for sale</label>
                          
                            </div>
                        </div>

           
        </form>
       
        </div>
        
        <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateFurniture(e)}
              >
                Update
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {setTitle(furniture.title);setPrice(furniture.price);setLocation(furniture.location);
                    setNumber(furniture.number);setUsed(furniture.used);setReason(furniture.reason);setCategory(furniture.category)}}
              >
                Close
              </button>
            </div>
            </div>

            </div>
          </div>
        </div>
    </Fragment>
  );
};

export default EditFurniture;