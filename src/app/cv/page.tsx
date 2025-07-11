'use client';

import IconFramer from '@/assets/icons/IcoFramer';
import IconAdobe from '@/assets/icons/IconAdobe';
import IconAutocad from '@/assets/icons/IconAutocad';
import IconBehance from '@/assets/icons/IconBehance';
import IconCapcut from '@/assets/icons/IconCapcut';
import IconChatGpt from '@/assets/icons/IconChatGpt';
import IconFigma from '@/assets/icons/IconFigma';
import IconIllustrator from '@/assets/icons/IconIllustrator';
import IconIns from '@/assets/icons/IconIns';
import IconLinkedin from '@/assets/icons/IconLinkedin';
import IconMail from '@/assets/icons/IconMail';
import IconPhotoshop from '@/assets/icons/IconPhotoshop';
import IconXd from '@/assets/icons/IconXd';
import CustomImage from '@/components/custom/CustomImage';
import SocialButtons from '@/components/SocialButtons';
import { INFO } from '@/constant/info';
import React, { useRef } from 'react';

const CVPage = () => {
  const socialRefs = useRef<HTMLDivElement[]>([]);
  return (
    <div
      id='section'
      className='min-h-screen bg-[url("/images/home/bg.png")] bg-cover bg-fixed bg-center bg-no-repeat text-[#F4E4CA]'
    >
      <div className='max-w-[1447px] pb-[10rem] py-[66px] pl-[53px]'>
        <div className='flex items-end justify-between'>
          <div className=''>
            <div className='flex items-center gap-[17px]'>
              <h1 className='text-[40px] font-[600px]'>Thanh Quy Nguyen</h1>{' '}
              <CustomImage
                src='/images/tqn.webp'
                alt='tqn'
                width={39}
                height={32.5}
              />
            </div>
            <p className='mt-[8px] text-[16px]'>
              UI/UX Designer | Graphic Designer | Design Enthusiast | Sometimes
              Content Creator{' '}
            </p>
          </div>
          <div className='text-[14px] font-[400] text-[#F4E4CA]'>
            <div className='flex items-center justify-end gap-[16px]'>
              <a href={INFO.SOCIAL.LINKEDIN} target='_blank'>
                <IconLinkedin className='cursor-pointer' />
              </a>
              <a href={INFO.SOCIAL.INSTAGRAM} target='_blank'>
                <IconIns className='cursor-pointer' />
              </a>
              <a href={INFO.SOCIAL.BEHANCE} target='_blank'>
                <IconBehance className='cursor-pointer' />
              </a>
              <a href={`mailto:${INFO.SOCIAL.EMAIL}`} target='_blank'>
                <IconMail className='cursor-pointer' />
              </a>
            </div>
            <p className='text-[14px[ mt-[8px] font-[400] text-[#F4E4CA]'>
              +84 926 200 724 | Lang, Hanoi, Vietnam
            </p>
          </div>
        </div>

        <div className='my-[40px] h-[1px] w-full bg-[#F4E4CA]'></div>

        <div className='flex items-center'>
          <div className='w-[879px]'>
            <p className='max-w-[674px] text-[14px]'>
              I am Thanh Quy, a designer with more than 3 years of experience
              and a strong passion for color harmony and composition. My journey
              began in 2022, creating graphics that reflected my personal style,
              which ultimately led me to UI/UX Design - a field I’m now
              dedicated to pursuing. Although my university studies are in a
              different field, they have sharpened my research skills and
              ability to explore fresh ideas. With my enthusiasm, commitment,
              and proactive approach to learning, I am confident I can be a
              valuable asset for any team seeking a creative and skilled UI/UX
              designer.
            </p>
          </div>
          <p className='text-[64px] font-[600]'>Resume</p>
        </div>

        <div className='my-[40px] h-[1px] w-full bg-[#F4E4CA]'></div>

        <div className='flex items-start'>
          <div className='w-[879px]'>
            <p className='text-[40px] font-[600]'>Education</p>
          </div>
          <div className='flex max-w-[327px] flex-col gap-[32px]'>
            <div className='flex flex-col gap-[4px] text-[14px]'>
              <p className='text-[#B7AB98]'>Oct 2021 - Jul 2025</p>
              <p className='font-[700]'>Diplomatic Academy of Vietnam</p>
              <p className='text-[#B7AB98]'>
                Bachelor of International Relations and Affairs
              </p>
              <p>GPA: 3,44/4 (Very good)</p>
            </div>
            <div className='flex flex-col gap-[4px] text-[14px]'>
              <p className='text-[#B7AB98]'>Aug - Sep 2024</p>
              <p className='font-[700]'>
                Google UX Design Specialization (7/7)
              </p>
              <p className='text-[#B7AB98]'>
                Covers key skills for starting a UI/UX career
              </p>
            </div>
            <div className='flex flex-col gap-[4px] text-[14px]'>
              <p className='text-[#B7AB98]'>Feb 2025 - Now</p>
              <p className='font-[700]'>
                Google Project Management Specialization (3/6)
              </p>
              <p className='text-[#B7AB98]'>
                Get on the fast track to a career in project management
              </p>
            </div>
          </div>
        </div>

        <div className='my-[40px] h-[1px] w-full bg-[#F4E4CA]'></div>

        <div className='flex items-start'>
          <div className='w-[879px]'>
            <p className='text-[40px] font-[600]'>Work Experience</p>
          </div>
          <div className='flex max-w-[456px] flex-col gap-[32px]'>
            <div className='flex flex-col gap-[4px] text-[14px]'>
              <p className='text-[#B7AB98]'>Aug 2024 - Now</p>
              <p className='font-[700]'>Shin404 and 404Anime</p>
              <p className='text-[#B7AB98]'>Product Owner</p>
              <p className='text-[#B7AB98]'>
                UI/UX Designer, Graphic Designer and sometimes Content Creator
              </p>
            </div>
            <div className='flex flex-col gap-[4px] text-[14px]'>
              <p className='text-[#B7AB98]'>Jul 2024 - Jan 2025</p>
              <p className='font-[700]'>FPT Software</p>
              <p className='text-[#B7AB98]'>UI/UX Designer</p>
              <p className='text-[#B7AB98]'>Graphic Design (as a supporter)</p>
            </div>
            <div className='flex flex-col gap-[4px] text-[14px]'>
              <p className='text-[#B7AB98]'>Dec 2023 - Mar 2025</p>
              <p className='font-[700]'>Hanoi Rock City</p>
              <p className='text-[#B7AB98]'>Creative Graphic Designer</p>
            </div>
            <div className='flex flex-col gap-[4px] text-[14px]'>
              <p className='text-[#B7AB98]'>Mar 2022 - Now</p>
              <p className='font-[700]'>Freelance Designer</p>
              <p className='text-[#B7AB98]'>UI/UX Designer</p>
              <p className='text-[#B7AB98]'>Graphic Designer</p>
            </div>
            <p className='text-[#B7AB98]'>
              as well as various other projects in collaboration with NGO such
              as TeamX Hanoi and university based clubs
            </p>
          </div>
        </div>

        <div className='my-[40px] h-[1px] w-full bg-[#F4E4CA]'></div>

        <div className='flex items-start'>
          <div className='w-[879px]'>
            <p className='text-[40px] font-[600]'>Skills</p>
            <p className='text-[14px] text-[#B7AB98]'>
              (Technical & Soft Skills)
            </p>
          </div>
          <div className='flex max-w-[456px] flex-col gap-[32px]'>
            <div className='flex items-start gap-[32px] text-[#F4E4CA]'>
              <div className='text-[12px] leading-[22px]'>
                Visual Design <br /> User Interface Design Systems
                <br /> Interaction Design <br /> Branding <br /> Graphic Design
                <br /> Prototyping <br /> Wireframing <br /> Usability Testing
                <br /> Problem - Solving <br /> Attention to Details
              </div>{' '}
              <div className='text-[12px] leading-[22px]'>
                Proactive <br />
                Creative Thinking <br />
                Adaptability <br />
                Self - Learning <br />
                Empathy <br />
                Decision - Making <br />
                Active Listening <br />
                Loyal <br />
              </div>
            </div>

            <div className=''>
              <div className='flex justify-start gap-[31.8px]'>
                <div className='software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconFigma />
                </div>
                <div className='software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconPhotoshop />
                </div>
                <div className='software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconIllustrator />
                </div>
                <div className='software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconXd />
                </div>
                <div className='software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconAdobe />
                </div>
              </div>
              <div className='mt-[14.5px] flex justify-start gap-[31.8px]'>
                <div className='software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconFramer />
                </div>
                <div className='software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconAutocad />
                </div>
                <div className='software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconCapcut />
                </div>
                <div className='software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                  <IconChatGpt />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='my-[40px] h-[1px] w-full bg-[#F4E4CA]'></div>

        <div className='flex items-start'>
          <div className='w-[879px]'>
            <p className='text-[40px] font-[600]'>Languages</p>
          </div>
          <div className='flex max-w-[327px] flex-col gap-[32px]'>
            <div className='flex flex-col gap-[4px] text-[14px]'>
              <p className='font-[700]'>Vietnamese </p>
              <p className='text-[#B7AB98]'>Native or bilingual proficiency</p>
            </div>
            <div className='flex flex-col gap-[4px] text-[14px]'>
              <p className='font-[700]'>English </p>
              <p className='text-[#B7AB98]'>Elementary proficiency</p>
            </div>
          </div>
        </div>

        <div className='my-[40px] h-[1px] w-full bg-[#F4E4CA]'></div>

        <div className='flex items-start'>
          <div className='w-[879px]'>
            <p className='text-[40px] font-[600]'>Certifications</p>
          </div>
          <div className='flex max-w-[502px] flex-col gap-[32px]'>
            <div className='flex flex-col gap-[4px] text-[14px]'>
              <a
                href='https://www.coursera.org/account/accomplishments/verify/HCB79W7FB5J7'
                target='_blank'
                className='font-[700]'
              >
                Google Project Management: Professional Certificate (3/6
                courses)
              </a>
              <p className='text-[#B7AB98]'>Google - Apr 2025 - now</p>
            </div>
            <div className='flex flex-col gap-[4px] text-[14px]'>
              <a
                href='https://www.coursera.org/account/accomplishments/specialization/01KQDWE2CK80'
                target='_blank'
                className='font-[700]'
              >
                Google UX Design Specialization (7 courses)
              </a>
              <p className='text-[#B7AB98]'>Google - Sep 2024</p>
            </div>
            <div className='flex flex-col gap-[4px] text-[14px]'>
              <a
                href='https://www.credly.com/badges/3bf2740f-d5b0-4412-8ca3-b6edc3c3a0e9/linked_in?t=shaezb'
                target='_blank'
                className='font-[700]'
              >
                Enterprise Design Thinking Practitioner
              </a>
              <p className='text-[#B7AB98]'>IBM - Jul 2024</p>
            </div>
            <div className='flex flex-col gap-[4px] text-[14px]'>
              <a
                href='https://www.coursera.org/account/accomplishments/verify/YDS5DFYT6V0L'
                target='_blank'
                className='font-[700]'
              >
                Use Generative AI as Your Thought Partner
              </a>
              <p className='text-[#B7AB98]'>Coursera - Jan 2025</p>
            </div>
            <div className='flex flex-col gap-[4px] text-[14px]'>
              <a
                href='https://www.udemy.com/certificate/UC-2fbae521-ceb0-497d-86d7-f6062f924c6e/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com'
                target='_blank'
                className='font-[700]'
              >
                Design Thinking: From Idea to Reality
              </a>
              <p className='text-[#B7AB98]'>Udemy - Sep 2024</p>
            </div>
            <div className='flex flex-col gap-[4px] text-[14px]'>
              <a
                href='https://www.udemy.com/certificate/UC-420574ba-ca4b-4572-ab20-52ff1ec25f83/'
                target='_blank'
                className='font-[700]'
              >
                Figmarketing
              </a>
              <p className='text-[#B7AB98]'>Udemy - Aug 2024</p>
            </div>
            <div className='flex flex-col gap-[4px] text-[14px]'>
              <div className='font-[700]'>Toeic Certificate</div>
              <p className='text-[#B7AB98]'>790 total in May 2025</p>
            </div>
          </div>
        </div>

        <div className='mt-[40px] h-[1px] w-full bg-[#F4E4CA]'></div>
        <div className='mt-[8px] flex flex-col items-end'>
          <p className='text-[12px]'>Update: 06 July 2025</p>
          <a
            href='https://drive.google.com/file/d/1fb6EYCdf-pv-SlVW5u3UWERHhdsly_s1/view'
            target='_blank'
            className='mt-[4px] cursor-pointer text-[12px] underline'
          >
            Download PDF
          </a>
        </div>

        <SocialButtons
          className='absolute bottom-[2rem] left-[3rem] max-w-[400px] flex-wrap'
          socialRefs={socialRefs}
        />
        <div className='absolute bottom-[2rem] right-[3rem] text-[16px] font-[400] text-[#F4E4CA]'>
          ALL RIGHTS RESERVED <br /> © 2025 TQNG MARUKO
        </div>
      </div>
    </div>
  );
};

export default CVPage;
