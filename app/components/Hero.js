'use client';

import { useEffect } from 'react';
import { initAnimations } from '../utils/animations';

export default function Hero() {
  useEffect(() => {
    initAnimations();
  }, []);

  return (
   <>
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center ">
          <div className="col-lg-12 hero-content">
            <h1 className="display-1 fw-bold mb-4">
         Your Trusted <br></br>Local Plumbing Experts.
            </h1>
            <p className="lead mb-5 fs-4">
             A trusted plumbing service dedicated to delivering reliable repairs and lasting solutions for your home and business
            </p>
           
          </div>
        </div>
      </div>
      
      {/* Animated background elements */}
     
    </section>

  </>
  );
}