import { customUnitFn } from '@/utils';
import * as React from 'react';
import { SVGProps } from 'react';
const IconArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={customUnitFn(24)}
    height={customUnitFn(24)}
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <path
      fill={props.fill || '#F4E4CA'}
      d='M18 6h.5v-.5H18V6Zm0 0-.354-.354-12 12L6 18l.354.354 12-12L18 6Zm-7 0v.5h7v-1h-7V6Zm7 0h-.5v7h1V6H18Z'
    />
  </svg>
);
export default IconArrow;
