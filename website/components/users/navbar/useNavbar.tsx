/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from "react";
import { Navbar, NavbarContent, NavbarItem, Button, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import NextLink from "next/link";

import styles from '@/styles/App.module.css'
import { siteConfig } from "@/config/site";
import { UserDropdown } from "@/components/dashboard/userDropDown";

// Define types for dropdown items
interface DropdownItemType {
  label: string,
  href?: string
  children?: DropdownItemType[];
}
interface RecursiveDropdownProps {
  items: DropdownItemType[];
  onMouseLeave: () => void;
}

const RecursiveDropdown: React.FC<RecursiveDropdownProps> = ({ items, onMouseLeave }) => {
  return (
    <DropdownMenu className="p-0 bg-slate-50 rounded-none z-50" onMouseLeave={onMouseLeave}>
      {items.map((item, index) => (
        <DropdownItem key={`${item.href}-${index}`} className="p-0 rounded bg-slate-50">
          {item.children ? (
            <Dropdown>
              <DropdownTrigger>
                <Button className="text-left bg-slate-50 text-black w-full rounded" color="primary" variant="light">
                  {item.label}
                </Button>
              </DropdownTrigger>
              <div className="dropdown-menu-left">
                <RecursiveDropdown items={item.children} onMouseLeave={onMouseLeave} />
              </div>
            </Dropdown>
          ) : (
            <NextLink passHref href={item.href ? item.href : '/user'}>
              <Button className="text-left bg-slate-50 text-black w-full rounded" color="primary" variant="light">
                {item.label}
              </Button>
            </NextLink>
          )}
        </DropdownItem>
      ))}
    </DropdownMenu>
  );
};

export default function UseNavbar() {

  const data: DropdownItemType[] = [
    { label: "Trung tâm Báo chí TP Hồ Chí Minh", href: "TTBCTPHCM" }
  ];

  const dropdownData: Record<string, DropdownItemType[]> = {
    "Giới thiệu": [
      {
        label: "Công Đoàn Việt Nam",
        children: [
          { label: "Điều Lệ Công Đoàn Việt Nam", href: "#" },
          { label: "Hướng Dẫn Thực Hiện Điều Lệ", href: "#" }
        ]
      },
      {
        label: "Công Đoàn Thành phố Hồ Chí Minh",
        children: [
          { label: "Văn Kiện Đại Hội", href: "#" },
          { label: "Ban Chấp Hành Các Thời Kỳ", href: "#" },
          { label: "Cơ Cấu Tổ Chức", href: "#" },
        ]
      },

    ],
    "Điều hành": [
      { label: "Văn phòng điện tử", },
      { label: "Hệ thống văn bản" },
      {
        label: "Lịch công tác tuần",
        children: [
          { label: "Đăng Ký Lịch" },
        ]
      },
      { label: "Báo cáo" },
    ],
    "Hội viên": [
      { label: "Đăng nhập", href: siteConfig.login.href },
      { label: "Đăng ký", href: siteConfig.register.href },
    ]
  };

  // Function to extract all children from dropdownData
  const extractChildren = (data: Record<string, DropdownItemType[]>): DropdownItemType[] => {
    let childrenArray: DropdownItemType[] = [];

    Object.values(data).forEach((items) => {
      items.forEach((item) => {
        if (item.children) {
          childrenArray = [...childrenArray, ...item.children];
          // Recursively add nested children if they exist
          childrenArray = [...childrenArray, ...extractChildren({ [item.label]: item.children })];
        }
      });
    });

    return childrenArray;
  };


  // Extracted children
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const navbarRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState<boolean>(false);

  useEffect(() => {
    const navbar = navbarRef.current;
    const handleScroll = () => {
      if (navbar) {
        const navbarTop = navbar.offsetTop;
        const scrollTop = window.pageYOffset;
        const threshold = 20; // Adjust threshold as needed

        setIsFixed(scrollTop >= navbarTop + threshold);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar ref={navbarRef} className={`bg-blue-700 h-10 w-full ${!isFixed ? '' : 'fixed'}`} position="sticky">
        <NavbarContent className="transition-all duration-300 gap-1 flex sm:gap-3" justify="center">
          {siteConfig.navUser.map((item, index) => (
            <NavbarItem
              key={index}
              className={`relative transition-colors duration-300 ${dropdownData[item.label] ? 'group cursor-pointer' : ''}`}
              onMouseEnter={() => dropdownData[item.label] && setShowDropdown(item.label)}
              onMouseLeave={() => dropdownData[item.label] && setShowDropdown(null)}
            >
              {dropdownData[item.label] ? (
                <>
                  <span className={`${item.label === "Hội viên" ? `${styles.textChanging} text-[10px] sm:text-lg text-white font-bold uppercase` : "text-[10px] sm:text-lg text-white font-bold uppercase group-hover:bg-blue-800 px-1 py-1 rounded transition-colors"}`}>
                    {item.label}
                  </span>
                  {showDropdown === item.label && (
                    <Dropdown isOpen={showDropdown === item.label} placement="bottom-end">
                      <RecursiveDropdown items={dropdownData[item.label]} onMouseLeave={() => setShowDropdown(null)} />
                      <></>
                    </Dropdown>
                  )}
                </>
              ) : (
                <NextLink className="text-[10px] sm:text-lg text-white font-bold uppercase hover:bg-blue-800 px-2 py-1 rounded transition-colors" href={item.href}>
                  {item.label}
                </NextLink>
              )}
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent >
          <NavbarItem>
            <Autocomplete aria-label='autocomplete' className="w-full flex items-center hidden sm:block" defaultItems={data} placeholder="Tìm kiếm ..." size="sm">
              {data.map((index) => (
                <AutocompleteItem key={index.label}>
                  {index.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <UserDropdown title='user' />
          </NavbarItem>
        </NavbarContent>
        {/* <NavbarContent className={`absolute transition-all duration-300 z-10 right-0 top-10 sm:-right-24 sm:top-20`}>
        </NavbarContent> */}
      </Navbar>
    </>
  );
}
