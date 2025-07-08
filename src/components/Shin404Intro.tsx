import React from 'react';
import CustomImage from './custom/CustomImage';
import { INFO } from '@/constant/info';
import IconArrowBold from '@/assets/icons/IconArrowBold';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const Shin404Intro = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Đảm bảo scroll về đầu trang khi vào trang này
    // Tạo timeline cho animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%', // Kéo dài animation qua 2 screen heights
        scrub: 1,
        pin: true, // Pin section để không scroll xuống ngay
        anticipatePin: 1,
      },
    });

    // Phase 1: Animation chậm trong 50% đầu
    tl.to(imageRef.current, {
      width: '70%', // Chỉ di chuyển một chút
      right: '-5rem',
      duration: 0.5,
      ease: 'power1.out',
    }).to(
      textRef.current,
      {
        x: '-20%',
        right: '5rem',
        opacity: 0.7,
        duration: 0.5,
        ease: 'power1.out',
      },
      0
    );

    // Phase 2: Animation nhanh hơn trong 50% cuối
    tl.to(imageRef.current, {
      width: '100%',
      right: '0',
      duration: 0.5,
      ease: 'power2.out',
    //   onComplete: () => {
    //     tl.set(sectionRef.current, {
    //       position: 'relative',
    //     });
    //   },
    }).to(
      textRef.current,
      {
        x: '-100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      },
      0.5
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <div className='relative inset-0 z-10 bg-black h-screen' ref={sectionRef}>
      {/* Text bên trái */}
      <div
        ref={textRef}
        className='absolute left-0 top-1/2 z-10 -translate-y-1/2 pl-[35px] text-[#F4E4CA]'
      >
        <h1 className='text-[48px] font-[700] leading-[57.6px] text-[#F4E4CA]'>
          Shin404 & 404 Anime
        </h1>
        <h2 className='text-[40px] leading-[57.6px] text-[#F4E4CA]'>
          Cartoon Website and App (1 designer)
        </h2>
        <div className='mt-[16px] text-[20px] font-[400] uppercase leading-[26px] text-[#D1BA93]'>
          <p>role: UI UX DESIGNer | GRAPHIC DESIGNer | PRODUCT OWNER</p>
          <p>TIME: SEP 2024 - JAN 2025</p>
        </div>
        <a
          href={INFO.PROJECT.SHIN404}
          target='_blank'
          className='inline-block'
          rel='noopener noreferrer'
        >
          <button className='btn-primary my-[48px]'>
            Visit website <IconArrowBold />
          </button>
        </a>
        <div className='text-[18px] font-[400] leading-[24px] text-[rgba(244,228,201,0.70)]'>
          # Shin404 <br />
          # Cartoon&film
          <br />
          # Product_design
          <br /># My_first_project
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
  );
};

export default Shin404Intro;
