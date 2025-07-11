import { customUnitFn } from '@/utils';
import * as React from 'react';
import { SVGProps } from 'react';
const IconLinkedin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={customUnitFn(32)}
    height={customUnitFn(32)}
    viewBox='0 0 32 32'
    fill='none'
    {...props}
  >
    <path
      fill='#F4E4CA'
      d='M25.333 4A2.667 2.667 0 0 1 28 6.667v18.666A2.667 2.667 0 0 1 25.333 28H6.667A2.667 2.667 0 0 1 4 25.333V6.667A2.667 2.667 0 0 1 6.667 4h18.666Zm-.666 20.667V17.6a4.347 4.347 0 0 0-4.347-4.347c-1.133 0-2.453.694-3.093 1.734v-1.48h-3.72v11.16h3.72v-6.574a1.86 1.86 0 0 1 1.853-1.866 1.866 1.866 0 0 1 1.867 1.866v6.574h3.72ZM9.173 11.413a2.24 2.24 0 0 0 2.24-2.24c0-1.24-1-2.253-2.24-2.253A2.253 2.253 0 0 0 6.92 9.173c0 1.24 1.013 2.24 2.253 2.24Zm1.854 13.254v-11.16H7.333v11.16h3.694Z'
    />
  </svg>
);
export default IconLinkedin;
