/* eslint-disable prettier/prettier */
import React from 'react'
import { Input } from '@nextui-org/input'
import { Box } from '@mui/system'
import { Campaign } from '@mui/icons-material'
import { ContactSupport } from '@mui/icons-material'
import { GitHub } from '@mui/icons-material'

import NotificationsDropDown from './notification'

import { SearchIcon } from '@/components/icons/searchIcon'
import { useSidebar } from '@/context/sidebarContext'
import { UserDropdown } from '@/components/dashboard/userDropDown'


const NavbarDashboard = () => {
  const { isOpen } = useSidebar()

  return (
    <div className={`transition-all duration-300 z-10`} >
      <div className={`border-b-2 border-borderNextUI p-5 py-2  text-base  transition-all duration-300 z-10 ${isOpen ? 'ml-[160]' : 'ml-[48]'}`}>
        <Box display="grid" gap={1} gridTemplateColumns="repeat(12, 1fr)">
          <Box gridColumn='span 10'>
            <Input
              classNames={{
                label: "text-black dark:text-dark",
                inputWrapper: [
                  "group-data-[focus=true]:bg-default",
                  "dark:group-data-[focus=true]:bg-default",
                  "group-data-[focus=true]:shadow-custom  ",
                  "group-data-[focus=true]:border-none",
                ],
              }}
              placeholder='Search...'
              size='sm'
              startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-dark text-slate-400 pointer-events-none flex-shrink-0" />
              } />
          </Box>
          <Box gridColumn='span 1'>
            <div className='px-2 flex items-center'>
              <Campaign className='mr-3  text-[#A1A1AA]' />
              <span className='text-xs sm:text-md'>FeedBack?</span>
            </div>
          </Box>
          <Box gridColumn='span 1'>
            <div className='flex gap-2 items-center'>
              <NotificationsDropDown />
              <ContactSupport className='text-[#A1A1AA]' />
              <GitHub className='text-[#A1A1AA]' />
              <UserDropdown title='dashboard' />
            </div>
          </Box>
        </Box>
      </div>
    </div>
  )
}

export default NavbarDashboard
