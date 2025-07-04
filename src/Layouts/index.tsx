'use client';

import React, { useEffect, useRef, useState, useTransition } from 'react';
import useMounted from '@/hook/useMounted';
import { usePathname, useRouter } from 'next/navigation';
import LayoutNothing from './LayoutNothing';
import LayoutPrimary from './LayoutPrimary';
import useStore from '@/store';
import useResponsive from '@/hook/useResponsive';

const LayoutClient = (props: any) => {
  const { isMounted } = useMounted();
  const pathName = usePathname();
  const [currentLayout, setCurrentLayout] = useState(
    <LayoutPrimary>{props?.children}</LayoutPrimary>
  );

  // useScaleLayout();

  const { width, height } = useResponsive();
  const setClientWidth = useStore((state: any) => state.setClientWidth);
  const setClientHeight = useStore((state: any) => state.setClientHeight);

  useEffect(() => {
    setClientWidth(width);
    setClientHeight(height);
  }, [width, height]);

  /* render layout */
  useEffect(() => {
    if (pathName === '/maintain') {
      setCurrentLayout(<LayoutNothing>{props?.children}</LayoutNothing>);
    } else {
      setCurrentLayout(<LayoutPrimary>{props?.children}</LayoutPrimary>);
    }
  }, [pathName]);

  useEffect(() => {
    if (!isMounted) return;
    /* Log */
    console.log('Running in', process.env.NEXT_PUBLIC_MODE);
    /* Clear log */
    if (process.env.NEXT_PUBLIC_MODE === 'prod') {
      console.log = () => {};
      console.warn = () => {};
      console.error = () => {};
    }
    // ----------------- broke -----------------
  }, [isMounted]);

  if (width < 1024) {
    return (
      <div className='bg-[url("/images/loading/bg.jpg")] bg-cover bg-center bg-no-repeat'>
        <div className='flex h-screen w-full items-center justify-center'>
          <div className='mt-[-15rem] text-[24px] font-[400] text-[#F4E4CA]'>
            <h1>Available on desktop</h1>
          </div>
        </div>
      </div>
    );
  }

  return <div>{currentLayout}</div>;
};

export default LayoutClient;
