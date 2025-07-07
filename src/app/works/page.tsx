'use client';

import IconAngry from '@/assets/icons/IconAngry';
import IconBida from '@/assets/icons/IconBida';
import IconDinosaur from '@/assets/icons/IconDinosaur';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomImage from '@/components/custom/CustomImage';
import useStore from '@/store';
import { PAGE_STATE } from '@/constant';
import useMounted from '@/hook/useMounted';
import Lenis from 'lenis';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const WorksPage = () => {
  const BECOME_LIST = [
    {
      id: '1',
      title: '1. An "UI/UX Designer"',
      icon: <IconBida />,
      describe1: 'So what if I chose to embrace the creative chaos',
      describe2: 'and become a UI/UX Designer?????',
    },
    {
      id: '2',
      title: '2. A "Graphic Designer"',
      icon: <IconAngry />,
      describe1: 'So what if I chose to dive into the creative chaos ',
      describe2: 'and become a graphic designer??????',
    },
    {
      id: '3',
      title: '3. A "Content Creator"',
      icon: <IconDinosaur />,
      describe1: 'So what if I chose to embrace the creative',
      describe2: 'chaos and become a Content creator?????',
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const welcomeState = useStore((state: any) => state.welcomeState);
  const { isMounted } = useMounted();

  useEffect(() => {
    if (!isMounted || welcomeState !== PAGE_STATE.HERO) return;
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Integrate Lenis with GSAP
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, [isMounted, welcomeState]);

  useEffect(() => {
    if (welcomeState === PAGE_STATE.HERO) {
      document.body.style.overflow = 'unset';
      return;
    }
  }, [welcomeState]);

  useEffect(() => {
    // Initialize project refs array
    projectRefs.current = [];
    // Set initial state for project wrappers and content
    gsap.set('.project-anim-wrapper', {
      clipPath: 'inset(0 0 100% 0)',
    });
    // gsap.set('.project-content', {
    //   opacity: 0,
    //   y: 40,
    // });

    gsap.fromTo(
      itemRefs.current,
      {
        y: 120,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.inOut',
      }
    );

    // Create scroll triggers for each project row
    const projectRows = document.querySelectorAll('.project-row');

    projectRows.forEach((row, rowIndex) => {
      const wrappers = row.querySelectorAll('.project-anim-wrapper');
      // const contents = row.querySelectorAll('.project-content');

      // Animate wrappers with paper reveal effect using clip-path
      gsap.to(wrappers, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.5,
        stagger: 0.15,
        delay: 0.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: row,
          start: 'top 100%',
          end: 'bottom 0%',
          toggleActions: 'play none none reverse',
        },
      });
      // Animate content fade/slide in
      // gsap.to(contents, {
      //   // opacity: 1,
      //   // y: 0,
      //   duration: 0.8,
      //   stagger: 0.3,
      //   delay: 0.8,
      //   ease: 'power2.out',
      //   scrollTrigger: {
      //     trigger: row,
      //     start: 'top 100%',
      //     end: 'bottom 0%',
      //     toggleActions: 'play none none reverse',
      //   },
      // });
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [welcomeState]);

  const handleHover = (index: number) => {
    const target = itemRefs.current[index];
    const bg = bgRef.current;

    if (target && bg) {
      const top = target.offsetTop;
      const height = target.offsetHeight;

      // Hiện nền nếu chưa hiện
      gsap.set(bg, { visibility: 'visible', opacity: 0 });

      // Animate nền đến vị trí mới
      gsap.to(bg, {
        top,
        height,
        duration: 0.5,
        opacity: 1,
        ease: 'power2.out',
      });
    }
  };
  const handleMouseLeave = (e: React.MouseEvent) => {
    const container = containerRef.current;
    const bg = bgRef.current;

    if (container && bg) {
      const containerRect = container.getBoundingClientRect();
      const mouseY = e.clientY;

      // Tính hướng di chuột ra
      const direction = mouseY < containerRect.top ? 'up' : 'down';

      // Đặt transform-origin để co thu gọn đúng hướng
      gsap.set(bg, {
        transformOrigin: direction === 'up' ? 'top center' : 'bottom center',
      });

      // Animate thu lại theo chiều dọc (scaleY)
      gsap.to(bg, {
        scaleY: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(bg, {
            opacity: 0,
            visibility: 'hidden',
            scaleY: 1,
          });
        },
      });
    }
  };

  return (
    <div id='section' className='min-h-screen bg-black'>
      {welcomeState === PAGE_STATE.HERO && (
        <div className='pt-[7rem]'>
          <p className='px-[51px] text-[20px] font-[400] text-[#F4E4CA]'>
            HMMMM... So what if I chose to become:
          </p>
          {/* Become */}
          <div
            ref={containerRef}
            className='relative mt-[10px]'
            onMouseLeave={handleMouseLeave}
          >
            {/* Shared background block */}
            <div
              ref={bgRef}
              className="absolute left-0 z-0 w-full bg-[url('/images/works/bg.webp')] bg-cover bg-center bg-no-repeat opacity-0"
              style={{ visibility: 'hidden', top: 0, height: 0 }}
            />

            {BECOME_LIST.map((item, index) => (
              <div
                key={item.id}
                onMouseEnter={() => handleHover(index)}
                className='overflow-hidden'
              >
                <div
                  ref={(el) => (itemRefs.current[index] = el) as any}
                  className='group relative z-10 flex items-center justify-between px-[46px] py-[10px]'
                >
                  {/* Title */}
                  <div className='relative inline-block overflow-hidden text-[80px] font-[400] text-[#6E675B] transition-all duration-[500ms] group-hover:text-[#F4E4CA]'>
                    {item.title}
                    <div className='absolute bottom-[1rem] left-[15rem] h-[3px] w-[0rem] bg-[#F4E4CA] transition-all duration-[500ms] group-hover:w-full'></div>
                  </div>

                  {/* Icon */}
                  <div className='origin-bottom scale-0 transition-all duration-[500ms] group-hover:scale-100'>
                    {item.icon}
                  </div>

                  {/* Description */}
                  <div>
                    <div className='overflow-hidden'>
                      <div className='translate-y-[3.5rem] text-[20px] font-[400] uppercase text-[#F0E0C5] opacity-0 transition-all delay-200 duration-[500ms] group-hover:translate-y-[0] group-hover:opacity-100'>
                        {item.describe1}
                      </div>
                    </div>
                    <div className='overflow-hidden'>
                      <div className='translate-y-[3.5rem] text-[20px] font-[400] uppercase text-[#F0E0C5] opacity-0 transition-all delay-200 duration-[500ms] group-hover:translate-y-[0] group-hover:opacity-100'>
                        {item.describe2}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Projects */}
          <div className='px-[51px]'>
            <div className='mt-[58px] flex items-center justify-between text-[20px] font-[400] text-[#F4E4CA]'>
              <p>9 projects </p>
              <p>from 2022 till now</p>
            </div>
            <div className='mt-[20px] flex flex-col gap-[48px]'>
              {/* row 1 */}
              <div className='project-row flex items-start gap-[16px]'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <div className='project-content'>
                    <CustomImage
                      src='/images/works/shin404.webp'
                      alt='shin404'
                      width={1061}
                      height={733}
                    />
                    <div className='project-text'>
                      <h3 className='mt-[16px] text-[36px] font-[400] text-[#F4E4CA]'>
                        Shin404 & 404 Anime Website and App{' '}
                      </h3>
                      <div className='mt-[8px] text-[20px] font-[400] uppercase text-[#D1BA93]'>
                        <p>UI UX DESIGN | GRAPHIC DESIGN | PRODUCT OWNER</p>
                        <p>AUG 2024 - NOW</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <div className='project-content'>
                    <CustomImage
                      src='/images/works/rock.webp'
                      alt='rock'
                      width={753}
                      height={733}
                    />
                    <div className='project-text'>
                      <h3 className='mt-[16px] text-[36px] font-[400] text-[#F4E4CA]'>
                        Shin404 & 404 Anime Website and App{' '}
                      </h3>
                      <div className='mt-[8px] text-[20px] font-[400] uppercase text-[#D1BA93]'>
                        <p>UI UX DESIGN | GRAPHIC DESIGN | PRODUCT OWNER</p>
                        <p>AUG 2024 - NOW</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* row 2 */}
              <div className='project-row flex items-center gap-[16px]'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <div className='project-content'>
                    <CustomImage
                      src='/images/works/skin.webp'
                      alt='skin'
                      width={753}
                      height={733}
                    />
                    <div className='project-text'>
                      <h3 className='mt-[16px] text-[36px] font-[400] text-[#F4E4CA]'>
                        Eterna Skin Clinic Website
                      </h3>
                      <div className='mt-[8px] text-[20px] font-[400] uppercase text-[#D1BA93]'>
                        <p>ui ux design | Personal Project</p>
                        <p>oct 2024 - dec 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <div className='project-content'>
                    <CustomImage
                      src='/images/works/web3.webp'
                      alt='web3'
                      width={1061}
                      height={733}
                    />
                    <div className='project-text'>
                      <h3 className='mt-[16px] text-[36px] font-[400] text-[#F4E4CA]'>
                        Horizon Vault | Web3 website{' '}
                      </h3>
                      <div className='mt-[8px] text-[20px] font-[400] uppercase text-[#D1BA93]'>
                        <p>UI UX DESIGN | personal project</p>
                        <p>MAR 2025 - MAY 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* row 3 */}
              <div className='project-row flex items-center gap-[16px]'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <div className='project-content'>
                    <CustomImage
                      src='/images/works/personal.webp'
                      alt='skin'
                      width={1830}
                      height={733}
                    />
                    <div className='project-text'>
                      <h3 className='mt-[16px] text-center text-[36px] font-[400] text-[#F4E4CA]'>
                        PERSONAL GRAPHIC DESIGN | MY FIRST PLACEGROUND
                      </h3>
                      <div className='mt-[8px] text-center text-[20px] font-[400] uppercase text-[#D1BA93]'>
                        <p>CREATIVE GRAPHIC DESIGN</p>
                        <p>JUN 2023 - NOW</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* row 4 */}
              <div className='project-row flex items-center gap-[16px]'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <div className='project-content'>
                    <CustomImage
                      src='/images/works/luxe.webp'
                      alt='lux'
                      width={1061}
                      height={733}
                    />
                    <div className='project-text'>
                      <h3 className='mt-[16px] text-[36px] font-[400] text-[#F4E4CA]'>
                        Luxe Timber | Interior Website
                      </h3>
                      <div className='mt-[8px] text-[20px] font-[400] uppercase text-[#D1BA93]'>
                        <p>UI UX DESIGNER</p>
                        <p>SEP 2024 - OCT 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <div className='project-content'>
                    <CustomImage
                      src='/images/works/fpt.webp'
                      alt='fp'
                      width={753}
                      height={733}
                    />
                    <div className='project-text'>
                      <h3 className='mt-[16px] text-[36px] font-[400] text-[#F4E4CA]'>
                        FPT Korea Calendar 2025
                      </h3>
                      <div className='mt-[8px] text-[20px] font-[400] uppercase text-[#D1BA93]'>
                        <p>Graphic design</p>
                        <p>oct 2024 - dec 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* row 5 */}
              <div className='project-row flex items-center gap-[16px]'>
                <div className='project-anim-wrapper overflow-hidden'>
                  <div className='project-content'>
                    <CustomImage
                      src='/images/works/lowkey.webp'
                      alt='lowkey'
                      width={1061}
                      height={733}
                    />
                    <div className='project-text'>
                      <h3 className='mt-[16px] text-[36px] font-[400] text-[#F4E4CA]'>
                        Experiment with logos
                      </h3>
                      <div className='mt-[8px] text-[20px] font-[400] uppercase text-[#D1BA93]'>
                        <p>GRAPHIC DESIGNER</p>
                        <p>MAR 2025 - NOW</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='project-anim-wrapper overflow-hidden'>
                  <div className='project-content'>
                    <CustomImage
                      src='/images/works/supporter.webp'
                      alt='supporter'
                      width={753}
                      height={733}
                    />
                    <div className='project-text'>
                      <h3 className='mt-[16px] text-[36px] font-[400] text-[#F4E4CA]'>
                        Another projects as a supporter
                      </h3>
                      <div className='mt-[8px] text-[20px] font-[400] uppercase text-[#D1BA93]'>
                        <p>UI UX DESIGNER & GRAPHIC DESIGNER</p>
                        <p>oct 2024 - dec 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className=''></div>
        </div>
      )}
    </div>
  );
};

export default WorksPage;
