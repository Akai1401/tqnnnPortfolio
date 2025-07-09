import * as React from 'react';
import { SVGProps } from 'react';
const IconArrowBold = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={14}
    height={14}
    fill='none'
    {...props}
  >
    <path
      fill='#F4E4CA'
      d='M13 1h1V0h-1v1Zm0 0-.707-.707-12 12L1 13l.707.707 12-12L13 1ZM6 1v1h7V0H6v1Zm7 0h-1v7h2V1h-1Z'
    />
  </svg>
);
export default IconArrowBold;
