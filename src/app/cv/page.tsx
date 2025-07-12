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
import { PAGE_STATE } from '@/constant';
import { INFO } from '@/constant/info';
import useScrollSmoother from '@/hook/useScrollSmoother';
import useStore from '@/store';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useCustomRouter from '@/hook/useCustomRouter';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const CVPage = () => {
  const socialRefs = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollSmoother();
  const welcomeState = useStore((state: any) => state.welcomeState);

  useEffect(() => {
    if (welcomeState === PAGE_STATE.HERO && containerRef.current) {
      // Initial page load animations
      initializeAnimations();

      // Scroll-triggered animations
      initializeScrollAnimations();
    }
  }, [welcomeState]);

  const initializeAnimations = () => {
    // Create master timeline for initial animations
    const tl = gsap.timeline({
      /* delay: 0.3 */
    });

    // Hero section animations
    tl.from('.hero-name', {
      duration: 1.2,
      y: 100,
      opacity: 0,
      ease: 'power4.out',
      stagger: 0.1,
    })
      .from(
        '.hero-image',
        {
          duration: 1,
          scale: 0,
          rotation: 360,
          opacity: 0,
          ease: 'elastic.out(1, 0.8)',
        },
        '-=0.8'
      )
      //   .from(
      //     '.hero-subtitle',
      //     {
      //       duration: 0.8,
      //       y: 50,
      //       opacity: 0,
      //       ease: 'elastic.out(1, 0.8)',
      //     },
      //     '-=0.5'
      //   )
      .from(
        '.social-icon',
        {
          duration: 0.6,
          scale: 0,
          opacity: 0,
          ease: 'back.out(1.7)',
          stagger: 0.1,
        },
        '-=0.3'
      );
    //   .from(
    //     '.contact-info',
    //     {
    //       duration: 0.8,
    //       x: 50,
    //       opacity: 0,
    //       delay: 0,
    //       ease: 'elastic.out(1, 0.8)',
    //     },
    //     '-=0.4'
    //   );
    //   .from(
    //     '.divider-line',
    //     {
    //       duration: 1,
    //       scaleX: 0,
    //       transformOrigin: 'left center',
    //       ease: 'power3.out',
    //     },
    //     '-=0.2'
    //   );

    // Floating animation for hero image
    // gsap.to('.hero-image', {
    //   duration: 3,
    //   y: -10,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: 'sine.inOut',
    // });

    // Glowing effect for social icons
    // gsap.to('.social-icon', {
    //   duration: 2,
    //   boxShadow: '0 0 20px rgba(244, 228, 202, 0.5)',
    //   repeat: -1,
    //   yoyo: true,
    //   ease: 'sine.inOut',
    //   stagger: 0.2,
    // });
  };

  const initializeScrollAnimations = () => {
    // Section headers
    gsap.utils.toArray('.section-header').forEach((header: any) => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none ',
        },
        duration: 1.2,
        x: -100,
        opacity: 0,
        ease: 'power4.out',
      });
    });

    // Content items with stagger animation
    gsap.utils.toArray('.content-item').forEach((item: any, index: number) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none ',
        },
        duration: 0.8,
        y: 80,
        opacity: 0,
        ease: 'power3.out',
        // delay: index * 0.1,
      });
    });

    // Skills icons with bounce effect
    gsap.utils.toArray('.skill-icon').forEach((icon: any, index: number) => {
      gsap.from(icon, {
        scrollTrigger: {
          trigger: icon,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'play none none ',
        },
        duration: 0.8,
        scale: 0,
        rotation: 360,
        opacity: 0,
        ease: 'elastic.out(1, 0.8)',
        // delay: index * 0.1,
      });
    });

    // Text content with typewriter effect
    gsap.utils.toArray('.text-content').forEach((text: any) => {
      gsap.from(text, {
        scrollTrigger: {
          trigger: text,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none ',
        },
        duration: 1.5,
        opacity: 0,
        ease: 'power2.out',
        // onStart: () => {
        //   // Typewriter effect
        //   const textContent = text.textContent;
        //   text.textContent = '';
        //   text.style.opacity = '1';

        //   let i = 0;
        //   const typeWriter = () => {
        //     if (i < textContent.length) {
        //       text.textContent += textContent.charAt(i);
        //       i++;
        //       setTimeout(typeWriter, 20);
        //     }
        //   };
        //   typeWriter();
        // },
      });
    });

    // Certification links
    gsap.utils.toArray('.cert-link').forEach((link: any) => {
      gsap.from(link, {
        scrollTrigger: {
          trigger: link,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none ',
        },
        duration: 0.8,
        x: 50,
        opacity: 0,
        ease: 'power3.out',
      });
    });

    // Divider lines
    gsap.utils.toArray('.section-divider').forEach((divider: any) => {
      gsap.from(divider, {
        scrollTrigger: {
          trigger: divider,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'play none none ',
        },
        duration: 1.2,
        scaleX: 0,
        transformOrigin: 'center',
        ease: 'elastic.out(1, 0.8)',
      });
    });

    // Footer animation
    gsap.from('.footer-content', {
      scrollTrigger: {
        trigger: '.footer-content',
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play none none ',
      },
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
    });
  };
  const customRouter = useCustomRouter();

  return (
    <div
      ref={containerRef}
      id='section'
      className='min-h-screen overflow-hidden bg-[url("/images/home/bg.png")] bg-cover bg-fixed bg-center bg-no-repeat text-[#F4E4CA]'
    >
      {welcomeState === PAGE_STATE.HERO && (
        <div className='max-w-[1447px] py-[66px] pb-[10rem] pl-[53px]'>
          <div className='flex items-end justify-between'>
            <div className=''>
              <div className='flex items-center gap-[17px]'>
                <h1
                  onClick={() => {
                    customRouter.push('/');
                  }}
                  className='hero-name cursor-pointer text-[40px] font-[600px]'
                >
                  Thanh Quy Nguyen
                </h1>
                <CustomImage
                  src='/images/tqn.webp'
                  alt='tqn'
                  width={39}
                  height={32.5}
                  className='hero-image animate-bounce'
                />
              </div>
              <p className='hero-subtitle mt-[8px] text-[16px]'>
                UI/UX Designer | Graphic Designer | Design Enthusiast |
                Sometimes Content Creator
              </p>
            </div>
            <div className='text-[14px] font-[400] text-[#F4E4CA]'>
              <div className='flex items-center justify-end gap-[16px]'>
                <a
                  href={INFO.SOCIAL.LINKEDIN}
                  target='_blank'
                  className='social-icon'
                >
                  <IconLinkedin className='cursor-pointer' />
                </a>
                <a
                  href={INFO.SOCIAL.INSTAGRAM}
                  target='_blank'
                  className='social-icon'
                >
                  <IconIns className='cursor-pointer' />
                </a>
                <a
                  href={INFO.SOCIAL.BEHANCE}
                  target='_blank'
                  className='social-icon'
                >
                  <IconBehance className='cursor-pointer' />
                </a>
                <a
                  href={`mailto:${INFO.SOCIAL.EMAIL}`}
                  target='_blank'
                  className='social-icon'
                >
                  <IconMail className='cursor-pointer' />
                </a>
              </div>
              <p className='contact-info mt-[8px] text-[14px] font-[400] text-[#F4E4CA]'>
                +84 926 200 724 | Lang, Hanoi, Vietnam
              </p>
            </div>
          </div>

          <div className='section-divider my-[40px] h-[1px] w-full bg-[#F4E4CA]'></div>

          <div className='flex items-center'>
            <div className='w-[879px]'>
              <p className='text-content max-w-[674px] text-[14px]'>
                I am Thanh Quy, a designer with more than 3 years of experience
                and a strong passion for color harmony and composition. My
                journey began in 2022, creating graphics that reflected my
                personal style, which ultimately led me to UI/UX Design - a
                field {`I'm`} now dedicated to pursuing. Although my university
                studies are in a different field, they have sharpened my
                research skills and ability to explore fresh ideas. With my
                enthusiasm, commitment, and proactive approach to learning, I am
                confident I can be a valuable asset for any team seeking a
                creative and skilled UI/UX designer.
              </p>
            </div>
            <p className='section-header text-[64px] font-[600]'>Resume</p>
          </div>

          <div className='section-divider my-[40px] h-[1px] w-full bg-[#F4E4CA]'></div>

          <div className='flex items-start'>
            <div className='w-[879px]'>
              <p className='section-header text-[40px] font-[600]'>Education</p>
            </div>
            <div className='flex max-w-[327px] flex-col gap-[32px]'>
              <div className='content-item flex flex-col gap-[4px] text-[14px]'>
                <p className='text-[#B7AB98]'>Oct 2021 - Jul 2025</p>
                <p className='font-[700]'>Diplomatic Academy of Vietnam</p>
                <p className='text-[#B7AB98]'>
                  Bachelor of International Relations and Affairs
                </p>
                <p>GPA: 3,44/4 (Very good)</p>
              </div>
              <div className='content-item flex flex-col gap-[4px] text-[14px]'>
                <p className='text-[#B7AB98]'>Aug - Sep 2024</p>
                <p className='font-[700]'>
                  Google UX Design Specialization (7/7)
                </p>
                <p className='text-[#B7AB98]'>
                  Covers key skills for starting a UI/UX career
                </p>
              </div>
              <div className='content-item flex flex-col gap-[4px] text-[14px]'>
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

          <div className='section-divider my-[40px] h-[1px] w-full bg-[#F4E4CA]'></div>

          <div className='flex items-start'>
            <div className='w-[879px]'>
              <p className='section-header text-[40px] font-[600]'>
                Work Experience
              </p>
            </div>
            <div className='flex max-w-[456px] flex-col gap-[32px]'>
              <div className='content-item flex flex-col gap-[4px] text-[14px]'>
                <p className='text-[#B7AB98]'>Aug 2024 - Now</p>
                <p className='font-[700]'>Shin404 and 404Anime</p>
                <p className='text-[#B7AB98]'>Product Owner</p>
                <p className='text-[#B7AB98]'>
                  UI/UX Designer, Graphic Designer and sometimes Content Creator
                </p>
              </div>
              <div className='content-item flex flex-col gap-[4px] text-[14px]'>
                <p className='text-[#B7AB98]'>Jul 2024 - Jan 2025</p>
                <p className='font-[700]'>FPT Software</p>
                <p className='text-[#B7AB98]'>UI/UX Designer</p>
                <p className='text-[#B7AB98]'>
                  Graphic Design (as a supporter)
                </p>
              </div>
              <div className='content-item flex flex-col gap-[4px] text-[14px]'>
                <p className='text-[#B7AB98]'>Dec 2023 - Mar 2025</p>
                <p className='font-[700]'>Hanoi Rock City</p>
                <p className='text-[#B7AB98]'>Creative Graphic Designer</p>
              </div>
              <div className='content-item flex flex-col gap-[4px] text-[14px]'>
                <p className='text-[#B7AB98]'>Mar 2022 - Now</p>
                <p className='font-[700]'>Freelance Designer</p>
                <p className='text-[#B7AB98]'>UI/UX Designer</p>
                <p className='text-[#B7AB98]'>Graphic Designer</p>
              </div>
              <p className='content-item text-[#B7AB98]'>
                as well as various other projects in collaboration with NGO such
                as TeamX Hanoi and university based clubs
              </p>
            </div>
          </div>

          <div className='section-divider my-[40px] h-[1px] w-full bg-[#F4E4CA]'></div>

          <div className='flex items-start'>
            <div className='w-[879px]'>
              <p className='section-header text-[40px] font-[600]'>Skills</p>
              <p className='text-[14px] text-[#B7AB98]'>
                (Technical & Soft Skills)
              </p>
            </div>
            <div className='flex max-w-[456px] flex-col gap-[32px]'>
              <div className='flex items-start gap-[32px] text-[#F4E4CA]'>
                <div className='content-item text-[12px] leading-[22px]'>
                  Visual Design <br /> User Interface Design Systems
                  <br /> Interaction Design <br /> Branding <br /> Graphic
                  Design
                  <br /> Prototyping <br /> Wireframing <br /> Usability Testing
                  <br /> Problem - Solving <br /> Attention to Details
                </div>
                <div className='content-item text-[12px] leading-[22px]'>
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
                  <div className='skill-icon software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                    <IconFigma />
                  </div>
                  <div className='skill-icon software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                    <IconPhotoshop />
                  </div>
                  <div className='skill-icon software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                    <IconIllustrator />
                  </div>
                  <div className='skill-icon software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                    <IconXd />
                  </div>
                  <div className='skill-icon software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                    <IconAdobe />
                  </div>
                </div>
                <div className='mt-[14.5px] flex justify-start gap-[31.8px]'>
                  <div className='skill-icon software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                    <IconFramer />
                  </div>
                  <div className='skill-icon software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                    <IconAutocad />
                  </div>
                  <div className='skill-icon software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                    <IconCapcut />
                  </div>
                  <div className='skill-icon software-icon flex h-[47.7px] w-[47.7px] items-center justify-center'>
                    <IconChatGpt />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='section-divider my-[40px] h-[1px] w-full bg-[#F4E4CA]'></div>

          <div className='flex items-start'>
            <div className='w-[879px]'>
              <p className='section-header text-[40px] font-[600]'>Languages</p>
            </div>
            <div className='flex max-w-[327px] flex-col gap-[32px]'>
              <div className='content-item flex flex-col gap-[4px] text-[14px]'>
                <p className='font-[700]'>Vietnamese </p>
                <p className='text-[#B7AB98]'>
                  Native or bilingual proficiency
                </p>
              </div>
              <div className='content-item flex flex-col gap-[4px] text-[14px]'>
                <p className='font-[700]'>English </p>
                <p className='text-[#B7AB98]'>Elementary proficiency</p>
              </div>
            </div>
          </div>

          <div className='section-divider my-[40px] h-[1px] w-full bg-[#F4E4CA]'></div>

          <div className='flex items-start'>
            <div className='w-[879px]'>
              <p className='section-header text-[40px] font-[600]'>
                Certifications
              </p>
            </div>
            <div className='flex max-w-[502px] flex-col gap-[32px]'>
              <div className='content-item flex flex-col gap-[4px] text-[14px]'>
                <a
                  href='https://www.coursera.org/account/accomplishments/verify/HCB79W7FB5J7'
                  target='_blank'
                  className='cert-link font-[700]'
                >
                  Google Project Management: Professional Certificate (3/6
                  courses)
                </a>
                <p className='text-[#B7AB98]'>Google - Apr 2025 - now</p>
              </div>
              <div className='content-item flex flex-col gap-[4px] text-[14px]'>
                <a
                  href='https://www.coursera.org/account/accomplishments/specialization/01KQDWE2CK80'
                  target='_blank'
                  className='cert-link font-[700]'
                >
                  Google UX Design Specialization (7 courses)
                </a>
                <p className='text-[#B7AB98]'>Google - Sep 2024</p>
              </div>
              <div className='content-item flex flex-col gap-[4px] text-[14px]'>
                <a
                  href='https://www.credly.com/badges/3bf2740f-d5b0-4412-8ca3-b6edc3c3a0e9/linked_in?t=shaezb'
                  target='_blank'
                  className='cert-link font-[700]'
                >
                  Enterprise Design Thinking Practitioner
                </a>
                <p className='text-[#B7AB98]'>IBM - Jul 2024</p>
              </div>
              <div className='content-item flex flex-col gap-[4px] text-[14px]'>
                <a
                  href='https://www.coursera.org/account/accomplishments/verify/YDS5DFYT6V0L'
                  target='_blank'
                  className='cert-link font-[700]'
                >
                  Use Generative AI as Your Thought Partner
                </a>
                <p className='text-[#B7AB98]'>Coursera - Jan 2025</p>
              </div>
              <div className='content-item flex flex-col gap-[4px] text-[14px]'>
                <a
                  href='https://www.udemy.com/certificate/UC-2fbae521-ceb0-497d-86d7-f6062f924c6e/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com'
                  target='_blank'
                  className='cert-link font-[700]'
                >
                  Design Thinking: From Idea to Reality
                </a>
                <p className='text-[#B7AB98]'>Udemy - Sep 2024</p>
              </div>
              <div className='content-item flex flex-col gap-[4px] text-[14px]'>
                <a
                  href='https://www.udemy.com/certificate/UC-420574ba-ca4b-4572-ab20-52ff1ec25f83/'
                  target='_blank'
                  className='cert-link font-[700]'
                >
                  Figmarketing
                </a>
                <p className='text-[#B7AB98]'>Udemy - Aug 2024</p>
              </div>
              <div className='content-item flex flex-col gap-[4px] text-[14px]'>
                <div className='font-[700]'>Toeic Certificate</div>
                <p className='text-[#B7AB98]'>790 total in May 2025</p>
              </div>
            </div>
          </div>

          <div className='section-divider mt-[40px] h-[1px] w-full bg-[#F4E4CA]'></div>
          <div className='footer-content mt-[8px] flex flex-col items-end'>
            <p className='text-[12px]'>Update: 06 July 2025</p>
            <a
              href='https://drive.google.com/file/d/1fb6EYCdf-pv-SlVW5u3UWERHhdsly_s1/view'
              target='_blank'
              className='cert-link mt-[4px] cursor-pointer text-[12px] underline'
            >
              Download PDF
            </a>
          </div>

          <SocialButtons
            className='absolute bottom-[2rem] left-[3rem] max-w-[400px] flex-wrap'
            socialRefs={socialRefs}
          />
          <div className='footer-content absolute bottom-[2rem] right-[3rem] text-[16px] font-[400] text-[#F4E4CA]'>
            ALL RIGHTS RESERVED <br /> © 2025 TQNG MARUKO
          </div>
        </div>
      )}
    </div>
  );
};

export default CVPage;
