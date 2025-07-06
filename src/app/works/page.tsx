'use client';

import IconAngry from '@/assets/icons/IconAngry';
import IconBida from '@/assets/icons/IconBida';
import IconDinosaur from '@/assets/icons/IconDinosaur';
import React, { useRef, useState } from 'react';
import gsap from 'gsap';

const WorksPage = () => {
  const BECOME_LIST = [
    {
      id: '1',
      title: '1. An “UI/UX Designer”',
      icon: <IconBida />,
      describe1: 'So what if I chose to embrace the creative chaos',
      describe2: 'and become a UI/UX Designer?????',
    },
    {
      id: '2',
      title: '2. A “Graphic Designer”',
      icon: <IconAngry />,
      describe1: 'So what if I chose to dive into the creative chaos ',
      describe2: 'and become a graphic designer??????',
    },
    {
      id: '3',
      title: '3. C “Content Creator”',
      icon: <IconDinosaur />,
      describe1: 'So what if I chose to embrace the creative',
      describe2: 'chaos and become a Content creator?????',
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

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
      <div className='pt-[7rem]'>
        <p className='px-[51px] text-[20px] font-[400] text-[#F4E4CA]'>
          HMMMM... So what if I chose to become:
        </p>

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
              ref={(el) => (itemRefs.current[index] = el) as any}
              onMouseEnter={() => handleHover(index)}
              className='group relative z-10 flex cursor-pointer items-center justify-between px-[46px] py-[10px]'
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorksPage;
