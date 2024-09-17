/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Url } from 'next/dist/shared/lib/router/router';

import TooltipGroup from './tooltip'

import { useSidebar } from '@/context/sidebarContext';
import { siteConfig } from '@/config/site';
import logo from '@/assets/logo.png';
import { HomeIcon } from '@/components/icons/sidebar/home-icon';
import { AccountsIcon } from '@/components/icons/sidebar/accounts-icon';
import { NewIcon } from '@/components/icons/sidebar/news-icon';
import { ReportsIcon } from '@/components/icons/sidebar/report-icon';
import { SettingsIcon } from '@/components/icons/sidebar/setting-icon';


const Sidebar = () => {
  const router = useRouter()
  // State to manage the open/close state of the sidebar
  const { isOpen, setIsOpen } = useSidebar();

  const [isActive] = useState(false)

  const handleLinkClick = (href: Url) => {
    router.push(href)
  };
  const handleToggleClick = () => {
    setIsOpen(!isOpen)
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`border-r-2 border-t border-borderNextUI
                    fixed h-screen transition-all
                    duration-300 z-10 flex flex-col
                    ${isOpen ? 'w-40' : 'w-12 overflow-hidden'}`}
      >
        <div className={`flex-initial px-1  ${isOpen ? 'pt-4 ' : 'pt-4'}`}>
          {/* Button to toggle sidebar */}
          <div>
            <button
              className="bg-sky-800 hover:bg-blue-700
                       text-white font-bold px-2 py-1 rounded"
              onClick={() => handleToggleClick()}>
              {/* Toggle icon based on isOpen state */}
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2} />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M4 6h16M4 12h16m-7 6h7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2} />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className={`w-full h-auto flex justify-center mt-3 `}>
          <Image alt='logo' className={`${isOpen ? 'w-32' : 'w-10'}`} src={logo} />
        </div>
        {/* Sidebar content */}
        <div className="mt-6 flex-1 flex flex-col mx-2">
          {/* <div className="mt-6">
            <NextLink className="flex text-white hover:text-gray-300"
              href={siteConfig.home.href}>
              <HomeIcon />
              <span className='ml-4' >HOME</span>
            </NextLink>
          </div> */}
          <div className="mt-6">
            <button
              className={`flex hover:text-gray-300 ${isActive ? 'text-red-500' : ''}`}
              onClick={() => handleLinkClick(siteConfig.portals.dashboard.href)}
            >
              <HomeIcon />
              <span className='ml-4' >HOME</span>
            </button>
          </div>
          <div className="mt-6">
            <button
              className={`flex hover:text-gray-300 ${isActive ? 'text-red-500' : ''}`}
              onClick={() => handleLinkClick(siteConfig.portals.dashboard.accounts.href)}
            >
              <AccountsIcon />
              <span className='ml-4'>ACCOUNTS</span>
            </button>
          </div>
          <div className="mt-6">
            <button
              className={`flex hover:text-gray-300 ${isActive ? 'text-red-500' : ''}`}
              onClick={() => handleLinkClick(siteConfig.portals.dashboard.news.href)}
            >
              <NewIcon />
              <span className='ml-4'>NEWS</span>
            </button>
          </div>
          <div className="mt-6">
            <button
              className={`flex hover:text-gray-300 ${isActive ? 'text-red-500' : ''}`}
              onClick={() => handleLinkClick(siteConfig.portals.dashboard.images.href)}
            >
              <ReportsIcon />
              <span className='ml-4'>IMAGES</span>
            </button>
          </div>
          <div className="mt-6">
            <button
              className={`flex hover:text-gray-300 ${isActive ? 'text-red-500' : ''}`}
              onClick={() => handleLinkClick(siteConfig.portals.dashboard.settings.href)}
            >
              <SettingsIcon />
              <span className='ml-4'>SETTINGS</span>
            </button>
          </div>
          {/* Add more sidebar items here */}
        </div>
        <div>
          <TooltipGroup />
        </div>
      </div>
    </div >
  );
};

export default Sidebar;
