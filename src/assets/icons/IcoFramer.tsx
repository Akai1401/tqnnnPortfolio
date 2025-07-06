import { customUnitFn } from '@/utils';
import * as React from 'react';
import { SVGProps } from 'react';
const IconFramer = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={customUnitFn(28)}
    height={customUnitFn(40)}
    viewBox='0 0 28 40'
    fill='none'
    {...props}
  >
    <path
      fill='#F4E4CA'
      fillRule='evenodd'
      d='M.285 26.34H13.85V39.26L.285 26.34Z'
      clipRule='evenodd'
    />
    <path fill='#F4E4CA' d='M13.849 13.421H.285v12.918h27.128L13.849 13.42Z' />
    <path fill='#F4E4CA' d='M.285.504 13.85 13.422h13.564V.504H.285Z' />
  </svg>
);
export default IconFramer;
