/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react'
import { Card, CardBody } from '@nextui-org/react'
import LabelIcon from '@mui/icons-material/Label';
import CampaignIcon from '@mui/icons-material/Campaign';
import Image from 'next/image'
import NextLink from 'next/link'
import { toast, ToastContainer } from 'react-toastify';

import styles from '@/styles/App.module.css'
import banner4 from '@/assets/banners/banner4.jpg'
import banner5 from '@/assets/banners/banner5.jpg'
import banner6 from '@/assets/banners/banner6.jpg'
import banner7 from '@/assets/banners/banner7.jpg'
import banner8 from '@/assets/banners/banner8.jpg'
import banner9 from '@/assets/banners/banner9.jpg'
import banner10 from '@/assets/banners/banner10.png'

const ScrowView = () => {
  const [isHovering, setIsHovering] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    if (!isHovering) {
      intervalId = setInterval(() => {
        const list = listRef.current;

        if (list) {
          list.scrollTo({ top: list.scrollTop + 1 });
          if (list.scrollTop + list.clientHeight >= list.scrollHeight) {
            list.scrollTop = 0; // Đặt lại vị trí cuộn về 0 khi chạm đáy
          }
        }
      }, 20);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isHovering]);

  const [selectedData, setSelectedData] = useState({
    id: '1',
    title: 'Giai cấp công nhân và phong trào Công đoàn quốc tế tiếc thương Tổng Bí thư Nguyễn Phú Trọng',
    image: banner4
  })

  const data = [
    {
      id: '1',
      title: 'Giai cấp công nhân và phong trào Công đoàn quốc tế tiếc thương Tổng Bí thư Nguyễn Phú Trọng',
      image: banner4
    },
    {
      id: '2',
      title: 'Thăm, tặng quà các gia đình liệt sĩ công vận, các đồng chí nguyên lãnh đạo Liên đoàn Lao động Thành phố, quận các thời kỳ ',
      image: banner5
    },
    {
      id: '3',
      title: 'Công đoàn Ngành Y tế Thành phố Hồ Chí Minh tiếp đón và làm việc với đoàn cán bộ Công đoàn Liên minh Liên hiệp Công đoàn Quốc gia Campuchia',
      image: banner6
    },
    {
      id: '4',
      title: 'Ngồi đây nhưng anh em làm gì đều biết cả đấy!',
      image: banner7
    },
    {
      id: '5',
      title: 'TẬN TỤY VÌ ĐOÀN VIÊN - LAO ĐỘNG (*): Chân thành, nhạy bén',
      image: banner8
    },
  ];
  const runData = [
    {
      id: 1,
      label: 'Công văn số 1295/LĐLĐ - Về việc tiếp tục đẩy mạnh tuyên truyền thực hiện Cuộc vận động "Người dân Thành phố Hồ Chí Minh không xả rác ra đường và kênh rạch, vì Thành phố sạch, xanh và thân thiện môi trường "',
    },
    {
      id: 2,
      label: ' Công văn số 1089/LĐLĐ - Về việc tham gia cuộc thi "Vòng tay công đoàn" lần thứ IV '
    },
    {
      id: 3,
      label: ' Công văn số 1243/LĐLĐ - Về việc vận động đoàn viên, người lao động tham Hội thi trực tuyến " Công đoàn Thành phố Hồ Chí Minh tiếp nối truyền thống - vững bước phát triển" '
    },
    {
      id: 4,
      label: ' Công văn 1240/LĐLĐ - Về việc vận động đoàn viên, người lao động tham gia cuộc thi Video clip "Cùng HTV hành động xanh" mùa 3 năm 2024  '
    },
    {
      id: 5,
      label: ' Thông báo số 526/TB-LĐLĐ - Thông báo số 1 Hội thi trực tuyến "Công đoàn Thành phố Hồ Chí Minh tiếp nối truyền thống - vững bước phát triển" '
    },
    {
      id: 6,
      label: ' Công văn số 1295/LĐLĐ - Về việc tiếp tục đẩy mạnh tuyên truyền thực hiện Cuộc vận động "Người dân Thành phố Hồ Chí Minh không xả rác ra đường và kênh rạch, vì Thành phố sạch, xanh và thân thiện môi trường '
    },
  ]
  const handleMouseOver = (itemID: string) => {
    const item = data.find(item => item.id === itemID)

    if (item) {
      setSelectedData(item);
    } else {
      toast.error('Không tìm thấy')
    }
  }

  return (
    <>
      <Card className='mx-auto mt-2.5 w-[483] sm:w-[1020]'>
        <CardBody className='p-1'>
          <div className='flex flex-col sm:grid sm:grid-cols-4-auto'>
            <div className='relative col-span-2 w-full h-[400] sm:w-[470]'>
              {selectedData &&
                <div>
                  <Image alt={selectedData.title} className='absolute w-full h-full rounded ' src={selectedData.image} width={200} />
                  <div className='absolute top-0 left-0 flex items-end rounded-lg w-full h-full shadow-scrowview'>
                    <p className='absolute bottom-5 w-full p-2.5 text-white'>{selectedData.title}</p>
                  </div>
                </div>
              }
            </div>
            <div className='flex flex-row sm:flex-col'>
              {data.map(item => (
                <div
                  key={item.id}
                  className='border border-solid border-white mb-0.5 p-1 w-[271] min-h-16 flex gap-3 bg-slate-300 cursor-pointer hover:bg-white transition-all duration-300 flex-col items-center sm:flex-row'
                  // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
                  onMouseOver={() => handleMouseOver(item.id)}
                >
                  <Image alt={item.title} className='w-[100] h-16 sm:w-[90] sm:h-[65]' src={item.image} />
                  <p className='font-bold text-[10px]'>{item.title}</p>
                </div>
              ))}
            </div>
            <div className='w-full sm:w-[271]'>
              <div className='flex w-40 h-7 bg-red-500 uppercase p-1 align-middle justify-center'>
                <CampaignIcon className={` mr-2.5 ${styles.textChanging}`} />
                <h1 className={`font-medium ${styles.textChanging}`}> Văn bản mới</h1>
              </div>
              <div>
                <ul ref={listRef} className='max-h-44 overflow-y-auto overflow-x-hidden cursor-pointer scrollbar-hide'>
                  {runData.map((item) => (
                    <li
                      key={item.id}
                      className={`flex bg-orange-100 border-dashed border-gray-50 border-x-0 border-y-1`}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <LabelIcon className='text-red-500 mr-2.5' />
                      <p className='text-sky-800 text-sm'>{item.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div >
                <NextLink href='#'>
                  <Image alt='banner10' className='w-full h-28 sm:h-24' src={banner10} />
                </NextLink>
                <NextLink href='#'>
                  <Image alt='banner9' className='w-full h-28 sm:h-24' src={banner9} />
                </NextLink>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <ToastContainer />
    </>
  )
}

export default ScrowView
