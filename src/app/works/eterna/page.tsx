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

const Eterna = () => {
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
    BEHANCE: INFO.PROJECT.ETERNA,
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
                  Eterna Skin Clinic
                </h1>
              </div>

              <div className='overflow-hidden'>
                <h2
                  ref={subtitleRef}
                  className='text-[40px] leading-[57.6px] text-[#F4E4CA]'
                >
                  Healthcare Website (1 designer)
                </h2>
              </div>

              <div
                ref={roleRef}
                className='mt-[16px] text-[20px] font-[400] uppercase leading-[26px] text-[#D1BA93]'
              >
                <div className='overflow-hidden'>
                  <p>role: UI UX DESIGNer </p>
                </div>
                <div className='overflow-hidden'>
                  <p>TIME: NOV 2024 - dec 2024</p>
                </div>
              </div>
              <div className='my-[48px] overflow-hidden'>
                <ButtonVisit
                  buttonRef={buttonRef}
                  href={INFO.PROJECT.ETERNA}
                  title='View full project'
                />
              </div>

              <div
                ref={tagsRef}
                className='text-[18px] font-[400] leading-[24px] text-[rgba(244,228,201,0.70)]'
              >
                <p className='overflow-hidden'># Healthcare</p>
                <p className='overflow-hidden'># Eterna_Clinic_Skin</p>
                <p className='overflow-hidden'># Beauty</p>
                <p className='overflow-hidden'># UI_Design</p>
              </div>
            </div>
            {/* Ảnh bên phải */}
            <div
              ref={imageRef}
              className='absolute right-[-13rem] top-0 z-10 h-screen w-[70%]'
            >
              <CustomImage
                src='/images/works/eterna/intro2.webp'
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
                <span className='font-[700]'>Eterna Skin Clinic</span> | Web3
                Landing Healthcare Website (1 designer)
              </h1>
              <div className='text-animate text-[20px] font-[400] text-[#D1BA93]'>
                <p className='mt-[16px] uppercase'>role: UI UX DESIGNer</p>
                <p className='uppercase'>Time: oct 2024 - dec 2024</p>
                <p># Healthcare # Eterna_Clinic_Skin # Beauty # UI_Design</p>
              </div>
              <div className='text-animate'>
                <ButtonVisit
                  href={INFO.PROJECT.ETERNA}
                  className='mt-[48px]'
                  title='View full project'
                />
              </div>
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/eterna/1.webp'
                    alt='Shin404'
                    width={647}
                    height={647}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/eterna/2.webp'
                    alt='Shin404'
                    width={1160}
                    height={647}
                  />
                </div>
              </div>
              <p className='text-animate py-[64px] text-center text-[24px] text-[#D1BA93]'>
                This product is designed with a modern aesthetic and a focus on
                simplicity, ensuring it feels approachable and intuitive from
                the first interaction. Every detail has been thoughtfully
                crafted to create a seamless experience, combining clean design
                with practical functionality. Whether it’s the sleek interface,
                carefully chosen color palettes, or responsive design, each
                element reflects our commitment to providing a solution that
                feels both contemporary and user-friendly.
              </p>
              <div className='project-row'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/eterna/3.webp'
                    alt='Shin404'
                    unoptimized
                    width={1834}
                    height={1036}
                  />
                </div>
              </div>{' '}
              <p className='text-animate py-[64px] text-center text-[24px] text-[#D1BA93]'>
                At the heart of our product is the user. I’ve prioritized
                creating an experience that not only meets the needs of our
                audience but also enhances their trust and satisfaction. By
                simplifying navigation and ensuring accessibility across all
                devices, we aim to deliver a product that is easy to use and
                reliable. For those who choose our product, we’re dedicated to
                offering the best possible experience, ensuring every
                interaction feels effortless and rewarding.
              </p>
              <div className='project-row'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/eterna/4.webp'
                    alt='Shin404'
                    unoptimized
                    width={1834}
                    height={1036}
                  />
                </div>
              </div>{' '}
            </div>
            <div className='px-[44px] text-center'>
              <p className='text-animate mt-[16px] text-[16px] text-[#D1BA93]'>
                Visual identity of Eterna Skin Clinic
              </p>{' '}
              <div className='mt-[64px]'>
                <p className='text-animate text-left text-[48px] font-[600] text-[#F4E4CA]'>
                  A Blend of Aesthetics and Functionality
                </p>
                <div className='text-animate mt-[31px] flex items-start justify-end gap-[48px] text-left text-[20px] font-[400] text-[#D1BA93]'>
                  <p className='w-[483px]'>
                    One of the most exciting aspects of the Eterna Skin Clinic
                    project was designing a digital space that seamlessly
                    combined elegance with usability. The challenge of
                    reflecting the {`brand's`} luxurious skincare services
                    through clean, modern, and approachable visuals pushed my
                    creativity to new heights. It was fascinating to see how
                    subtle design elements, like soft gradients and refined
                    typography, could evoke a sense of trust and sophistication.
                  </p>
                  <p className='w-[483px]'>
                    Diving into the world of skincare brought an added layer of
                    excitement. Conducting user research and exploring customer
                    pain points allowed me to connect with a new audience and
                    design solutions tailored to their needs. From simplifying
                    navigation for users seeking treatments to ensuring clear
                    and compelling call-to-action buttons, every small detail
                    became an opportunity to make a meaningful impact.
                  </p>
                  <p className='w-[483px]'>
                    This project also stood out for its collaborative nature.
                    Working closely with stakeholders and developers to align on
                    goals and bring the design to life was both rewarding and
                    enriching. Brainstorming ideas, refining feedback, and
                    witnessing the seamless integration of design and technology
                    made the process enjoyable and inspiring. It reinforced my
                    belief in the power of teamwork to create exceptional
                    products.
                  </p>
                </div>
              </div>{' '}
              <div className='project-row'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/eterna/5.webp'
                    alt='Shin404'
                    unoptimized
                    className='mt-[64px]'
                    width={1834}
                    height={1036}
                  />
                </div>
              </div>
              <div className='project-row'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/eterna/6.webp'
                    alt='Shin404'
                    unoptimized
                    className='mt-[16px]'
                    width={1832}
                    height={1000}
                  />
                </div>
              </div>
              <p className='text-animate mt-[64px] text-left text-[48px] font-[600] text-[#F4E4CA]'>
                A Blend of Aesthetics and Functionality
              </p>
              <div className='text-animate mt-[31px] flex items-start justify-end gap-[48px] text-left text-[20px] font-[400] text-[#D1BA93]'>
                <p className='w-[578px]'>
                  As the UI/UX Designer for the Eterna Skin Clinic website, I
                  crafted a user-focused digital experience that reflected the
                  clinic’s premium skincare expertise. My role included user
                  research, wireframing, prototyping, and creating a cohesive
                  design system that balanced aesthetics and functionality.
                </p>
                <p className='w-[578px]'>
                  Through this project, I developed essential skills in
                  responsive design, user journey optimization, and iterative
                  problem-solving. Collaborating with stakeholders and
                  developers, I ensured the final product aligned with both user
                  needs and business goals. This experience deepened my
                  understanding of how empathy and attention to detail shape
                  effective design solutions.
                </p>
              </div>
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/eterna/7.webp'
                    alt='Shin404'
                    width={775}
                    height={775}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/eterna/8.webp'
                    alt='Shin404'
                    width={1034}
                    height={775}
                  />
                </div>
              </div>
              <div className='project-row mt-[16px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/eterna/9.webp'
                    alt='Shin404'
                    width={1034}
                    height={775}
                    unoptimized
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/eterna/10.webp'
                    alt='Shin404'
                    width={775}
                    unoptimized
                    height={775}
                  />
                </div>
              </div>
              <p className='text-animate mt-[16px] text-[20px] text-[#D1BA93]'>
                Note: This project focuses on image quality, interface design,
                and the aesthetic elements of a website, so it may not be as
                fully functional as standard website products.
              </p>{' '}
              <div className='project-row mt-[64px]'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/eterna/11.webp'
                    alt='Shin404'
                    unoptimized
                    width={1832}
                    height={1000}
                  />
                </div>
              </div>
              <p className='text-animate mt-[16px] text-[20px] text-[#D1BA93]'>
                Here are some visuals showcasing the branding elements of the
                product. These designs aim to reflect the core identity of the
                brand, highlighting its values and unique qualities.
              </p>{' '}
              <div className='relative mt-[64px]'>
                <CustomImage
                  src='/images/works/eterna/intro2.webp'
                  alt='Shin404'
                  width={1921}
                  height={914}
                />{' '}
                <div className='absolute inset-0 bg-[rgba(0,0,0,0.60)] backdrop-blur-[20px]'></div>
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
          </div>
          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
};

export default Eterna;
