'use client';

import IconFramer from '@/assets/icons/IcoFramer';
import IconAdobe from '@/assets/icons/IconAdobe';
import IconAutocad from '@/assets/icons/IconAutocad';
import IconCapcut from '@/assets/icons/IconCapcut';
import IconChatGpt from '@/assets/icons/IconChatGpt';
import IconFigma from '@/assets/icons/IconFigma';
import IconIllustrator from '@/assets/icons/IconIllustrator';
import IconPhotoshop from '@/assets/icons/IconPhotoshop';
import IconXd from '@/assets/icons/IconXd';
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
            {/* SKILLS */}
            <div className=''>
              <div>
                <h2 className='text-[36px] font-[600]'>Skills</h2>
                <CustomImage
                  src='/images/about/line.png'
                  alt='error'
                  width={396}
                  height={11.1}
                />
              </div>
              <div className='mt-[32px] flex flex-col gap-[32px]'>
                {/* Shin404 & 404 Anime */}
                <div className='flex flex-col gap-[32px]'>
                  <div>
                    <h3 className='text-[20px] font-[600]'>*Hard Skills</h3>
                    <div className='flex items-start gap-[28px]'>
                      <div>
                        <p className='text-[16px] font-[400]'>
                          • Proficiency Design tools
                        </p>{' '}
                        <p className='text-[16px] font-[400]'>
                          • Wireframing, Prototyping
                        </p>
                        <p className='text-[16px] font-[400]'>
                          • User Research
                        </p>
                        <p className='text-[16px] font-[400]'>
                          • Information Architecture
                        </p>
                        <p className='text-[16px] font-[400]'>
                          • Interaction Design
                        </p>
                      </div>
                      <div>
                        <p className='text-[16px] font-[400]'>
                          • Responsive Design
                        </p>{' '}
                        <p className='text-[16px] font-[400]'>
                          • Accessibility Design
                        </p>
                        <p className='text-[16px] font-[400]'>• UX Writing</p>
                        <p className='text-[16px] font-[400]'>
                          • Data Analysis Tools
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className='text-[20px] font-[600]'>*Soft Skills</h3>
                    <div className='flex items-start gap-[28px]'>
                      <div>
                        <p className='text-[16px] font-[400]'>• Empathy</p>{' '}
                        <p className='text-[16px] font-[400]'>
                          • Problem-Solving
                        </p>
                        <p className='text-[16px] font-[400]'>
                          • Communication
                        </p>
                        <p className='text-[16px] font-[400]'>
                          • Time Management
                        </p>
                        <p className='text-[16px] font-[400]'>• Adaptability</p>
                      </div>
                      <div>
                        <p className='text-[16px] font-[400]'>
                          • Collaboration
                        </p>{' '}
                        <p className='text-[16px] font-[400]'>
                          • Attention to Detail
                        </p>
                        <p className='text-[16px] font-[400]'>
                          • Critical Thinking
                        </p>
                        <p className='text-[16px] font-[400]'>• Curiosity</p>
                        <p className='text-[16px] font-[400]'>
                          • Feedback Reception
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Softwares */}
            <div className=''>
              <div>
                <h2 className='text-[36px] font-[600]'>Softwares</h2>
                <CustomImage
                  src='/images/about/line.png'
                  alt='error'
                  width={396}
                  height={11.1}
                />
              </div>
              <div className='mt-[32px] flex justify-start gap-[31.8px]'>
                <div className='flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconFigma />
                </div>
                <div className='flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconPhotoshop />
                </div>
                <div className='flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconIllustrator />
                </div>
                <div className='flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconXd />
                </div>
                <div className='flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconAdobe />
                </div>
              </div>
              <div className='mt-[32px] flex justify-start gap-[31.8px]'>
                <div className='flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconFramer />
                </div>
                <div className='flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconAutocad />
                </div>
                <div className='flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconCapcut />
                </div>
                <div className='flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconChatGpt />
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
                {/* Shin404 & 404 Anime */}
                <div className='flex flex-col gap-[8px]'>
                  <a
                    href='https://www.coursera.org/account/accomplishments/specialization/01KQDWE2CK80'
                    target='_blank'
                    className='text-[20px] font-[600]'
                  >
                    *Google UX Design Specialization (7 courses)
                  </a>
                  <p className='text-[16px] font-[400]'>• Google - Sep 2024</p>{' '}
                </div>
                {/* Shin404 & 404 Anime */}
                <div className='flex flex-col gap-[8px]'>
                  <a
                    href='https://www.credly.com/badges/3bf2740f-d5b0-4412-8ca3-b6edc3c3a0e9/linked_in?t=shaezb'
                    target='_blank'
                    className='text-[20px] font-[600]'
                  >
                    *Enterprise Design Thinking Practitioner
                  </a>
                  <p className='text-[16px] font-[400]'>• IBM - Jul 2024</p>{' '}
                </div>
                {/* Shin404 & 404 Anime */}
                <div className='flex flex-col gap-[8px]'>
                  <a
                    href='https://www.coursera.org/account/accomplishments/verify/YDS5DFYT6V0L'
                    target='_blank'
                    className='text-[20px] font-[600]'
                  >
                    *Use Generative AI as Your Thought Partner
                  </a>
                  <p className='text-[16px] font-[400]'>
                    • Coursera - Jan 2025
                  </p>{' '}
                </div>
                {/* Shin404 & 404 Anime */}
                <div className='flex flex-col gap-[8px]'>
                  <a
                    href='https://www.udemy.com/certificate/UC-2fbae521-ceb0-497d-86d7-f6062f924c6e/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com'
                    target='_blank'
                    className='text-[20px] font-[600]'
                  >
                    *Design Thinking: From Idea to Reality
                  </a>
                  <p className='text-[16px] font-[400]'>• Udemy - Sep 2024</p>{' '}
                </div>
                {/* Shin404 & 404 Anime */}
                <div className='flex flex-col gap-[8px]'>
                  <a
                    href='https://www.udemy.com/certificate/UC-420574ba-ca4b-4572-ab20-52ff1ec25f83/'
                    target='_blank'
                    className='text-[20px] font-[600]'
                  >
                    *Figmarketing
                  </a>
                  <p className='text-[16px] font-[400]'>• Udemy - Aug 2024</p>{' '}
                </div>
                {/* Shin404 & 404 Anime */}
                <div className='flex flex-col gap-[8px]'>
                  <div
                    // href='#'
                    // target='_blank'
                    className='text-[20px] font-[600]'
                  >
                    *Toeic Certificate
                  </div>
                  <p className='text-[16px] font-[400]'>
                    • 790 total in May 2025
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
