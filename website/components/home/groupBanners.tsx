/* eslint-disable prettier/prettier */
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import NextLink from 'next/link'

interface GroupItems {
  id: string;
  image: StaticImageData
}
interface Props {
  items: GroupItems[];
}
const GroupBanners = ({ items }: Props) => {
  return (
    <div className='mt-4 flex flex-row mx-auto w-[483] sm:w-[1000]'>
      {items.map((item) => (
        <div key={item.id} className=" p-1">
          <NextLink href='#'>
            <Image alt={`banner-${item.id}`} className="w-full" src={item.image} />
          </NextLink>
        </div>
      ))}
    </div>
  );
};

export default GroupBanners;
