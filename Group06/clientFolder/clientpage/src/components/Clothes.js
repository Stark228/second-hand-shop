import React from "react";
import './Allproduct.css'


import './AllproductCard.css';
import {FaFacebook, FaShare, FaWhatsapp} from 'react-icons/fa'

function Clothes(){

      
       
    return(
        <div>
            <div class="row">
   
  
<div class="column">
 <div class="card">
   <div class="content">
     <div class="front">
       <img class="profile" width="100%" src="https://github.com/free-source-code-bd/all-public-resource/blob/main/neymar2.jpg?raw=true" alt="Neymar"/>
      
       <div style={{display:'flex',flexDirection:'row', alignItems: 'center', justifyContent: 'center',}}>

        <div style={{flex:'1', textAlign: 'center',}}>
            <p style={{fontFamily:"Titillium Web, sans-serif",
        fontSize:'1.5vw'}}>Neymar</p>
        </div>
        <div style={{flex:'1',justifyContent:'center'}}>
            <p style={{fontFamily:"Titillium Web, sans-serif",
        fontSize:'1.5vw'}}>Nu.</p>
        </div>


       </div>
     </div>
     <div class="back from-left">
       <h3>Neymar</h3>
       <h3>10</h3>
       <h3>PSG | BRA</h3>
       <img class="tem-img" src="https://github.com/free-source-code-bd/all-public-resource/blob/main/psg.jpg?raw=true" alt=""/> &nbsp;
       <img class="tem-img" src="https://github.com/free-source-code-bd/all-public-resource/blob/main/bra.jpg?raw=true" alt=""/>  <br/>
       <p class="des">
         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, in animi doloribus reprehenderit debitis voluptas pariatur eaque! Rem, accusamus tempora?
       </p>
       <ul class="social-icon">
         <li>
            <a href="">
                <FaFacebook/>
                
            </a>
        </li>
        <li>
            <a href="">
              <FaWhatsapp/>
            </a>
        </li>
        <li>
            <a href="">
               <FaShare/>
            </a>
        </li>
       </ul>
     </div>
   </div>
 </div>
</div>
</div>
       
   



        </div>
    )
}
export default Clothes;