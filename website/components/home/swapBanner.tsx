/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import NextLink from 'next/link'

interface ImagesGroup {
  image: StaticImageData
}
interface Props {
  images: ImagesGroup[]
}
const SwapBanner = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId
      = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000);
    // Adjust interval as needed

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className='mt-4 mx-auto w-[483] sm:w-[1000]'>
      {images.map((image, index) => (
        <div key={index} className={` ${index === currentIndex ? 'active' : ''}`}>
          {index === currentIndex && <NextLink href='#'><Image alt={`Banner ${index + 1}`} className='mx-auto' src={image.image} /></NextLink>}
        </div>
      ))}
    </div>
  );
};

export default SwapBanner;
