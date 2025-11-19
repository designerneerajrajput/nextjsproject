import React, { useEffect, useRef } from 'react';
 
const InteractiveFooter = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
 
 
  useEffect(() => {
    // Load Matter.js
    const matterScript = document.createElement('script');
    matterScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.js';
    matterScript.async = true;
 
    // Load GSAP
    const gsapScript = document.createElement('script');
    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    gsapScript.async = true;
 
    let scriptsLoaded = 0;
    const checkBothLoaded = () => {
      scriptsLoaded++;
      if (scriptsLoaded === 2) initializeCanvas();
    };
 
    matterScript.onload = checkBothLoaded;
    gsapScript.onload = checkBothLoaded;
 
    const initializeCanvas = () => {
      const Matter = window.Matter;
      const gsap = window.gsap;
      const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body } = Matter;
 
      const canvas = canvasRef.current;
      if (!canvas) return;
 
      const width = canvas.offsetWidth;
      const height = (canvas.offsetHeight || 500) - 100;
 
      // Engine
      const engine = Engine.create();
      engineRef.current = engine;
      engine.world.gravity.y = 0.8;
 
      // Renderer
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
 
      Render.run(render);
      const runner = Runner.create();
      Runner.run(runner, engine);
 
      // Invisible walls
      const ground = Bodies.rectangle(width / 2, height - 30, width, 60, {
        isStatic: true,
        restitution: 0.8,
        render: { visible: false }
      });
      const leftWall = Bodies.rectangle(5, height / 2, 20, height, {
        isStatic: true,
        restitution: 0.8,
        render: { visible: false }
      });
 
      const rightWall = Bodies.rectangle(width - 5, height / 2, 20, height, {
        isStatic: true,
        restitution: 0.8,
        render: { visible: false }
      });
      // const topWall = Bodies.rectangle(width / 2, 5, width, 20, {
      //   isStatic: true,
      //   restitution: 0.8,
      //   render: { visible: false }
      // });
      Composite.add(engine.world, [ground, leftWall, rightWall]);
 
      // Mouse control
      const mouse = Mouse.create(canvas);
      const mouseConstraint = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
      Composite.add(engine.world, mouseConstraint);
      render.mouse = mouse;
 
      // Shape configs with GSAP properties
      const shapeConfigs = [
        { type: 'icon-1', image: '/images/a.svg' },
        { type: 'icon-2', image: '/images/b.svg' },
        { type: 'icon-3', image: '/images/c-1.svg' },
        { type: 'icon-4', image: '/images/c.svg' },
        { type: 'icon-5', image: '/images/d.svg' },
        { type: 'icon-6', image: '/images/f.svg' },
        { type: 'icon-7', image: '/images/g.svg' },
        { type: 'icon-8', image: '/images/h.svg' },
        { type: 'icon-9', image: '/images/i.svg' },
        { type: 'icon-10', image: '/images/k.svg' }
      ];
 
      function createShapeBody(x, y, config) {
        const baseSize = 70;
        let body;
 
        if (config.type === 'lime-calligraphy' || config.type === 'blue-plus') {
          body = Bodies.circle(x, y, baseSize / 1.5, {  // 1.5 se 1.2 kiya - BADA radius
            restitution: 0.9,
            friction: 0,
            frictionAir: 0.01,
            render: { visible: false }
          });
        } else if (config.type === 'orange-wave' || config.type === 'golden-curve') {
          body = Bodies.rectangle(x, y, baseSize * 1.2, baseSize * 0.9, {  // SIZE BADHAYA
            restitution: 0.85,
            friction: 0,
            frictionAir: 0.01,
            render: { visible: false }
          });
        } else {
          body = Bodies.circle(x, y, baseSize / 1.3, {  // 1.4 se 1.1 kiya - BADA radius
            restitution: 0.9,
            friction: 0,
            frictionAir: 0.01,
            render: { visible: false }
          });
        }
 
        body.shapeType = config.type;
        body.shapeColor = config.color;
        body.glowColor = config.glowColor;
        body.shapeSize = baseSize;
        body.image = new Image();
        body.image.src = config.image;
       
        // GSAP properties for animations
        body.opacity = 0;
        body.scale = 0.3;
        body.glowIntensity = 0;
        body.isHovered = false;
 
        // GSAP entrance animation
        gsap.to(body, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
          delay: Math.random() * 0.5
        });
 
        // Glow pulse animation
        gsap.to(body, {
          glowIntensity: 1,
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: Math.random()
        });
 
        return body;
      }
 
      // Hover detection
      Events.on(mouseConstraint, 'mousemove', (event) => {
        const mousePos = event.mouse.position;
        const bodies = Composite.allBodies(engine.world);
       
        bodies.forEach(body => {
          if (body.shapeType && !body.isStatic) {
            const dx = mousePos.x - body.position.x;
            const dy = mousePos.y - body.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
           
            if (distance < 80 && !body.isHovered) {
              body.isHovered = true;
              // Hover scale up animation
              gsap.to(body, {
                scale: 1.3,
                duration: 0.3,
                ease: 'back.out(2)'
              });
            } else if (distance >= 80 && body.isHovered) {
              body.isHovered = false;
              // Scale back down
              gsap.to(body, {
                scale: 1,
                duration: 0.3,
                ease: 'back.in(2)'
              });
            }
          }
        });
      });
 
      // Custom drawing with GSAP enhancements
      Events.on(render, 'afterRender', () => {
        const context = render.context;
        const bodies = Composite.allBodies(engine.world);
 
        bodies.forEach(body => {
          if (body.shapeType && !body.isStatic) {
            const pos = body.position;
            const angle = body.angle;
            const size = body.shapeSize * body.scale;
            const opacity = body.opacity;
 
            if (opacity <= 0) return;
 
            context.save();
            context.globalAlpha = opacity;
            context.translate(pos.x, pos.y);
            context.rotate(angle);
 
            // GSAP Glow effect
            if (body.glowIntensity > 0) {
              context.shadowBlur = 20 + (body.glowIntensity * 15);
              context.shadowColor = body.glowColor;
            }
 
            context.strokeStyle = body.shapeColor;
            context.fillStyle = body.shapeColor;
            context.lineWidth = 24 * body.scale;
            context.lineCap = 'round';
            context.lineJoin = 'round';
 
            // LIME GREEN CALLIGRAPHY
            // DRAW IMAGE INSTEAD OF SHAPES
            if (body.image && body.image.complete) {
              const imgSize = size;
 
              context.drawImage(
                body.image,
                -imgSize / 2,
                -imgSize / 2,
                imgSize,
                imgSize
              );
            }
 
 
            context.restore();
          }
        });
      });
 
      // Keep bodies within bounds - safety check
     
      // Add 10 shapes initially
    const shapes = [];
for (let i = 0; i < 10; i++) {
  const config = shapeConfigs[i % shapeConfigs.length];
  // More random spread - full right section
  const x = width * 0.6 + (Math.random() * (width * 0.35));
  const y = Math.random() * (height - 150) + 50; // Random Y position
  shapes.push(createShapeBody(x, y, config));
}
Composite.add(engine.world, shapes);
 
      // Click to add new shape with GSAP animation
     
 
      // Resize handler
      const handleResize = () => {
        const newWidth = canvas.offsetWidth;
        const newHeight = (canvas.offsetHeight || 500) - 100;
        render.canvas.width = newWidth;
        render.canvas.height = newHeight;
        render.options.width = newWidth;
        render.options.height = newHeight;
 
       Body.setPosition(ground, { x: newWidth / 2, y: newHeight - 30 });
       Body.setPosition(leftWall, { x: 5, y: newHeight / 2 });
       Body.setPosition(rightWall, { x: newWidth - 5, y: newHeight / 2 });
        //Body.setPosition(topWall, { x: newWidth / 2, y: -10 });
      };
 
      window.addEventListener('resize', handleResize);
 
      return () => {
        window.removeEventListener('resize', handleResize);
        Render.stop(render);
        Runner.stop(runner);
        Engine.clear(engine);
        render.canvas.remove();
        render.textures = {};
      };
    };
 
    document.body.appendChild(matterScript);
    document.body.appendChild(gsapScript);
   
    return () => {
      if (matterScript.parentNode) matterScript.parentNode.removeChild(matterScript);
      if (gsapScript.parentNode) gsapScript.parentNode.removeChild(gsapScript);
    };
  }, []);
 
 
  return (
    <>
      <footer className="footer-container">
        {/* Background Animation Canvas */}
       
        {/* Footer Content */}
        <div className="footer-content">
          <canvas ref={canvasRef} className="footer-bg-canvas" />
          <div className="footer-wrap">
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
 
              <div className="footer-location-wrap">
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
 
      <style jsx>{`
     .footer-container {
    position: relative;
    overflow: hidden;
    min-height: 600px;
  }
 
  .footer-bg-canvas {
          position: absolute;
          top: 0; left: auto; right: 0; bottom: 200;
          width: 100%;
          height: calc(100% - 100px);
          z-index: 99;
          pointer-events: auto; /* Allow click to add shapes */
          bottom: 200px !important  
        }
 
  .footer-content {
    position: relative;
    z-index: 10;
    pointer-events: none;
  }
 
  .footer-wrap, .footer-grid, .footer-location-wrap {
    pointer-events: auto;
  }
    .footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1); /* Horizontal line */
}
      `}</style>
    </>
  );
};
 
export default InteractiveFooter;
