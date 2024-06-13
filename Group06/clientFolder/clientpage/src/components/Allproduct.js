import React, { Fragment, useEffect, useState } from "react";
import { Tab,Tabs,TabList} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import './productcard.css'
import './Tab.css'



import EditFurniture from "./EditFurniture"

const Allproduct = () => {

const [products, setProducts] = useState([]);
const [selectedCategory, setSelectedCategory] = useState(null);
const [key, setKey] = useState('Product');


useEffect(() => {
  fetch('http://localhost:5000/furnitures')
    .then(response => response.json())
    .then(data => setProducts(data))
    .catch(error => console.error(error));
}, []);
console.log(products)

const handleCategorySelect = (category) => {
  setSelectedCategory(category);
}

const filteredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;



  const [furnitures, setFurniture] = useState([]);

  
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
      
          <Tabs
           id="controlled-tab-example"
           activeKey={key}
           style={{background:'white',border:'none',backgroundColor:'blue'}}

           onSelect={(k) => setKey(k)}
           className="mb-3"
           >
           
           <TabList
               style={{ 
                   border:'none',
                   position:'relative',
                   width:'100%'
                  
                    }}
                  
                   >


            <div>    
              
            <Tab
             
             eventKey="Product"
               style={{letterSpacing:'1px',
               fontSize:'1.5vw',
               border:'none',
               color:'red',
               fontFamily:"Titillium Web, sans-serif",
              
           }}
           onClick={() => handleCategorySelect('')}>
                  All products
               </Tab>  
                   
  
 
    
               <Tab eventKey="Vehicle"
    
               onClick={() => handleCategorySelect('vehicle')}
               style={{letterSpacing:'1px',fontSize:'1.5vw',
               border:'none',
               fontFamily:"Titillium Web, sans-serif"}}
               
               >
                   Vehicle
                   
               </Tab>   
 
     
     
               <Tab  eventKey="Electronic" 
            
               onClick={() => handleCategorySelect('electronic')}
               style={{letterSpacing:'1px',fontSize:'1.5vw',
                   border:'none',

                   fontFamily:"Titillium Web, sans-serif"}}>
               
                   Electronic
               </Tab>
               <Tab eventKey="Furniture"
        
               onClick={() => handleCategorySelect('furniture')}
               style={{letterSpacing:'1px',fontFamily:"Titillium Web, sans-serif",fontSize:'1.5vw',border:'none',}}
               >
                   Furnitures
               
               </Tab>
               <Tab eventKey="Cloth"
          
               onClick={() => handleCategorySelect('clothes')}
               style={{letterSpacing:'1px',fontSize:'1.5vw',border:'none',
               fontFamily:"Titillium Web, sans-serif"}}  >
                   Clothes
                   
               </Tab>
               </div>
               </TabList>
       </Tabs> 
     
                 
      
      {filteredProducts.map(furniture => (
   

    <div style={{overflowY:'scroll' ,height:'500px'}}>
     <div class="grid">
     <div class="card-container">
       <h2 class="card-price"><span class="currency">Nu.</span>{furniture.price}</h2>
       <h1 class="card-title">{furniture.title}</h1>
       <p class="details-btn">
       <EditFurniture furniture={furniture} />
       </p>
       <div class="card-image-container">
          <img src="http://purepng.com/public/uploads/large/purepng.com-android-smartphonepersonal-computersmartphonemobile-operating-systemcellular-phoneandroid-1701528391092ypwe7.png" alt=""/>
       </div>
       <i class="fas fa-cart-plus cart-btn"></i>
     </div>

  
    

   
  

   
    

   </div>
   </div>

                  
                  
                    
                        
                   
               
                
                ))}

                
  
       
                    
       
    </div>
 

     
    </Fragment>
  );
};

export default Allproduct;