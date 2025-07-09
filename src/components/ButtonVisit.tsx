import IconArrowBold from '@/assets/icons/IconArrowBold';
import React from 'react';

const ButtonVisit = ({
  buttonRef,
  href,
  className = '',
}: {
  buttonRef?: React.RefObject<any>;
  href: string;
  className?: string;
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
        Visit website{' '}
        <IconArrowBold className='transition-all duration-300 group-hover:rotate-45' />
      </button>
    </a>
  );
};

export default ButtonVisit;
