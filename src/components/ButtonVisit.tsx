import IconArrowBold from '@/assets/icons/IconArrowBold';
import React from 'react';

const ButtonVisit = ({
  buttonRef,
  href,
  className = '',
  title = 'Visit website',
}: {
  buttonRef?: React.RefObject<any>;
  href: string;
  className?: string;
  title?: string;
}) => {
  return (
    <a
      ref={buttonRef}
      href={href}
      target='_blank'
      className={`group inline-block ${className}`}
      rel='noopener noreferrer'
    >
      <button className='btn-primary'>
        {title}{' '}
        <IconArrowBold className='transition-all duration-300 group-hover:rotate-45' />
      </button>
    </a>
  );
};

export default ButtonVisit;
