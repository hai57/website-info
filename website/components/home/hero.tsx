/* eslint-disable prettier/prettier */
import React from 'react'
import NextImage from "next/image";
import dayjs from 'dayjs';
import 'dayjs/locale/vi'

import logo from '@/assets/logo.png'
import medal from '@/assets/medal.png'
import heroBanner from '@/assets/banners/bannerHero.jpg'

export default function Hero() {
  dayjs.locale('vi')
  const formatDate = (dateString: Date) => {
    const date = dayjs(dateString);

    return date.format('dddd, DD MMMM YYYY');

  }
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  return (
    <>
      <div className='py-0.5 px-5 my-0.5 mx-auto text-start bg-slate-100 text-slate-400 text-normal w-full sm:w-[920]  '>
        <p className='first-letter:uppercase'>{formattedDate}</p>
      </div>
      <div className='flex justify-center w-full sw:w-[920]'>
        <div className='flex justify-center p-0 sm:p-2.5 sm:mr-6'>
          <NextImage
            alt="Logo"
            priority
            className='cursor-pointer w-36 sm:w-24 '
            src={logo}
          />
          <div className='flex flex-col justify-center cursor-pointer'>
            <h2 className='text-blue-800 font-bold text-lg sm:text-sm '>Trang thông tin điện tử</h2>
            <div>
              <h1 className='text-blue-500 font-bold uppercase text-xl sm:text-xl'>Công đoàn</h1>
              <h1 className='text-blue-500 font-bold uppercase text-xl sm:text-xl'>Thành Phố Hồ Chí Minh</h1>
            </div>
            <h3 className='text-orange-400 font-normal font-base uppercase text-lg sm:text-sm'>HO CHI MINH CITY FEDERATION OF LABOUR</h3>
          </div>
          <NextImage
            alt="Medal"
            priority
            className='cursor-pointer w-36 sm:w-24'
            src={medal}
          />
        </div>
        <NextImage
          alt='banner'
          priority
          className='cursor-pointer w-[400] hidden sm:block'
          src={heroBanner}
        />
      </div>
    </>


  )
}
