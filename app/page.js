'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/Hero';

import VideoSection from './components/VideoPortfolio';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const emojiRef = useRef(null);
  const counterRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const emoji = emojiRef.current;
    if (!section || !title) return;

    // 🧩 Build split text for animation
    const textTop = 'Great work for';
    const textBottom = 'great people.';
    title.innerHTML = '';

    const line1 = document.createElement('div');
    const line2 = document.createElement('div');
    line1.classList.add('line');
    line2.classList.add('line');

    textTop.split('').forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.classList.add('letter');
      line1.appendChild(span);
    });

    const br = document.createElement('br');
    title.appendChild(line1);
    title.appendChild(br);

    const beforeEmoji = 'great';
    const afterEmoji = ' people.';

    beforeEmoji.split('').forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.classList.add('letter');
      line2.appendChild(span);
    });

    const emojiWrapper = document.createElement('span');
    emojiWrapper.classList.add('emoji-wrapper');
    emojiWrapper.appendChild(emoji);
    line2.appendChild(emojiWrapper);

    afterEmoji.split('').forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.classList.add('letter');
      line2.appendChild(span);
    });

    title.appendChild(line2);

    // ✨ Animate heading letters upward
    gsap.fromTo(
      title.querySelectorAll('.letter'),
      { y: 80, opacity: 0 },
      {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true, // 👈 runs once when visible
        },
        y: 0,
        opacity: 1,
        ease: 'power3.out',
        duration: 0.6,
        stagger: 0.04,
      }
    );

    // ✨ Emoji pop-in effect
    gsap.fromTo(
      emojiWrapper,
      { opacity: 0, y: 40 },
      {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true, // 👈 runs once when visible
        },
        opacity: 1,
        y: 0,
        ease: 'back.out(1.7)',
        duration: 0.6,
        delay: 0.5,
      }
    );

    // 🔢 Counter animation — starts only when user reaches the section
    counterRefs.current.forEach((counter) => {
      const target = parseInt(counter.dataset.value, 10);
      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          scrollTrigger: {
            trigger: counter, // trigger individually per counter
            start: 'top 90%', // visible area
            once: true, // runs once only
          },
          innerText: target,
          duration: 2,
          ease: 'power1.out',
          snap: { innerText: 1 },
          onUpdate() {
            counter.innerText = Math.floor(counter.innerText);
          },
        }
      );
    });
  }, []);

  return (
    <main>
      <Header />
      <Hero />
      <VideoSection />

      <section className="great-work-wrapper" ref={sectionRef}>
        <div className="container">
          <div className="title-wrap">
            <h2 className="title" ref={titleRef}>
              <Image
                ref={emojiRef}
                src="/images/icon-emozi.svg"
                alt="Great work illustration"
                width={1200}
                height={800}
                className="img-fluid"
              />
            </h2>
          </div>

          <div className="row">
            <div className="col-md-5">
              <div className="content-wrap">
                <p>
                  We put people first, understanding that a well-crafted product
                  significantly impacts the lives of those who use it.
                </p>
                <p>
                  Our independent spirit drives our creative energy and approach
                  to technology, allowing us to ensure quality and consistently
                  deliver outstanding outcomes.
                </p>

                <a className="btn btn-theme" href="#">
                  About Us <i className="fa-solid fa-arrow-right ms-2"></i>
                </a>
              </div>

              <div className="stats-wrap">
                <ul>
                  <li>
                    <span
                      ref={(el) => (counterRefs.current[0] = el)}
                      data-value="100"
                    >
                      0
                    </span>
                   <span style={{ marginLeft: "-37px" }}>%</span>
                    <label>
                      In-house & <br /> independent
                    </label>
                  </li>
                  <li>
                    <span
                      ref={(el) => (counterRefs.current[1] = el)}
                      data-value="15"
                    >
                      0
                    </span>
                    <label>
                      Years crafting digital <br /> experiences
                    </label>
                  </li>
                  <li>
                    <span
                      ref={(el) => (counterRefs.current[2] = el)}
                      data-value="80"
                    >
                      0
                    </span> <span style={{ marginLeft: "-37px" }}>+</span>
                    <label>
                      Awards from AWA, <br /> FWA, and Awwwards
                    </label>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-7">
              <div className="img-wrap">
                <Image
                  src="/images/great-work.jpeg"
                  alt="Great work illustration"
                  width={1200}
                  height={800}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='whats-new-wrapper'>
        <div className='container'>
          <div className='title-wrap'>
     <h2 className='title'>What&apos;s New</h2>
          </div>
        </div>

      </section>
    </main>
  );
}
