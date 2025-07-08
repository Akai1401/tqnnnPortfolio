'use client';

import Shin404Intro from '@/components/Shin404Intro';
import React, { useEffect, useRef } from 'react';

const Shin404Page = () => {
  return (
    <div id='section' className='min-h-screen bg-black'>
      <Shin404Intro />
      {/* skeleton */}
      <div className='black h-screen'></div>
      <div className='h-screen bg-green-100'></div>
      <div className='h-screen bg-red-100'></div>
      <div className='h-screen bg-red-100'></div>
    </div>
  );
};

export default Shin404Page;
