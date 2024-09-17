/* eslint-disable prettier/prettier */
import React from 'react'
import Image, { StaticImageData } from 'next/image'
import NextLink from 'next/link'

interface Props {
  image: StaticImageData;
  alt: string
}
const Banner = ({ image, alt }: Props) => {
  return (
    <div className='mt-4 mx-auto w-[483] sm:w-[1000]'  >
      <NextLink href='#'>
        <Image
          priority
          alt={alt}
          src={image}
        />
      </NextLink>
    </div>
  )
}

export default Banner
