import React from 'react';
import CustomImage from './custom/CustomImage';

const NoResult = ({ width = 400, text = 24, content = 'No data' }) => {
  return (
    <div className='flex flex-col items-center'>
      <CustomImage
        src='/images/watch/no-comment.png'
        alt='no-result'
        style={{
          width: `${width}px`,
        }}
        width={408}
        height={720}
      />
      <p
        className='mt-[1rem] text-center text-white'
        style={{
          fontSize: `${text}px`,
        }}
      >
        {content}
      </p>
    </div>
  );
};

export default NoResult;
