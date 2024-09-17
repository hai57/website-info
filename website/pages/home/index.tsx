/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Banner1 from '@/assets/banners/banner1.jpg'
import Banner2 from '@/assets/banners/banner2.png'
import Banner3 from '@/assets/banners/banner3.jpg'
import Banner11 from '@/assets/banners/banner11.jpg'
import Banner12 from '@/assets/banners/banner12.png'
import ChuyenMuc from '@/assets/banners/chuyenmuc.png'
import ImageGroup1 from '@/assets/groups/group1.jpg'
import ImageGroup2 from '@/assets/groups/group2.jpg'
import ImageGroup3 from '@/assets/groups/group3.jpg'
import Covid from '@/assets/groups/covid.jpg'
import Luat from '@/assets/groups/luat.jpg'
import BacHo from '@/assets/groups/bacho.jpg'
import DaiHoiCacCap from '@/assets/groups/daihoicaccap.png'
import DaiHoiXii from '@/assets/groups/daihoixii.png'
import Topics from '@/components/home/topics'
import GroupBanners from '@/components/home/groupBanners'
import SwapBanner from '@/components/home/swapBanner'
import Banner from '@/components/home/banner'
import ScrowView from '@/components/home/scrowView'
import SlideShow from '@/components/home/slideShow'
import IconSlide from '@/components/home/iconSlide'

const Home = () => {
  const [icons, setIcons] = useState([])
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/icons/route')
        const data = await res.data

        setIcons(data.icons)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchDataTopics = async () => {
      try {
        const res = await axios.get('/api/topics/route')
        const data = await res.data

        setTopics(data.topics)
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchDataTopics();
  }, [])

  const items = [
    { image: Banner1 },
    { image: Banner2 },
    { image: Banner3 }
  ];


  //Group
  const groups = () => [
    {
      id: '1',
      image: ImageGroup1
    },
    {
      id: '2',
      image: ImageGroup2
    },
    {
      id: '3',
      image: ImageGroup3
    }
  ]
  const groups2 = () => [
    {
      id: '1',
      image: Covid
    },
    {
      id: '2',
      image: Luat
    },
    {
      id: '3',
      image: BacHo
    }
  ]
  const groups3 = () => [
    {
      id: '1',
      image: DaiHoiXii
    },
    {
      id: '2',
      image: DaiHoiCacCap
    }
  ]


  return (
    <>
      {isLoading ? (
        <div>Loading ...</div> // Display loading indicator while fetching
      ) : (
        <>
          <SlideShow items={items} />
          <ScrowView />
          {/* Banners */}
          <Banner alt='Banner 11' image={Banner11} />
          <Banner alt='Banner 12' image={Banner1} />
          {/* Topics */}
          <Topics topics={topics[0]} />
          <Topics topics={topics[1]} />
          {/* Group */}
          <GroupBanners items={groups()} />
          <SwapBanner images={items} />
          <Topics topics={topics[2]} />
          <Topics topics={topics[3]} />
          <Banner alt='Banner12' image={Banner12} />
          <GroupBanners items={groups2()} />
          <GroupBanners items={groups3()} />
          <Banner alt='Chuyen-Muc' image={ChuyenMuc} />
          <IconSlide items={icons} />
        </>
      )}
    </>

  )
}

export default Home
