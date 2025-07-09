import { PAGE_STATE } from '@/constant';
import useStore from '@/store';
import Lenis from 'lenis';
import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

const useScrollSmoother = () => {
  const isShowMenu = useStore((state: any) => state.isShowMenu);
  const welcomeState = useStore((state: any) => state.welcomeState);

  useEffect(() => {
    if (welcomeState !== PAGE_STATE.HERO || isShowMenu) return;
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Integrate Lenis with GSAP
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, [welcomeState, isShowMenu]);

  //   return {};
};
export default useScrollSmoother;
