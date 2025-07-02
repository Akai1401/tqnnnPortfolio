import { DEFAULT } from '@/constant/default';
import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

export interface ICustomImageProps extends ImageProps {
  defaultImage?: string;
}

const CustomImage = ({
  src,
  defaultImage,
  alt = 'error',
  ...props
}: ICustomImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      src={imgSrc || DEFAULT.IMAGE}
      onError={() => {
        setImgSrc(defaultImage || DEFAULT.IMAGE);
      }}
      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw'
      alt={alt}
      quality={100}
      {...props}
    />
  );
};

export default CustomImage;
