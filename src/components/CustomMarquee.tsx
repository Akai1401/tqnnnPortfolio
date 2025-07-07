import IconWarning from '@/assets/icons/IconWarning';
import React from 'react';
import Marquee from 'react-fast-marquee';

const CustomMarquee = () => {
  const MARQUEE_LIST = [
    {
      id: 0,
      text: 'portfolio version 2025',
    },
    {
      id: 1,
      text: 'by Thanh Quy Nguyen aka tqnggg',
    },
    {
      id: 2,
      text: 'thank you to my family for always supporting me on this path',
    },
    {
      id: 3,
      text: 'grateful to myself and all that shaped this journey',
    },
    {
      id: 4,
      text: 'nice to meet you',
    },
  ];

  return (
    <Marquee speed={100} className='flex items-center bg-black py-[12px]'>
      {MARQUEE_LIST.map((item) => (
        <div
          className='flex items-center text-[20px] font-[400] text-[#F4E4CA]'
          key={item.id}
        >
          <IconWarning className='mx-[32px]' />
          {item.text}
        </div>
      ))}
    </Marquee>
  );
};

export default CustomMarquee;
