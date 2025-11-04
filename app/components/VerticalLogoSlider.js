'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';


export default function LogoColumn({ logos, delay = 0 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!logos || logos.length === 0) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % logos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [logos]);

  return (
    <div className="logo-column">
      {logos.map((logo, i) => (
        <div
          key={i}
          className={`logo-item ${i === index ? 'active' : ''}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}
