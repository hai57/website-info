/* eslint-disable prettier/prettier */
import React from 'react'
import { Tooltip } from '@nextui-org/tooltip'
import Image from 'next/image'

import { useSidebar } from '@/context/sidebarContext';
import { SettingsIcon } from '@/components/icons/sidebar/setting-icon';
import { FilterIcon } from '@/components/icons/sidebar/filter-icon';
import Avatar from '@/assets/avatars/avatar.png'

const TooltipGroup = () => {
  const { isOpen } = useSidebar()

  return (
    <div className={`flex-none transition-all duration-300 flex ${isOpen ? ' p-4 flex-row justify-evenly' : 'p-2 flex-col justify-evently'} `}>
      {
        isOpen ? (
          <>
            <Tooltip
              color='primary'
              content='Settings'
              placement='top'
              showArrow={true}>
              <button className='cursor-pointer' >
                <SettingsIcon />
              </button>
            </Tooltip>
            <Tooltip
              color='primary'
              content='Adjustments'
              placement='top'
              showArrow={true}>
              <button className='cursor-pointer'>
                <FilterIcon />
              </button>
            </Tooltip>
            <Tooltip
              color='primary'
              content='Profile'
              placement='top'
              showArrow={true}>
              <button >
                <Image alt='Settings' className='rounded-full cursor-pointer' src={Avatar} width={25} />
              </button>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip
              color='primary'
              content='Settings'
              placement='right'
              showArrow={true}>
              <button className='cursor-pointer' >
                <SettingsIcon />
              </button>
            </Tooltip>
            <Tooltip
              color='primary'
              content='Adjustments'
              placement='right'
              showArrow={true}>
              <button className='cursor-pointer'>
                <FilterIcon />
              </button>
            </Tooltip>
            <Tooltip
              color='primary'
              content='Profile'
              placement='right'
              showArrow={true}>
              <button >
                <Image alt='Settings' className='rounded-full cursor-pointer' src={Avatar} width={25} />
              </button>
            </Tooltip>
          </>
        )
      }

    </div>
  )
}

export default TooltipGroup
