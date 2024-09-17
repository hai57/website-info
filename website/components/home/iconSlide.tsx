/* eslint-disable prettier/prettier */
import React, { Key } from 'react'
import Image from 'next/image'
import _ from 'lodash'
import Carousel from 'react-material-ui-carousel'
import { Grid } from '@mui/material'

interface IconGroup {
  id: Key | null | undefined
  image: String
}
interface Props {
  items: IconGroup[]
}
const IconSlide = ({ items }: Props) => {
  const chunks = _.chunk(items, 6);

  return (
    <Carousel
      className='h-52'
      indicators={false}
    >
      {chunks.map((chunk, index) => (
        <div key={index} className="h-52 flex justify-center items-center">
          <Grid container spacing={2}>
            {chunk.map((item, iconIndex) => (
              <Grid key={item.id} item xs={2}>
                <Image width={100} height={100} alt={`Icon ${iconIndex}`} className="w-full h-24 object-contain" src={item.image} />
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </Carousel>
  )
}

export default IconSlide
