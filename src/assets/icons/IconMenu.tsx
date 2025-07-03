import { customUnitFn } from '@/utils';
import * as React from 'react';
import { SVGProps } from 'react';
const IconMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={customUnitFn(22)}
    height={customUnitFn(22)}
    viewBox='0 0 22 22'
    fill='none'
    {...props}
  >
    <path
      stroke='#F4E4CA'
      strokeWidth={1.5}
      d='M9 5a4 4 0 1 0-8 0 4 4 0 0 0 8 0ZM9 17a4 4 0 1 0-8 0 4 4 0 0 0 8 0ZM21 5a4 4 0 1 0-8 0 4 4 0 0 0 8 0ZM21 17a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z'
    />
  </svg>
);
export default IconMenu;
