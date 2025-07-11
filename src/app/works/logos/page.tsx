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
import useCustomRouter from '@/hook/useCustomRouter';

gsap.registerPlugin(ScrollTrigger);

const LogosPage = () => {
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
  const customRouter = useCustomRouter();

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
    VIEW_MORE_PROJECT: INFO.PROJECT.LOGOS,
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
                  Experiment with logos
                </h1>
              </div>

              <div className='overflow-hidden'>
                <h2
                  ref={subtitleRef}
                  className='text-[40px] leading-[57.6px] text-[#F4E4CA]'
                >
                  Logo design (1 designer)
                </h2>
              </div>

              <div
                ref={roleRef}
                className='mt-[16px] text-[20px] font-[400] uppercase leading-[26px] text-[#D1BA93]'
              >
                <div className='overflow-hidden'>
                  <p>role: GRAPHIC DESIGNer </p>
                </div>
                <div className='overflow-hidden'>
                  <p>TIME: MAR 2025 - NOW</p>
                </div>
              </div>
              <div className='my-[48px] overflow-hidden'>
                <ButtonVisit
                  buttonRef={buttonRef}
                  href={INFO.PROJECT.LOGOS}
                  title='View more project'
                />
              </div>

              <div
                ref={tagsRef}
                className='text-[18px] font-[400] leading-[24px] text-[rgba(244,228,201,0.70)]'
              >
                <p className='overflow-hidden'># Logo_design</p>
                <p className='overflow-hidden'># Personal_PJ</p>
                <p className='overflow-hidden'># Graphic_design</p>
              </div>
            </div>
            {/* Ảnh bên phải */}
            <div
              ref={imageRef}
              className='absolute right-[-13rem] top-0 z-10 h-screen w-[70%]'
            >
              <CustomImage
                src='/images/works/logos/intro.webp'
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
                <span className='font-[700]'>Experiment with logos</span> | Logo
                design (1 designer)
              </h1>
              <div className='text-animate text-[20px] font-[400] text-[#D1BA93]'>
                <p className='mt-[16px] uppercase'>role: GRAPHIC DESIGNer</p>
                <p className='uppercase'>Time: MAR 2025 - NOW</p>
                <p># Logo_design # Personal_PJ # Graphic_design</p>
              </div>
              <div className='text-animate'>
                <ButtonVisit
                  href={INFO.PROJECT.LOGOS}
                  className='mt-[48px]'
                  title='View more project'
                />
              </div>
              <p className='text-animate pt-[64px] text-center text-[48px] font-[600] text-[#F4E4CA]'>
                1. Lowkey logo
              </p>
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/logos/1.webp'
                    alt='Shin404'
                    width={650}
                    height={650}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/logos/2.webp'
                    alt='Shin404'
                    width={1160}
                    height={650}
                  />
                </div>
              </div>
              <p className='text-animate py-[64px] text-center text-[24px] text-[#D1BA93]'>
                This project was an internal initiative for team Lowkey, where I
                had the privilege of spending six months as a contributing
                member. It was an incredible opportunity for me to explore an
                aspect of design I had never ventured into before. Initially,
                the process was filled with challenges, as I had to familiarize
                myself with a new creative direction and adapt to the {`team's`}
                unique requirements.
              </p>
              <div className='project-row flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/logos/3.webp'
                    alt='Shin404'
                    width={1034}
                    height={775}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/logos/4.webp'
                    alt='Shin404'
                    width={775}
                    height={775}
                  />
                </div>
              </div>{' '}
              <p className='text-animate my-[16px] text-[20px] text-[#D1BA93]'>
                Thanks to the enthusiastic support and guidance of my teammates,
                especially the senior members, I was able to overcome these
                hurdles and develop a complete visual identity for the team.
              </p>
              <div className='project-row flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/logos/6.webp'
                    alt='Shin404'
                    width={775}
                    height={775}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/logos/5.webp'
                    alt='Shin404'
                    width={1034}
                    height={775}
                  />
                </div>
              </div>
            </div>
            <div className='px-[44px] text-center'>
              <p className='text-animate mt-[16px] text-[20px] text-[#D1BA93]'>
                This project not only helped me grow as a designer but also
                allowed me to understand the importance of collaboration and
                teamwork in creating meaningful designs.
              </p>
              <p className='text-animate pt-[64px] text-center text-[48px] font-[600] text-[#F4E4CA]'>
                2. 404 Anime, Shin404, Mon404 & Conan404 logo
              </p>
              <div className='project-row'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/logos/7.webp'
                    alt='Shin404'
                    unoptimized
                    className='mt-[64px]'
                    width={1834}
                    height={1036}
                  />
                </div>
              </div>
              <p className='text-animate mt-[16px] text-[16px] text-[#D1BA93]'>
                A small part of a larger personal project I collaborated on with
                a developer friend
              </p>
              <div className='mt-[64px]'>
                <p className='text-animate text-left text-[48px] font-[600] text-[#F4E4CA]'>
                  When logos carry texture and tell a story to our community
                </p>
                <div className='text-animate mt-[31px] flex items-start justify-end gap-[48px] text-left text-[20px] font-[400] text-[#D1BA93]'>
                  <p className='w-[483px]'>
                    Creating logos in the realm of animation posed unique
                    challenges. I had to balance simplicity and creativity while
                    ensuring each design was distinctive yet cohesive with the
                    overarching theme.
                  </p>
                  <p className='w-[483px]'>
                    Whether it was the playful essence of Shin404 or the
                    detective spirit of Conan404, each logo required a tailored
                    approach to reflect its personality.
                  </p>
                  <p className='w-[483px]'>
                    Working closely with my team and gathering feedback from
                    fellow enthusiasts helped me refine each logo. These
                    experiences not only enhanced my technical skills but also
                    deepened my connection to the art of storytelling through
                    visual design.
                  </p>
                </div>
              </div>{' '}
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/logos/8.webp'
                    alt='Shin404'
                    width={1034}
                    height={775}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/logos/9.webp'
                    alt='Shin404'
                    width={775}
                    height={775}
                  />
                </div>
              </div>
              <p className='text-animate my-[16px] text-[20px] text-[#D1BA93]'>
                The journey of creating logos for projects like Anime404,
                Shin404, Mon404, and Conan404 began with a deep appreciation for
                the world of animation. Each logo was inspired by the unique
                traits of the characters and stories they represent. My goal was
                to capture the essence of these beloved universes while crafting
                a visual identity that resonates with fans and feels timeless.
              </p>{' '}
              <div className='mb-[16px] flex justify-center overflow-hidden'>
                <div
                  ref={buttonRef}
                  className='btn-primary group cursor-pointer'
                  onClick={() => {
                    customRouter.push('/works/shin404');
                  }}
                >
                  View detail Shin404 Project
                  <IconArrowBold className='transition-all duration-300 group-hover:rotate-45' />
                </div>
              </div>
              <div className='project-row flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/logos/10.webp'
                    alt='Shin404'
                    width={1034}
                    height={775}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/mon404_logo.webp'
                    alt='Shin404'
                    width={775}
                    height={775}
                  />
                </div>
              </div>
              <p className='text-animate my-[16px] text-[20px] text-[#D1BA93]'>
                Additional visuals from smaller projects within the overarching
                Anime 404 initiative
              </p>{' '}
              <div className='project-row flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/conan404_logo.webp'
                    alt='Shin404'
                    width={775}
                    height={775}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/logos/11.webp'
                    alt='Shin404'
                    width={1034}
                    height={775}
                  />
                </div>
              </div>
              <p className='text-animate my-[64px] text-[20px] text-[#D1BA93]'>
                While the logos above may not meet the standards of a
                professional logo designer, they represent valuable lessons in
                mastering design tools such as Illustrator, Figma... These
                experiences have allowed me to expand my skill set and explore
                creative possibilities that go beyond just designing websites or
                apps. Looking ahead, I envision applying these insights to more
                multifaceted projects, perhaps even creating and sustaining a
                comprehensive product in the future.
              </p>{' '}
            </div>
            <div className='relative mt-[64px]'>
              <CustomImage
                src='/images/works/logos/intro.webp'
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

export default LogosPage;
