import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from './Header';
import useStore from '@/store';

const LayoutPrimary = ({ children }: any) => {
  const showHeader = useStore((state: any) => state.showHeader);
  return (
    <div className=''>
      {showHeader && <Header />}
      <div className=''>{children}</div>
    </div>
  );
};

export default LayoutPrimary;
