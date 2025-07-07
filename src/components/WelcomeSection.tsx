'use client';

import CustomImage from '@/components/custom/CustomImage';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import useStore from '@/store';
import { PAGE_STATE } from '@/constant';
import useMounted from '@/hook/useMounted';
import { Canvas } from '@react-three/fiber';
import BgWelcomeInCanvas from './BgWelcomeInCanvas';
import TextWelcomeInCanvas from './TextWelcomeInCanvas';
import { EffectComposer } from '@react-three/postprocessing';
import { Fluid } from '@whatisjery/react-fluid-distortion';

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const WelcomeSection = () => {
  const [progress, setProgress] = useState(0);
  const buttonRef = React.useRef<any>(null);
  const { isMounted } = useMounted();
  const welcomeState = useStore((state: any) => state.welcomeState);
  const setWelcomeState = useStore((state: any) => state.setWelcomeState);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setProgress(100);
    setTimeout(() => {
      setWelcomeState(PAGE_STATE.WELCOME);
    }, 3500);
  }, []);

  useEffect(() => {
    if (welcomeState === PAGE_STATE.WELCOME) {
      gsap.to('.welcome-canvas', {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.8,
        ease: 'power2.inOut',
      });
    }
    if (welcomeState === PAGE_STATE.WELCOME) {
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

  const handleClickEnter = () => {
    // Scroll to hero section with GSAP animation
    const heroSection = document.getElementById('section');
    if (heroSection) {
      // Fade out welcome screen elements
      gsap.to('.welcome-canvas', {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut',
      });

      gsap.to(buttonRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power2.inOut',
      });

      // Scroll to hero section
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: heroSection,
          offsetY: 0,
        },
        ease: 'power2.inOut',
        onComplete: () => {
          setWelcomeState(PAGE_STATE.HERO);
        },
      });
    }
  };

  return (
    <>
      <Canvas
        orthographic
        className='welcome-canvas'
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        <BgWelcomeInCanvas />
        <TextWelcomeInCanvas />
        <EffectComposer>
          <Fluid
            radius={0.03}
            curl={10}
            swirl={5}
            distortion={1}
            force={2}
            pressure={0.94}
            densityDissipation={0.98}
            velocityDissipation={0.99}
            intensity={0.3}
            rainbow={false}
            blend={0}
          />
        </EffectComposer>
      </Canvas>
      {welcomeState !== PAGE_STATE.HERO && (
        <div
          className={
            'relative flex h-screen w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-[47px] text-primary'
          }
        >
          {welcomeState === PAGE_STATE.LOADING && (
            <div className='relative h-[1px] w-full bg-[#6E675B]'>
              <div
                style={{
                  width: progress + '%',
                }}
                className='absolute left-0 top-0 h-[1px] bg-[#F4E4CA] transition-all duration-[3s] ease-in'
              >
                <div className='absolute right-[-3rem] top-[-4rem]'>
                  <CustomImage
                    src='/images/loading/tqn.gif'
                    alt='progress'
                    width={1748}
                    height={1234}
                    className='w-[92.27px]'
                  />
                  <p className='text-[20px] text-[#F4E4CA]'>loading...</p>
                </div>
              </div>
            </div>
          )}
          <div className='absolute bottom-[3rem] flex w-full flex-col items-center'>
            {welcomeState === PAGE_STATE.WELCOME && (
              <div
                ref={buttonRef}
                style={{
                  marginBottom: 48 + 'px',
                }}
                className='opacity-0'
              >
                <div className='group relative transition-all duration-300 active:scale-95'>
                  <div className='absolute left-0 top-0 h-full w-0 bg-[#BD2F00] transition-all duration-300 group-hover:w-full'></div>
                  <button
                    onClick={handleClickEnter}
                    className='relative mx-[14px] py-[4px] text-[48px] font-[400] text-[#928979] transition-all group-hover:text-[#F4E4CA]'
                  >
                    Click to enter
                  </button>
                </div>
              </div>
            )}
            {welcomeState === PAGE_STATE.LOADING && (
              <h4 className='text-center text-[16px] font-[400] text-[#837A6D]'>
                ALL RIGHTS RESERVED. © 2025 TQNG MARUKO
              </h4>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomeSection;
