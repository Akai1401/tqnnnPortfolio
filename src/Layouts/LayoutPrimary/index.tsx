import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Header from './Header';
import useStore from '@/store';
import WelcomeSection from '@/components/WelcomeSection';
import { PAGE_STATE } from '@/constant';
import gsap from 'gsap';
import { useContextStore } from '@/context/store';
import CustomImage from '@/components/custom/CustomImage';
import Menu from '@/components/Menu';
import ScrollToTop from '@/components/ScrollToTop';

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
      // gsap.set('#layout-primary', {
      //   overflow: 'hidden',
      //   // maxHeight: '100vh',
      // });
      gsap.to('#layout-primary', {
        // scale: 1,
        // opacity: 1,
        // filter: 'blur(0px)',
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsChangingPage(false);
          // gsap.set('#layout-primary', {
          //   overflow: 'visible',
          //   maxHeight: 'unset',
          // });
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
      // gsap.set('#layout-primary', {
      //   maxHeight: '100vh',
      //   overflow: 'hidden',
      // });
      gsap.to('#layout-primary', {
        // scale: 0.9,
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
      {welcomeState === PAGE_STATE.HERO &&
        (pathname.includes('/works') ||
          pathname === '/cv' ||
          pathname === '/my-story') && <ScrollToTop />}
      {welcomeState !== PAGE_STATE.LOADING && (
        <>
          {/* {pathname === '/' && ( */}
          <div
            id='bg-video'
            className='pointer-events-none fixed inset-0 opacity-0'
          >
            <div className='absolute inset-0 z-10 bg-black bg-opacity-50'></div>
            {/* <video
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
              </video> */}{' '}
            <div className='relative h-full w-full overflow-hidden'>
              <iframe
                className='absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-full min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 border-0'
                src='https://www.youtube-nocookie.com/embed/B4du2GEuTw4?autoplay=1&mute=1&loop=1&playlist=B4du2GEuTw4&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&origin=window.location.origin'
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
              ></iframe>
            </div>
            {pathname === '/' && (
              <CustomImage
                src='/images/home/tqn.webp'
                className={`fixed right-0 top-0 z-10 ${!isShowMenu ? 'opacity-100' : 'opacity-0'} transition-all duration-[1000ms] ease-in-out`}
                alt='tqn'
                width={453}
                height={688}
              />
            )}
          </div>

          <div id='layout-primary' className='relative'>
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

            {welcomeState !== PAGE_STATE.WELCOME && pathname !== '/cv' && (
              <Header />
            )}

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
