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
  const { isPending } = useContextStore();
  const setIsChangingPage = useStore((state: any) => state.setIsChangingPage);

  useEffect(() => {
    if (
      welcomeState === PAGE_STATE.LOADING ||
      welcomeState === PAGE_STATE.WELCOME
    ) {
      return;
    }
    if (isPending) {
      setIsChangingPage(true);
      gsap.to('body', {
        scale: 0.9,
        // opacity: 0.5,
        filter: 'blur(8px)',
        duration: 0.5,
        ease: 'power2.inOut',
      });
    } else {
      setTimeout(() => {
        gsap.to('body', {
          scale: 1,
          // opacity: 1,
          filter: 'blur(0px)',
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            setIsChangingPage(false);
          },
        });
      }, 500);
    }
  }, [isPending, welcomeState]);

  return (
    <div className=''>
      {welcomeState !== PAGE_STATE.HERO && <WelcomeSection />}
      {welcomeState !== PAGE_STATE.LOADING && (
        <div>
          {welcomeState !== PAGE_STATE.WELCOME && <Header />}
          <div className='min-h-screen bg-[url("/images/home/bg.jpg")] bg-cover bg-center bg-no-repeat'>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutPrimary;
