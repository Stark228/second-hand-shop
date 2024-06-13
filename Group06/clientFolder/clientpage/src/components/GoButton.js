import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './Gobutton.css';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    if (window.scrollTo) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo = 0; // fallback for older browsers
    }
  };

  return (
    <div
      className={`go-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      <FaArrowUp size={25} color='#fff' className='go-top-btn' />
    </div>
  );
};

export default GoToTopButton;