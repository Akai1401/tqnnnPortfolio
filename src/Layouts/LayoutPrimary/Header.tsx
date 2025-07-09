'use client';

import IconMenu from '@/assets/icons/IconMenu';
import CustomImage from '@/components/custom/CustomImage';
import { INFO } from '@/constant/info';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import useCustomRouter from '@/hook/useCustomRouter';
import useStore from '@/store';
import { MENU_ITEMS } from '@/constant';

const MenuList = () => {
  const customRouter = useCustomRouter();
  const setIsShowMenu = useStore((state: any) => state.setIsShowMenu);

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseEnter = (index: number) => {
    const item = refs.current[index];
    if (!item) return;
    const [normal, hover] = item.children;
    gsap.to(normal, { y: '-100%', duration: 0.2, ease: 'power2.inOut' });
    gsap.to(hover, { y: '-100%', duration: 0.2, ease: 'power2.inOut' });
  };

  const handleMouseLeave = (index: number) => {
    const item = refs.current[index];
    if (!item) return;
    const [normal, hover] = item.children;
    gsap.to(normal, { y: '0%', duration: 0.2, ease: 'power2.inOut' });
    gsap.to(hover, { y: '0%', duration: 0.2, ease: 'power2.inOut' });
  };

  return (
    <div className='flex items-center'>
      {MENU_ITEMS.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            customRouter.push(item.href);
          }}
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
  );
};

const Header = () => {
  const customRouter = useCustomRouter();
  const [showDetail, setShowDetail] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const path = usePathname();
  const setIsShowMenu = useStore((state: any) => state.setIsShowMenu);
  const isShowMenu = useStore((state: any) => state.isShowMenu);
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const isHeaderVisible = useRef(true);
  const ticking = useRef(false);

  useEffect(() => {
    if (path !== '/') {
      setShowDetail(true);
    } else {
      setShowDetail(false);
    }
  }, [path]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          if (currentScrollY > lastScrollY.current && currentScrollY > 100 && isHeaderVisible.current) {
            // Scrolling down - hide header
            isHeaderVisible.current = false;
            gsap.to(headerRef.current, {
              y: -100,
              duration: 0.3,
              ease: 'power2.inOut',
            });
          } else if (currentScrollY < lastScrollY.current && !isHeaderVisible.current) {
            // Scrolling up - show header
            isHeaderVisible.current = true;
            gsap.to(headerRef.current, {
              y: 0,
              duration: 0.3,
              ease: 'power2.inOut',
            });
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Ho_Chi_Minh',
    });
  };

  return (
    <div 
      ref={headerRef}
      className='fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-[2rem] py-[1rem]'
    >
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
              / {formatTime(currentTime)} (GMT+7) <br />
              35.6764° N, 139.6500° E
            </p>
          </div>
        )}
      </div>

      {(path === '/' || path.includes('/works')) && <MenuList />}

      <div className='flex items-center gap-[80px]'>
        {(path === '/about' || path === '/my-story') && <MenuList />}
        <IconMenu
          onClick={() => setIsShowMenu(!isShowMenu)}
          className='cursor-pointer transition-all active:scale-95'
        />
      </div>
    </div>
  );
};

export default Header;
