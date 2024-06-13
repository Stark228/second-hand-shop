import React from "react";
import BackIMAGE from '../assets/blob-haikei .png'
import Logo from '../assets/shop-01-removebg-preview.png'

export default function About(){
    return(
<div style={{ background: '#fcfcfc', border: '1px solid #dfdfdf', marginTop: '2rem',}}>
  <div className="container-fluid" style={{ minHeight: '100%' }}>
    <div className="row">
      <div className="col-lg-6 col-md-8 col-sm-10 col-12 mx-auto text-center">
        <img src={Logo} className="img-fluid" alt="" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
      <div className="col-lg-6 col-md-8 col-sm-10 col-12 pt-5">
        <p
          style={{
            lineHeight: '1.5',
            fontFamily: "Titillium Web, sans-serif",
            fontSize: '24px',
            color: '#808080',
            padding: '0 20px',
          }}
        >
          Welcome to our second-hand shopping platform, where we believe in the power of sustainability and conscious consumerism. Our mission is to provide a convenient and affordable way for everyone to shop for high-quality second-hand items.
          <br />
          <br />
          Our platform is designed to make second-hand shopping easy and accessible for everyone. We carefully curate a wide selection of items, from clothing and accessories to home decor and furniture, all in great condition and at affordable prices.
        </p>
      </div>
    </div>
  </div>
  
</div>






    )
}