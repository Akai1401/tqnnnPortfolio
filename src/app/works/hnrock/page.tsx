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

const HnRock = () => {
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
    WEBSITE: 'https://hrcwelive.com/',
    FACEBOOK: 'https://www.facebook.com/hanoirockcity.welive/?locale=vi_VN',
    TIKTOK: 'https://www.tiktok.com/@hanoirockcity?lang=vi-VN',
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
                  Hanoi Rock City
                </h1>
              </div>

              <div className='overflow-hidden'>
                <h2
                  ref={subtitleRef}
                  className='text-[40px] leading-[57.6px] text-[#F4E4CA]'
                >
                  A live music venue
                </h2>
              </div>

              <div
                ref={roleRef}
                className='mt-[16px] text-[20px] font-[400] uppercase leading-[26px] text-[#D1BA93]'
              >
                <div className='overflow-hidden'>
                  <p>role: CREATIVE GRAPHIC DESIGNer</p>
                </div>
                <div className='overflow-hidden'>
                  <p>TIME: JAN 2024 - MAR 2025</p>
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
                <p className='overflow-hidden'># HanoiRockCity</p>
                <p className='overflow-hidden'># Graphic_design</p>
                <p className='overflow-hidden'># a_live_music_venue</p>{' '}
                <p className='overflow-hidden'># base_in_Hanoi</p>
              </div>
            </div>
            {/* Ảnh bên phải */}
            <div
              ref={imageRef}
              className='absolute right-[-13rem] top-0 z-10 h-screen w-[70%]'
            >
              <CustomImage
                src='/images/works/rock/intro.webp'
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
                <span className='font-[700]'>Hanoi Rock City</span> | A live
                music venue
              </h1>
              <div className='text-animate text-[20px] font-[400] text-[#D1BA93]'>
                <p className='mt-[16px] uppercase'>
                  role: CREATIVE GRAPHIC DESIGNer
                </p>
                <p className='uppercase'>Time: JAN 2024 - MAR 2025</p>
                <p>
                  # HanoiRockCity # Graphic_design # a_live_music_venue #
                  base_in_Hanoi
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
                    src='/images/works/rock/1.webp'
                    alt='Shin404'
                    width={657}
                    height={493}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/2.webp'
                    alt='Shin404'
                    width={493}
                    height={493}
                    unoptimized
                  />
                </div>{' '}
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/3.webp'
                    alt='Shin404'
                    width={657}
                    height={493}
                    unoptimized
                  />
                </div>
              </div>
              <div className='project-row mt-[16px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/4.webp'
                    alt='Shin404'
                    width={1039}
                    height={777}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/5.webp'
                    alt='Shin404'
                    width={775}
                    height={777}
                    unoptimized
                  />
                </div>
              </div>
              <p className='text-animate mt-[16px] text-center text-[20px] text-[#D1BA93]'>
                HRC14 - All for One event by Hanoi Rock City, taking place in
                January 2025, will feature numerous artists and attract
                thousands of attendees over 05 nights of performances
              </p>
              <p className='text-animate py-[64px] text-center text-[24px] text-[#D1BA93]'>
                Hanoi Rock City was born from the desire to create a space where
                Vietnamese youth could immerse themselves in music and art. Over
                more than a decade, it has grown into a vibrant community that
                welcomes both locals and international friends, nestled in the
                familiar corner of To Ngoc Van Street. Artists come to HRC to
                give their all on the live stage, while audiences amplify the
                sound of passion together. For me, becoming a designer in such a
                creative space has been a journey of self-discovery, allowing me
                to explore new facets of my design abilities. It’s the perfect
                environment to showcase creativity and forge meaningful
                connections with peers and professionals in the design and
                creative industries.
              </p>
              <div className='project-row flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/6.webp'
                    alt='Shin404'
                    width={1192}
                    height={624}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/7.webp'
                    alt='Shin404'
                    width={624}
                    height={624}
                  />
                </div>
              </div>
            </div>
            <div className='px-[44px] text-center'>
              <p className='text-animate mt-[16px] text-[16px] text-[#D1BA93]'>
                Women of Hanoi Show on March 8, 2024, featuring performances by
                Ddet, Mac Mai Suong, and Tu
              </p>
              <div className='mt-[64px]'>
                <p className='text-animate text-left text-[48px] font-[600] text-[#F4E4CA]'>
                  Hanoi Rock City: Where creativity meets community
                </p>
                <div className='text-animate mt-[31px] flex items-start justify-end gap-[48px] text-left text-[20px] font-[400] text-[#D1BA93]'>
                  <p className='w-[483px]'>
                    HRC is more than just a music venue, it is a vibrant hub for
                    artistic expression and cultural exchange. Since its
                    founding, HRC has been a beacon for Vietnam’s creative
                    youth, providing a space where music, art, and community
                    converge. This unique space has grown over the past decade
                    into a melting pot of diverse talents, uniting local and
                    international artists in a shared passion for creativity.
                  </p>
                  <p className='w-[483px]'>
                    HRC was born from a desire to give Vietnam’s youth a stage
                    to express themselves and connect with others. Over the
                    years, it has hosted countless live performances,
                    exhibitions, and workshops, making it a cornerstone of
                    Hanoi’s creative landscape. For artists, HRC represents a
                    place to experiment, to perform fearlessly, and to ignite
                    inspiration within a supportive and energetic community.
                  </p>
                  <p className='w-[483px]'>
                    The beauty of HRC lies in its ability to bring people
                    together. Musicians, designers, and art enthusiasts from all
                    walks of life gather to share their work and experiences,
                    creating a dynamic exchange of ideas. It’s not just a venue,
                    it’s a movement that thrives on collaboration and the
                    collective energy of its community.
                  </p>
                </div>
              </div>{' '}
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/8.webp'
                    alt='Shin404'
                    width={907}
                    height={907}
                    unoptimized
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/9.webp'
                    alt='Shin404'
                    width={907}
                    height={907}
                  />
                </div>
              </div>
              <p className='text-animate my-[16px] text-[16px] text-[#D1BA93]'>
                Rockin’ New Year event at HRC features an exciting lineup of
                bands, including Atinybit, Abyxx, and the Meow Lac.
              </p>
              <div className='project-row flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/10.webp'
                    alt='Shin404'
                    width={1192}
                    height={624}
                    unoptimized
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/11.webp'
                    alt='Shin404'
                    width={624}
                    height={624}
                  />
                </div>
              </div>
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/12.webp'
                    alt='Shin404'
                    width={624}
                    height={624}
                    unoptimized
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/13.webp'
                    alt='Shin404'
                    width={1189}
                    height={624}
                  />
                </div>
              </div>
              <p className='text-animate mt-[16px] text-[16px] text-[#D1BA93]'>
                The Beat the Heat event at HRC features an exciting lineup of
                bands, including Splat, Furr Cough, and the Hanoing Jazz Band.
              </p>
              <div className='mt-[64px]'>
                <p className='text-animate text-left text-[48px] font-[600] text-[#F4E4CA]'>
                  Every project, a new adventure - A cherished chapter in my
                  career
                </p>
                <div className='text-animate mt-[31px] flex items-start justify-end gap-[48px] text-left text-[20px] font-[400] text-[#D1BA93]'>
                  <p className='w-[578px]'>
                    Each project at HRC has been a fresh experience, presenting
                    a unique style and a distinct set of challenges. From
                    designing vibrant visuals for live music events to creating
                    cohesive branding for community gatherings, I’ve been pushed
                    to expand my creative boundaries and adapt to different
                    artistic directions. These experiences have not only refined
                    my skills but also deepened my appreciation for the
                    diversity and vibrancy of the creative field.
                  </p>
                  <p className='w-[578px]'>
                    I deeply value the opportunity to contribute, even in small
                    ways, to the creative heartbeat of HRC. Every design I
                    crafted and every idea I brought to life here holds a
                    special place in my journey as a designer. While my
                    contributions may have been modest, they represent an
                    invaluable chapter in my career, filled with moments of
                    growth, inspiration, and unforgettable memories.
                  </p>
                </div>
              </div>{' '}
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/14.webp'
                    alt='Shin404'
                    width={705}
                    height={705}
                    unoptimized
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/15.webp'
                    alt='Shin404'
                    width={397}
                    height={705}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/16.webp'
                    alt='Shin404'
                    width={696}
                    height={705}
                  />
                </div>
              </div>
              <p className='text-animate my-[16px] text-[20px] text-[#D1BA93]'>
                This is just the beginning of an exciting journey. With every
                step forward, we strive to create a platform that not only
                celebrates the joy of anime but also shapes the future of
                animation appreciation in Vietnam and beyond.
              </p>{' '}
              <div className='project-row mt-[16px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/17.webp'
                    alt='Shin404'
                    width={637}
                    height={610}
                    unoptimized
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/18.webp'
                    alt='Shin404'
                    width={1178}
                    height={610}
                  />
                </div>
              </div>
              <p className='text-animate mt-[16px] text-[20px] text-[#D1BA93]'>
                This is just the beginning of an exciting journey. With every
                step forward, we strive to create a platform that not only
                celebrates the joy of anime but also shapes the future of
                animation appreciation in Vietnam and beyond.
              </p>
              <div className='project-row mt-[16px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/19.webp'
                    alt='Shin404'
                    width={1187}
                    height={621}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/rock/20.webp'
                    alt='Shin404'
                    width={621}
                    height={621}
                    unoptimized
                  />
                </div>
              </div>
              <p className='text-animate mt-[64px] text-[20px] text-[#D1BA93]'>
                I am profoundly thankful to anh Hoang Hiep (my teacher) and the
                wonderful friends I’ve met at HRC. Their support, constructive
                feedback, and those amazing designer dates have been
                instrumental in shaping me, both as a professional and as a
                person. These moments of collaboration and learning are
                something I will always carry with me, and I am forever grateful
                for the camaraderie and inspiration this community has given me.
              </p>
            </div>
            <div className='relative mt-[64px]'>
              <CustomImage
                src='/images/works/rock/intro.webp'
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

export default HnRock;
