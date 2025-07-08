import React from 'react';
import CustomImage from './custom/CustomImage';
import useMounted from '@/hook/useMounted';
import useResponsive from '@/hook/useResponsive';

const ScrollToTop = () => {
  const [show, setShow] = React.useState(false);
  const { isMounted } = useMounted();
  React.useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMounted]);

  return (
    <div
      className={`${show && '!z-[999] !opacity-100'} fixed bottom-[3rem] right-[68.49px] -z-10 opacity-0 transition-all active:scale-95`}
    >
      <CustomImage
        src='/images/scrollup.png'
        className='min-h-[64px] min-w-[64px] cursor-pointer'
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        alt='err'
        width={64}
        height={64}
      />
    </div>
  );
};

export default ScrollToTop;
