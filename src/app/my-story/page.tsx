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
  const animatePanelTextsRef = useRef<((panelIndex: number) => void) | null>(
    null
  );
  const section2InitializedRef = useRef(false);
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
              // Trigger initial section2 animation when first entering
              if (animatePanelTextsRef.current) {
                setTimeout(() => {
                  animatePanelTextsRef.current!(0);
                }, 50);
              }
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
              duration: 1.0,
              x: getPanelOffset(currentPanelIndex.current),
              ease: 'power2.inOut',
              onComplete: () => {
                isScrolling.current = false;
                // Trigger text animation for the new panel
                if (animatePanelTextsRef.current) {
                  animatePanelTextsRef.current(currentPanelIndex.current);
                }
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
                // Trigger section3 entrance animation
                if ((window as any).animateSection3Entrance) {
                  setTimeout(() => {
                    (window as any).animateSection3Entrance();
                  }, 100);
                }
              },
            });
          }
        } else {
          // Scroll left (previous panel)
          if (currentPanelIndex.current > 0) {
            currentPanelIndex.current--;
            gsap.to(horizontalContainer, {
              duration: 1.0,
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
              // Trigger section3 entrance animation
              if ((window as any).animateSection3Entrance) {
                setTimeout(() => {
                  (window as any).animateSection3Entrance();
                }, 100);
              }
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

  // Section 1 entrance animations
  useEffect(() => {
    if (welcomeState !== PAGE_STATE.HERO) {
      return;
    }

    // Set initial states for all elements
    gsap.set('.section1-title', {
      opacity: 0,
      y: 30,
      scale: 0.9,
    });

    gsap.set('.section1-subtitle', {
      opacity: 0,
      y: 40,
      scale: 0.9,
    });

    gsap.set('.section1-bg-image', {
      opacity: 0,
      scale: 0.8,
      rotation: -2,
    });

    gsap.set('.section1-gif-image', {
      opacity: 0,
      scale: 0.7,
      rotation: 5,
    });

    gsap.set('.section1-scroll-icon', {
      opacity: 0,
      x: 30,
      rotation: 10,
    });

    gsap.set('.section1-social-buttons', {
      opacity: 0,
      y: 50,
      x: -30,
    });

    gsap.set('.section1-footer', {
      opacity: 0,
      y: 30,
      x: 30,
    });

    // Create entrance timeline
    const tl = gsap.timeline({ delay: 0.2 });

    tl
      // Title appears first with bounce
      .to('.section1-title', {
        duration: 0.8,
        opacity: 1,
        y: 0,
        scale: 1,
        ease: 'back.out(1.7)',
      })
      // Subtitle follows with smooth ease
      .to(
        '.section1-subtitle',
        {
          duration: 0.6,
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power2.out',
        },
        '-=0.5'
      )
      // Background image appears with rotation
      .to(
        '.section1-bg-image',
        {
          duration: 0.8,
          opacity: 1,
          scale: 1,
          rotation: 0,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      // GIF image bounces in
      .to(
        '.section1-gif-image',
        {
          duration: 0.8,
          opacity: 1,
          scale: 1,
          rotation: 0,
          ease: 'back.out(1.5)',
        },
        '-=0.6'
      )
      // Scroll icon slides in from right with rotation
      .to(
        '.section1-scroll-icon',
        {
          duration: 0.5,
          opacity: 1,
          x: 0,
          rotation: 0,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      // Social buttons and footer appear together
      .to(
        '.section1-social-buttons',
        {
          duration: 0.5,
          opacity: 1,
          y: 0,
          x: 0,
          ease: 'power2.out',
        },
        '-=0.2'
      )
      .to(
        '.section1-footer',
        {
          duration: 0.5,
          opacity: 1,
          y: 0,
          x: 0,
          ease: 'power2.out',
        },
        '-=0.5'
      );

    return () => {
      tl.kill();
    };
  }, [welcomeState]);

  // Section 2 text animations
  useEffect(() => {
    if (welcomeState !== PAGE_STATE.HERO) {
      return;
    }

    // Set initial states for section2 texts
    gsap.set('.section2-text-1', {
      opacity: 0,
      y: 50,
      scale: 0.95,
    });

    gsap.set('.section2-text-2', {
      opacity: 0,
      y: 50,
      scale: 0.95,
    });

    gsap.set('.section2-text-3', {
      opacity: 0,
      y: 50,
      scale: 0.95,
    });

    gsap.set('.section2-caption-1', {
      opacity: 0,
      y: 30,
    });

    gsap.set('.section2-caption-2', {
      opacity: 0,
      y: 30,
    });

    gsap.set('.section2-caption-3', {
      opacity: 0,
      y: 30,
    });

    gsap.set('.section2-pointer', {
      opacity: 0,
      scale: 0.5,
      rotation: 15,
    });

    // Set initial states for section2 panels
    gsap.set('.section2-panel', {
      opacity: 0,
      scale: 0.95,
      y: 30,
    });

    // Function to animate panel texts when they come into view
    const animatePanelTexts = (panelIndex: number) => {
      const tl = gsap.timeline();

      // First time entering section2 - animate the panel backgrounds
      if (panelIndex === 0 && !section2InitializedRef.current) {
        section2InitializedRef.current = true;
        tl.to('.section2-panel', {
          duration: 0.5,
          opacity: 1,
          scale: 1,
          y: 0,
          ease: 'power2.out',
          stagger: 0.1,
        });
      }

      if (panelIndex === 0) {
        const textDelay = section2InitializedRef.current ? 0 : 0.1;
        tl.to('.section2-text-1', {
          duration: 0.8,
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power2.out',
          delay: textDelay,
        }).to(
          '.section2-caption-1',
          {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: 'power2.out',
          },
          '-=0.3'
        );
      } else if (panelIndex === 1) {
        tl.to('.section2-pointer', {
          duration: 0.5,
          opacity: 1,
          scale: 1,
          rotation: 0,
          ease: 'back.out(1.7)',
        })
          .to(
            '.section2-text-2',
            {
              duration: 0.8,
              opacity: 1,
              y: 0,
              scale: 1,
              ease: 'power2.out',
            },
            '-=0.3'
          )
          .to(
            '.section2-caption-2',
            {
              duration: 0.5,
              opacity: 1,
              y: 0,
              ease: 'power2.out',
            },
            '-=0.3'
          );
      } else if (panelIndex === 2) {
        tl.to('.section2-text-3', {
          duration: 0.8,
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power2.out',
        }).to(
          '.section2-caption-3',
          {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: 'power2.out',
          },
          '-=0.3'
        );
      }
    };

    // Store the animation function for use in wheel handler
    animatePanelTextsRef.current = animatePanelTexts;

    // Don't auto-animate on mount, wait for scroll trigger

    return () => {
      animatePanelTextsRef.current = null;
    };
  }, [welcomeState]);

  // Section 3 entrance animations
  useEffect(() => {
    if (welcomeState !== PAGE_STATE.HERO) {
      return;
    }

    // Set initial states for section3 elements
    gsap.set('.section3-image-container', {
      opacity: 0,
      x: -50,
      scale: 0.95,
    });

    gsap.set('.section3-title', {
      opacity: 0,
      y: 30,
      x: 30,
    });

    gsap.set('.section3-subtitle', {
      opacity: 0,
      y: 20,
      x: 20,
    });

    gsap.set('.section3-content', {
      opacity: 0,
      y: 40,
      x: 40,
    });

    gsap.set('.section3-footer', {
      opacity: 0,
      y: 20,
      x: 20,
    });

    // Function to animate section3 entrance
    const animateSection3Entrance = () => {
      const tl = gsap.timeline();

      tl
        // Image container slides in from left
        .to('.section3-image-container', {
          duration: 1.0,
          opacity: 1,
          x: 0,
          scale: 1,
          ease: 'power2.out',
        })
        // Title appears with bounce
        .to(
          '.section3-title',
          {
            duration: 0.8,
            opacity: 1,
            y: 0,
            x: 0,
            ease: 'back.out(1.5)',
          },
          '-=0.6'
        )
        // Subtitle follows smoothly
        .to(
          '.section3-subtitle',
          {
            duration: 0.6,
            opacity: 1,
            y: 0,
            x: 0,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        // Content text appears with stagger
        .to(
          '.section3-content',
          {
            duration: 0.8,
            opacity: 1,
            y: 0,
            x: 0,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        // Footer appears last
        .to(
          '.section3-footer',
          {
            duration: 0.5,
            opacity: 1,
            y: 0,
            x: 0,
            ease: 'power2.out',
          },
          '-=0.2'
        );
    };

    // Store the animation function for use in wheel handler
    const section3EntranceRef = { current: animateSection3Entrance };

    // Add to window for access in wheel handler
    (window as any).animateSection3Entrance = animateSection3Entrance;

    return () => {
      // Clean up
      delete (window as any).animateSection3Entrance;
    };
  }, [welcomeState]);

  // Custom cursor hover effects for section2
  useEffect(() => {
    if (welcomeState !== PAGE_STATE.HERO) {
      return;
    }

    const addCursorEffect = (selector: string, imageUrl: string) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        const handleMouseEnter = () => {
          document.body.style.cursor = `url(${imageUrl}) 16 16, auto`;
        };
        const handleMouseLeave = () => {
          document.body.style.cursor = 'auto';
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        // Store handlers for cleanup
        (element as any)._cursorHandlers = {
          mouseenter: handleMouseEnter,
          mouseleave: handleMouseLeave,
        };
      });
    };

    // Wait for elements to be rendered
    const timer = setTimeout(() => {
      // Test with a simple red dot cursor first

      // Add cursor effects for each underlined text - using simple red dot for testing
      addCursorEffect(
        '.section2-experience-hover',
        '/images/story/cursor/fire.png'
      );
      addCursorEffect('.section2-hanoi-hover', '/images/story/cursor/hn.png');
      addCursorEffect(
        '.section2-products-hover',
        '/images/story/cursor/com.png'
      );
      addCursorEffect(
        '.section2-inspired-hover',
        '/images/story/cursor/love.png'
      );
      addCursorEffect(
        '.section2-graphic-hover',
        '/images/story/cursor/bag.png'
      );
      addCursorEffect(
        '.section2-websites-hover',
        '/images/story/cursor/sun.png'
      );
      addCursorEffect(
        '.section2-curiosity-hover',
        '/images/story/cursor/mouse.png'
      );
      addCursorEffect(
        '.section2-longterm-hover',
        '/images/story/cursor/time.png'
      );
    }, 500);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      document.body.style.cursor = 'auto';

      // Remove event listeners
      const selectors = [
        '.section2-experience-hover',
        '.section2-hanoi-hover',
        '.section2-products-hover',
        '.section2-inspired-hover',
        '.section2-graphic-hover',
        '.section2-websites-hover',
        '.section2-curiosity-hover',
        '.section2-longterm-hover',
      ];

      selectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          const handlers = (element as any)._cursorHandlers;
          if (handlers) {
            element.removeEventListener('mouseenter', handlers.mouseenter);
            element.removeEventListener('mouseleave', handlers.mouseleave);
            delete (element as any)._cursorHandlers;
          }
        });
      });
    };
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
            <p className='section1-title text-[20px] font-[400]'>
              [ My story ]
            </p>
            <p className='section1-subtitle text-[32px] font-[600]'>
              Guess who’s back? Still designing, still caffeinated
            </p>{' '}
            <CustomImage
              src='/images/story/bg1.webp'
              alt='scroll'
              width={1112.6}
              height={571}
              unoptimized
              className='section1-bg-image'
            />
            <CustomImage
              src='/images/loading/tqn.gif'
              alt='progress'
              width={799}
              height={464}
              className='section1-gif-image absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]'
            />
            <CustomImage
              src='/images/story/scroll.webp'
              alt='scroll'
              className='section1-scroll-icon absolute right-[48.58px] top-[50%] -translate-y-[50%]'
              width={20.85}
              height={120}
            />
            <SocialButtons
              className='section1-social-buttons absolute bottom-[2rem] left-[3rem] max-w-[400px] flex-wrap'
              socialRefs={socialRefs}
            />
            <div className='section1-footer footer-content absolute bottom-[2rem] right-[3rem] text-[16px] font-[400] text-[#F4E4CA]'>
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
                className='section2-panel relative h-[calc(100vh-4rem)] flex-shrink-0 bg-[url("/images/story/1.webp")] bg-cover bg-center bg-no-repeat'
                style={{ width: 'calc(100vw - 6.5rem)' }}
              >
                <p className='section2-text-1 w-full max-w-[93.94rem] pl-[2rem] pt-[3rem] text-[2.5rem] leading-[3.31rem] text-[#C3B6A2]'>
                  With over{' '}
                  <span className='section2-experience-hover underline transition-all duration-300 hover:text-[#F4E4CA]'>
                    3 years of experience
                  </span>{' '}
                  in design and more than 1 year specializing in UI/UX design, I
                  am currently living and working in{' '}
                  <span className='section2-hanoi-hover underline transition-all duration-300 hover:text-[#F4E4CA]'>
                    Hanoi
                  </span>{' '}
                  as a product designer.{' '}
                </p>
                <div className='section2-text-1 absolute bottom-[2.19rem] right-[1.38rem] w-full max-w-[93.94rem] pl-[2rem] pt-[3rem] text-right text-[2.5rem] leading-[3.31rem] text-[#C3B6A2]'>
                  {`I'm`} passionate about creativity and dedicated to creating
                  meaningful value for the community through the{' '}
                  <span className='section2-products-hover underline transition-all duration-300 hover:text-[#F4E4CA]'>
                    products I design
                  </span>
                  <p className='section2-caption-1 mt-[1rem] text-[1.25rem] opacity-70'>
                    Sunrise in my coastal city through my lens | by Thanh Quy
                    Nguyen
                  </p>
                </div>
              </div>
              <div
                id='section2_2'
                className='section2-panel relative h-[calc(100vh-4rem)] flex-shrink-0 bg-[url("/images/story/2.webp")] bg-cover bg-center bg-no-repeat'
                style={{ width: 'calc(100vw - 6.5rem)' }}
              >
                <CustomImage
                  src='/images/story/pointer.webp'
                  alt='scroll'
                  className='section2-pointer absolute right-[41.5rem] top-[7rem] animate-bounce'
                  width={78}
                  height={64}
                />
                <div className='section2-text-2 absolute bottom-[2.19rem] right-[1.38rem] w-full pl-[2rem] pt-[3rem] text-right text-[36px] leading-[2.7rem] text-[#C3B6A2]'>
                  My design career began unexpectedly during an interview with
                  Phuong Vu, art director of Nirvana and founder of
                  Antiantiartat at a TeamX Hanoi event in 2022. I was deeply
                  <span className='section2-inspired-hover underline transition-all duration-300 hover:text-[#F4E4CA]'>
                    {' '}
                    inspired by his stories
                  </span>{' '}
                  and the projects he was working on at the time. That moment
                  sparked something in me, and in the early days, I chose to{' '}
                  <span className='section2-graphic-hover underline transition-all duration-300 hover:text-[#F4E4CA]'>
                    pursue the path of a graphic designer
                  </span>
                  <p className='section2-caption-2 mt-[1rem] text-[1.25rem] opacity-70'>
                    A photo with Phuong Vu and the TeamX Hanoi members at the
                    Antiantiart office
                  </p>
                </div>
              </div>
              <div
                id='section2_3'
                className='section2-panel relative h-[calc(100vh-4rem)] flex-shrink-0 bg-[url("/images/story/3.webp")] bg-cover bg-center bg-no-repeat'
                style={{ width: 'calc(100vw - 6.5rem)' }}
              >
                <div className='section2-text-3 absolute bottom-[2.19rem] right-[1.38rem] w-full pl-[2rem] pt-[3rem] text-right text-[36px] leading-[2.7rem] text-[#C3B6A2]'>
                  After about a year and a half, I realized that designing
                  <span className='section2-websites-hover underline transition-all duration-300 hover:text-[#F4E4CA]'>
                    {' '}
                    websites and apps-crafting
                  </span>{' '}
                  user flows and creating meaningful experiences for
                  users-sparked a{' '}
                  <span className='section2-curiosity-hover underline transition-all duration-300 hover:text-[#F4E4CA]'>
                    deep curiosity in me
                  </span>
                  . The process of improving user interfaces and shaping how
                  people interact with digital products made me feel more
                  connected to the design journey, and I knew it was something I
                  wanted to pursue{' '}
                  <span className='section2-longterm-hover underline transition-all duration-300 hover:text-[#F4E4CA]'>
                    in the long term{' '}
                  </span>
                  <p className='section2-caption-3 mt-[1rem] text-[1.25rem] opacity-70'>
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
            <div className='section3-image-container relative h-full w-[923px] overflow-hidden'>
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
              <p className='section3-title text-[48px] font-[600]'>
                Another things ^^
              </p>
              <p className='section3-subtitle text-[16px]'>
                about Thanh Quy Nguyen (update on Jul 2025)
              </p>
              <div className='section3-content mt-[32px] text-[32px]'>
                <p className='flex items-center justify-end gap-[0.5rem]'>
                  grew up by the{' '}
                  <span className='group flex items-center gap-[0.5rem] text-[#555047] transition-all duration-[500ms] hover:text-[#F4E4CA] hover:underline'>
                    sea
                    <div className='relative h-[61.8px] w-[37px]'>
                      <CustomImage
                        src='/images/story/iconColor/1.webp'
                        alt='seven'
                        width={37}
                        height={61.8}
                        className='absolute inset-0 z-10 opacity-0 transition-all duration-[500ms] group-hover:opacity-100'
                      />
                      <CustomImage
                        src='/images/story/iconNoColor/1.webp'
                        alt='seven'
                        width={37}
                        height={61.8}
                        className='absolute inset-0'
                      />
                    </div>
                  </span>{' '}
                  and dream to stay
                </p>
                <p className='flex items-center justify-end gap-[0.5rem]'>
                  passionate about{' '}
                  <span className='group flex items-center gap-[0.5rem] text-[#555047] transition-all duration-[500ms] hover:text-[#F4E4CA] hover:underline'>
                    deep talk
                    <div className='relative h-[32px] w-[42.11px]'>
                      <CustomImage
                        src='/images/story/iconColor/2.webp'
                        alt='seven'
                        width={42.11}
                        height={32}
                        className='absolute inset-0 z-10 opacity-0 transition-all duration-[500ms] group-hover:opacity-100'
                      />
                      <CustomImage
                        src='/images/story/iconNoColor/2.webp'
                        alt='seven'
                        width={42.11}
                        height={32}
                        className='absolute inset-0'
                      />
                    </div>
                  </span>{' '}
                  with friends
                </p>{' '}
                <p className='flex items-center justify-end gap-[0.5rem]'>
                  a{' '}
                  <span className='group flex items-center gap-[0.5rem] text-[#555047] transition-all duration-[500ms] hover:text-[#F4E4CA] hover:underline'>
                    chess lover{' '}
                    <div className='relative h-[41.16px] w-[32px]'>
                      <CustomImage
                        src='/images/story/iconColor/3.webp'
                        alt='seven'
                        width={23}
                        height={41.16}
                        className='absolute inset-0 z-10 opacity-0 transition-all duration-[500ms] group-hover:opacity-100'
                      />
                      <CustomImage
                        src='/images/story/iconNoColor/3.webp'
                        alt='seven'
                        width={23}
                        height={41.16}
                        className='absolute inset-0'
                      />
                    </div>
                  </span>{' '}
                  who’s always down for 1 more game
                </p>{' '}
                <p className='flex items-center justify-end gap-[0.5rem]'>
                  <span className='group flex items-center gap-[0.5rem] text-[#555047] transition-all duration-[500ms] hover:text-[#F4E4CA] hover:underline'>
                    fireworks with family
                    <div className='relative h-[37px] w-[34px]'>
                      <CustomImage
                        src='/images/story/iconColor/4.webp'
                        alt='seven'
                        width={34}
                        height={37}
                        className='absolute inset-0 z-10 opacity-0 transition-all duration-[500ms] group-hover:opacity-100'
                      />
                      <CustomImage
                        src='/images/story/iconNoColor/4.webp'
                        alt='seven'
                        width={34}
                        height={37}
                        className='absolute inset-0'
                      />
                    </div>
                  </span>
                  is my favorite moment
                </p>
                <p className='flex items-center justify-end gap-[0.5rem]'>
                  <span className='group flex items-center gap-[0.5rem] text-[#555047] transition-all duration-[500ms] hover:text-[#F4E4CA] hover:underline'>
                    photobooth with friends{' '}
                    <div className='relative h-[33px] w-[37px]'>
                      <CustomImage
                        src='/images/story/iconColor/5.webp'
                        alt='seven'
                        width={37}
                        height={33}
                        className='absolute inset-0 z-10 opacity-0 transition-all duration-[500ms] group-hover:opacity-100'
                      />
                      <CustomImage
                        src='/images/story/iconNoColor/5.webp'
                        alt='seven'
                        width={37}
                        height={33}
                        className='absolute inset-0'
                      />
                    </div>
                  </span>{' '}
                  is so cute and worth{' '}
                </p>{' '}
                <p className='flex items-center justify-end gap-[0.5rem]'>
                  one of a biggest fans of{' '}
                  <span className='group flex items-center gap-[0.5rem] text-[#555047] transition-all duration-[500ms] hover:text-[#F4E4CA] hover:underline'>
                    Son Tung M-TP{' '}
                    <div className='relative h-[43px] w-[20px]'>
                      <CustomImage
                        src='/images/story/iconColor/6.webp'
                        alt='seven'
                        width={20}
                        height={43}
                        className='absolute inset-0 z-10 opacity-0 transition-all duration-[500ms] group-hover:opacity-100'
                      />
                      <CustomImage
                        src='/images/story/iconNoColor/6.webp'
                        alt='seven'
                        width={20}
                        height={43}
                        className='absolute inset-0'
                      />
                    </div>
                  </span>
                </p>
                <p className='flex items-center justify-end gap-[0.5rem]'>
                  and would be a{' '}
                  <span className='group flex items-center gap-[0.5rem] text-[#555047] transition-all duration-[500ms] hover:text-[#F4E4CA] hover:underline'>
                    producer{' '}
                    <div className='relative h-[41px] w-[39px]'>
                      <CustomImage
                        src='/images/story/iconColor/7.webp'
                        alt='seven'
                        width={39}
                        height={41}
                        className='absolute inset-0 z-10 opacity-0 transition-all duration-[500ms] group-hover:opacity-100'
                      />
                      <CustomImage
                        src='/images/story/iconNoColor/7.webp'
                        alt='seven'
                        width={39}
                        height={41}
                        className='absolute inset-0'
                      />
                    </div>
                  </span>{' '}
                  if money didn’t matter{' '}
                </p>
              </div>
            </div>
            <p className='section3-footer absolute bottom-[42px] right-[52px] text-[16px] font-[400]'>
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
            <p className='text-[32px] font-[600]'>Coming soon hihi</p>{' '}
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
