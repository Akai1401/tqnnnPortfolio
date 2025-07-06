'use client';

import CustomImage from '@/components/custom/CustomImage';
import SocialButtons from '@/components/SocialButtons';
import useResponsive from '@/hook/useResponsive';
import React, { useEffect } from 'react';

const AboutPage = () => {
  const socialRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);
  const { width, height }: any = useResponsive();
  // useEffect(() => {
  //   document.body.style.overflow = 'auto';
  // }, []);
  return (
    <div
      id='section'
      className='min-h-screen bg-[url("/images/home/bg.png")] bg-cover bg-center bg-no-repeat text-[#F4E4CA]'
    >
      <div className='flex items-start justify-between'>
        <CustomImage
          src='/images/about/tqn.webp'
          alt='error'
          width={670}
          height={1192}
          className=''
        />
        <div className='flex h-screen w-[506px] flex-col justify-center'>
          <h1 className='text-[64px] font-[400] leading-[78px]'>
            About <br /> <span className='font-[600]'>Thanh Quy,</span>
          </h1>
          <p className='mt-[40px] text-[20px] font-[400]'>
            I’m Thanh Quy Nguyen, a{' '}
            <span className='font-[600]'>passionate UI/UX Designer</span>{' '}
            focused on{' '}
            <span className='font-[600]'>modern, user-centric solutions</span> .
            I combine <span className='font-[600]'>creativity</span> and{' '}
            <span className='font-[600]'>problem-solving</span> to deliver
            impactful designs that elevate experiences and drive results. Always
            persistent, ambitious, and dedicated to{' '}
            <span className='font-[600]'>crafting meaningful connections</span>{' '}
            through design. <br />
            <br />
            <span className='text-[18px] text-[rgba(244,228,201,0.70)]'>
              # UI/UX_designer <br /> # Creative_visionary <br /> #
              Design_enthusiast <br /> # II_(Gemini)
            </span>
          </p>
          <SocialButtons
            className='mt-[10rem] max-w-[400px] flex-wrap'
            socialRefs={socialRefs}
          />
        </div>
        <div className='relative flex h-screen w-[502px] flex-col justify-center'>
          <div className='absolute bottom-[1.5rem] right-[3rem] text-[16px] font-[400] text-[#F4E4CA]'>
            ALL RIGHTS RESERVED <br /> © 2025 TQNG MARUKO
          </div>
          <div className='flex max-h-[790px] flex-col gap-[80px] overflow-y-auto'>
            {/* EXPERIENCES */}
            <div className=''>
              <div>
                <h2 className='text-[36px] font-[600]'>
                  Experiences / Projects
                </h2>
                <CustomImage
                  src='/images/about/line.png'
                  alt='error'
                  width={396}
                  height={11.1}
                />
              </div>
              <div className='mt-[32px] flex flex-col gap-[32px]'>
                {/* Shin404 & 404 Anime */}
                <div className='flex flex-col gap-[8px]'>
                  <h3 className='text-[20px] font-[600]'>
                    *Shin404 & 404 Anime (Aug 2024 - now)
                  </h3>
                  <p className='text-[16px] font-[400]'>
                    • Co-founder, UI/UX Designer aka Graphic Designer
                  </p>{' '}
                  <p className='text-[16px] font-[400]'>
                    • Product management, feature optimization, and social
                    channel management (30k followers FB)
                  </p>
                </div>
                {/* HN Rock */}
                <div className='flex flex-col gap-[8px]'>
                  <h3 className='text-[20px] font-[600]'>
                    *Hanoi Rock City (Dec 2023 - now)
                  </h3>
                  <p className='text-[16px] font-[400]'>
                    • Freelancer Graphic Designer
                  </p>{' '}
                </div>
                {/* FPT Soft */}
                <div className='flex flex-col gap-[8px]'>
                  <h3 className='text-[20px] font-[600]'>
                    *FPT Software (July 2024 - Jan 2025)
                  </h3>
                  <p className='text-[16px] font-[400]'>
                    • UI/UX Designer & Graphic Designer
                  </p>{' '}
                </div>
                {/* Freelancer */}
                <div className='flex flex-col gap-[8px]'>
                  <h3 className='text-[20px] font-[600]'>
                    *Freelancer (Mar 2023 - now)
                  </h3>
                  <p className='text-[16px] font-[400]'>
                    • Passionate about creating personal works at @tqqqqqqn
                  </p>{' '}
                  <p className='text-[16px] font-[400]'>
                    • Shin404, 404 Anime Project
                  </p>{' '}
                </div>
                {/* Team X */}
                <div className='flex flex-col gap-[8px]'>
                  <h3 className='text-[20px] font-[600]'>
                    *TeamX Hanoi (NGO) (Apr 2022 - Nov 2023)
                  </h3>
                  <p className='text-[16px] font-[400]'>
                    • Leader, Content Creator, Concept Creator, Designer, Editor
                  </p>{' '}
                  <p className='text-[16px] font-[400]'>
                    • Projects: Belonging Museum - Quan Diu Mo, <br />
                    EDxHoangminhgiamSt2022: Unmasked, Recruiting Gen 8th.
                  </p>{' '}
                </div>
              </div>
            </div>
            {/* EDUCATION */}
            <div className=''>
              <div>
                <h2 className='text-[36px] font-[600]'>Education</h2>
                <CustomImage
                  src='/images/about/line.png'
                  alt='error'
                  width={396}
                  height={11.1}
                />
              </div>
              <div className='mt-[32px] flex flex-col gap-[32px]'>
                {/* Shin404 & 404 Anime */}
                <div className='flex flex-col gap-[8px]'>
                  <h3 className='text-[20px] font-[600]'>
                    *Diplomatic Academy of Vietnam (Oct 2021 - now)
                  </h3>
                  <p className='text-[16px] font-[400]'>
                    • International Relationship
                  </p>{' '}
                  <p className='text-[16px] font-[400]'>
                    • GPA: 3,44 (Very Good)
                  </p>
                </div>
              </div>
            </div>
            {/* CERTIFICATES */}
            <div className=''>
              <div>
                <h2 className='text-[36px] font-[600]'>Certifications</h2>
                <CustomImage
                  src='/images/about/line.png'
                  alt='error'
                  width={396}
                  height={11.1}
                />
              </div>
              <div className='mt-[32px] flex flex-col gap-[32px]'>
                {/* Shin404 & 404 Anime */}
                <div className='flex flex-col gap-[8px]'>
                  <a
                    href='https://www.coursera.org/account/accomplishments/verify/HCB79W7FB5J7'
                    target='_blank'
                    className='text-[20px] font-[600]'
                  >
                    *Google Project Management: Professional Certificate (3/6
                    courses)
                  </a>
                  <p className='text-[16px] font-[400]'>
                    • Google - Apr 2025 - now
                  </p>{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
