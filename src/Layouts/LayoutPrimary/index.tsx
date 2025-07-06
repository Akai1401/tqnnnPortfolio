import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Header from './Header';
import useStore from '@/store';
import WelcomeSection from '@/components/WelcomeSection';
import { PAGE_STATE } from '@/constant';
import gsap from 'gsap';
import { useContextStore } from '@/context/store';
import { Canvas } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { Fluid } from '@whatisjery/react-fluid-distortion';
import BackgroundInCanvas from '@/components/BackgroundInCanvas';
import ImageInCanvas from '@/components/ImageInCanvas';
import CustomImage from '@/components/custom/CustomImage';
import Menu from '@/components/Menu';

const LayoutPrimary = ({ children }: any) => {
  const welcomeState = useStore((state: any) => state.welcomeState);
  const isChangingPage = useStore((state: any) => state.isChangingPage);
  const setIsChangingPage = useStore((state: any) => state.setIsChangingPage);
  const nextPathname = useStore((state: any) => state.nextPathname);
  const nextRouter = useRouter();
  const { isPending, startTransition } = useContextStore();
  const pathname = usePathname();
  const isShowMenu = useStore((state: any) => state.isShowMenu);

  useEffect(() => {
    if (welcomeState === PAGE_STATE.HERO) {
      gsap.to('#bg-video', {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.inOut',
      });
    }
  }, [welcomeState, pathname]);

  useEffect(() => {
    if (
      welcomeState === PAGE_STATE.LOADING ||
      welcomeState === PAGE_STATE.WELCOME
    ) {
      return;
    }
    if (isPending) {
    } else {
      gsap.to('#layout-primary-pathname', {
        opacity: 0,
        duration: 0.5,
        zIndex: -1,
        ease: 'power2.inOut',
      });
      // setTimeout(() => {
      gsap.set('#layout-primary', {
        overflow: 'hidden',
      });
      gsap.to('#layout-primary', {
        scale: 1,
        // opacity: 1,
        // filter: 'blur(0px)',
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsChangingPage(false);
          gsap.set('#layout-primary', {
            overflow: 'visible',
          });
        },
      });
      // }, 500);
      gsap.to('#layout-primary-pathname-text', {
        y: -30,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
      // gsap.set('#layout-primary-pathname-text-container', {
      //   overflow: 'hidden',
      // });
    }
  }, [isPending, welcomeState]);

  useEffect(() => {
    if (isChangingPage) {
      // gsap.to('.hero-canvas', {
      //   opacity: 0,
      //   duration: 0.8,
      //   ease: 'power2.inOut',
      // });
      gsap.to('#bg-video', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      });
      gsap.to('#layout-primary', {
        scale: 0.9,
        // opacity: 0,
        // filter: 'blur(8px)',
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          startTransition(() => {
            nextRouter.push(nextPathname);
          });
        },
      });
      gsap.to('#layout-primary-pathname', {
        opacity: 1,
        duration: 1,
        zIndex: 9999,
        ease: 'power2.inOut',
      });
      gsap.fromTo(
        '#layout-primary-pathname-text',
        { y: 30, opacity: 1 },
        {
          y: 0,
          stagger: 0.1,
          duration: 0.3,
          delay: 0.3,
          ease: 'power2.inOut',
          // onComplete: () => {
          //   gsap.set('#layout-primary-pathname-text-container', {
          //     overflow: 'visible',
          //   });
          // },
        }
      );
    }
  }, [isChangingPage, nextPathname]);

  return (
    <div className=''>
      {welcomeState !== PAGE_STATE.HERO && <WelcomeSection />}
      {welcomeState !== PAGE_STATE.LOADING && (
        <>
          {/* {pathname === '/' && ( */}
          <>
            <div
              id='bg-video'
              className='pointer-events-none fixed inset-0 opacity-0'
            >
              <div className='absolute inset-0 bg-black bg-opacity-50'></div>
              <video
                autoPlay
                loop
                muted
                className='h-full w-full object-cover'
                playsInline
              >
                <source
                  src='/videos/bg.mp4'
                  type='video/mp4'
                  className='object-cover'
                />
              </video>
              {pathname === '/' && (
                <CustomImage
                  src='/images/home/tqn.webp'
                  className={`fixed right-0 top-0 ${!isShowMenu ? 'opacity-100' : 'opacity-0'} transition-all duration-[1000ms] ease-in-out`}
                  alt='tqn'
                  width={453}
                  height={688}
                />
              )}
            </div>

            {/* <Canvas
                className='hero-canvas'
                orthographic
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  pointerEvents: 'none',
                  opacity: 0,
                  // zIndex: 1,
                  // width: '100vw',
                  // height: '100vh',
                }}
              >
                <BackgroundInCanvas />
                <ImageInCanvas />
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
              </Canvas> */}
          </>
          {/* )} */}
          <div id='layout-primary'>
            <div
              id='layout-primary-pathname'
              className='fixed inset-0 z-[-1] flex items-center justify-center bg-[url("/images/home/bg.png")] bg-cover bg-center bg-no-repeat text-[48px] text-[#F4E4CA] opacity-0'
            >
              <div
                id='layout-primary-pathname-text-container'
                className='overflow-hidden leading-[41px]'
              >
                <p id='layout-primary-pathname-text' className='uppercase'>
                  {nextPathname === '/' ? (
                    <CustomImage
                      src='/images/tqn.webp'
                      alt='tqn'
                      width={100}
                      height={100}
                    />
                  ) : (
                    nextPathname
                  )}
                </p>
              </div>
            </div>
            {welcomeState !== PAGE_STATE.WELCOME && <Header />}
            {/* Menu */}
            <Menu />
            {
              <div
                className={`${isShowMenu ? 'opacity-0' : 'opacity-100'} transition-all duration-[1000ms] ease-in-out`}
              >
                {children}
              </div>
            }
          </div>
        </>
      )}
    </div>
  );
};

export default LayoutPrimary;
