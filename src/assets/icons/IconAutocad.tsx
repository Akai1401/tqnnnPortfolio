import { customUnitFn } from '@/utils';
import * as React from 'react';
import { SVGProps } from 'react';
const IconAutocad = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={customUnitFn(49)}
    height={customUnitFn(42)}
    viewBox='0 0 49 42'
    fill='none'
    {...props}
  >
    <path
      fill='#F4E4CA'
      d='M30.753.89h17.742v41L30.753.89ZM18.25.89H.496v41L18.25.89ZM24.503 16l11.304 25.89h-7.41l-3.38-8.244h-8.272l7.758-17.645Z'
    />
  </svg>
);
export default IconAutocad;
