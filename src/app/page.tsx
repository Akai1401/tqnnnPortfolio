'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { PAGE_STATE } from '@/constant';
import Marquee from 'react-fast-marquee';
import IconWarning from '@/assets/icons/IconWarning';
import IconArrow from '@/assets/icons/IconArrow';
import { INFO } from '@/constant/info';
import CustomImage from '@/components/custom/CustomImage';
import useStore from '@/store';

const HeroSection = () => {
  const h1Refs = React.useRef<(HTMLHeadingElement | null)[]>([]);
  const socialRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const pageState = useStore((state: any) => state.welcomeState);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // if (pageState !== PAGE_STATE.HERO) return;
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
    // Animate social buttons
    gsap.fromTo(
      socialRefs.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.3,
        ease: 'power2.out',
      }
    );
  }, [pageState]);

  const MARQUEE_LIST = [
    {
      id: 1,
      text: 'by Thanh Quy Nguyen aka tqnggg',
    },
    {
      id: 2,
      text: 'thank you to my family for always supporting me on this path',
    },
    {
      id: 3,
      text: 'grateful to myself and all that shaped this journey',
    },
  ];

  return (
    <div id='section' className='relative h-screen w-full'>
      <div className='relative z-10 flex h-full w-full flex-col items-center justify-end'>
        <CustomImage
          src='/images/home/tqn.webp'
          alt='error'
          width={492}
          height={700}
          className='absolute right-0 top-0'
        />
        {pageState === PAGE_STATE.HERO && (
          <>
            <div className='relative mb-[1.5rem]'>
              <div className='mb-[18px] flex items-center justify-between px-[38px]'>
                <div className='flex items-center gap-[12px]'>
                  {Object.keys(INFO.SOCIAL).map((key, index) => {
                    const isActive = hovered ? hovered === key : index === 0; // Email mặc định active
                    return (
                      <a
                        ref={(el) => {
                          socialRefs.current[index] = el;
                        }}
                        href={INFO.SOCIAL[key as keyof typeof INFO.SOCIAL]}
                        key={key}
                        target='_blank'
                        onMouseEnter={() => setHovered(key)}
                        onMouseLeave={() => setHovered(null)}
                        className={`group relative flex items-center gap-[10px] border px-[20px] py-[8px] text-[18px] font-[400] transition-colors duration-300 ${isActive ? 'border-[#F4E4CA] text-[#313131]' : 'border-[#F4E4CA] text-[#F4E4CA]'} `}
                      >
                        {/* Nền động */}
                        <span
                          className={`absolute left-0 top-0 z-0 h-full w-0 transition-all duration-300 ${isActive ? 'w-full bg-[#F4E4CA]' : ''} `}
                          style={{ zIndex: 0 }}
                        />
                        <span className='relative z-10'>
                          {key === 'EMAIL' && 'Email'}
                          {key === 'LINKEDIN' && 'Linkedin'}
                          {key === 'BEHANCE' && 'Behance'}
                          {key === 'INSTAGRAM' && 'Instagram'}
                        </span>
                        <IconArrow
                          className='relative z-10 transition-all duration-300 group-hover:rotate-45'
                          fill={isActive ? '#313131' : '#F4E4CA'}
                        />
                      </a>
                    );
                  })}
                </div>
                <p className='text-[16px] font-[400] text-[#F4E4CA]'>
                  ALL RIGHTS RESERVED <br /> © 2025 TQNG MARUKO
                </p>
              </div>
              <h1
                ref={(el) => {
                  h1Refs.current[0] = el;
                }}
                className='px-[38px] text-[58px] font-[400] uppercase leading-[1.3] text-[#F4E4CA]'
              >
                &nbsp;
                {`Hi, I'm Thanh Quy Nguyen - a 22 years old Vietnamese Product
              Designer driven by creativity and innovation`}
              </h1>
            </div>
          </>
        )}
        <Marquee speed={100} className='flex items-center bg-black py-[12px]'>
          {MARQUEE_LIST.map((item) => (
            <div
              className='flex items-center text-[20px] font-[400] text-[#F4E4CA]'
              key={item.id}
            >
              <IconWarning className='mx-[32px]' />
              {item.text}
            </div>
          ))}
          {MARQUEE_LIST.map((item) => (
            <div
              className='flex items-center text-[20px] font-[400] text-[#F4E4CA]'
              key={item.id}
            >
              <IconWarning className='mx-[32px]' />
              {item.text}
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default HeroSection;
