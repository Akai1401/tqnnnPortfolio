'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { PAGE_STATE } from '@/constant';

const HeroSection = ({ pageState }: { pageState: PAGE_STATE }) => {
  const h1Refs = React.useRef<(HTMLHeadingElement | null)[]>([]);
  useEffect(() => {
    if (pageState !== PAGE_STATE.HERO) return;
    // Animate các h1 lần lượt từ dưới lên
    gsap.fromTo(
      h1Refs.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
      }
    );
  }, [pageState]);

  return (
    <div
      id='hero-section'
      className='relative h-screen w-full bg-[url("/images/home/bg.jpg")] bg-cover bg-center bg-no-repeat'
    >
      <div className='absolute inset-0 bg-black/20'></div>
      {pageState === PAGE_STATE.HERO && (
        <div className='relative z-10 flex h-full w-full items-center justify-center'>
          <div className='text-center'>
            <h1
              ref={(el) => {
                h1Refs.current[0] = el;
              }}
              className='mb-6 text-6xl font-bold text-white'
            >
              Welcome to My Portfolio
            </h1>
            <p
              ref={(el) => {
                h1Refs.current[1] = el;
              }}
              className='text-xl text-white/90'
            >
              Creative Developer & Designer
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
