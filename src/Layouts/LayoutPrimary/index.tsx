import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from './Header';
import useStore from '@/store';

const LayoutPrimary = ({ children }: any) => {
  return (
    <div className=''>
      <Header />
      <div className=''>{children}</div>
    </div>
  );
};

export default LayoutPrimary;
