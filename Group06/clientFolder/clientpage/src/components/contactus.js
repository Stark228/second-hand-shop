import React from "react";
import './contact.css'
import { FaClock, FaEnvelope,FaWhatsapp } from "react-icons/fa";


export default function Contact(){

    const handleCall = () => {
        const phoneNumber = '77761949';
        const message = 'Hello, this is a WhatsApp message.';
    
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
      };

    const  handleClick = () => {
        const email = '12200072.gcit@rub.edu.bt';
        const subject = 'Hello';
        const body = 'This is the content of the email.';
    
        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
        window.location.href = mailtoUrl;
      };
    return(
  <div  
  style={{ background: '#fcfcfc', border: '1px solid #dfdfdf', marginTop: '2rem' }}>
 


      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <div className="h-100" style={{marginTop:'2rem'}}>
              <div className="card-body">
                <div className="circle-icon"
                 style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: '#F7931E',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '1rem',
                margin: '0 auto',
              }}>
                    <FaEnvelope style={{ color: 'white', cursor: 'pointer' }} size={25} onClick={handleClick} />
                </div>
               
           
         
                <p className="card-text"  style={{fontSize:'19px',color:'#989898',marginTop:'0.5rem'}}>
         
                  <span style={{ fontFamily: "Titillium Web, sans-serif", fontSize: '22px' }}>info@secondhand.com</span>
                  <br></br>
                  <span style={{ fontFamily: "Titillium Web, sans-serif", fontSize: '22px' }}>pema@gmail.com</span>
        
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <div className="h-100" style={{marginTop:'2rem'}}>
              <div className="card-body">
                <div className="circle-icon"
                 style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: '#F7931E',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom:'1rem',
                  margin: '0 auto',
                }}>
                  <FaWhatsapp color="white" style={{ cursor: 'pointer' }} size={25} onClick={handleCall} />
                </div>
              
                <p className="card-text"  style={{fontSize:'19px',color:'#989898',marginTop:'0.5rem'}}>
                <span style={{ fontFamily: "Titillium Web, sans-serif", fontSize: '22px' }}>77761949</span><br></br>
              <span style={{ fontFamily: "Titillium Web, sans-serif", fontSize: '22px' }}>GCIT, Mongar</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <div className="h-100" style={{marginTop:'2rem'}}>
              <div className="card-body">
                <div className="circle-icon"
                 style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: '#F7931E',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom:'1rem',
                  margin: '0 auto',
                }}>
                  <FaClock color="white" size={25} />
                </div>
                
                <p className="card-text" style={{fontSize:'19px',color:'#989898',marginTop:'0.5rem'}}>
                <span style={{ fontFamily: "Titillium Web, sans-serif", fontSize: '22px' }}>Mon - Thu 9:00 am - 4.00 pm</span><br></br>
              <span style={{ fontFamily: "Titillium Web, sans-serif", fontSize: '22px' }}>Sat - Sun 10.00 pm - 5.00 pm</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    )
}