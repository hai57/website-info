/* eslint-disable prettier/prettier */
import React from 'react'
import Image from 'next/image'
import { Link } from '@nextui-org/react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'


const Topics = ({ topics }: any) => {

  return (
    <div className='mx-auto mt-4 w-[483] sm:w-[1000]'>

      <Link className="border-b-2 border-sky-700 cursor-pointer w-fit sm:w-full">
        <p className='bg-sky-700 text-white w-fit p-2 font-medium'>{topics.title}</p>
      </Link>

      <div className="grid  grid-flow-row gap-2 my-2 grid-cols-2 sm:grid-cols-5">
        {topics.newsContainer.map((item: { newsId: React.Key | null | undefined; image: string | StaticImport; label: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }) => (
          <Link key={item.newsId} className='px-1 bg-zinc-200 flex flex-col' href='#'>
            <Image
              alt={`topic-Image-${item.newsId}`}
              className='w-52 h-36'
              height={100}
              src={item.image}
              width={100}
            />
            <p className='text-sm'>{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Topics
