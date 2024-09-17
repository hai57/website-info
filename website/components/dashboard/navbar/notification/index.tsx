/* eslint-disable prettier/prettier */
import React from 'react'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { Notifications } from '@mui/icons-material'

import NotificationWrapper from './notificationWrapper';


const NotificationsDropDown = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <div>
          <NotificationWrapper>
            <Notifications className='text-[#A1A1AA]' />
          </NotificationWrapper>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Avatar Actions" className="w-80">
        <DropdownSection title="NotificationWrapper">
          <DropdownItem
            key="1"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
          >
            📣 Edit your information
          </DropdownItem>
          <DropdownItem
            key="2"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
          >
            🚀 Say goodbye to paper receipts!
          </DropdownItem>
          <DropdownItem
            key="3"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
          >
            📣 Edit your information
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

export default NotificationsDropDown
