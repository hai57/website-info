/* eslint-disable prettier/prettier */
import Image, { StaticImageData } from 'next/image'
import React from 'react'
import Carousel from 'react-material-ui-carousel'

const SlideShow = ({ items }: {
  items: {
    image: StaticImageData
  }[]
}) => {

  return (
    <div className=' w-[483]  sm:w-[1000] mx-auto my-0'>
      <Carousel
        className='overflow-hidden mx-auto h-44 rounded-lg relative  '
        indicators={false}
      >
        {items.map((item, i) => (
          <div key={i} className=' absolute flex transition-all duration-300 w-fit h-fit sm:w-full sm:h-full'>
            <Image
              priority
              alt={`carousel-image-${i}`}
              src={item.image}
            />
          </div>)
        )
        }
      </Carousel>
    </div >
  )
}

export default SlideShow
