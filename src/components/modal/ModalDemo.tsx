import React from 'react';
import CustomModal from '../custom/CustomModal';

const ModalActiveSuccess = ({ open, onCancel, data }: any) => {
  return (
    <CustomModal open={open} onCancel={onCancel} width={568}>
      <div className='rounded-xl bg-[#F6E4B1] p-[40px]'>Hi</div>
    </CustomModal>
  );
};

export default ModalActiveSuccess;
