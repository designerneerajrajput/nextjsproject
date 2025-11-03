import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const initAnimations = () => {
  // Hero animation
  gsap.from('.hero-content', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power3.out'
  });

  // Work cards animation
  gsap.from('.work-card', {
    scrollTrigger: {
      trigger: '.work-section',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out'
  });

  // Service items animation
  gsap.from('.service-item', {
    scrollTrigger: {
      trigger: '.services-section',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    duration: 0.6,
    y: 30,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out'
  });

  // Client logos animation
  gsap.from('.client-logo', {
    scrollTrigger: {
      trigger: '.clients-section',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    duration: 0.5,
    scale: 0.8,
    opacity: 0,
    stagger: 0.05,
    ease: 'back.out(1.7)'
  });
};

export const fadeInUp = (element) => {
  gsap.from(element, {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
  });
};