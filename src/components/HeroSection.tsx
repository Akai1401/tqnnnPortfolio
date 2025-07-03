import React from 'react';

const HeroSection = () => {
  return (
    <div
      id='hero-section'
      className='relative h-screen w-full bg-[url("/images/home/bg.jpg")] bg-cover bg-center bg-no-repeat'
    >
      <div className='absolute inset-0 bg-black/20'></div>
      <div className='relative z-10 flex h-full w-full items-center justify-center'>
        <div className='text-center'>
          <h1 className='mb-6 text-6xl font-bold text-white'>
            Welcome to My Portfolio
          </h1>
          <p className='text-xl text-white/90'>
            Creative Developer & Designer
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
