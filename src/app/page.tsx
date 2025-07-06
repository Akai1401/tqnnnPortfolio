'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { PAGE_STATE } from '@/constant';
import Marquee from 'react-fast-marquee';
import IconWarning from '@/assets/icons/IconWarning';
import SocialButtons from '@/components/SocialButtons';
import useStore from '@/store';

const HeroSection = () => {
  const h1Refs = React.useRef<(HTMLHeadingElement | null)[]>([]);
  const socialRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);
  const itemRefs = React.useRef<(HTMLParagraphElement | null)[]>([]);
  const welcomeState = useStore((state: any) => state.welcomeState);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (welcomeState === PAGE_STATE.HERO) {
      // gsap.set('.hero-canvas', {
      //   y: -30,
      // });
      // gsap.to('.hero-canvas', {
      //   opacity: 1,
      //   y: 0,
      //   pointerEvents: 'auto',
      //   duration: 0.5,
      //   ease: 'power2.out',
      // });
      gsap.to('#bg-video', {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.inOut',
      });
    }
    gsap.fromTo(
      h1Refs.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.7,
        delay: 0.2,
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
        delay: 0.4,
        ease: 'power2.out',
      }
    );

    // Animate items
    gsap.fromTo(
      itemRefs.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        delay: 1,
        ease: 'power2.out',
      }
    );
  }, [welcomeState]);

  const MARQUEE_LIST = [
    {
      id: 0,
      text: 'portfolio version 2025',
    },
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
    {
      id: 4,
      text: 'nice to meet you',
    },
  ];

  return (
    <div id='section' className={`relative h-screen w-full`}>
      <div className='relative z-10 flex h-full w-full flex-col items-center justify-end'>
        {/* <CustomImage
          src='/images/home/tqn.webp'
          alt='error'
          width={492}
          height={700}
          className='absolute right-0 top-0'
        /> */}
        {welcomeState === PAGE_STATE.HERO && (
          <>
            <div className='fixed right-[12.5rem] top-[20rem] flex rotate-[270deg] gap-[84px] overflow-hidden text-[16px] font-[400] text-[#F4E4CA]'>
              <p
                ref={(el) => {
                  itemRefs.current[0] = el;
                }}
              >
                UI/UX DESIGN
              </p>
              <p
                ref={(el) => {
                  itemRefs.current[1] = el;
                }}
              >
                GRAPHIC DESIGN
              </p>
              <p
                ref={(el) => {
                  itemRefs.current[2] = el;
                }}
              >
                2025 PORTFOLIO
              </p>
            </div>
            <div className='relative mb-[1.5rem]'>
              <div className='mb-[18px] flex items-center justify-between px-[38px]'>
                <SocialButtons socialRefs={socialRefs} />
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
        </Marquee>
      </div>
    </div>
  );
};

export default HeroSection;
