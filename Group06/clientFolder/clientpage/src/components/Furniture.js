

import React, { Fragment, useEffect, useState } from "react";
import './admin.css'

import EditFurniture from "./EditFurniture";
const Furniture = ({furniture}) => {


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

  

  //delete function

  const deleteFurniture = async id => {
    if(window.confirm('Do you want to remove?')){
      try {
        const deleteFurniture = await fetch(`http://localhost:5000/furnitures/${id}`, {
          method: "DELETE"
        }).then((resp)=>{
          window.alert('Successfully Deleted!')
          window.location.reload();
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
       

    <div className="home_content">
        <section>
            <div class="container">
                <div class="table-responsive">
                <table class="table table-bordered   table-striped"
                 style={{width:'100%',tableLayout:'auto'}}>
                <thead class="table__head">
                    <tr>
                    <th colSpan='11'>
                     <div>
                          <select value={selectedCategory} onChange={handleCategorySelect}>
                            <option value="">All products</option>
                            <option value="furniture">Furniture</option>
                            <option value="clothes">Clothes</option>
                            <option value="vehicle">Vehicle</option>
                            <option value="electronic">Electronic</option>
                          </select>
                        </div>

                   
                    </th>  
                    </tr>
                    <tr class="winner__table">
                
                    <th>S/N</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Location</th>
                    <th>Mobilenumber</th>
                    <th>Used</th>
                    <th>Reason for sale</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(furniture => (
                    <tr key={furniture.furn_id} class="winner__table">
                    <td>{furniture.furn_id}</td>    
                    <td>{furniture.title}</td>
                    <td>{furniture.price}</td>
                    <td>{furniture.location}</td>
                    <td>{furniture.number}</td>
                    <td>{furniture.used}</td>
                    <td>{furniture.reason}</td>
                    <td>
                      <img width={100} height={100} src={`http://localhost:5000/image/${furniture.image}`}/>
                    </td>
                    <td>{furniture.category}</td>
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
                ))}

                
                  
                
                  
                 
                </tbody>
                </table>
                </div>
            </div>
                    
        </section> 
    </div>



   
   
     
    </Fragment>
  );
};

export default Furniture;