import React, { useEffect, useRef } from 'react';

const InteractiveFooter = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js';
    script.async = true;

    script.onload = () => {
      const Matter = window.Matter;
      const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body } = Matter;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const width = canvas.offsetWidth;
      const height = 400;

      const engine = Engine.create({
        gravity: { x: 0, y: 0.5 }
      });
      engineRef.current = engine;

      const render = Render.create({
        canvas,
        engine,
        options: {
          width,
          height,
          wireframes: false,
          background: 'transparent'
        }
      });

      // Walls
      const wallOptions = { isStatic: true, render: { visible: false } };
      const walls = [
        Bodies.rectangle(width / 2, -25, width, 50, wallOptions),
        Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions),
        Bodies.rectangle(-25, height / 2, 50, height, wallOptions),
        Bodies.rectangle(width + 25, height / 2, 50, height, wallOptions)
      ];

      // Plumbing icons (make sure these exist in /public/images/icons/)
      const iconPaths = [
        '/images/p1.svg',
       '/images/p2.svg',
       '/images/p3.svg',
       '/images/p4.svg',
       '/images/p5.svg',
       '/images/p6.svg',
       '/images/p7.svg',
       '/images/p8.svg',
       '/images/p9.svg',
       '/images/p10.svg',
       '/images/p11.svg'
      ];

      const iconBodies = [];
      const iconImages = [];

      // Preload all icons and handle errors
      iconPaths.forEach((src, i) => {
        const img = new Image();
        img.src = src;
        img.onload = () => console.log(`✅ Loaded: ${src}`);
        img.onerror = () => console.warn(`⚠️ Could not load image: ${src}`);
        iconImages[i] = img;
      });

      // Create Matter bodies
      for (let i = 0; i < iconPaths.length; i++) {
        const size = 70 + Math.random() * 30;
        const x = size + Math.random() * (width - size * 2);
        const y = size + Math.random() * (height - size * 2);

        const body = Bodies.circle(x, y, size / 2, {
          restitution: 0.8,
          friction: 0.01,
          density: 0.04,
          render: { visible: false },
          iconIndex: i,
          iconSize: size
        });

        iconBodies.push(body);
      }

      Composite.add(engine.world, [...walls, ...iconBodies]);

      // Mouse control
      const mouse = Mouse.create(canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } }
      });
      Composite.add(engine.world, mouseConstraint);

      render.mouse = mouse;

      // Draw images safely
      Events.on(render, 'afterRender', () => {
        const context = render.context;

        iconBodies.forEach(body => {
          const pos = body.position;
          const angle = body.angle;
          const img = iconImages[body.iconIndex];
          const size = body.iconSize;

          if (img && img.complete && img.naturalWidth > 0) {
            context.save();
            context.translate(pos.x, pos.y);
            context.rotate(angle);
            context.shadowColor = 'rgba(0,0,0,0.25)';
            context.shadowBlur = 10;
            context.drawImage(img, -size / 2, -size / 2, size, size);
            context.restore();
          }
        });
      });

      Render.run(render);
      const runner = Runner.create();
      Runner.run(runner, engine);

      // Random motion
      const interval = setInterval(() => {
        iconBodies.forEach(body => {
          if (Math.random() > 0.8) {
            Body.applyForce(body, body.position, {
              x: (Math.random() - 0.5) * 0.01,
              y: (Math.random() - 0.5) * 0.01
            });
          }
        });
      }, 2000);

      // Cleanup
      return () => {
        clearInterval(interval);
        Render.stop(render);
        Runner.stop(runner);
        Engine.clear(engine);
        render.canvas.remove();
        render.textures = {};
      };
    };

    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);
  return (
    <>
    

      <footer className="footer-container">
       

        <div className="footer-content">

          <div className='footer-wrap'>
<div className="footer-grid">
            <div>
              <h2 className="footer-title">
                Let's make
                <span className="arrow-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                <br />
                something fun
              </h2>

             
            </div>
<div className='footer-location-wrap'>


   <div className="footer-info">
                <div className="info-item">
                  <svg className="globe-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                  </svg>
                  <span style={{ fontWeight: '500' }}>We work globally</span>
                </div>
                <a href="#" className="info-link">
                  Submit a brief
                  <svg className="arrow-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="mailto:contact@humaan.com" className="info-email">
                  contact@humaan.com
                </a>
              </div>
                <div className="locations-grid">
              <div className="location-card">
                <h3>USA</h3>
                <p>Los Angeles, CA</p>
                <a href="mailto:jason@humaan.com">jason@humaan.com</a>
              </div>
              <div className="location-card">
                <h3>Australia</h3>
                <p>Perth, WA</p>
                <a href="mailto:jay@humaan.com.au">jay@humaan.com.au</a>
              </div>
            </div>
</div>
          
          </div>

             <canvas ref={canvasRef} className="footer-canvas" />
          </div>
          

          <div className="footer-bottom">
            <div className="footer-brand">
              <span className="brand-name">Humaan</span>
              <span className="brand-copyright">© 2025 Privacy</span>
            </div>
            <div className="footer-social">
              <a href="#" className="social-link">Twitter X</a>
              <span className="social-divider">✱</span>
              <a href="#" className="social-link">Instagram</a>
              <span className="social-divider">✱</span>
              <a href="#" className="social-link">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default InteractiveFooter;