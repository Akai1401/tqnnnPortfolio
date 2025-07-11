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

const Supporter = () => {
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
                  Another projects as <br /> a supporter
                </h1>
              </div>

              {/* <div className='overflow-hidden'>
                <h2
                  ref={subtitleRef}
                  className='text-[40px] leading-[57.6px] text-[#F4E4CA]'
                >
                  Logo design (1 designer)
                </h2>
              </div> */}

              <div
                ref={roleRef}
                className='mt-[16px] text-[20px] font-[400] uppercase leading-[26px] text-[#D1BA93]'
              >
                <div className='overflow-hidden'>
                  <p>role: ui/ux DESIGNer & graphic designer</p>
                </div>
                <div className='overflow-hidden'>
                  <p>TIME: oct 2024 - dec 2024</p>
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
                <p className='overflow-hidden'># Graphic_design</p>
                <p className='overflow-hidden'># UI/UX_design</p>
                <p className='overflow-hidden'># Another_PJ</p>
              </div>
            </div>
            {/* Ảnh bên phải */}
            <div
              ref={imageRef}
              className='absolute right-[-13rem] top-0 z-10 h-screen w-[70%]'
            >
              <CustomImage
                src='/images/works/supporter/intro.webp'
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
                Another projects as a supporter
              </h1>
              <div className='text-animate text-[20px] font-[400] text-[#D1BA93]'>
                <p className='mt-[16px] uppercase'>
                  role: ui/ux designer & GRAPHIC DESIGNer
                </p>
                <p className='uppercase'>Time: oct 2024 - dec 2024</p>
                <p># Graphic_design # UI/UX_design # Supporter # Another_PJ</p>
              </div>
              <div className='text-animate'>
                <ButtonVisit
                  href={INFO.PROJECT.LOGOS}
                  className='mt-[48px]'
                  title='View more project'
                />
              </div>
              <p className='text-animate pt-[64px] text-center text-[48px] font-[600] text-[#F4E4CA]'>
                1. Aits Mobile Operations
              </p>
              <div className='mt-[16px] flex justify-center overflow-hidden'>
                <ButtonVisit
                  href={
                    'https://www.figma.com/proto/LdPhqDlhyDNboN7G2p0Mph/%F0%9F%94%B4--Un-Official--Aits-Mobile-Operations?page-id=269%3A1232&node-id=4213-5785&viewport=-1704%2C-250%2C0.21&t=4crO40qAAH6N7vRv-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=4213%3A5785&show-proto-sidebar=1'
                  }
                  title='More details'
                />
              </div>{' '}
              <p className='text-animate py-[64px] text-center text-[24px] text-[#D1BA93]'>
                This product was developed specifically for the pilot team of
                Vietnam Airlines, one of the leading airlines in Vietnam. Its
                primary goal is to streamline how pilots access, read, and
                approve flight-related documents, making the process more
                convenient, efficient, and user-friendly, especially under
                time-sensitive conditions.
              </p>
              <div className='project-row flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/supporter/1.webp'
                    alt='Shin404'
                    width={650}
                    height={650}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/supporter/2.webp'
                    alt='Shin404'
                    width={1160}
                    height={650}
                  />
                </div>
              </div>
              <p className='text-animate py-[64px] text-center text-[24px] text-[#D1BA93]'>
                During the course of this project, I was responsible for
                designing several key features, particularly those related to
                organizing, searching, filtering flight schedules, and
                navigating the document review process. My focus was on creating
                a seamless and intuitive experience that would minimize effort
                and maximize clarity for users who rely on precision and speed.
              </p>
              <div className='project-row flex items-start justify-between'>
                {' '}
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/supporter/4.webp'
                    alt='Shin404'
                    width={775}
                    height={775}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/supporter/3.webp'
                    alt='Shin404'
                    unoptimized
                    width={1034}
                    height={775}
                  />
                </div>
              </div>{' '}
            </div>
            <div className='px-[44px] text-center'>
              <p className='text-animate mt-[64px] text-[20px] text-[#D1BA93]'>
                The project was completed over the span of one month, with a
                small but focused team of two designers. Despite the tight
                timeline, the collaboration was smooth and productive. It was an
                exciting opportunity to apply user-centric design principles in
                a high stakes, real world setting and to contribute to a product
                that directly supports professionals in the aviation industry.
              </p>
              <p className='text-animate pt-[64px] text-center text-[48px] font-[600] text-[#F4E4CA]'>
                2. Saint Gobain Web
              </p>{' '}
              {/*  <div className='mt-[16px] flex justify-center overflow-hidden'>
                <ButtonVisit
                  href={
                    'https://www.figma.com/proto/LdPhqDlhyDNboN7G2p0Mph/%F0%9F%94%B4--Un-Official--Aits-Mobile-Operations?page-id=269%3A1232&node-id=4213-5785&viewport=-1704%2C-250%2C0.21&t=4crO40qAAH6N7vRv-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=4213%3A5785&show-proto-sidebar=1'
                  }
                  title='More details'
                />
              </div>{' '} */}
              <p className='text-animate mt-[16px] mb-[64px] text-[20px] text-[#D1BA93]'>
                This project was centered around an e-commerce platform for
                purchasing solar panels imported from the USA. The goal was to
                modernize the existing website, making it more visually
                appealing and significantly more user-friendly. The updated
                design puts a strong emphasis on a clean, intuitive interface
                that supports a smooth and efficient user journey from exploring
                products to completing a purchase.
              </p>
              <div className='project-row'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/supporter/5.webp'
                    alt='Shin404'
                    unoptimized
                    width={1834}
                    height={1036}
                  />
                </div>
              </div>
              <p className='text-animate mt-[16px] text-[20px] text-[#D1BA93]'>
                In this project, I contributed to the conceptual development of
                several key sections, particularly those related to the visual
                representation of rooftops - one of the most essential elements
                in the solar panel context. I worked on refining visual
                components and layout ideas that clearly communicate how the
                products integrate with residential spaces, while maintaining a
                modern and trustworthy look.
              </p>
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/supporter/6.webp'
                    alt='Shin404'
                    width={1034}
                    height={775}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/supporter/7.webp'
                    alt='Shin404'
                    width={775}
                    height={775}
                  />
                </div>
              </div>
              <p className='text-animate mt-[16px] text-[20px] text-[#D1BA93]'>
                The redesign was based on the foundation of the older version of
                the website but was carefully reimagined with a more current
                design direction and enhanced usability. The project was
                completed within two weeks by a team of two designers, and it
                was a valuable experience in balancing visual storytelling with
                functional e-commerce design.
              </p>{' '}
              <p className='text-animate pt-[64px] text-center text-[48px] font-[600] text-[#F4E4CA]'>
                3. Concert of Childhood Memory
              </p>{' '}
              <p className='text-animate mb-[64px] mt-[16px] text-[24px] text-[#D1BA93]'>
                Concert of Childhood Memory is a large scale annual symphonic
                event in Vietnam that brings the enchanting world of Studio
                Ghibli to life through music. This beloved concert series
                celebrates the emotional connection many people have with
                Ghibli’s timeless soundtracks, making it a highly anticipated
                cultural event each year.
              </p>
              <div className='project-row'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/supporter/8.webp'
                    alt='Shin404'
                    unoptimized
                    width={1834}
                    height={1036}
                  />
                </div>
              </div>
              <p className='text-animate mt-[16px] text-[20px] text-[#D1BA93]'>
                For the 2024 edition, I had the opportunity to contribute as a
                visual designer, supporting the creation of the {`event's`} key
                visual. My role involved helping shape the overall look and feel
                that would capture the magical, nostalgic essence of Ghibli
                while aligning with the concert’s tone and message.
              </p>
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/supporter/9.webp'
                    alt='Shin404'
                    width={1034}
                    height={775}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/supporter/10.webp'
                    alt='Shin404'
                    width={775}
                    height={775}
                  />
                </div>
              </div>
              <p className='text-animate my-[16px] text-[20px] text-[#D1BA93]'>
                It was a meaningful experience to blend visual storytelling with
                the music that shaped so many childhoods. Being part of this
                creative process allowed me to explore softer, more emotional
                design elements and collaborate closely with a team that shared
                a deep passion for art, music, and animation.
              </p>{' '}
            </div>
            <div className='relative mt-[64px]'>
              <CustomImage
                src='/images/works/supporter/intro.webp'
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

export default Supporter;
