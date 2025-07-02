'use client';

import CustomImage from '@/components/custom/CustomImage';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

enum WELCOME_STATE {
  LOADING = 0,
  WELCOME = 1,
}

const WELCOME_TEXT = [
  'CREATIVE DEVELOPMENT',
  'PORTFOLIO',
  '2025 SHOWCASE',
  'OF',
  'THANH QUY NGUYEN',
];

const Welcome = () => {
  const [progress, setProgress] = useState(0);
  const [welcomeState, setWelcomeState] = useState(WELCOME_STATE.LOADING);
  const h1Refs = React.useRef<(HTMLHeadingElement | null)[]>([]);
  const buttonRef = React.useRef<any>(null);
  const h4Ref = React.useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setProgress(100);
    setTimeout(() => {
      setWelcomeState(WELCOME_STATE.WELCOME);
    }, 2500);
  }, [progress]);

  useEffect(() => {
    if (welcomeState === WELCOME_STATE.WELCOME) {
      // Animate các h1 lần lượt từ dưới lên
      gsap.fromTo(
        h1Refs.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
        }
      );
      // Animate button
      gsap.fromTo(
        buttonRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          delay: 0.7,
          duration: 0.7,
          ease: 'power3.out',
        }
      );
    }
  }, [welcomeState]);

  return (
    <div
      className={
        'fixed inset-0 z-[9999] flex items-center justify-center bg-layer-primary bg-[url("/images/loading/bg.jpg")] bg-cover bg-center bg-no-repeat px-[47px] text-primary'
      }
    >
      {welcomeState === WELCOME_STATE.LOADING && (
        <div className='relative h-[1px] w-full bg-[#6E675B]'>
          <div
            style={{
              width: progress + '%',
            }}
            className='absolute left-0 top-0 h-[1px] bg-[#F4E4CA] transition-all duration-[2s] ease-in'
          >
            <CustomImage
              src='/images/loading/tqn.webp'
              alt='progress'
              width={92.27}
              height={111}
              className='absolute right-[-3rem] top-[-3.9rem]'
            />
          </div>
        </div>
      )}
      {welcomeState === WELCOME_STATE.WELCOME && (
        <div className='flex w-full items-center justify-between'>
          {WELCOME_TEXT.map((text, index) => (
            <h1
              key={index}
              ref={(el) => {
                h1Refs.current[index] = el;
              }}
              className='text-[20px] font-[400] text-[#F4E4CA] opacity-0'
            >
              {text}
            </h1>
          ))}
        </div>
      )}
      <div className='fixed bottom-[2rem] flex w-full flex-col items-center'>
        {welcomeState === WELCOME_STATE.WELCOME && (
          <div ref={buttonRef} className='mb-[3rem] opacity-0'>
            <div className='group relative transition-all duration-300 active:scale-95'>
              <div className='absolute left-0 top-0 h-full w-0 bg-[#BD2F00] transition-all duration-300 group-hover:w-full'></div>
              <button className='relative mx-[14px] py-[4px] text-[48px] font-[400] text-[#F4E4CA]'>
                Click to enter
              </button>
            </div>
          </div>
        )}
        <h4 className='text-center text-[16px] font-[400] text-[#837A6D]'>
          ALL RIGHTS RESERVED. © 2025 TQNG MARUKO
        </h4>
      </div>
    </div>
  );
};

export default Welcome;
