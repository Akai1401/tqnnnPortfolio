'use client';

import CustomImage from '@/components/custom/CustomImage';
import SocialButtons from '@/components/SocialButtons';
import useScrollSmoother from '@/hook/useScrollSmoother';
import React, { useRef } from 'react';

const MyStoryPage = () => {
  const socialRefs = useRef([]);
  useScrollSmoother();

  return (
    <div
      id='section'
      className='min-h-screen bg-[url("/images/home/bg.png")] bg-cover bg-fixed bg-center bg-no-repeat text-[#F4E4CA]'
    >
      <div className='relative flex h-screen flex-col items-center justify-center'>
        <p className='text-[20px] font-[400]'>[ My story ]</p>
        <p className='text-[64px] font-[600]'>
          Guess who’s back? Still designing, still caffeinated
        </p>{' '}
        <CustomImage
          src='/images/story/bg1.webp'
          alt='scroll'
          width={1112.6}
          height={571}
        />
        <CustomImage
          src='/images/loading/tqn.gif'
          alt='progress'
          width={799}
          height={464}
          className='absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]'
        />
        <CustomImage
          src='/images/story/scroll.webp'
          alt='scroll'
          className='absolute right-[48.58px] top-[50%] -translate-y-[50%]'
          width={20.85}
          height={120}
        />
        <SocialButtons
          className='absolute bottom-[2rem] left-[3rem] max-w-[400px] flex-wrap'
          socialRefs={socialRefs}
        />
        <div className='footer-content absolute bottom-[2rem] right-[3rem] text-[16px] font-[400] text-[#F4E4CA]'>
          ALL RIGHTS RESERVED <br /> © 2025 TQNG MARUKO
        </div>
      </div>
      <div className='relative flex h-screen flex-col items-center justify-center'></div>
    </div>
  );
};

export default MyStoryPage;
