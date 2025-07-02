import React, { useState } from 'react';
import CustomDrawer from '../custom/CustomDrawer';

const DrawerDemo = ({ open, onClose }: any) => {
  return (
    <CustomDrawer open={open} onClose={onClose} width={300} placement='right'>
      <div className='flex h-full flex-col justify-between gap-[2rem] overflow-auto border-l border-[#383838] bg-layer-primary px-[20px] text-white [scrollbar-width:none]'>
        Demo
      </div>
    </CustomDrawer>
  );
};

export default DrawerDemo;
