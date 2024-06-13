

import React, { Fragment, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './admin.css';
import './table.css';
import Admin from "./sidepage";
import EditFurniture from "./Editfurniture";

ChartJS.register(ArcElement, Tooltip, Legend);






const Furniture = ({furniture}) => {
  const headingStyle = {
    textAlign: 'center',
    position: 'relative',
    lineHeight:2,
    fontFamily:"'Roboto Slab',fantasy",
    fontWeight:'300',
    fontSize:'34px',
    color:'#989898'
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
  


const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/furnitures')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;


  const [furnitures, setFurniture] = useState([]);


  //pie chart

  const categories = ['Furniture', 'cloth', 'Vehicle', 'Electronic'];
  const categoryData = categories.map(category => {
    const count = filteredProducts.filter(product => product.category === category).length;
    return count;
  });
  
  const pieChartData = {
    labels: categories,
    datasets: [
      {
        data: categoryData,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Customize the colors as needed
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Customize the hover colors as needed
      },
    ],
  };
  





  //delete function

  const deleteFurniture = async id => {
    if(window.confirm('Do you want to remove?')){
      try {
        const deleteFurniture = await fetch(`http://localhost:5000/furnitures/${id}`, {
          method: "DELETE"
        }).then((resp)=>{
          toast.success('Successfully Deleted!')
          setTimeout(()=>{
            window.location.reload();

          },2000)
       
        })
  
        setFurniture(furnitures.filter(furniture => furniture.furn_id !== id));
      } catch (err) {
        console.error(err.message);
      }

    }
   
  };

  const getFurniture = async () => {
    try {
      const response = await fetch("http://localhost:5000/furnitures");
      const jsonData = await response.json();

      setFurniture(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFurniture();
  }, []);

  console.log(furnitures);

  return (
    <Fragment>
      <ToastContainer position="top-center"/>
      <Admin/>
   
      
      <h3  style={headingStyle}>
              All Product
            
           
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
                    <th colSpan='11'  scope="col"  style={{fontSize:'19px'}}>
                  
                          <select value={selectedCategory} onChange={handleCategorySelect}>
                            <option value=""  style={{fontSize:'18px'}}>All products</option>
                            <option value="furniture"  style={{fontSize:'18px'}}>Furniture</option>
                            <option value="cloth"  style={{fontSize:'18px'}}>Clothes</option>
                            <option value="vehicle"  style={{fontSize:'18px'}}>Vehicle</option>
                            <option value="electronic"  style={{fontSize:'18px'}}>Electronic</option>
                          </select>
                      
 
                   
                    </th>  
                    </tr>
                        <tr>
                       
                          <th  scope="col" style={{fontSize:'18px',color:'#989898'}}>S/N</th>
                          <th  scope="col"  style={{fontSize:'18px',color:'#989898'}}>Title</th>
                          <th  scope="col"  style={{fontSize:'18px',color:'#989898'}}>Price</th>
                          <th  scope="col"  style={{fontSize:'18px',color:'#989898'}}>Location</th>
                          <th  scope="col" style={{fontSize:'18px',color:'#989898'}}>Mobilenumber</th>
                          <th  scope="col"  style={{fontSize:'18px',color:'#989898'}}>Used</th>
                          <th  scope="col"  style={{fontSize:'18px',color:'#989898'}}>Reason for sale</th>
                          <th  scope="col"  style={{fontSize:'18px',color:'#989898'}}>Image</th>
                          <th  scope="col"  style={{fontSize:'18px',color:'#989898'}}>Category</th>
                          <th  scope="col"  style={{fontSize:'18px',color:'#989898'}}>Edit</th>
                          <th  scope="col"  style={{fontSize:'18px',color:'#989898'}}>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                      {filteredProducts.length === 0 ? (
                            <tr>
                            <td colSpan="11" className="no-data-message">
                                <p style={{color:'#989898',fontSize:'19px'}}>No data available</p>
                            </td>
                            </tr>
                        ) : (
                              filteredProducts.map(furniture => (
                              <tr key={furniture.furn_id} class="winner__table">
                              <td data-label='S/N'  style={{fontSize:'16px'}}>{furniture.furn_id}</td>    
                              <td data-label='Title'  style={{fontSize:'16px'}}>{furniture.title}</td>
                              <td data-label='Price'  style={{fontSize:'16px'}}>{furniture.price}</td>
                              <td data-label='Location'  style={{fontSize:'16px'}}>{furniture.location}</td>
                              <td data-label='Number'  style={{fontSize:'16px'}}>{furniture.number}</td>
                              <td data-label='Used' style={{fontSize:'16px'}}>{furniture.used}</td>
                              <td data-label='Reason'  style={{fontSize:'16px'}}>{furniture.reason}</td>
                              <td data-label='Image'>
                                <img width={100} height={100} src={`http://localhost:5000/image/${furniture.image}`}/>
                              </td>
                              <td data-label='Category'  style={{fontSize:'16px'}}>{furniture.category}</td>
                              <td>
                                  <EditFurniture furniture={furniture} />
                              </td>
                              <td>
                                  <button
                                  className="btn btn-danger"
                                  onClick={() => deleteFurniture(furniture.furn_id)}
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

export default Furniture;