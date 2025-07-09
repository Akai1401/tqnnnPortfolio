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

const Shin404Page = () => {
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

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [welcomeState]);

  const INFO_SOCIAL = {
    WEBSITE: 'https://www.shin404.com/',
    FACEBOOK: 'https://www.facebook.com/shin404Official',
    TIKTOK: 'https://www.tiktok.com/@shin404_team?lang=vi-VN',
    YOUTUBE: 'https://www.youtube.com/@Shin404Official',
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
                  Shin404 & 404 Anime
                </h1>
              </div>

              <div className='overflow-hidden'>
                <h2
                  ref={subtitleRef}
                  className='text-[40px] leading-[57.6px] text-[#F4E4CA]'
                >
                  Cartoon Website and App (1 designer)
                </h2>
              </div>

              <div
                ref={roleRef}
                className='mt-[16px] text-[20px] font-[400] uppercase leading-[26px] text-[#D1BA93]'
              >
                <div className='overflow-hidden'>
                  <p>role: UI UX DESIGNer | GRAPHIC DESIGNer | PRODUCT OWNER</p>
                </div>
                <div className='overflow-hidden'>
                  <p>TIME: SEP 2024 - JAN 2025</p>
                </div>
              </div>
              <div className='my-[48px] overflow-hidden'>
                <ButtonVisit
                  buttonRef={buttonRef}
                  href={INFO.PROJECT.SHIN404}
                />
              </div>

              <div
                ref={tagsRef}
                className='text-[18px] font-[400] leading-[24px] text-[rgba(244,228,201,0.70)]'
              >
                <p className='overflow-hidden'># Shin404</p>
                <p className='overflow-hidden'># Cartoon&film</p>
                <p className='overflow-hidden'># Product_design</p>
                <p className='overflow-hidden'># My_first_project</p>
              </div>
            </div>
            {/* Ảnh bên phải */}
            <div
              ref={imageRef}
              className='absolute right-[-13rem] top-0 z-10 h-screen w-[70%]'
            >
              <CustomImage
                src='/images/works/shin404/intro.webp'
                alt='Shin404'
                unoptimized
                fill
                className='object-cover object-center'
              />
            </div>
          </div>
          {/* Body */}
          <div className=''>
            <div className='bg-[url("/images/works/bg_all.webp")] bg-cover bg-center bg-no-repeat px-[44px] pt-[48px] text-center font-[400]'>
              <h1 className='text-[48px] text-[#F4E4CA]'>
                <span className='font-[700]'>Shin404 & 404 Anime</span> | Comic
                Cartoon Website and App (1 designer){' '}
              </h1>
              <div className='text-[20px] font-[400] text-[#D1BA93]'>
                <p className='mt-[16px]'>
                  Role: UI UX DESIGNer | GRAPHIC DESIGNer | PRODUCT OWNER
                </p>
                <p>AUG 2024 - NOW</p>
                <p>
                  # Shin404 # Cartoon&film # Product_design # My_first_project
                </p>
              </div>
              <ButtonVisit href={INFO.PROJECT.SHIN404} className='mt-[48px]' />
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/logo.webp'
                    alt='Shin404'
                    width={647}
                    height={647}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/banner.webp'
                    alt='Shin404'
                    width={1160}
                    height={647}
                  />
                </div>
              </div>
              <p className='py-[64px] text-center text-[24px] text-[#D1BA93]'>
                This is a personal project and also my very first product, which
                I poured my heart into, created in collaboration with a talented
                developer friend. Unlike typical interface design tasks, I had
                the opportunity to conceptualize and develop ideas from the very
                beginning stages to the point where it reached users. I gathered
                their feedback, evaluated the results, and worked on improving
                its quality. As of now, the website I designed has garnered ~
                <span className='font-[700]'> 70,000 visits.</span>
              </p>
              <div className='project-row flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/mockup_pc_1.webp'
                    alt='Shin404'
                    width={1034}
                    height={775}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/mockup_mobile_1.webp'
                    alt='Shin404'
                    width={775}
                    height={775}
                  />
                </div>
              </div>
              <div className='project-row mt-[16px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  {' '}
                  <CustomImage
                    src='/images/works/shin404/mockup_mobile_2.webp'
                    alt='Shin404'
                    width={775}
                    height={775}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/mockup_pc_2.webp'
                    alt='Shin404'
                    width={1034}
                    height={775}
                  />
                </div>
              </div>
            </div>
            <div className='px-[44px] text-center'>
              <p className='mt-[16px] text-[16px] text-[#D1BA93]'>
                Some visuals related to the product my partner and I are
                currently launching. We are continuously working hard to improve
                its quality and deliver the best possible experience
              </p>
              <div className='project-row'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/mockup_admin.webp'
                    alt='Shin404'
                    unoptimized
                    className='mt-[64px]'
                    width={1834}
                    height={1036}
                  />
                </div>
              </div>
              <p className='mt-[16px] text-[16px] text-[#D1BA93]'>
                Apart from the main website, we also have an additional platform
                to manage published content and monitor traffic for optimization
                (update 27th Jun 2025).
              </p>
              <div className='mt-[64px]'>
                <p className='text-left text-[48px] font-[600] text-[#F4E4CA]'>
                  Where nostalgia meets creativity – A vibrant hub for Shin chan
                  lovers
                </p>
                <div className='mt-[31px] flex items-start justify-end gap-[48px] text-left text-[20px] font-[400] text-[#D1BA93]'>
                  <p className='w-[483px]'>
                    As a <span className='font-[700]'>product designer</span>,
                    Shin404 represents more than just a project to me; it’s a
                    heartfelt endeavor to create a space where anime and
                    Shin-chan character enthusiasts in Vietnam can truly connect
                    and thrive. This platform is not merely about delivering
                    content - it’s about fostering a vibrant community grounded
                    in shared passion and creativity.
                  </p>
                  <p className='w-[483px]'>
                    My vision for Shin404 goes beyond curating nostalgic and
                    beloved anime content. I aspire to build a{' '}
                    <span className='font-[700]'>sustainable ecosystem</span>{' '}
                    where fans are{' '}
                    <span className='font-[700]'>
                      not just passive consumers
                    </span>{' '}
                    but{' '}
                    <span className='font-[700]'>
                      active contributors to the culture
                    </span>
                    . Whether you’re a newcomer discovering anime for the first
                    time or a long-time devotee, I hope Shin404 becomes a space
                    where everyone feels at home, where every interaction adds
                    value to the community.
                  </p>
                  <p className='w-[483px]'>
                    This journey is driven by the dream of elevating Vietnam’s
                    anime community, breaking through stereotypes, and providing
                    a platform that celebrates and empowers this unique fandom.
                    I believe Shin404 can become a cornerstone of connection—a
                    hub where ideas are exchanged, creativity flourishes, and
                    voices are amplified.
                  </p>
                </div>
              </div>{' '}
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/event.webp'
                    alt='Shin404'
                    width={1034}
                    height={775}
                  />
                </div>

                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/recruit.webp'
                    alt='Shin404'
                    width={775}
                    height={775}
                  />
                </div>
              </div>{' '}
              <p className='my-[16px] text-[20px] text-[#D1BA93]'>
                In addition to working as a UI/UX Designer, I also take on the
                role of designing graphic materials, including banners and
                posters, for the project.
              </p>{' '}
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/mockup_tiktok.webp'
                    alt='Shin404'
                    width={775}
                    height={775}
                  />
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/mockup_page.webp'
                    alt='Shin404'
                    width={1034}
                    height={775}
                  />
                </div>
              </div>{' '}
              <p className='mt-[16px] text-[20px] text-[#D1BA93]'>
                And as a result, within just four months of launching and
                running our channels, we successfully attracted over{' '}
                <span className='font-[700]'>6.2K followers on TikTok</span>,
                more than{' '}
                <span className='font-[700]'>
                  21K followers on our fan page
                </span>
                , and{' '}
                <span className='font-[700]'>22K members in our groups</span>
              </p>{' '}
              <div className='project-row'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/explore.webp'
                    alt='Shin404'
                    unoptimized
                    className='mt-[64px]'
                    width={1832}
                    height={1000}
                  />
                </div>
              </div>
              <div className='mt-[64px]'>
                <p className='text-left text-[48px] font-[600] text-[#F4E4CA]'>
                  Expanding beyond Shin-chan: A vision for the future of Shin404
                </p>
                <div className='mt-[31px] flex items-start justify-end gap-[48px] text-left text-[20px] font-[400] text-[#D1BA93]'>
                  <p className='w-[483px]'>
                    Our commitment to innovation drives us to go beyond what
                    others in the industry have done. We are dedicated to
                    developing unique features that not only enhance the user
                    experience but also set Shin404 apart as a trailblazer in
                    the anime community. From interactive storytelling to
                    customizable fan experiences, our future plans are centered
                    on nurturing creativity and engagement.
                  </p>
                  <p className='w-[483px]'>
                    We firmly believe in the power of animation to inspire and
                    bring people together. As we grow, one of our core missions
                    is to cultivate a deeper appreciation for anime among the
                    younger generation. By expanding our reach and creating
                    content that resonates with today’s youth, we hope to
                    instill a lifelong love for animation that transcends trends
                    and fosters a sense of community.
                  </p>
                  <p className='w-[483px]'>
                    In the coming years, Shin404 will not only broaden its scope
                    in terms of content and features but also expand its team
                    and resources to meet the demands of a growing community.
                    Our dream is to build Shin404 into a cultural hub where
                    anime lovers can find not just entertainment but also
                    meaningful connections and opportunities for collaboration.
                  </p>
                </div>
              </div>{' '}
              <div className='project-row mt-[64px] flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/404anime.webp'
                    alt='Shin404'
                    width={610}
                    height={612}
                  />
                </div>

                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/404anime_banner.webp'
                    alt='Shin404'
                    width={1200}
                    height={775}
                  />
                </div>
              </div>{' '}
              <p className='my-[16px] text-[20px] text-[#D1BA93]'>
                This is just the beginning of an exciting journey. With every
                step forward, we strive to create a platform that not only
                celebrates the joy of anime but also shapes the future of
                animation appreciation in Vietnam and beyond.
              </p>{' '}
              <div className='project-row flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/mon404.webp'
                    alt='Shin404'
                    width={1159}
                    height={647}
                  />{' '}
                </div>

                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/mon404_logo.webp'
                    alt='Shin404'
                    width={647}
                    height={647}
                  />
                </div>
              </div>{' '}
              <p className='my-[16px] text-[20px] text-[#D1BA93]'>
                with more projects...
              </p>{' '}
              <div className='project-row flex items-start justify-between'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/conan404_logo.webp'
                    alt='Shin404'
                    width={647}
                    height={647}
                  />
                </div>

                <div className='project-anim-wrapper overflow-hidden'>
                  <CustomImage
                    src='/images/works/shin404/conan404.webp'
                    alt='Shin404'
                    width={1159}
                    height={647}
                  />{' '}
                </div>
              </div>{' '}
              <div className='relative mt-[64px]'>
                <CustomImage
                  src='/images/works/shin404/end2.webp'
                  alt='Shin404'
                  width={1921}
                  height={914}
                />{' '}
                <div className='absolute inset-0 bg-[rgba(0,0,0,0.40)] backdrop-blur-[20px]'></div>
                <div className='absolute inset-0 flex flex-col items-center justify-center gap-[16px]'>
                  <p className='text-[48px] text-[#F4E4CA]'>
                    To know more about this project - visit this:
                  </p>
                  <ProjectSocialButtons
                    socialRefs={socialRefs}
                    socialData={INFO_SOCIAL}
                  />
                  <p className='text-[20px] text-[#F4E4CA]'>
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

export default Shin404Page;
