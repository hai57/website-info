/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import NextLink from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'

import { TableWrapper } from './table/table'

import { useSidebar } from '@/context/sidebarContext'
import { siteConfig } from '@/config/site'
import { storage } from '@/lib/utils/storage'

interface UserType {
  id: string
  username: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string
}
interface NewsType {
  id: string;
  label: string;
  image: string;
  url: string;
}

const HomeDashboard = () => {

  const { isOpen } = useSidebar()
  const [users, setUsers] = useState<UserType[]>([])
  const [news, setNews] = useState<NewsType[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const storedToken = storage.get('token')
  const columnsUser = [
    { name: 'USERNAME', uid: 'username' },
    { name: 'EMAIL', uid: 'email' },
    { name: 'PHONE', uid: 'phone' },
    { name: 'ACTIONS', uid: 'actions' },
  ];
  const columnsNews = [
    {
      name: 'URL',
      uid: 'url'
    },
    {
      name: 'LABEL',
      uid: 'label'
    },
    {
      name: 'ACTIONS',
      uid: 'actions'
    },
  ]

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const res = await axios.get('/api/users/route')
        const data = res.data

        setUsers(data.users)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    }
    const fetchDataNews = async () => {
      try {
        const res = await axios.get('/api/news/route')
        const data = res.data

        setNews(data.news)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    }

    fetchDataUser(),
      fetchDataNews()
  }, [])
  //news
  const handleEditNews = async (newsItem: NewsType) => {
    try {
      const res = await axios.put(`/api/news/route`, {
        id: newsItem.id,
        label: newsItem.label,
        image: newsItem.image,
      });

      if (res.status === 200) {
        const updateNews = res.data.new;
        const newsIndex = news.findIndex((u: any) => u.id === updateNews.id);

        if (newsIndex !== -1) {
          // Update the user at the found index
          news[newsIndex] = updateNews;

          // Update the state with the modified users array (assuming users is a state variable)
          setNews([...news]);

          toast.success("User updated success");
        } else {
          console.warn(
            "User with ID",
            updateNews.id,
            "not found in local state.",
          ); // Handle potential inconsistencies
        }
      } else {
        toast.error("User updated fail");
      }
    } catch (err) {
      toast.error("Server Error");
      console.log("Errors", err);
    }
  };

  const handleDeleteNews = async (newsId: string) => {
    try {
      const res = await axios.delete("/api/news/route", {
        data: {
          newsId: newsId,
        },
      });

      if (res.status === 204) {
        const updatedNews = news.filter((item: any) => item.id !== newsId);

        setNews(updatedNews);
        toast.success("News delete success");
      } else {
        toast.error("News delete fail");
      }
    } catch (err) {
      toast.error("Server Error");
      console.log("Errors", err);
    }
  };

  //user
  const handleEditUser = async (user: any) => {
    try {

      const res = await axios.put(`/api/users/admin`, user,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (res.status === 200) {
        const updateUser = res.data.user
        const userIndex = users.findIndex((u: any) => u.id === updateUser.id);

        if (userIndex !== -1) {
          // Update the user at the found index
          users[userIndex] = updateUser;

          // Update the state with the modified users array (assuming users is a state variable)
          setUsers([...users]);


          toast.success('User updated success')
        } else {
          console.warn("User with ID", updateUser.id, "not found in local state."); // Handle potential inconsistencies
        }
      } else {
        toast.error('User updated fail');
      }
    } catch (err) {
      toast.error('Server Error');
      console.log("Errors", err);
    }
  }
  const handleDeleteUser = async (userID: string) => {
    try {
      setIsLoading(true)
      const res = await axios.delete("/api/users/route", {
        data: {
          userID: userID
        }
      }
      );

      if (res.status === 204) {
        const userIndex = users.findIndex((item: any) => item.id === userID);

        if (userIndex !== -1) {
          const updatedUsers = [...users.slice(0, userIndex), ...users.slice(userIndex + 1)];

          setUsers(updatedUsers);
          setIsLoading(false)
          toast.success('User delete success')
        }
        else {
          console.error('User not found:', userID);
        }
      } else {
        toast.error('User delete fail');
      }
    } catch (err) {
      toast.error('Server Error');
      console.log("Errors", err);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className={`px-12 py-6  h-full transition-all duration-300 z-10 shadow-innerset  ${isOpen ? 'ml-[160]' : 'ml-[48]'}`}>
          <div className='flex items-center mt-4'>
            {<siteConfig.portals.dashboard.icon className='text-[#A1A1AA] mr-2' />}
            <span>{siteConfig.portals.dashboard.label}</span>
          </div>
          {/* First Content */}

          {/* <div className='my-3'>
        <h1 className='my-3 uppercase'>{siteConfig.portals.dashboard.title.first}</h1>
      </div> */}

          {/* Second Content */}
          <div className='mb-3'>
            <div className='flex justify-between'>
              <h1 className='my-3 font-bold text-xl'>{siteConfig.portals.dashboard.title.first}</h1>
              <NextLink className='my-3 font-normal text-lg text-blue-600' href={siteConfig.portals.dashboard.news.href}>View All</NextLink>
            </div>
            <TableWrapper
              columns={columnsNews}
              handleDelete={handleDeleteNews}
              handleEdit={handleEditNews}
              items={news}
              title='news'
            />
          </div>
          <div className='mb-3'>
            <div className='flex justify-between'>
              <h1 className='my-3 font-bold text-xl'>{siteConfig.portals.dashboard.title.second}</h1>
              <NextLink className='my-3 font-normal text-lg text-blue-600' href={siteConfig.portals.dashboard.accounts.href}>View All</NextLink>
            </div>
            <TableWrapper
              columns={columnsUser}
              handleDelete={handleDeleteUser}
              handleEdit={handleEditUser}
              items={users}
              title='users'
            />
          </div>

        </div>
      )}
    </>
  )
}

export default HomeDashboard
