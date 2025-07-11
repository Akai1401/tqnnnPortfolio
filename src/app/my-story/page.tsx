'use client';

import CustomImage from '@/components/custom/CustomImage';
import SocialButtons from '@/components/SocialButtons';
import useScrollSmoother from '@/hook/useScrollSmoother';
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Footer from '@/components/Footer';
import WelcomeSection from '@/components/WelcomeSection';
import { PAGE_STATE } from '@/constant';
import useStore from '@/store';

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
  const welcomeState = useStore((state: any) => state.welcomeState);

  // Calculate panel width in pixels for GSAP animation
  const getPanelOffset = (index: number) => {
    if (typeof window === 'undefined') return 0;
    const viewportWidth = window.innerWidth;
    const marginInPx = (6.5 * 16 * viewportWidth) / 1920; // Convert 6.5rem to px based on your scaling
    return -(index * viewportWidth) + index * marginInPx;
  };

  // useScrollSmoother();

  useEffect(() => {
    if (welcomeState !== PAGE_STATE.HERO) {
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      const currentSection =
        window.scrollY < window.innerHeight
          ? 'section1'
          : window.scrollY < window.innerHeight * 2
            ? 'section2'
            : window.scrollY < window.innerHeight * 3
              ? 'section3'
              : window.scrollY < window.innerHeight * 4
                ? 'section4'
                : 'footer';

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

        if (e.deltaY > 0) {
          // Scroll right (next panel)
          if (currentPanelIndex.current < maxPanelIndex) {
            currentPanelIndex.current++;
            gsap.to(horizontalContainer, {
              duration: 1,
              x: getPanelOffset(currentPanelIndex.current),
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
              x: getPanelOffset(currentPanelIndex.current),
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

            // Set the horizontal container to the last panel position immediately
            gsap.set(horizontalContainer, {
              x: getPanelOffset(currentPanelIndex.current),
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
          // Allow free scrolling down to footer
          isScrolling.current = false;
        }
      } else {
        // In footer section, allow free scrolling
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
  }, [welcomeState]);

  // Initialize images visibility on mount
  useEffect(() => {
    if (welcomeState !== PAGE_STATE.HERO) {
      return;
    }
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
  }, [welcomeState]);

  return (
    <div
      id='section'
      className='min-h-screen bg-[url("/images/home/bg.png")] bg-cover bg-fixed bg-center bg-no-repeat text-[#F4E4CA]'
    >
      {welcomeState === PAGE_STATE.HERO && (
        <div ref={containerRef}>
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
              unoptimized
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
            className='relative mx-[3.25rem] h-screen overflow-hidden'
          >
            <div
              ref={horizontalContainerRef}
              className='absolute left-0 top-1/2 flex -translate-y-1/2 items-start'
              style={{ width: 'calc(300vw - 19.5rem)' }}
            >
              <div
                id='section2_1'
                className='relative h-[calc(100vh-4rem)] flex-shrink-0 bg-[url("/images/story/1.webp")] bg-cover bg-center bg-no-repeat'
                style={{ width: 'calc(100vw - 6.5rem)' }}
              >
                <p className='w-full max-w-[93.94rem] pl-[2rem] pt-[3rem] text-[2.5rem] leading-[3.31rem] text-[#C3B6A2]'>
                  With over{' '}
                  <span className='underline transition-all duration-300 hover:text-[#F4E4CA]'>
                    3 years of experience
                  </span>{' '}
                  in design and more than 1 year specializing in UI/UX design, I
                  am currently living and working in{' '}
                  <span className='underline transition-all duration-300 hover:text-[#F4E4CA]'>
                    Hanoi
                  </span>{' '}
                  as a product designer.{' '}
                </p>
                <div className='absolute bottom-[2.19rem] right-[1.38rem] w-full max-w-[93.94rem] pl-[2rem] pt-[3rem] text-right text-[2.5rem] leading-[3.31rem] text-[#C3B6A2]'>
                  {`I'm`} passionate about creativity and dedicated to creating
                  meaningful value for the community through the{' '}
                  <span className='underline transition-all duration-300 hover:text-[#F4E4CA]'>
                    products I design
                  </span>
                  <p className='mt-[1rem] text-[1.25rem] opacity-70'>
                    Sunrise in my coastal city through my lens | by Thanh Quy
                    Nguyen
                  </p>
                </div>
              </div>
              <div
                id='section2_2'
                className='relative h-[calc(100vh-4rem)] flex-shrink-0 bg-[url("/images/story/2.webp")] bg-cover bg-center bg-no-repeat'
                style={{ width: 'calc(100vw - 6.5rem)' }}
              >
                <CustomImage
                  src='/images/story/pointer.webp'
                  alt='scroll'
                  className='absolute right-[41.5rem] top-[7rem] animate-bounce'
                  width={78}
                  height={64}
                />
                <div className='absolute bottom-[2.19rem] right-[1.38rem] w-full pl-[2rem] pt-[3rem] text-right text-[36px] leading-[2.7rem] text-[#C3B6A2]'>
                  My design career began unexpectedly during an interview with
                  Phuong Vu, art director of Nirvana and founder of
                  Antiantiartat at a TeamX Hanoi event in 2022. I was deeply
                  <span className='underline transition-all duration-300 hover:text-[#F4E4CA]'>
                    inspired by his stories
                  </span>{' '}
                  and the projects he was working on at the time. That moment
                  sparked something in me, and in the early days, I chose to
                  <span className='underline transition-all duration-300 hover:text-[#F4E4CA]'>
                    pursue the path of a graphic designer
                  </span>
                  <p className='mt-[1rem] text-[1.25rem] opacity-70'>
                    A photo with Phuong Vu and the TeamX Hanoi members at the
                    Antiantiart office
                  </p>
                </div>
              </div>
              <div
                id='section2_3'
                className='relative h-[calc(100vh-4rem)] flex-shrink-0 bg-[url("/images/story/3.webp")] bg-cover bg-center bg-no-repeat'
                style={{ width: 'calc(100vw - 6.5rem)' }}
              >
                <div className='absolute bottom-[2.19rem] right-[1.38rem] w-full pl-[2rem] pt-[3rem] text-right text-[36px] leading-[2.7rem] text-[#C3B6A2]'>
                  After about a year and a half, I realized that designing
                  <span className='underline transition-all duration-300 hover:text-[#F4E4CA]'>
                    websites and apps-crafting
                  </span>{' '}
                  user flows and creating meaningful experiences for
                  users-sparked a{' '}
                  <span className='underline transition-all duration-300 hover:text-[#F4E4CA]'>
                    deep curiosity in me
                  </span>
                  . The process of improving user interfaces and shaping how
                  people interact with digital products made me feel more
                  connected to the design journey, and I knew it was something I
                  wanted to pursue{' '}
                  <span className='underline transition-all duration-300 hover:text-[#F4E4CA]'>
                    in the long term{' '}
                  </span>
                  <p className='mt-[1rem] text-[1.25rem] opacity-70'>
                    Image taken from the Shin404 project - One of the projects
                    I’ve worked on.
                  </p>
                </div>{' '}
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
                grew up by the <span>sea</span> and dream to stay passionate
                about <span>deep talk</span> with friends a{' '}
                <span>chess lover </span> who’s always down for 1 more game{' '}
                <span>fireworks with fami</span>
                ly is my favorite moment
                <span>photobooth with friends</span> is so cute and worth one of
                a biggest fans of <span>Son Tung M-TP </span>
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
            <p className='text-[20px] font-[400]'>
              [ About awards and praise ]
            </p>
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
          <Footer />
        </div>
      )}
    </div>
  );
};

export default MyStoryPage;
