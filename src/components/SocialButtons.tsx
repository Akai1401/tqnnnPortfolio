import IconArrow from '@/assets/icons/IconArrow';
import { INFO } from '@/constant/info';
import React, { useState } from 'react';

const SocialButtons = ({
  socialRefs,
  className,
}: {
  socialRefs: any;
  className?: string;
}) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className={`flex items-center gap-[12px] overflow-hidden ${className}`}
    >
      {Object.keys(INFO.SOCIAL).map((key, index) => {
        const isActive = hovered && hovered === key;
        return (
          <a
            ref={(el) => {
              socialRefs.current[index] = el;
            }}
            href={
              key === 'EMAIL'
                ? 'mailto:tqnggg@gmail.com'
                : INFO.SOCIAL[key as keyof typeof INFO.SOCIAL]
            }
            key={key}
            target='_blank'
            onMouseEnter={() => setHovered(key)}
            onMouseLeave={() => setHovered(null)}
            className={`group relative flex items-center gap-[10px] border px-[20px] py-[8px] text-[18px] font-[400] transition-colors duration-300 ${isActive ? 'border-[#F4E4CA] text-[#313131]' : 'border-[#F4E4CA] text-[#F4E4CA]'} `}
          >
            {/* Nền động */}
            <span
              className={`absolute left-0 top-0 z-0 h-full w-0 transition-all duration-300 ${isActive ? 'w-full bg-[#F4E4CA]' : ''} `}
              style={{ zIndex: 0 }}
            />
            <span className='relative z-10'>
              {key === 'EMAIL' && 'Email'}
              {key === 'LINKEDIN' && 'Linkedin'}
              {key === 'BEHANCE' && 'Behance'}
              {key === 'INSTAGRAM' && 'Instagram'}
            </span>
            <IconArrow
              className='relative z-10 transition-all duration-300 group-hover:rotate-45'
              fill={isActive ? '#313131' : '#F4E4CA'}
            />
          </a>
        );
      })}
    </div>
  );
};

export default SocialButtons;
