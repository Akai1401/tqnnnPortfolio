'use client';

import IconMenu from '@/assets/icons/IconMenu';
import CustomImage from '@/components/custom/CustomImage';
import { INFO } from '@/constant/info';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import useCustomRouter from '@/hook/useCustomRouter';

const Header = () => {
  const customRouter = useCustomRouter();
  const [showDetail, setShowDetail] = useState(false);
  const path = usePathname();

  useEffect(() => {
    if (path !== '/') {
      setShowDetail(true);
    } else {
      setShowDetail(false);
    }
  }, [path]);

  const MENU_ITEMS = [
    { label: 'About', href: '/about' },
    { label: 'Works', href: '/works' },
    { label: 'My Story', href: '/my-story' },
    { label: 'CV / Resume', href: '/resume' },
  ];

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseEnter = (index: number) => {
    const item = refs.current[index];
    if (!item) return;
    const [normal, hover] = item.children;
    gsap.to(normal, { y: '-100%', duration: 0.15, ease: 'power2.inOut' });
    gsap.to(hover, { y: '-100%', duration: 0.15, ease: 'power2.inOut' });
  };

  const handleMouseLeave = (index: number) => {
    const item = refs.current[index];
    if (!item) return;
    const [normal, hover] = item.children;
    gsap.to(normal, { y: '0%', duration: 0.15, ease: 'power2.inOut' });
    gsap.to(hover, { y: '0%', duration: 0.15, ease: 'power2.inOut' });
  };

  return (
    <div className='fixed left-0 right-0 top-0 z-[9999] flex items-center justify-between px-[2rem] py-[1rem]'>
      <div className='flex items-center gap-[124px]'>
        <CustomImage
          src={INFO.APP.LOGO_URL}
          alt='logo'
          width={111}
          height={48}
          className='cursor-pointer transition-all active:scale-95'
          onClick={() => {
            customRouter.push('/');
          }}
        />
        {showDetail && (
          <div className='flex items-center gap-[43px] text-[16px] font-[400] text-[#F4E4CA]'>
            <p>
              / Base on. <br />
              Hanoi, Vietnam
            </p>
            <p>
              / 12:34 (GMT+7) <br />
              35.6764° N, 139.6500° E
            </p>
          </div>
        )}
      </div>

      <div className='flex items-center gap-[2rem]'>
        {MENU_ITEMS.map((item, index) => (
          <div
            key={index}
            onClick={() => customRouter.push(item.href)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            className='group flex cursor-pointer items-center text-[16px] font-[600] uppercase text-[#F4E4CA]'
          >
            <div
              ref={(el) => {
                refs.current[index] = el;
              }}
              className='relative h-[16px] overflow-hidden leading-none'
            >
              <div className='transform transition-transform'>{item.label}</div>
              <div className='absolute left-0 top-full transform transition-transform'>
                {item.label}
              </div>
            </div>
            {index !== MENU_ITEMS.length - 1 && (
              <span className='mx-[32px]'>/</span>
            )}
          </div>
        ))}
      </div>
      <IconMenu className='cursor-pointer transition-all active:scale-95' />
    </div>
  );
};

export default Header;
