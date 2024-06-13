import React, { Fragment, useEffect, useState,useRef } from "react";
import Form from "./Form";
import Admin from "./sidepage";
import sound from '../assets/audio.mp3'






const Home = () => {

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  const [selectedCategory1, setSelectedCategory1] = useState(null);
  const [products1, setProducts1] = useState([]);

  const [selectedCategory2, setSelectedCategory2] = useState(null);
  const [products2, setProducts2] = useState([]);


  const [contentCount, setContentCount] = useState(0);
  const prevContentCountRef = useRef(0);
  const [contentCount1, setContentCount1] = useState(0);

  const [contentCount2, setContentCount2] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/furnitures')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    prevContentCountRef.current = contentCount;
  });
  
  useEffect(() => {
    prevContentCountRef.current = contentCount1;
  });

  useEffect(() => {
    // Play notification sound when contentCount increases
    if (contentCount > prevContentCountRef.current) {
      const audio = new Audio(' ');
      audio.play();
    }
  }, [contentCount]);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  useEffect(() => {
    setContentCount(filteredProducts.length);
  }, [filteredProducts]);






  useEffect(() => {
    fetch('http://localhost:5000/signup')
      .then(response => response.json())
      .then(data => setProducts1(data))
      .catch(error => console.error(error));
  }, []);


  useEffect(() => {
    // Play notification sound when contentCount increases
    if (contentCount > prevContentCountRef.current) {
      const audio = new Audio(' ');
      audio.play();
    }
  }, [contentCount1]);

  const filteredProducts1 = selectedCategory
    ? products1.filter(product => product.category === selectedCategory)
    : products1;

  useEffect(() => {
    setContentCount1(filteredProducts1.length);
  }, [filteredProducts1]);



  

  useEffect(() => {
    fetch('http://localhost:5000/cashpayments')
      .then(response => response.json())
      .then(data => setProducts2(data))
      .catch(error => console.error(error));
  }, []);


  useEffect(() => {
    // Play notification sound when contentCount increases
    if (contentCount2 > prevContentCountRef.current) {
      const audio = new Audio(sound);
      audio.play();
    }
  }, [contentCount2]);

  const filteredProducts2 = selectedCategory
    ? products2.filter(product => product.category === selectedCategory)
    : products2;

  useEffect(() => {
    setContentCount2(filteredProducts2.length);
  }, [filteredProducts2]);


  const [users, setUsers] = useState([]);

  const deleteUser = async (id) => {
      try {
          await fetch(`http://localhost:5000/signup/${id}`, {
              method: 'DELETE'
          });

          setUsers(users.filter((user) => user.user_id!== id));
      } catch (error) {
          console.error(error.message);
      }
  };

  const getUsers = async () => {
      try {
          const response = await fetch('http://localhost:5000/signup');
          const data = await response.json();
          setUsers(data);
      } catch (error) {
          console.error(error);
      }
  };

  useEffect(() => {
      getUsers();
  }, []);

  console.log(users);



  
  




  
  



  

 


  return (
    <Fragment>
      <Admin/>
    

    <div className="home_content" >
    <div style={{width:'83.5%',marginLeft:'15rem'}} >
      <div class="row">
    <div class="col" style={{width:'10%',height:'100px',background:'white',
    display:'flex',justifyContent:'center',alignItems:'center',

 
    border:'1px solid #dfdfdf'}}>
      <p style={{fontSize:'24px',fontFamily:'fantasy',fontWeight:'300',
    color:'#989898'}}>Total Product:{contentCount}</p>
    </div>
    <div class="col"
     style={{width:'10%',height:'100px',background:'white',
     display:'flex',justifyContent:'center',alignItems:'center',
 
  
     border:'1px solid #dfdfdf'}}>
      <p
       style={{fontSize:'24px',fontFamily:'fantasy',fontWeight:'300',
       color:'#989898'}}>Total Users:{contentCount1}</p>
    </div>
    <div class="col"
     style={{width:'10%',height:'100px',background:'white',
     display:'flex',justifyContent:'center',alignItems:'center',
 
  
     border:'1px solid #dfdfdf'}}>
      <p
       style={{fontSize:'24px',fontFamily:'fantasy',fontWeight:'300',
       color:'#989898'}}>Total Order:{contentCount2}</p>
    </div>
  </div>
  </div>
 
          <section style={{marginTop:'5rem'}}>
          <h3 className='text-center mt-5' style={{fontSize:'32px',
          marginTop:'10rem',
          fontFamily:'fantasy',color:'#989898'}}>User Details </h3>
            <table 
             style={{ 
             
              width: '85%',
              // boxShadow: '0px 0px 25px 0px #A9A9A9',
              marginLeft: '14rem',
              marginRight: 'auto' }}>
                <thead>
                    <tr>
                    <th style={{fontSize:'19px',color:'#989898'}}>Email</th>
                    <th style={{fontSize:'19px',color:'#989898'}}>Username</th>
                    <th style={{fontSize:'19px',color:'#989898'}}>Phone Number</th>
                    {/* <th >Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                    <tr key={user.user_id}>
                        
                        <td style={{fontSize:'19px',color:'#989898'}}>{user.email}</td>
                        <td style={{fontSize:'19px',color:'#989898'}} >{user.first_name}</td>
                        <td  style={{fontSize:'19px',color:'#989898'}}>{user.phone_number}</td>
                        {/* <td >
                        <button
                            className='btn btn-danger'
                            onClick={() => deleteUser(user.user_id)}
                        >
                            Delete
                        </button>
                        </td> */}
                    </tr>
                    ))}
                </tbody>
            </table>
         
        </section> 
    </div>



   
   
     
    </Fragment>
  );
};

export default Home;