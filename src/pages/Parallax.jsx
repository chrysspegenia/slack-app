import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './Parallax.css';

const Parallax = () => {
  useEffect(() => {
    const parallaxEls = document.querySelectorAll('.parallax');

    const handleMouseMove = (e) => {
      let xValue = e.clientX - window.innerWidth / 2;
      let yValue = e.clientY - window.innerHeight / 2;

      parallaxEls.forEach((el) => {
        let speedx = el.getAttribute('data-speedx');
        let speedy = el.getAttribute('data-speedy');

        el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) 
          translateY(calc(-50% + ${yValue * speedy}px))`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    

    return () => {
      console.log('Cleanup function');
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); 

  return (
    <div className='parallax-container'>
      <img className='parallax bg-img' src='/bg-login.png' data-speedx={0.15} data-speedy={0.15} alt='background' />
      <img className='parallax earth-img' src='/earth.png' data-speedx={0.13} data-speedy={0.13} alt='background' />
      <img className='parallax surface-img' src='/surface.png' data-speedx={0.1} data-speedy={0.1} alt='background' />
      <img className='parallax mars-img' src='/mars.png' data-speedx={0.19} data-speedy={0.19} alt='background' />
    </div>
  );
};

export default Parallax;
