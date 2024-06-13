import React from "react";
import './Footer.css'
import Logo from '../assets/shop-01-removebg-preview.png'
export default function Footer(){
    return(
        <>
        <div class="contact-area" id="contact">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <div class="contact-content text-center">
                        <div
                         className="circle-icon"
                         style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '1rem',
                        margin: '0 auto',
                      }}>
                        <a href="#"><img src={Logo} alt="logo"/></a>

                        </div>
                     
                        <p style={{
                            fontSize:'20px'
                        }}>
                        Buying Second Hand Items Can Be A Great Way To Save Money And Reduce Waste.
                        </p>
                        <div class="hr"></div>
                       
                        <div class="contact-social">
                            {/* <ul>
                                <li><a class="hover-target" href=""><i class="fab fa-facebook-f"></i></a></li>
                                <li><a class="hover-target" href=""><i class="fab fa-linkedin-in"></i></a></li>
                                <li><a class="hover-target" href=""><i class="fab fa-github"></i></a></li>
                                <li><a class="hover-target" href=""><i class="fab fa-behance"></i></a></li>
                                <li><a class="hover-target" href=""><i class="fab fa-pinterest-p"></i></a></li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer>
        <p>Copyright &copy; 2023. All Rights Reserved.</p>
    </footer>
    </>
    )
}