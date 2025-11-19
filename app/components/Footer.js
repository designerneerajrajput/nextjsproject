import React, { useEffect, useRef } from "react";

const InteractiveFooter = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js";
    script.async = true;

    script.onload = () => {
      const Matter = window.Matter;
      const {
        Engine,
        Render,
        Runner,
        Bodies,
        Composite,
        Mouse,
        MouseConstraint,
        Events,
        Body,
      } = Matter;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // ❗ Gravity initially OFF (0) — icons float
      const engine = Engine.create({
        gravity: { x: 0, y: 0 },
      });
      engineRef.current = engine;

      const render = Render.create({
        canvas,
        engine,
        options: {
          width,
          height,
          wireframes: false,
          background: "transparent",
        },
      });

      // ⭐⭐⭐ SCROLL TRIGGER — Footer visible → gravity ON ⭐⭐⭐
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Footer reached → icons fall suddenly
           engine.gravity.y = 0.25; // smooth, natural fall

            } else {
              // Footer not visible → floating
              engine.gravity.y = 0;
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(document.querySelector(".footer-container"));
      // ⭐⭐⭐ END SCROLL TRIGGER ⭐⭐⭐


      // 🧱 WALLS
      const wallOptions = { isStatic: true, render: { visible: false } };
      const walls = [
        Bodies.rectangle(width / 2, -200, width * 2, 300, wallOptions),
        Bodies.rectangle(width / 2, height + 75, width * 2, 150, wallOptions),
        Bodies.rectangle(-75, height / 2, 150, height * 2, wallOptions),
        Bodies.rectangle(width + 75, height / 2, 150, height * 2, wallOptions),
      ];

      // ICONS
      const iconPaths = [
        "/images/icon/a.svg",
        "/images/icon/b.svg",
        "/images/icon/c.svg",
        "/images/icon/d.svg",
        "/images/icon/e.svg",
        "/images/icon/f.svg",
        "/images/icon/g.svg",
        "/images/icon/h.svg",
        "/images/icon/i.svg",
        "/images/icon/j.svg",
        "/images/icon/k.svg",
      ];

      const iconBodies = [];
      const iconImages = [];

      // PRELOAD ICON IMAGES
      iconPaths.forEach((src, i) => {
        const img = new Image();
        img.src = src;
        img.onload = () => console.log(`Loaded: ${src}`);
        img.onerror = () => console.warn(`Could not load: ${src}`);
        iconImages[i] = img;
      });

      // Spawn icons inside safe area
      const safeMargin = 80;
      for (let i = 0; i < iconPaths.length; i++) {
        const size = 100 + Math.random() * 30;
        const x =
          width / 2 + Math.random() * (width / 2 - size - safeMargin);
        const y =
          safeMargin + Math.random() * (height - size * 2 - safeMargin);

        const body = Bodies.circle(x, y, size / 2, {
          restitution: 0.1,
          
          friction: 0.01,
          density: 0.01,
          render: { visible: false },
          iconIndex: i,
          iconSize: size,
        });
        iconBodies.push(body);
      }

      Composite.add(engine.world, [...walls, ...iconBodies]);

      // MOUSE CONTROL
      const mouse = Mouse.create(canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });
      Composite.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      let hasDragged = false;
      Events.on(mouseConstraint, "mousedown", () => {
        hasDragged = true;
      });

      // Clamp movement inside boundaries
      Events.on(engine, "afterUpdate", () => {
        iconBodies.forEach((body) => {
          const { x, y } = body.position;
          let newX = x;
          let newY = y;

          const margin = 60;
          const minX = margin;
          const maxX = width - margin;
          const minY = margin;
          const maxY = height - margin;

          if (x < minX) newX = minX;
          if (x > maxX) newX = maxX;
          if (y < minY) newY = minY;
          if (y > maxY) newY = maxY;

          if (newX !== x || newY !== y) {
            Body.setPosition(body, { x: newX, y: newY });
            Body.setVelocity(body, { x: 0, y: 0 });
          }
        });
      });

      // DRAW ICON IMAGES
      Events.on(render, "afterRender", () => {
        const ctx = render.context;
        iconBodies.forEach((body) => {
          const pos = body.position;
          const angle = body.angle;
          const img = iconImages[body.iconIndex];
          const size = body.iconSize;

          if (img && img.complete && img.naturalWidth > 0) {
            const aspectRatio = img.naturalHeight / img.naturalWidth;
            const iconWidth = size;
            const iconHeight = size * aspectRatio;

            ctx.save();
            ctx.translate(pos.x, pos.y);
            ctx.rotate(angle);
          
            ctx.drawImage(
              img,
              -iconWidth / 2,
              -iconHeight / 2,
              iconWidth,
              iconHeight
            );
            ctx.restore();
          }
        });
      });

      // RUN ENGINE
      Render.run(render);
      const runner = Runner.create();
      Runner.run(runner, engine);

      // Floating force
      const interval = setInterval(() => {
        iconBodies.forEach((body) => {
          if (Math.random() > 0.8) {
            Body.applyForce(body, body.position, {
              x: (Math.random() - 0.5) * 0.01,
              y: (Math.random() - 0.5) * 0.01,
            });
          }
        });
      }, 2000);

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
    <footer className="footer-container">
      
      <div className="footer-content">
        <div className="footer-wrap">
          <div className="footer-grid">
            <div>
              <h2 className="footer-title">
                Let's make
                <span className="arrow-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
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
                  <svg
                    className="globe-icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span style={{ fontWeight: "500" }}>We work globally</span>
                </div>
                <a href="#" className="info-link">
                  Submit a brief
                  <svg
                    className="arrow-small"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
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
            <a href="#" className="social-link">
              Twitter X
            </a>
            <span className="social-divider">✱</span>
            <a href="#" className="social-link">
              Instagram
            </a>
            <span className="social-divider">✱</span>
            <a href="#" className="social-link">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
       <canvas ref={canvasRef} className="footer-canvas" />
    </footer>
  );
};

export default InteractiveFooter;
