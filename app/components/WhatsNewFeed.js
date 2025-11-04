'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhatsNewFeed = () => {
  const sectionRef = useRef(null);

  const feedItems = [
    {
      id: 1,
      image: "https://a-us.storyblok.com/f/1017006/770x1000/2ef84dad83/surveillance-watch.jpg/m/300x390/filters:quality(80)",
      tag: "Site Launch",
      tagColor: "#1b2237",
      date: "28.08.24",
      title: "Surveillance Watch",
      description: "An interactive data visualisation highlighting global surveillance connections",
      link: "https://www.surveillancewatch.io/",
      linkText: "Explore"
    },
    {
      id: 2,
      image: "https://a-us.storyblok.com/f/1017006/770x1000/2b0e547469/unearthed.jpg/m/300x390/filters:quality(80)",
      tag: "Site Launch",
      tagColor: "#f68738",
      date: "30.07.24",
      title: "Unearthed",
      description: "An all new website to showcase the teams expertise across innovation in the resources sector.",
      link: "https://unearthed.solutions/",
      linkText: "Check it out"
    },
    {
      id: 3,
      image: "https://a-us.storyblok.com/f/1017006/770x1000/17b3d35e06/humaans.jpg/m/300x390/filters:quality(80)",
      tag: "Milestone",
      tagColor: "#28221e",
      date: "01.07.24",
      title: "Humaaniversary",
      description: "Celebrating 14 years of making extraordinary digital products with our incredible team.",
    },
    {
      id: 4,
      image: "https://a-us.storyblok.com/f/1017006/770x1000/e4a71105cb/mymindcheck.png/m/300x390/filters:quality(80)",
      tag: "Site Launch",
      tagColor: "#ff6465",
      date: "30.05.24",
      title: "My Mind Check",
      description: "An evidence-based digital mental health and wellbeing check-in for Australian schools.",
      link: "https://mymindcheck.org.au/",
      linkText: "Visit website"
    },
    {
      id: 5,
      image: "https://a-us.storyblok.com/f/1017006/770x1000/2fbc3c1071/awa.jpg/m/300x390/filters:quality(80)",
      tag: "Awards",
      tagColor: "#361f0f",
      date: "22.05.24",
      title: "Australian Web Awards",
      description: "15 nominations and 2 wins, including Best in show: Design.",
    }
  ];

useEffect(() => {
  const sectionEl = sectionRef.current;
  const mainWrapper = document.querySelector('.main-wrapper');
  const cards = sectionEl.querySelectorAll('.feed-item-container');

  // 🔹 Feed item animation
  gsap.set(cards, {
    opacity: 0,
    scaleX: 0.7,
    transformOrigin: 'left center',
  });

  gsap.to(cards, {
    opacity: 1,
    scaleX: 1,
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: sectionEl,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  // 🔹 Animate .main-wrapper when section scrolls to 70%
  gsap.to(mainWrapper, {
    scale: 0.9,
    borderRadius: '30px',
    ease: 'power2.out',
    scrollTrigger: {
      trigger: sectionEl,
      start: 'top 10%',
      end: 'bottom 90%',
      scrub: true,
      onEnter: () => {
        gsap.to('body', { backgroundColor: '#fff', duration: 0.5 });
      },
      onLeaveBack: () => {
        gsap.to('body', { backgroundColor: '#fff', duration: 0.5 });
      },
    },
  });

  return () => {
    // ScrollTrigger.getAll().forEach(t => t.kill());
  };
}, []);


  return (
    <section ref={sectionRef} className="feed-wrapper" aria-labelledby="feed-heading">
      <h2 id="feed-heading" className="feed-heading">What&apos;s New</h2>

      <Swiper
        modules={[Navigation]}
        navigation={false}
        slidesPerView={4.3}
        spaceBetween={20}
        grabCursor={true}
        style={{ paddingRight: '40px' }}
        breakpoints={{
          320: { slidesPerView: 1.2 },
          768: { slidesPerView: 2.3 },
          1024: { slidesPerView: 4.3 },
        }}
        className="feed-inner"
      >
        {feedItems.map((item) => (
          <SwiperSlide key={item.id}>
            <article className="feed-item-container">
              <div className="feed-item">
                <div className="feed-image">
                  <Image
                    src={item.image}
                    alt={`${item.title} - ${item.description}`}
                    width={300}
                    height={390}
                    className="feed-img"
                  />
                  <span
                    className="feed-tag"
                    style={{ backgroundColor: item.tagColor, color: 'white' }}
                  >
                    {item.tag}
                  </span>
                </div>
                <span className="feed-date">{item.date}</span>
                <div className="feed-content">
                  <h3 className="feed-title">{item.title}</h3>
                  <span className="feed-description">{item.description}</span>
                </div>
                {item.link && (
                  <a
                    className="feed-button-wrapper"
                    target="_blank"
                    href={item.link}
                    rel="noopener noreferrer"
                  >
                    <span className="feed-button">{item.linkText}</span>
                  </a>
                )}
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default WhatsNewFeed;
