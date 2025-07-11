'use client';

import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { INFO } from '@/constant/info';
import IconArrowBold from '@/assets/icons/IconArrowBold';
import CustomImage from '@/components/custom/CustomImage';
import useStore from '@/store';
import { PAGE_STATE } from '@/constant';
import Lenis from 'lenis';
import useScrollSmoother from '@/hook/useScrollSmoother';
import ButtonVisit from '@/components/ButtonVisit';
import Footer from '@/components/Footer';
import SocialButtons from '@/components/SocialButtons';
import ProjectSocialButtons from '@/components/ProjectSocialButtons';

gsap.registerPlugin(ScrollTrigger);

const LuxePage = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const roleRef = useRef(null);
  const buttonRef = useRef(null);
  const tagsRef = useRef(null);
  const welcomeState = useStore((state: any) => state.welcomeState);
  const socialRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useScrollSmoother();

  useEffect(() => {
    if (welcomeState !== PAGE_STATE.HERO) return;

    // Initial state - hide elements
    gsap.set(textRef.current, {
      opacity: 0,
      x: -100,
    });
    gsap.set(imageRef.current, {
      opacity: 0,
      scale: 1.1,
      right: '-13rem',
    });
    gsap.set(
      [
        titleRef.current,
        subtitleRef.current,
        roleRef.current,
        buttonRef.current,
        tagsRef.current,
      ],
      {
        opacity: 0,
        y: 30,
      }
    );

    // Entrance animations
    const entranceTl = gsap.timeline({ delay: 0.3 });

    entranceTl
      .to(textRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        0.2
      )
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        0.3
      )
      .to(
        roleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        0.4
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        0.5
      )
      .to(
        tagsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        0.6
      )
      .to(
        imageRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        0.4
      );

    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=150%', // Kéo dài animation qua 2.5 screen heights cho 3 phases
        scrub: 1,
        pin: true, // Pin section để không scroll xuống ngay
        anticipatePin: 1,
        onUpdate: (self) => {
          // Đảm bảo khi scroll về 0, elements trở về trạng thái ban đầu
          if (self.progress === 0) {
            gsap.set(textRef.current, { x: 0, opacity: 1 });
            gsap.set(imageRef.current, { width: '70%', right: '-13rem' });
          }
        },
      },
    });

    // Phase 1: Animation chậm trong 33% đầu - Subtle movement
    tl.fromTo(
      imageRef.current,
      { width: '70%', right: '-13rem' },
      {
        width: '75%',
        right: '-10rem',
        ease: 'none', // Linear cho scrub animation
      }
    ).fromTo(
      textRef.current,
      { x: 0, opacity: 1 },
      {
        x: '-10%',
        opacity: 0.9,
        ease: 'none',
      },
      '<' // Bắt đầu cùng lúc với animation trước
    );

    // Phase 2: Animation trung bình trong 33% giữa - More noticeable
    tl.to(imageRef.current, {
      width: '85%',
      right: '-7rem',
      ease: 'none',
    }).to(
      textRef.current,
      {
        x: '-30%',
        opacity: 0.6,
        ease: 'none',
      },
      '<'
    );

    // Phase 3: Animation nhanh trong 33% cuối - Dramatic finish
    tl.to(imageRef.current, {
      width: '100%',
      right: '0',
      ease: 'none',
    }).to(
      textRef.current,
      {
        x: '-100%',
        opacity: 0,
        ease: 'none',
      },
      '<'
    );

    /* Anim body */
    gsap.set('.project-anim-wrapper', {
      clipPath: 'inset(0 0 100% 0)',
    });
    const projectRows = document.querySelectorAll('.project-row');
    projectRows.forEach((row, rowIndex) => {
      const wrappers = row.querySelectorAll('.project-anim-wrapper');

      gsap.to(wrappers, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.5,
        stagger: 0.2,
        delay: 0.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: row,
          start: 'top 100%',
          end: 'bottom 0%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Animation cho text và button trong body
    const textElements = document.querySelectorAll('.text-animate');
    textElements.forEach((element, index) => {
      // Set initial state
      gsap.set(element, {
        opacity: 0,
        y: 30,
      });

      // Create entrance animation
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        // delay: index * 0.1, // Stagger effect
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [welcomeState]);

  const INFO_SOCIAL = {
    VIEW_LANDING_PAGE: INFO.PROJECT.LUXE,
  };

  return (
    <div id='section' className='min-h-screen bg-black'>
      {welcomeState === PAGE_STATE.HERO && (
        <>
          <div
            className='relative inset-0 z-10 h-screen bg-black'
            ref={sectionRef}
          >
            {/* Text bên trái */}
            <div
              ref={textRef}
              className='absolute left-0 top-1/2 z-10 -translate-y-1/2 pl-[35px] text-[#F4E4CA]'
            >
              <div className='overflow-hidden'>
                <h1
                  ref={titleRef}
                  className='text-[48px] font-[700] leading-[57.6px] text-[#F4E4CA]'
                >
                  Luxe Timber
                </h1>
              </div>

              <div className='overflow-hidden'>
                <h2
                  ref={subtitleRef}
                  className='text-[40px] leading-[57.6px] text-[#F4E4CA]'
                >
                  Interior Website (1 designer)
                </h2>
              </div>

              <div
                ref={roleRef}
                className='mt-[16px] text-[20px] font-[400] uppercase leading-[26px] text-[#D1BA93]'
              >
                <div className='overflow-hidden'>
                  <p>role: UI UX DESIGNer</p>
                </div>
                <div className='overflow-hidden'>
                  <p>TIME: SEP 2024 - OCT 2024</p>
                </div>
              </div>
              <div className='my-[48px] overflow-hidden'>
                <ButtonVisit
                  buttonRef={buttonRef}
                  href={INFO.PROJECT.LUXE}
                  title='View landing page'
                />
              </div>

              <div
                ref={tagsRef}
                className='text-[18px] font-[400] leading-[24px] text-[rgba(244,228,201,0.70)]'
              >
                <p className='overflow-hidden'># Luxe_Timber</p>
                <p className='overflow-hidden'># Interior_field</p>
                <p className='overflow-hidden'># UI_design</p>
                <p className='overflow-hidden'># Landing_page</p>
              </div>
            </div>
            {/* Ảnh bên phải */}
            <div
              ref={imageRef}
              className='absolute right-[-13rem] top-0 z-10 h-screen w-[70%]'
            >
              <CustomImage
                src='/images/works/luxe/intro.webp'
                alt='Vault'
                unoptimized
                fill
                className='object-cover object-center'
              />
            </div>
          </div>
          {/* Body */}
          <div className=''>
            <div className='bg-[url("/images/works/bg_all.webp")] bg-cover bg-bottom bg-no-repeat px-[44px] pt-[48px] text-center font-[400]'>
              <h1 className='text-animate text-[48px] text-[#F4E4CA]'>
                <span className='font-[700]'>Luxe Timber</span> | Interior
                Website (1 designer){' '}
              </h1>
              <div className='text-animate text-[20px] font-[400] text-[#D1BA93]'>
                <p className='mt-[16px] uppercase'>role: UI UX DESIGNer</p>
                <p className='uppercase'>Time: MAR 2025 - APR 2025</p>
                <p># Luxe_Timber # Interior_field # UI_design # Landing_page</p>
              </div>
              <div className='text-animate'>
                <ButtonVisit
                  href={INFO.PROJECT.LUXE}
                  className='mt-[48px]'
                  title='View landing page'
                />
              </div>
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/luxe/logo.webp'
                    alt='Shin404'
                    width={647}
                    height={647}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/luxe/near_logo.webp'
                    alt='Shin404'
                    width={1160}
                    height={647}
                  />
                </div>
              </div>
              <p className='text-animate py-[64px] text-center text-[24px] text-[#D1BA93]'>
                This is another personal project of mine, focusing on the field
                of interior architecture. My inspiration for this project came
                from the incredibly eye-catching and captivating designs I
                discovered on platforms like{' '}
                <span className='font-[700]'>Dribbble</span> and{' '}
                <span className='font-[700]'>Behance</span>. These examples
                motivated me to push my creative boundaries and explore the
                intersection of functionality and aesthetic appeal.
              </p>
              <div className='project-row flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/luxe/near_mockup_mobile.webp'
                    alt='Shin404'
                    width={1034}
                    height={775}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/luxe/mockup_mobile.webp'
                    alt='Shin404'
                    width={775}
                    height={775}
                  />
                </div>
              </div>
            </div>
            <div className='px-[44px] text-center'>
              <p className='text-animate my-[16px] text-[20px] text-[#D1BA93]'>
                A selection of images showcasing the website I worked on
              </p>
              <div className='project-row flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/luxe/near_mockup_pc.webp'
                    alt='Shin404'
                    width={775}
                    height={775}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/luxe/mockup_pc.webp'
                    alt='Shin404'
                    width={1034}
                    height={775}
                  />
                </div>
              </div>
              <p className='text-animate mt-[16px] text-[20px] text-[#D1BA93]'>
                This is a fascinating field that challenges and allows me to
                refine my skills
              </p>
              <div className='project-row'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/luxe/mockup_big_1.webp'
                    alt='Shin404'
                    unoptimized
                    className='mt-[64px]'
                    width={1834}
                    height={1036}
                  />
                </div>
              </div>
              <p className='text-animate mt-[16px] text-[20px] text-[#D1BA93]'>
                This is also a fascinating field that brings me a wealth of
                inspiration and creativity.
              </p>
              <div className='mt-[64px]'>
                <p className='text-animate text-left text-[48px] font-[600] text-[#F4E4CA]'>
                  Luxe Timber: Redefining modern luxury
                </p>
                <div className='text-animate mt-[31px] flex items-start justify-end gap-[48px] text-left text-[20px] font-[400] text-[#D1BA93]'>
                  <p className='w-[483px]'>
                    <span className='font-[700]'>Luxe Timber</span> is a website
                    dedicated to showcasing exquisite wooden furniture that
                    seamlessly combines{' '}
                    <span className='font-[700]'>
                      functionality with elegance
                    </span>
                    . Inspired by the beauty of natural materials, the designs
                    aim to combines{' '}
                    <span className='font-[700]'>
                      elevate modern living spaces
                    </span>
                    with pieces that{' '}
                    <span className='font-[700]'>exude sophistication</span> and{' '}
                    <span className='font-[700]'>timeless appeal</span>.
                  </p>
                  <p className='w-[483px]'>
                    This project focuses on creating an online presence that
                    reflects the{' '}
                    <span className='font-[700]'>{`brand's`} commitment </span>
                    to <span className='font-[700]'>quality</span> and{' '}
                    <span className='font-[700]'>craftsmanship</span>. The
                    website embraces a clean, minimalist design with warm tones
                    and smooth navigation, ensuring a{' '}
                    <span className='font-[700]'>user-friendly</span> experience
                    that mirrors the{' '}
                    <span className='font-[700]'>luxurious essence</span> of the
                    products.
                  </p>
                  <p className='w-[483px]'>
                    With Luxe Timber, the goal is to inspire a lifestyle of
                    <span className='font-[700]'> modern luxury</span>, where
                    every piece of furniture transforms a house into a home.
                    This project allowed me to integrate contemporary UI
                    elements with a touch of nature, presenting wooden furniture
                    in a way that resonates with today’s discerning audience.
                  </p>
                </div>
              </div>{' '}
              <div className='project-row'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/luxe/mockup_big_2.webp'
                    alt='Shin404'
                    unoptimized
                    className='mt-[64px]'
                    width={1832}
                    height={1000}
                  />
                </div>
              </div>
              <p className='text-animate my-[16px] text-[20px] text-[#D1BA93]'>
                Similar to my previous projects, this was an excellent
                opportunity for me to refine and enhance my UI design skills.
                From crafting visually appealing layouts to experimenting with
                modern design trends, this project allowed me to further develop
                my expertise while embracing the challenges and intricacies of
                interior design in the digital realm.
              </p>{' '}
            </div>
            <div className='relative mt-[64px]'>
              <CustomImage
                src='/images/works/luxe/intro.webp'
                alt='Shin404'
                width={1921}
                height={914}
              />{' '}
              <div className='absolute inset-0 bg-[rgba(0,0,0,0.40)] backdrop-blur-[20px]'></div>
              <div className='absolute inset-0 flex flex-col items-center justify-center gap-[16px]'>
                <p className='text-animate text-[48px] text-[#F4E4CA]'>
                  To know more about this project - visit this:
                </p>
                <div className='text-animate'>
                  <ProjectSocialButtons
                    socialRefs={socialRefs}
                    socialData={INFO_SOCIAL}
                  />
                </div>
                <p className='text-animate text-[20px] text-[#F4E4CA]'>
                  by Thanh Quy Nguyen with big love hihi
                </p>
              </div>
            </div>
          </div>
          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
};

export default LuxePage;
