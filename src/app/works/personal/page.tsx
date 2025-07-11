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

const Personal = () => {
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
    INSTAGRAM: 'https://www.instagram.com/tqqqqqqn/',
    BEHANCE: 'https://www.behance.net/thanhquynguyen',
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
                  Personal Graphic Design
                </h1>
              </div>

              <div className='overflow-hidden'>
                <h2
                  ref={subtitleRef}
                  className='text-[40px] leading-[57.6px] text-[#F4E4CA]'
                >
                  Early “homeworks” I embraced
                </h2>
              </div>

              <div
                ref={roleRef}
                className='mt-[16px] text-[20px] font-[400] uppercase leading-[26px] text-[#D1BA93]'
              >
                <div className='overflow-hidden'>
                  <p>role: CREATIVE GRAPHIC DESIGNer </p>
                </div>
                <div className='overflow-hidden'>
                  <p>TIME: JUN 2023 - NOW</p>
                </div>
              </div>
              {/* <div className='my-[48px] overflow-hidden'>
                <ButtonVisit
                  buttonRef={buttonRef}
                  href={INFO.PROJECT.CALENDAR}
                  title='View full calendar'
                />
              </div> */}

              <div
                ref={tagsRef}
                className='mt-[48px] text-[18px] font-[400] leading-[24px] text-[rgba(244,228,201,0.70)]'
              >
                <p className='overflow-hidden'># My_homework</p>
                <p className='overflow-hidden'># Graphic_design</p>
                <p className='overflow-hidden'># creative_n_productive</p>{' '}
                <p className='overflow-hidden'># ilovedesign</p>
              </div>
            </div>
            {/* Ảnh bên phải */}
            <div
              ref={imageRef}
              className='absolute right-[-13rem] top-0 z-10 h-screen w-[70%]'
            >
              <CustomImage
                src='/images/works/personal/intro.webp'
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
                <span className='font-[700]'>Personal Graphic Design</span> |
                Early “homeworks” I embraced
              </h1>
              <div className='text-animate text-[20px] font-[400] text-[#D1BA93]'>
                <p className='mt-[16px] uppercase'>
                  role: CREATIVE GRAPHIC DESIGNer
                </p>
                <p className='uppercase'>Time: JUN 2023 - NOW</p>
                <p>
                  # My_homework # Graphic_design # creative_n_productive #
                  ilovedesign
                </p>
              </div>
              {/* <div className='text-animate'>
                <ButtonVisit
                  href={INFO.PROJECT.CALENDAR}
                  className='mt-[48px]'
                  title='View full calendar'
                />
              </div> */}
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/1.webp'
                    alt='Shin404'
                    width={515}
                    height={647}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/2.webp'
                    alt='Shin404'
                    width={647}
                    height={647}
                  />
                </div>{' '}
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/3.webp'
                    alt='Shin404'
                    width={647}
                    height={647}
                  />
                </div>
              </div>
              <p className='text-animate py-[16px] text-center text-[20px] text-[#D1BA93]'>
                I genuinely enjoy experimenting with warm tones and often
                incorporate them into my designs
              </p>
              <div className='project-row flex items-start justify-center'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/4.webp'
                    alt='Shin404'
                    width={915.5}
                    height={915.5}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/5.webp'
                    alt='Shin404'
                    width={915.5}
                    height={915.5}
                  />
                </div>
              </div>
              <p className='text-animate py-[64px] text-center text-[24px] text-[#D1BA93]'>
                Here, I never confined myself to any single design style. Each
                project was an opportunity to experiment and uncover something
                exciting in the vast, fertile landscape of design. It became a
                journey of exploration, where every piece I worked on taught me
                something new and sparked fresh ideas. I also had the chance to
                learn and utilize incredible tools that expanded my creative
                potential tools I wish I had discovered earlier. These
                experiences have shaped me into a more versatile and open-minded
                designer, ready to embrace the endless possibilities that design
                offers.
              </p>
              <div className='project-row flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/6.webp'
                    alt='Shin404'
                    width={602}
                    height={753}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/7.webp'
                    alt='Shin404'
                    width={602}
                    height={753}
                  />
                </div>{' '}
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/8.webp'
                    alt='Shin404'
                    width={593}
                    height={753}
                  />
                </div>
              </div>
              <p className='text-animate py-[16px] text-center text-[20px] text-[#D1BA93]'>
                I also explore various styles, mixing elements, experimenting
                with diverse color palettes, texture effects, and typography
              </p>
              <div className='project-row flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/9.webp'
                    alt='Shin404'
                    width={1189}
                    height={623}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/10.webp'
                    alt='Shin404'
                    width={623}
                    height={623}
                  />
                </div>
              </div>
            </div>
            <div className='px-[44px] text-center'>
              <p className='text-animate mt-[16px] text-[20px] text-[#D1BA93]'>
                Although not perfect, it has significantly helped me practice
                and improve my design skills
              </p>
              <div className='mt-[64px]'>
                <p className='text-animate text-left text-[48px] font-[600] text-[#F4E4CA]'>
                  Exploring the foundations of creativity and growth
                </p>
                <div className='text-animate mt-[31px] flex items-start justify-end gap-[48px] text-left text-[20px] font-[400] text-[#D1BA93]'>
                  <p className='w-[483px]'>
                    This collection showcases my earliest design works, created
                    during a time when I was both learning the fundamentals of
                    design tools and refining my skills in layout, color
                    coordination, and typography. Each piece represents a step
                    in my journey of self-discovery as a designer, where I had
                    the freedom to explore, experiment, and push my creative
                    boundaries.
                  </p>
                  <p className='w-[483px]'>
                    The process was as challenging as it was rewarding, offering
                    valuable lessons in visual storytelling and problem-solving.
                    Although I later decided not to pursue graphic design as a
                    career path, these projects served as a critical stepping
                    stone, helping me identify my strengths and shape my design
                    perspective.
                  </p>
                  <p className='w-[483px]'>
                    Most importantly, this experience paved the way for me to
                    find my true passion in product design. It gave me the
                    confidence and foundation to approach design with a
                    user-centric mindset, bridging creativity with
                    functionality. Looking back, I am grateful for this period
                    of exploration that set me on the path to a fulfilling
                    career in design.
                  </p>
                </div>
              </div>{' '}
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/11.webp'
                    alt='Shin404'
                    width={624}
                    height={779}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/12.webp'
                    alt='Shin404'
                    width={550}
                    height={779}
                  />
                </div>{' '}
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/13.webp'
                    alt='Shin404'
                    width={623}
                    height={779}
                  />
                </div>
              </div>
              <p className='text-animate mt-[16px] text-[20px] text-[#D1BA93]'>
                I also challenged myself by designing movie posters like the
                ones above
              </p>
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/14.webp'
                    alt='Shin404'
                    width={1189}
                    height={623}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/15.webp'
                    alt='Shin404'
                    width={623}
                    height={623}
                  />
                </div>
              </div>
              <div className='project-row mt-[16px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/16.webp'
                    alt='Shin404'
                    width={603}
                    height={754}
                    unoptimized
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/17.webp'
                    alt='Shin404'
                    width={603}
                    height={754}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/18.webp'
                    alt='Shin404'
                    width={591}
                    height={754}
                  />
                </div>
              </div>
              <p className='text-animate mt-[16px] text-[20px] text-[#D1BA93]'>
                The Beat the Heat event at HRC features an exciting lineup of
                bands, including Splat, Furr Cough, and the Hanoing Jazz Band.
              </p>
              <div className='mt-[64px]'>
                <p className='text-animate text-left text-[48px] font-[600] text-[#F4E4CA]'>
                  Learning through hands-on experience: A journey of trial and
                  growth
                </p>
                <div className='text-animate mt-[31px] flex items-start justify-end gap-[48px] text-left text-[20px] font-[400] text-[#D1BA93]'>
                  <p className='w-[578px]'>
                    Teaching myself design through creating these projects has
                    been an incredibly effective and enjoyable process. By
                    diving into actual design work, I found that I could better
                    understand the principles of layout, color, and typography
                    while also exploring my own creative style. Each project
                    became a lesson, providing a hands-on way to develop my
                    skills and grow as a designer.
                  </p>
                  <p className='w-[578px]'>
                    Although my designs were far from perfect and often filled
                    with mistakes, each error taught me something valuable.
                    These challenges pushed me to research more deeply,
                    experiment boldly, and refine my approach. This process of
                    trial and error not only sharpened my technical skills but
                    also gave me insight into my preferences and strengths as a
                    designer.
                  </p>
                </div>
              </div>{' '}
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/19.webp'
                    alt='Shin404'
                    width={599}
                    height={749}
                    unoptimized
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/20.webp'
                    alt='Shin404'
                    width={599}
                    height={749}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/21.webp'
                    alt='Shin404'
                    width={599}
                    height={749}
                  />
                </div>
              </div>
              <p className='text-animate my-[16px] text-[20px] text-[#D1BA93]'>
                More and more styles...
              </p>{' '}
              <div className='project-row mt-[16px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/22.webp'
                    alt='Shin404'
                    width={459}
                    height={574}
                    unoptimized
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/23.webp'
                    alt='Shin404'
                    width={431}
                    height={574}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/24.webp'
                    alt='Shin404'
                    width={459}
                    height={574}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/personal/25.webp'
                    alt='Shin404'
                    width={459}
                    height={574}
                  />
                </div>
              </div>
              <p className='text-animate mt-[64px] text-[24px] text-[#D1BA93]'>
                This self-directed journey has been an essential stepping stone
                in my design career. It helped me identify my passion for visual
                storytelling and problem-solving while building the confidence
                to pursue more ambitious projects. Though it’s just the
                beginning, these experiences have solidified my belief that
                learning by doing is the best path for me to grow and evolve as
                a designer.
              </p>
            </div>
            <div className='relative mt-[64px]'>
              <CustomImage
                src='/images/works/personal/intro.webp'
                alt='Shin404'
                width={1921}
                height={914}
                className='w-full'
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
                <p className='text-animate text-[20px] text-[#D1BA93]'>
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

export default Personal;
