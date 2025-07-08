'use client';

import IconArrow from '@/assets/icons/IconArrow';
import IconArrowBold from '@/assets/icons/IconArrowBold';
import CustomImage from '@/components/custom/CustomImage';
import { INFO } from '@/constant/info';
import React from 'react';

const Shin404Page = () => {
  return (
    <div id='section' className='min-h-screen bg-black'>
      <div className='fixed inset-0 left-[42%] top-0'>
        <div className='relative h-full w-full overflow-hidden'>
          <CustomImage
            src='/images/works/shin404/intro.webp'
            alt='Shin404'
            unoptimized
            fill
            className='object-cover object-center'
          />
        </div>
      </div>
      <div className='absolute left-0 top-1/2 -translate-y-1/2 pl-[35px] text-[#F4E4CA]'>
        <h1 className='text-[48px] font-[700] leading-[57.6px] text-[#F4E4CA]'>
          Shin404 & 404 Anime
        </h1>
        <h2 className='text-[40px] leading-[57.6px] text-[#F4E4CA]'>
          Cartoon Website and App (1 designer)
        </h2>
        <div className='mt-[16px] text-[20px] font-[400] uppercase leading-[26px] text-[#D1BA93]'>
          <p>role: UI UX DESIGNer | GRAPHIC DESIGNer | PRODUCT OWNER</p>
          <p>TIME: SEP 2024 - JAN 2025</p>
        </div>
        <a
          href={INFO.PROJECT.SHIN404}
          target='_blank'
          rel='noopener noreferrer'
        >
          <button className='btn-primary my-[48px]'>
            Visit website <IconArrowBold />
          </button>
        </a>
        <div className='text-[18px] font-[400] leading-[24px] text-[rgba(244,228,201,0.70)]'>
          # Shin404 <br />
          # Cartoon&film
          <br />
          # Product_design
          <br /># My_first_project
        </div>
      </div>
    </div>
  );
};

export default Shin404Page;
