import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Header from './Header';
import useStore from '@/store';
import WelcomeSection from '@/components/WelcomeSection';
import { PAGE_STATE } from '@/constant';
import gsap from 'gsap';
import { useContextStore } from '@/context/store';

const LayoutPrimary = ({ children }: any) => {
  const welcomeState = useStore((state: any) => state.welcomeState);
  const isChangingPage = useStore((state: any) => state.isChangingPage);
  const setIsChangingPage = useStore((state: any) => state.setIsChangingPage);
  const nextPathname = useStore((state: any) => state.nextPathname);
  const nextRouter = useRouter();
  const { isPending, startTransition } = useContextStore();

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
      gsap.to('#layout-primary', {
        scale: 1,
        // opacity: 1,
        // filter: 'blur(0px)',
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsChangingPage(false);
        },
      });
      // }, 500);
    }
  }, [isPending, welcomeState]);

  useEffect(() => {
    if (isChangingPage) {
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
    }
  }, [isChangingPage, nextPathname]);

  return (
    <div className=''>
      {welcomeState !== PAGE_STATE.HERO && <WelcomeSection />}
      {welcomeState !== PAGE_STATE.LOADING && (
        <>
          <div id='layout-primary'>
            <div
              id='layout-primary-pathname'
              className='fixed inset-0 z-[-1] flex items-center justify-center bg-[url("/images/home/bg.jpg")] bg-cover bg-center bg-no-repeat text-[48px] text-[#F4E4CA] opacity-0'
            >
              {nextPathname}
            </div>
            {welcomeState !== PAGE_STATE.WELCOME && <Header />}
            {
              <div className='min-h-screen bg-[url("/images/home/bg.jpg")] bg-cover bg-center bg-no-repeat'>
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
