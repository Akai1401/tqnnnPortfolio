import React from 'react';
import CustomMarquee from './CustomMarquee';
import IconLinkedin from '@/assets/icons/IconLinkedin';
import IconIns from '@/assets/icons/IconIns';
import IconBehance from '@/assets/icons/IconBehance';
import IconMail from '@/assets/icons/IconMail';
import { INFO } from '@/constant/info';
import useCustomRouter from '@/hook/useCustomRouter';
import CustomImage from './custom/CustomImage';

const Footer = () => {
  const customRouter = useCustomRouter();
  return (
    <div>
      <CustomMarquee />
      <div className='flex min-h-[540px] items-center bg-[url("/images/works/footer.webp")] bg-cover bg-center bg-no-repeat'>
        <div className='flex w-full items-end justify-between px-[67px]'>
          <div>
            <div className='flex items-center gap-[16px]'>
              <div
                onClick={() => {
                  customRouter.push('/about');
                }}
                className='border-[#rgba(255,255,255,0.16) cursor-pointer border bg-[rgba(255,255,255,0.08)] px-[24px] py-[8px] text-[20px] font-[400] text-[#F4E4CA] backdrop-blur-[12px] transition-all duration-300 hover:opacity-[0.7] active:scale-95'
              >
                About
              </div>
              <div
                onClick={() => {
                  customRouter.push('/works');
                }}
                className='border-[#rgba(255,255,255,0.16) cursor-pointer border bg-[rgba(255,255,255,0.08)] px-[24px] py-[8px] text-[20px] font-[400] text-[#F4E4CA] backdrop-blur-[12px] transition-all duration-300 hover:opacity-[0.7] active:scale-95'
              >
                Works
              </div>
              <div
                onClick={() => {
                  customRouter.push('/my-story');
                }}
                className='border-[#rgba(255,255,255,0.16) cursor-pointer border bg-[rgba(255,255,255,0.08)] px-[24px] py-[8px] text-[20px] font-[400] text-[#F4E4CA] backdrop-blur-[12px] transition-all duration-300 hover:opacity-[0.7] active:scale-95'
              >
                My story
              </div>
              <div
                onClick={() => {
                  customRouter.push('/cv.pdf');
                }}
                className='border-[#rgba(255,255,255,0.16) cursor-pointer border bg-[rgba(255,255,255,0.08)] px-[24px] py-[8px] text-[20px] font-[400] text-[#F4E4CA] backdrop-blur-[12px] transition-all duration-300 hover:opacity-[0.7] active:scale-95'
              >
                CV / Resume
              </div>
            </div>
            <div className='mt-[5rem] flex items-start text-[80px] font-[700] uppercase text-[#F4E4CA]'>
              <CustomImage
                src='/images/footer/let.webp'
                alt='let'
                width={628}
                height={182}
              />
              <CustomImage
                src={INFO.APP.LOGO_URL}
                alt='logo'
                width={196}
                height={85}
                className='ml-[-21rem] mt-[1.5rem] cursor-pointer transition-all active:scale-95'
                onClick={() => {
                  customRouter.push('/');
                }}
              />
            </div>
          </div>
          <div>
            <p className='text-[14px] font-[400] text-[#F4E4CA]'>
              / Grateful to myself, all that shaped this journey and thank you{' '}
              <br /> to my family for always supporting me on this path /
            </p>
          </div>
          <div className='text-[14px] font-[400] text-[#F4E4CA]'>
            <p>/ Dong Da, Ha Noi, Vietnam / </p>
            <p className='mt-[24px]'>/ thanhquynguyen0306@gmail.com / </p>
            <div className='mt-[52px]'>
              <div className='flex items-center gap-[16px]'>
                <a href={INFO.SOCIAL.LINKEDIN} target='_blank'>
                  <IconLinkedin className='cursor-pointer' />
                </a>
                <a href={INFO.SOCIAL.INSTAGRAM} target='_blank'>
                  <IconIns className='cursor-pointer' />
                </a>
                <a href={INFO.SOCIAL.BEHANCE} target='_blank'>
                  <IconBehance className='cursor-pointer' />
                </a>
                <a href={`mailto:${INFO.SOCIAL.EMAIL}`} target='_blank'>
                  <IconMail className='cursor-pointer' />
                </a>
              </div>
              <p className='text-[14px[ mt-[8px] font-[400] text-[#F4E4CA] opacity-50'>
                ©2025 All rights reversed. By tqnggg (and this picture)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
