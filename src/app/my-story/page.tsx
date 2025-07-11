'use client';

import CustomImage from '@/components/custom/CustomImage';
import SocialButtons from '@/components/SocialButtons';
import useScrollSmoother from '@/hook/useScrollSmoother';
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const MyStoryPage = () => {
  const socialRefs = useRef([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isScrolling = useRef(false);
  const currentPanelIndex = useRef(0);
  const currentImageIndex = useRef(0);
  const maxPanelIndex = 2; // 3 panels (0, 1, 2)
  const maxImageIndex = 6; // 7 images (0-6: one, two, three, four, five, six, seven)
  const [windowWidth, setWindowWidth] = useState(1920);

  // useScrollSmoother();

  useEffect(() => {
    // Set initial window width
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const currentSection =
        window.scrollY < window.innerHeight
          ? 'section1'
          : window.scrollY < window.innerHeight * 2
            ? 'section2'
            : window.scrollY < window.innerHeight * 3
              ? 'section3'
              : 'section4';

      // Prevent all scrolling in section2 and section3
      if (currentSection === 'section2' || currentSection === 'section3') {
        e.preventDefault();
        e.stopPropagation();
      }

      if (isScrolling.current) return;

      isScrolling.current = true;

      if (currentSection === 'section1') {
        if (e.deltaY > 0) {
          e.preventDefault();
          // Scroll down to section2
          gsap.to(window, {
            duration: 1.2,
            scrollTo: '#section2',
            ease: 'power2.inOut',
            onComplete: () => {
              isScrolling.current = false;
            },
          });
        } else {
          isScrolling.current = false;
        }
      } else if (currentSection === 'section2') {
        const horizontalContainer = horizontalContainerRef.current;
        const panelWidth = windowWidth - 104; // Subtract margin (52px * 2)

        if (e.deltaY > 0) {
          // Scroll right (next panel)
          if (currentPanelIndex.current < maxPanelIndex) {
            currentPanelIndex.current++;
            gsap.to(horizontalContainer, {
              duration: 1,
              x: -currentPanelIndex.current * panelWidth,
              ease: 'power2.inOut',
              onComplete: () => {
                isScrolling.current = false;
              },
            });
          } else {
            // At last panel, go to section3
            gsap.to(window, {
              duration: 1.2,
              scrollTo: '#section3',
              ease: 'power2.inOut',
              onComplete: () => {
                isScrolling.current = false;
              },
            });
          }
        } else {
          // Scroll left (previous panel)
          if (currentPanelIndex.current > 0) {
            currentPanelIndex.current--;
            gsap.to(horizontalContainer, {
              duration: 1,
              x: -currentPanelIndex.current * panelWidth,
              ease: 'power2.inOut',
              onComplete: () => {
                isScrolling.current = false;
              },
            });
          } else {
            // Go back to section1
            gsap.to(window, {
              duration: 1.2,
              scrollTo: '#section1',
              ease: 'power2.inOut',
              onComplete: () => {
                isScrolling.current = false;
              },
            });
          }
        }
      } else if (currentSection === 'section3') {
        if (e.deltaY > 0) {
          // Show next image with cool transition
          if (currentImageIndex.current < maxImageIndex) {
            const currentImage = imageRefs.current[currentImageIndex.current];
            const nextImage = imageRefs.current[currentImageIndex.current + 1];

            if (currentImage && nextImage) {
              // Animate current image out with dramatic effect
              gsap.to(currentImage, {
                duration: 0.8,
                opacity: 0,
                scale: 0.8,
                rotation: -5,
                filter: 'blur(8px)',
                ease: 'power2.inOut',
              });

              // Set next image initial state
              gsap.set(nextImage, {
                opacity: 0,
                scale: 1.2,
                rotation: 5,
                filter: 'blur(8px)',
              });

              // Animate next image in
              gsap.to(nextImage, {
                duration: 0.8,
                opacity: 1,
                scale: 1,
                rotation: 0,
                filter: 'blur(0px)',
                ease: 'power2.out',
                onComplete: () => {
                  isScrolling.current = false;
                },
              });
            }

            currentImageIndex.current++;
          } else {
            // At last image, go to section4
            gsap.to(window, {
              duration: 1.2,
              scrollTo: '#section4',
              ease: 'power2.inOut',
              onComplete: () => {
                isScrolling.current = false;
              },
            });
          }
        } else {
          // Show previous image with cool transition
          if (currentImageIndex.current > 0) {
            const currentImage = imageRefs.current[currentImageIndex.current];
            const prevImage = imageRefs.current[currentImageIndex.current - 1];

            if (currentImage && prevImage) {
              // Animate current image out with dramatic effect
              gsap.to(currentImage, {
                duration: 0.8,
                opacity: 0,
                scale: 1.2,
                rotation: 5,
                filter: 'blur(8px)',
                ease: 'power2.inOut',
              });

              // Set previous image initial state
              gsap.set(prevImage, {
                opacity: 0,
                scale: 0.8,
                rotation: -5,
                filter: 'blur(8px)',
              });

              // Animate previous image in
              gsap.to(prevImage, {
                duration: 0.8,
                opacity: 1,
                scale: 1,
                rotation: 0,
                filter: 'blur(0px)',
                ease: 'power2.out',
                onComplete: () => {
                  isScrolling.current = false;
                },
              });
            }

            currentImageIndex.current--;
          } else {
            // At first image, go back to section2 last panel
            currentPanelIndex.current = maxPanelIndex;
            const horizontalContainer = horizontalContainerRef.current;
            const panelWidth = windowWidth - 104;

            // Set the horizontal container to the last panel position immediately
            gsap.set(horizontalContainer, {
              x: -currentPanelIndex.current * panelWidth,
            });

            // Then scroll to section2
            gsap.to(window, {
              duration: 1.2,
              scrollTo: '#section2',
              ease: 'power2.inOut',
              onComplete: () => {
                isScrolling.current = false;
              },
            });
          }
        }
      } else if (currentSection === 'section4') {
        if (e.deltaY < 0) {
          e.preventDefault();
          // Go back to section3 with last image
          currentImageIndex.current = maxImageIndex;
          
          // Reset all images first
          imageRefs.current.forEach((ref, index) => {
            if (ref) {
              gsap.set(ref, {
                opacity: index === maxImageIndex ? 1 : 0,
                scale: 1,
                rotation: 0,
                filter: 'blur(0px)',
              });
            }
          });
          
          // Then scroll to section3
          gsap.to(window, {
            duration: 1.2,
            scrollTo: '#section3',
            ease: 'power2.inOut',
            onComplete: () => {
              isScrolling.current = false;
            },
          });
        } else {
          isScrolling.current = false;
        }
      } else {
        isScrolling.current = false;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [windowWidth]);

  // Initialize images visibility on mount
  useEffect(() => {
    // Show only first image initially with proper setup
    imageRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.set(ref, {
          opacity: index === 0 ? 1 : 0,
          scale: 1,
          rotation: 0,
          filter: 'blur(0px)',
        });
      }
    });
  }, []);

  return (
    <div
      ref={containerRef}
      id='section'
      className='min-h-screen bg-[url("/images/home/bg.png")] bg-cover bg-fixed bg-center bg-no-repeat text-[#F4E4CA]'
    >
      <div
        id='section1'
        className='relative flex h-screen flex-col items-center justify-center'
      >
        <p className='text-[20px] font-[400]'>[ My story ]</p>
        <p className='text-[64px] font-[600]'>
          Guess who’s back? Still designing, still caffeinated
        </p>{' '}
        <CustomImage
          src='/images/story/bg1.webp'
          alt='scroll'
          width={1112.6}
          height={571}
        />
        <CustomImage
          src='/images/loading/tqn.gif'
          alt='progress'
          width={799}
          height={464}
          className='absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]'
        />
        <CustomImage
          src='/images/story/scroll.webp'
          alt='scroll'
          className='absolute right-[48.58px] top-[50%] -translate-y-[50%]'
          width={20.85}
          height={120}
        />
        <SocialButtons
          className='absolute bottom-[2rem] left-[3rem] max-w-[400px] flex-wrap'
          socialRefs={socialRefs}
        />
        <div className='footer-content absolute bottom-[2rem] right-[3rem] text-[16px] font-[400] text-[#F4E4CA]'>
          ALL RIGHTS RESERVED <br /> © 2025 TQNG MARUKO
        </div>
      </div>
      <div
        id='section2'
        className='relative mx-[52px] h-screen overflow-hidden'
      >
        <div
          ref={horizontalContainerRef}
          className='absolute left-0 top-1/2 flex -translate-y-1/2 items-start'
          style={{ width: `${3 * (windowWidth - 104)}px` }}
        >
          <div
            id='section2_1'
            className='relative h-[calc(100vh-64px)] flex-shrink-0 bg-[url("/images/story/1.webp")] bg-cover bg-center bg-no-repeat'
            style={{ width: `${windowWidth - 104}px` }}
          >
            <p className='w-[1505px] pl-[32px] pt-[48px] text-[40px] leading-[53px] text-[#C3B6A2]'>
              With over{' '}
              <span className='underline transition-all duration-300 hover:text-[#F4E4CA]'>
                3 years of experience
              </span>{' '}
              in design and more than 1 year specializing in UI/UX design, I am
              currently living and working in{' '}
              <span className='underline transition-all duration-300 hover:text-[#F4E4CA]'>
                Hanoi
              </span>{' '}
              as a product designer.{' '}
            </p>
            <div className='absolute bottom-[35px] right-[22px] w-[1505px] pl-[32px] pt-[48px] text-right text-[40px] leading-[53px] text-[#C3B6A2]'>
              {`I'm`} passionate about creativity and dedicated to creating
              meaningful value for the community through the{' '}
              <span className='underline transition-all duration-300 hover:text-[#F4E4CA]'>
                products I design
              </span>
              <p className='mt-[16px] text-[20px]'>
                Sunrise in my coastal city through my lens | by Thanh Quy Nguyen
              </p>
            </div>
          </div>
          <div
            id='section2_2'
            className='relative h-[calc(100vh-64px)] flex-shrink-0 bg-[url("/images/story/2.webp")] bg-cover bg-center bg-no-repeat'
            style={{ width: `${windowWidth - 104}px` }}
          >
            <div className='absolute bottom-[35px] right-[22px] w-full pl-[32px] pt-[48px] text-right text-[40px] leading-[53px] text-[#C3B6A2]'>
              My design career began unexpectedly during an interview with
              Phuong Vu, art director of Nirvana and founder of Antiantiartat at
              a TeamX Hanoi event in 2022. I was deeply inspired by his stories
              and the projects he was working on at the time. That moment
              sparked something in me, and in the early days, I chose to pursue
              the path of a graphic designer
              <p className='mt-[16px] text-[20px]'>
                A photo with Phuong Vu and the TeamX Hanoi members at the
                Antiantiart office
              </p>
            </div>
          </div>
          <div
            id='section2_3'
            className='relative h-[calc(100vh-64px)] flex-shrink-0 bg-[url("/images/story/3.webp")] bg-cover bg-center bg-no-repeat'
            style={{ width: `${windowWidth - 104}px` }}
          >
            <p className='w-full pl-[32px] pt-[48px] text-[40px] leading-[53px] text-[#C3B6A2]'>
              With over{' '}
              <span className='underline transition-all duration-300 hover:text-[#F4E4CA]'>
                3 years of experience
              </span>{' '}
              in design and more than 1 year specializing in UI/UX design, I am
              currently living and working in{' '}
              <span className='underline transition-all duration-300 hover:text-[#F4E4CA]'>
                Hanoi
              </span>{' '}
              as a product designer.{' '}
            </p>
            <div className='absolute bottom-[35px] right-[22px] w-[1505px] pl-[32px] pt-[48px] text-right text-[40px] leading-[53px] text-[#C3B6A2]'>
              {`I'm`} passionate about creativity and dedicated to creating
              meaningful value for the community through the{' '}
              <span className='underline transition-all duration-300 hover:text-[#F4E4CA]'>
                products I design
              </span>
              <p className='mt-[16px] text-[20px]'>
                Sunrise in my coastal city through my lens | by Thanh Quy Nguyen
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        id='section3'
        className='relative flex h-screen items-center justify-between'
      >
        <div className='relative h-full w-[923px] overflow-hidden'>
          <div
            ref={(el) => {
              imageRefs.current[0] = el;
            }}
            className='absolute inset-0 will-change-transform'
          >
            <CustomImage
              src='/images/story/one.webp'
              alt='one'
              className='h-full w-full object-cover'
              unoptimized
              width={923}
              height={1080}
            />
          </div>
          <div
            ref={(el) => {
              imageRefs.current[1] = el;
            }}
            className='absolute inset-0 will-change-transform'
          >
            <CustomImage
              src='/images/story/two.webp'
              alt='two'
              className='h-full w-full object-cover'
              unoptimized
              width={923}
              height={1080}
            />
          </div>
          <div
            ref={(el) => {
              imageRefs.current[2] = el;
            }}
            className='absolute inset-0 will-change-transform'
          >
            <CustomImage
              src='/images/story/three.webp'
              alt='three'
              className='h-full w-full object-cover'
              unoptimized
              width={923}
              height={1080}
            />
          </div>
          <div
            ref={(el) => {
              imageRefs.current[3] = el;
            }}
            className='absolute inset-0 will-change-transform'
          >
            <CustomImage
              src='/images/story/four.webp'
              alt='four'
              className='h-full w-full object-cover'
              unoptimized
              width={923}
              height={1080}
            />
          </div>
          <div
            ref={(el) => {
              imageRefs.current[4] = el;
            }}
            className='absolute inset-0 will-change-transform'
          >
            <CustomImage
              src='/images/story/fire.webp'
              alt='five'
              className='h-full w-full object-cover'
              unoptimized
              width={923}
              height={1080}
            />
          </div>
          <div
            ref={(el) => {
              imageRefs.current[5] = el;
            }}
            className='absolute inset-0 will-change-transform'
          >
            <CustomImage
              src='/images/story/six.webp'
              alt='six'
              className='h-full w-full object-cover'
              unoptimized
              width={923}
              height={1080}
            />
          </div>
          <div
            ref={(el) => {
              imageRefs.current[6] = el;
            }}
            className='absolute inset-0 will-change-transform'
          >
            <CustomImage
              src='/images/story/seven.webp'
              alt='seven'
              className='h-full w-full object-cover'
              unoptimized
              width={923}
              height={1080}
            />
          </div>
        </div>
        <div className='mr-[52px] max-w-[859px] text-right'>
          <p className='text-[48px] font-[600]'>Another things ^^</p>
          <p className='text-[16px]'>
            about Thanh Quy Nguyen (update on Jul 2025)
          </p>
          <div className='mt-[32px] text-[32px]'>
            grew up by the <span>sea</span> and dream to stay passionate about{' '}
            <span>deep talk</span> with friends a <span>chess lover </span>{' '}
            who’s always down for 1 more game <span>fireworks with fami</span>
            ly is my favorite moment
            <span>photobooth with friends</span> is so cute and worth one of a
            biggest fans of <span>Son Tung M-TP </span>
            and would be a <span>producer</span> if money didn’t matter
          </div>
        </div>
        <p className='absolute bottom-[42px] right-[52px] text-[16px] font-[400]'>
          ALL RIGHTS RESERVED © 2025 TQNG MARUKO
        </p>
      </div>
      <div
        id='section4'
        className='relative flex h-screen flex-col items-center justify-center'
      >
        <p className='text-[20px] font-[400]'>[ About awards and praise ]</p>
        <p className='text-[64px] font-[600]'>Coming soon hihi</p>{' '}
        <CustomImage
          src='/images/story/bg2.webp'
          alt='scroll'
          width={1112.6}
          height={571}
        />
        <CustomImage
          src='/images/loading/tqn.gif'
          alt='progress'
          width={799}
          height={464}
          className='absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]'
        />
        <SocialButtons
          className='absolute bottom-[2rem] left-[3rem] max-w-[400px] flex-wrap'
          socialRefs={socialRefs}
        />
        <div className='footer-content absolute bottom-[2rem] right-[3rem] text-[16px] font-[400] text-[#F4E4CA]'>
          ALL RIGHTS RESERVED <br /> © 2025 TQNG MARUKO
        </div>
      </div>
    </div>
  );
};

export default MyStoryPage;
