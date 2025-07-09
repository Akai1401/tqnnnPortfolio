// import { DEFAULT_IMAGE } from '@/constant';
// import { BASE64_SKELETON } from '@/constant/base64';
import useStore from '@/store';
import { customUnitFn } from '@/utils';
import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

export interface ICustomImageProps extends ImageProps {
  defaultImage?: string;
}

const CustomImage = ({
  src,
  alt = 'error',
  width,
  height,
  ...props
}: ICustomImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);
  const clientWidth = useStore((state: any) => state.clientWidth);

  const scaleFactor = clientWidth / 1920;
  const scaledWidth = (width as any) * scaleFactor;
  const scaledHeight = (height as any) * scaleFactor;
  const isPC = clientWidth >= 1024;

  return (
    <Image
      src={imgSrc /* || DEFAULT_IMAGE */}
      // onError={() => {
      //   setImgSrc(DEFAULT_IMAGE);
      // }}
      // sizes='(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw'
      alt={alt}
      width={isPC && !isNaN(scaledWidth) ? scaledWidth : width}
      height={isPC && !isNaN(scaledHeight) ? scaledHeight : height}
      // placeholder='blur'
      // blurDataURL={BASE64_SKELETON}
      // quality={100} -> replace by unoptimized
      {...props}
    />
  );
};

export default CustomImage;
