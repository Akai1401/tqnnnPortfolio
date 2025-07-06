import { customUnitFn } from '@/utils';
import * as React from 'react';
import { SVGProps } from 'react';
const IconFigma = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={customUnitFn(21)}
    height={customUnitFn(32)}
    viewBox='0 0 21 32'
    fill='none'
    {...props}
  >
    <path
      fill='#F4E4CA'
      d='M5.88 31.407c2.744 0 4.968-2.281 4.968-5.096v-5.095H5.88c-2.744 0-4.968 2.281-4.968 5.095 0 2.815 2.224 5.096 4.968 5.096ZM.912 16.12c0-2.815 2.224-5.096 4.968-5.096h4.968v10.192H5.88c-2.744 0-4.968-2.282-4.968-5.096ZM.912 5.929C.912 3.114 3.136.833 5.88.833h4.968v10.191H5.88C3.136 11.024.912 8.743.912 5.93ZM10.848.833h4.969c2.744 0 4.968 2.281 4.968 5.096 0 2.814-2.224 5.095-4.968 5.095h-4.969V.833ZM20.785 16.12c0 2.814-2.224 5.096-4.968 5.096-2.744 0-4.969-2.282-4.969-5.096 0-2.815 2.225-5.096 4.969-5.096s4.968 2.282 4.968 5.096Z'
    />
  </svg>
);
export default IconFigma;
