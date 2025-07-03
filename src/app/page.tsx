'use client';

import CustomImage from '@/components/custom/CustomImage';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useTexture } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { Fluid } from '@whatisjery/react-fluid-distortion';
import { Text as DreiText } from '@react-three/drei';
import useResponsive from '@/hook/useResponsive';
import { customUnitFn } from '@/utils';
import useStore from '@/store';
import HeroSection from '@/components/HeroSection';

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

enum PAGE_STATE {
  LOADING,
  WELCOME,
  HERO,
}

const WELCOME_TEXT = [
  'CREATIVE DEVELOPMENT',
  'PORTFOLIO',
  '2025 SHOWCASE',
  'OF',
  'THANH QUY NGUYEN',
];

const ImageInCanvas = () => {
  const texture = useTexture('/images/loading/bg.jpg');
  const { viewport } = useThree();

  return (
    <mesh position-z={-4}>
      <planeGeometry args={[viewport.width, viewport.height, 20, 20]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

const TextInCanvas = () => {
  const COUNT = WELCOME_TEXT.length;
  const { viewport } = useThree();
  const MARGIN_BOTTOM = 50;
  const MARGIN_X = 320;
  const SCALE_FACTOR = viewport.width / 1920;

  return (
    <group position={[0, 0, 0]}>
      {WELCOME_TEXT.map((text, index) => {
        const x =
          -viewport.width / 2 +
          (index * (viewport.width - MARGIN_X)) / (COUNT - 1) +
          MARGIN_X / 2;
        return (
          <DreiText
            key={index}
            font={'/fonts/grotesk.otf'}
            fontSize={20 * SCALE_FACTOR}
            color='#F4E4CA'
            anchorX='center'
            anchorY='middle'
            position={[x, 0, 0]}
          >
            {text}
          </DreiText>
        );
      })}
      <DreiText
        font={'/fonts/grotesk.otf'}
        fontSize={16 * SCALE_FACTOR}
        color='#837A6D'
        anchorX='center'
        anchorY='middle'
        position={[0, -viewport.height / 2 + MARGIN_BOTTOM, 0]}
      >
        ALL RIGHTS RESERVED. © 2025 TQNG MARUKO
      </DreiText>
    </group>
  );
};

const Welcome = () => {
  const [progress, setProgress] = useState(0);
  const [pageState, setPageState] = useState(PAGE_STATE.LOADING);
  const h1Refs = React.useRef<(HTMLHeadingElement | null)[]>([]);
  const buttonRef = React.useRef<any>(null);
  const { width, height } = useResponsive();
  const setClientWidth = useStore((state: any) => state.setClientWidth);
  const setClientHeight = useStore((state: any) => state.setClientHeight);

  useEffect(() => {
    setProgress(100);
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      setPageState(PAGE_STATE.WELCOME);
    }, 2500);
  }, [progress]);

  useEffect(() => {
    setClientWidth(width);
    setClientHeight(height);
  }, [width, height]);

  useEffect(() => {
    if (pageState === PAGE_STATE.WELCOME) {
      // Animate các h1 lần lượt từ dưới lên
      // gsap.fromTo(
      //   h1Refs.current,
      //   { y: 60, opacity: 0 },
      //   {
      //     y: 0,
      //     opacity: 1,
      //     stagger: 0.12,
      //     duration: 0.7,
      //     ease: 'power3.out',
      //   }
      // );
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
  }, [pageState]);

  return (
    <>
      <div
        className={
          'relative flex h-screen w-full flex-col items-center justify-center bg-[url("/images/loading/bg.jpg")] bg-cover bg-center bg-no-repeat px-[47px] text-primary'
        }
      >
        {pageState === PAGE_STATE.LOADING && (
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
                className='absolute right-[-3rem] top-[-4rem]'
              />
            </div>
          </div>
        )}
        {pageState === PAGE_STATE.WELCOME && (
          <>
            <Canvas
              orthographic
              className='welcome-canvas'
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                // width: `calc(100% + ${(1920 / width) * 100}px)`,
                // height: '100vh',
                // zoom: 1,
              }}
            >
              <ImageInCanvas />
              <TextInCanvas />
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
            {/* <div className='flex w-full items-center justify-between'>
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
        </div> */}
          </>
        )}
        <div className='absolute bottom-[3rem] flex w-full flex-col items-center'>
          {pageState === PAGE_STATE.WELCOME && (
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
                  onClick={() => {
                    // Scroll to hero section with GSAP animation
                    const heroSection = document.getElementById('hero-section');
                    if (heroSection) {
                      // Fade out welcome screen elements
                      gsap.to('.welcome-canvas', {
                        opacity: 0,
                        duration: 2,
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
                        duration: 2,
                        scrollTo: {
                          y: heroSection,
                          offsetY: 0,
                        },
                        ease: 'power2.inOut',
                        onComplete: () => {
                          setPageState(PAGE_STATE.HERO);
                          // // Fade in hero section content
                          // gsap.fromTo(heroSection.querySelector('h1'),
                          //   { y: 50, opacity: 0 },
                          //   { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
                          // );
                          // gsap.fromTo(heroSection.querySelector('p'),
                          //   { y: 30, opacity: 0 },
                          //   { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
                          // );
                        },
                      });
                    }
                  }}
                  className='relative mx-[14px] py-[4px] text-[48px] font-[400] text-[#928979] transition-all group-hover:text-[#F4E4CA]'
                >
                  Click to enter
                </button>
              </div>
            </div>
          )}
          {pageState === PAGE_STATE.LOADING && (
            <h4 className='text-center text-[16px] font-[400] text-[#837A6D]'>
              ALL RIGHTS RESERVED. © 2025 TQNG MARUKO
            </h4>
          )}
        </div>
      </div>
      {pageState !== PAGE_STATE.LOADING && <HeroSection />}
    </>
  );
};

export default Welcome;
