'use client';

import React, { Suspense, useEffect, useState, useTransition } from 'react';
import useMounted from '@/hook/useMounted';
import { usePathname, useRouter } from 'next/navigation';
import { delay } from '@/utils';
import LayoutNothing from './LayoutNothing';
import LayoutPrimary from './LayoutPrimary';
import Script from 'next/script';
import useStore from '@/store';
import { getCookie } from '@/utils/cookie';
import { setInterceptorToken } from '@/fetching/client/config';
import { useContextStore } from '@/context/store';
import useApplication from '@/hook/useApplication';
import useScaleLayout from '@/hook/useScaleLayout';
import useResponsive from '@/hook/useResponsive';
import { PAGE_STATE } from '@/constant';

const LayoutClient = (props: any) => {
  const { isMounted } = useMounted();
  const setUserData = useStore((state) => state.setUserData);
  const userData = useStore((state: any) => state.userData);
  const pathName = usePathname();
  const [currentLayout, setCurrentLayout] = useState(
    <LayoutPrimary>{props?.children}</LayoutPrimary>
  );
  const { isPending: isPendingGlobal } = useContextStore();
  const [isLoadingOnLoad, setIsLoadingOnLoad] = useState(true);
  const setShowHeader = useStore((state: any) => state.setShowHeader);
  const welcomeState = useStore((state: any) => state.welcomeState);
  // useScaleLayout();

  const { getProfile } = useApplication();
  const { width } = useResponsive();

  /* render layout */
  useEffect(() => {
    if (pathName === '/maintain') {
      setCurrentLayout(<LayoutNothing>{props?.children}</LayoutNothing>);
    } else {
      setCurrentLayout(<LayoutPrimary>{props?.children}</LayoutPrimary>);
    }
  }, [pathName]);

  const getProfileOnLoad = async () => {
    try {
      const token = getCookie('access_token');
      setInterceptorToken(token!);
      await getProfile();
    } catch (err: any) {
      console.log(err);
      if (err?.message === 'Network Error') {
        // show maintain page
      }
      setInterceptorToken(undefined);
      setUserData(undefined);
    } finally {
      setIsLoadingOnLoad(false);
    }
  };

  useEffect(() => {
    if (
      pathName !== '/' ||
      (pathName === '/' && welcomeState === PAGE_STATE.HERO)
    ) {
      setShowHeader(true);
      return;
    }
  }, [pathName, welcomeState]);

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
    /* Profile */
    getProfileOnLoad();
  }, [isMounted]);

  if (width < 1024) {
    return (
      <div className='bg-[url("/images/loading/bg.jpg")] bg-cover bg-center bg-no-repeat'>
        <div className='flex h-screen w-full items-center justify-center'>
          <div className='mt-[-15rem] text-[24px] font-[400] text-[#F4E4CA]'>
            <h1>Only support for desktop</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* {!isMounted && <Loading />} */}
      {isPendingGlobal && (
        <div className='fixed inset-0 z-[9999] bg-black opacity-60' />
      )}
      {currentLayout}

      {/* other script */}
      {/* <Script
        id='json-ld'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy='lazyOnload'
      /> */}
    </div>
  );
};

export default LayoutClient;
