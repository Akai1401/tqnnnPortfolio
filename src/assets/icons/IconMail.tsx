import { customUnitFn } from '@/utils';
import * as React from 'react';
import { SVGProps } from 'react';
const IconMail = (props: SVGProps<SVGSVGElement>) => (
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
      d='M26.668 5.333H5.335A2.663 2.663 0 0 0 2.68 8l-.013 16c0 1.467 1.2 2.667 2.667 2.667h21.333c1.467 0 2.667-1.2 2.667-2.667V8c0-1.467-1.2-2.667-2.667-2.667ZM26.135 11l-9.427 5.893a1.348 1.348 0 0 1-1.413 0L5.868 11a1.134 1.134 0 1 1 1.2-1.92l8.933 5.587 8.934-5.587a1.134 1.134 0 1 1 1.2 1.92Z'
    />
  </svg>
);
export default IconMail;
