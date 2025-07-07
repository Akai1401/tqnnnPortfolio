import useStore from '@/store';
import React, { useEffect } from 'react';
import SocialButtons from './SocialButtons';
import { MENU_ITEMS } from '@/constant';
import useCustomRouter from '@/hook/useCustomRouter';
import gsap from 'gsap';

const Menu = () => {
  const isShowMenu = useStore((state: any) => state.isShowMenu);
  const socialRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const customRouter = useCustomRouter();

  useEffect(() => {
    if (!isShowMenu) {
      gsap.set(socialRefs.current, {
        y: 80,
        opacity: 0,
      });
      gsap.set(itemRefs.current, {
        y: 80,
        opacity: 0,
      });
      return;
    }
    gsap.to(itemRefs.current, {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 0.6,
      delay: 0,
      ease: 'power2.inOut',
    });
    gsap.to(socialRefs.current, {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 0.6,
      delay: 0,
      ease: 'power2.out',
    });
  }, [isShowMenu]);
  return (
    <div
      className={`fixed inset-0 text-white ${isShowMenu ? 'z-50 opacity-100' : 'z-[-1] opacity-0'} transition-all duration-[1000ms] ease-in-out`}
    >
      <div className='flex h-full flex-col items-center justify-center gap-[32px]'>
        {MENU_ITEMS.map((item, index) => (
          <div key={index} className='overflow-y-hidden'>
            <div
              ref={(el) => {
                (itemRefs as any).current[index] = el;
              }}
              onClick={() => {
                customRouter.push(item.href);
              }}
              className='group relative flex items-start gap-[20px] transition-all duration-300 active:scale-95 cursor-pointer'
            >
              <div className='absolute left-[-20px] top-0 h-full w-0 bg-[#BD2F00] transition-all duration-300 group-hover:w-[calc(100%+40px)]'></div>
              <p
                className={`relative mt-[0.5rem] text-[32px] font-[400] text-[#6E675B] group-hover:text-[#F4E4CA]`}
              >
                0{index + 1}
              </p>
              <button className='relative mx-[14px] py-[4px] text-[64px] font-[400] text-[#6E675B] transition-all group-hover:text-[#F4E4CA]'>
                {item.labelMenu}
              </button>
            </div>
          </div>
        ))}
      </div>
      <SocialButtons
        className='absolute bottom-[2rem] left-[3rem] mt-[10rem] max-w-[400px] flex-wrap'
        socialRefs={socialRefs}
      />
      <div className='absolute bottom-[2rem] right-[3rem] text-[16px] font-[400] text-[#F4E4CA]'>
        ALL RIGHTS RESERVED <br /> © 2025 TQNG MARUKO
      </div>
    </div>
  );
};

export default Menu;
