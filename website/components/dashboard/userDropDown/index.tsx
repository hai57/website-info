/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React from "react";
import {
  Avatar,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { DarkModeSwitch } from "./darkModeSwitch";

import { storage } from "@/lib/utils/storage";
import Avatarr from '@/assets/avatars/avatar.png'


interface Props {
  title: String
}

export const UserDropdown = ({ title }: Props) => {
  const router = useRouter();
  // const user = useSelector((state) => state.selfAction.user);
  const self = storage.get('user')
  const handleLogout = () => {
    storage.remove('user');
    storage.remove('token');
    storage.remove('role');
    router.replace("/login");
  }

  return (
    <Dropdown >

      <DropdownTrigger>
        <Avatar
          isBordered
          as='button'
          color='primary'
          size='sm'
          src={Avatarr.src}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label='User menu actions'
        className="p-0"
        onAction={(actionKey) => console.log({ actionKey })}>
        <DropdownItem
          key='profile'
          className='flex flex-col justify-start w-full items-start'>
          <p>Signed in as</p>
          <Chip
            color="success"
            size="sm"
            variant="flat"
          >
            {self?.email}
          </Chip>
        </DropdownItem>
        <DropdownItem key='settings'>My Settings</DropdownItem>
        <DropdownItem key='team_settings'>Team Settings</DropdownItem>
        <DropdownItem key='analytics'>Analytics</DropdownItem>
        <DropdownItem key='system'>System</DropdownItem>
        <DropdownItem key='configurations'>Configurations</DropdownItem>
        <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
        <DropdownItem
          key='logout'
          className='text-danger'
          color='danger'
          onPress={handleLogout}>
          Log Out
        </DropdownItem>

        {title === "dashboard" ? (
          <DropdownItem key='switch'>
            <DarkModeSwitch />
          </DropdownItem>)
          : (
            <DropdownItem key='none'>
              <></>
            </DropdownItem>)}
      </DropdownMenu>
    </Dropdown>
  );
};
