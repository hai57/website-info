/* eslint-disable prettier/prettier */
import React from 'react'

const NotificationWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative cursor-pointer'>
      <div className='absolute -right-0.5 flex justify-center w-4 rounded-full bg-red-500'>
        <span className='text-white text-xs'>2</span>
      </div>
      {children}
    </div>
  )
}

export default NotificationWrapper
