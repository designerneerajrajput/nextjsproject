'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

export default function VideoSection() {
  const videoRef1 = useRef(null); // 🔹 First video
  const videoRef2 = useRef(null); // 🔹 Second video
  const sectionRef = useRef(null);
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const video1 = videoRef1.current;
    const section = sectionRef.current;
    if (!video1 || !section) return;

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // 🟢 Video Setup
    video1.muted = true;
    video1.playsInline = true;
    video1.preload = 'auto';
    video1.pause();
    gsap.set(video1, { scale: 0.8, transformOrigin: 'center center' });

    const ensurePlay = () => {
      const playPromise = video1.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const tryPlay = () => {
            video1.play().catch(() => {});
            window.removeEventListener('scroll', tryPlay);
            window.removeEventListener('click', tryPlay);
          };
          window.addEventListener('scroll', tryPlay);
          window.addEventListener('click', tryPlay);
        });
      }
    };

    // ✅ Sticky play/pause
    ScrollTrigger.create({
      trigger: section,
      start: 'top 10%',
      end: 'bottom 20%',
      onEnter: () => ensurePlay(),
      onEnterBack: () => ensurePlay(),
      onLeave: () => video1.pause(),
      onLeaveBack: () => video1.pause(),
    });

    // 🎥 Zoom In-Out + Border Radius Change
    const zoomTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    zoomTimeline
      .to(video1, { scale: 1.3, borderRadius: '0px', ease: 'power2.out', duration: 1 })
      .to(video1, { scale: 0.8, borderRadius: '30px', ease: 'power2.out', duration: 1 });

    // 🌈 Background Color Change
   ScrollTrigger.create({
  trigger: section,
  start: 'top 10%',
  end: 'bottom 30%',
  onEnter: () => {
    gsap.to(document.body, {
      backgroundColor: '#b488f1', // purple color
      duration: 0.8,
      ease: 'power2.out',
    });
  },
  onLeaveBack: () => {
    gsap.to(document.body, {
      backgroundColor: '#f3f3e9', // default light color
      duration: 0.8,
      ease: 'power2.out',
    });
  },
});
// ✅ Second video play/pause on scroll
const video2 = videoRef2.current;
if (video2) {
  video2.muted = true;
  video2.playsInline = true;
  video2.preload = 'auto';
  video2.pause();

  const ensurePlay2 = () => {
    const playPromise = video2.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const tryPlay = () => {
          video2.play().catch(() => {});
          window.removeEventListener('scroll', tryPlay);
          window.removeEventListener('click', tryPlay);
        };
        window.addEventListener('scroll', tryPlay);
        window.addEventListener('click', tryPlay);
      });
    }
  };

  // 🎥 Play/pause video when in viewport
  ScrollTrigger.create({
    trigger: ".video-wrapper2-two",
    start: "top 80%",
    end: "bottom 20%",
    onEnter: () => ensurePlay2(),
    onEnterBack: () => ensurePlay2(),
    onLeave: () => video2.pause(),
    onLeaveBack: () => video2.pause(),
  });

  // 🌈 Change background color when 50% of video is visible
// 🌈 Background color switch for second video section
ScrollTrigger.create({
  trigger: ".video-wrapper2-two",
  start: "top 10%", // jab aadhi video viewport me ho
  end: "bottom 90%",
  onEnter: () => {
    gsap.to(document.body, {
      backgroundColor: "#f3f3e9", // remove previous purple & apply neutral
      duration: 1,
      ease: "power2.inOut",
    });
  },
  onLeaveBack: () => {
    gsap.to(document.body, {
      backgroundColor: "#b488f1", // upar scroll par firse purple wapas
      duration: 1,
      ease: "power2.inOut",
    });
  },
});
}

// ===
    // 🧩 Logo + Title Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.we-repair-wrapper',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      '.we-repair-wrapper .title',
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.8, ease: 'cubic-bezier(0, 0.55, 0.45, 1)' }
    );

    gsap.utils.toArray('.we-repair-wrapper .logo-wrapper li').forEach((el, i) => {
      tl.fromTo(
        el,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: i * 0.15 },
        '+=0.1'
      );
    });

    // ✅ Refresh triggers after render
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // 🔹 Load logos
  useEffect(() => {
    fetch('/data/logos.json')
      .then((res) => res.json())
      .then((data) => setLogos(data))
      .catch((err) => console.error('Error loading logos:', err));




// ==============




  }, []);

  return (
    <>
      {/* 🎬 First Video */}
      <section ref={sectionRef} className="Video-Wrapper flex justify-center items-center min-h-screen">
        <div className="video-container">
          <video
            ref={videoRef1}
            className="rounded-2xl mx-auto block transition-transform duration-700 max-w-6xl w-[80%] video-element"
            src="/videos/video-one.mp4"
            muted
            playsInline
            preload="auto"
          />
        </div>
      </section>

      {/* 💠 Logo Section */}
      <section className="we-repair-wrapper">
        <div className="container text-center">
          <h2 className="title">
            We design, build and ship <br />world-class digital products <br />for forward-thinking brands.
          </h2>

          <div className="logo-wrapper">
            {typeof window !== 'undefined' && logos.length > 0 && (
              <ul className="flex flex-wrap justify-center gap-6">
                {logos.map((logo) => (
                  <li key={logo.id}>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={120}
                      height={120}
                      className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* 🎞️ Second Video Section */}
      <section className="video-wrapper2-two">
        <div className="container">
          <div className="video-background-img relative">
            <Image
              src="/images/video-bg-img.jpeg"
              alt="Background Image"
              width={1920}
              height={1080}
              className=""
            />
          <div className="video-title-wrap">

              <div className="video-title">PIQUE</div>
          </div>
          </div>

          <video
            ref={videoRef2}
            className="video-over-on-bg-img"
            src="/videos/video2.mp4"
            muted
            playsInline
            preload="auto"
          />
        </div>
      </section>

      {/* 🔽 Next Section */}
      <section
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#f8f8f8',
        }}
      >
        <h1 className="text-4xl font-bold text-gray-800">Next Section Content</h1>
      </section>
    </>
  );
}
