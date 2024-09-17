/* eslint-disable prettier/prettier */
import React from 'react'
import { Navbar, Button, Link, NavbarContent, NavbarItem } from '@nextui-org/react'
import Image from 'next/image';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import handleCert from '@/assets/handle_cert.png'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className='bg-sky-700'>
      <Navbar className='bg-sky-700 h-fit justify-center'>
        <NavbarContent className="sm:flex gap-1 w-[483] sm:w-full " justify="center">
          <NavbarItem className='text-white  border-r-1 px-1 border-black '>
            <Link className='text-white hover:underline px-0 text-[9px] sm:text-xs  sm:px-2 ' href="#">
              Trang chủ
            </Link>
          </NavbarItem>
          <NavbarItem className='text-white  border-r-1 px-1 border-black '>
            <Link className='text-white hover:underline px-0 text-[9px] sm:text-xs  sm:px-2 ' href="#">
              Văn phòng điện tử
            </Link>
          </NavbarItem>
          <NavbarItem className='text-white  border-r-1 px-1 border-black '>
            <Link className='text-white hover:underline px-0 text-[9px] sm:text-xs  sm:px-2 ' href="#">
              Hệ thống văn bản
            </Link>
          </NavbarItem>
          <NavbarItem className='text-white  border-r-1 px-1 border-black '>
            <Link className='text-white hover:underline px-0 text-[9px] sm:text-xs  sm:px-2 ' href="#">
              Đăng ký lịch tuần
            </Link>
          </NavbarItem>
          <NavbarItem className='text-white  border-r-1 px-1 border-black '>
            <Link className='text-white hover:underline px-0 text-[9px] sm:text-xs  sm:px-2 ' href="#">
              Lịch công tác tuần(beta)
            </Link>
          </NavbarItem>
          <NavbarItem >
            <Button className={`text-white text-xs bg-transparent  bg-cover bg-no-repeat rounded-none w-24 h-10 sm:bg-[url('@/assets/on_top.png')] sm:overflow-auto sm:h-auto sm:w-36`} href="#" variant="flat" onClick={scrollToTop}>
              <ArrowUpwardIcon className='text-medium text-yellow-300 ' />
              <p className='text-[9px] sm:text-xs'>Lên đầu trang</p>
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className='bg-sky-700 flex justify-center w-full h-fit pb-1'>
        <div >
          <div className='text-yellow-200 pl-2 text-[10px] sm:text-xs sm:p-0'>
            <p className='text-yellow-300  uppercase'>Trang thông tin điện tử công đoàn thành phố hồ chí minh</p>
            <p>&nbsp;</p>
            <p>
              <span className='text-yellow-300 '>Giấy phép số: </span>
              05/GP-STTTT do Sở Thông tin và Truyền thông TP. Hồ Chí Minh cấp ngày 27/01/2021
            </p>
            <p>
              <span className='text-yellow-300 '>Địa chỉ: </span>
              14 Cách Mạng Tháng Tám, phường Bến Thành, quận 1, TP. Hồ Chí Minh
            </p>
            <p>
              <span className='text-yellow-300 '>Email: </span>
              vanphongcongdoantphcm@gmail.com - Idld@tphcm.gov.vn
            </p>
            <p>
              <span className='text-yellow-300 '>Điện thoại: </span>
              028 3829 7716
            </p>
          </div>
          <div className='pl-2 flex gap-2 justify-center'>
            <Link className='text-white text-xs font-bold border-r-1 border-black pr-2 cursor-pointer'>Facebook</Link>
            <Link className='text-white text-xs font-bold cursor-pointer'>Youtube</Link>
          </div>
          <>
            <div className='flex justify-center'>
              <Link className='pl-2 my-1' href='#'>
                <Image alt='Chung nhan' src={handleCert} />
              </Link>
            </div>
            <div className='pl-2 flex justify-center'>
              <div className=' flex text-xs items-center mr-2'>
                <p className='text-white mr-2'>Đang trực tuyến:</p>
                <span className='bg-sky-800 text-white p-1 rounded-sm mr-2'>4</span>
                <span className='border-r-1 border-white h-3' />
              </div>
              <div className=' flex text-xs items-center'>
                <p className='text-white mr-2'>Đã truy cập:</p>
                <span className='bg-sky-800 text-white p-1 rounded-sm mr-2'>2</span>
                <span className='bg-sky-800 text-white p-1 rounded-sm mr-2'>2</span>
                <span className='bg-sky-800 text-white p-1 rounded-sm mr-2'>0</span>
                <span className='bg-sky-800 text-white p-1 rounded-sm mr-2'>0</span>
                <span className='bg-sky-800 text-white p-1 rounded-sm mr-2'>0</span>
                <span className='bg-sky-800 text-white p-1 rounded-sm mr-2'>4</span>
                <span className='bg-sky-800 text-white p-1 rounded-sm mr-2'>9</span>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>

  )
}

export default Footer
