/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React, { SetStateAction, useEffect, useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import {
  // DeleteOutlineOutlined,
  // Info,
  // MoreVert,
  // Settings,
  ExitToApp
} from "@mui/icons-material";
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

import { AddUser } from './addUser'

import { siteConfig } from '@/config/site'
import { TableWrapper } from '@/components/dashboard/table/table'
import { useSidebar } from '@/context/sidebarContext'
import { storage } from '@/lib/utils/storage'


interface UserType {
  id: string
  username: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string
}

const AccountsDashboard = () => {
  const { isOpen } = useSidebar()
  const storedToken = storage.get('token')
  const [users, setUsers] = useState<UserType[]>([])
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const columns = [
    { name: 'USERNAME', uid: 'username' },
    { name: 'EMAIL', uid: 'email' },
    { name: 'PHONE', uid: 'phone' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/users/route', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          }
        })
        const data = await res.data

        setUsers(data.users)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (userID: string) => {
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!newUser.username || !newUser.email || !newUser.phone || !newUser.password) {
      toast.error('All fields are necessary')

      return;
    } else if (newUser.password !== newUser.confirmPassword) {
      toast.error('Password is not the same')

      return;
    }
    try {

      const res = await axios.post(`/api/users/admin`, newUser,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (res.status === 201) {
        const newUser = res.data.user
        const updatedUsers: UserType[] = [...users, newUser];

        setUsers(updatedUsers as SetStateAction<UserType[]>);
        setNewUser({
          username: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        })
        toast.success('News create success')
      } else {
        toast.error('News create fail');
      }
    } catch (err) {
      toast.error('Server Error');
      console.log("Errors", err);
    }
  };
  const handleEdit = async (user: any) => {
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

  const handleFieldChange = (fieldName: string, value: string) => {
    setNewUser({
      ...newUser,
      [fieldName]: value,
    });
  }

  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className={`px-12 py-6  h-full transition-all duration-300 z-10 shadow-innerset  ${isOpen ? 'ml-[160]' : 'ml-[48]'}`}>
          <div className='flex items-center mt-4'>
            {<siteConfig.portals.dashboard.accounts.icon className='text-[#A1A1AA] mr-2' />}
            <span>{siteConfig.portals.dashboard.accounts.label}</span>
          </div>
          <div className='mb-3'>
            <h1 className='my-3 font-bold text-xl'>{siteConfig.portals.dashboard.accounts.title}</h1>
            <div className='mb-3 flex justify-between'>
              <div className='flex flex-row gap-3.5 w-[400]'>
                <Input
                  classNames={{
                    input: "w-full",
                    mainWrapper: "w-full",
                  }}
                  placeholder="Search users"
                />
                <div className='flex flex-row items-center gap-2'>
                  {/* <Settings className='text-[#A1A1AA]' />
                  <DeleteOutlineOutlined className='text-[#A1A1AA]' />
                  <Info className='text-[#A1A1AA]' />
                  <MoreVert className='text-[#A1A1AA]' /> */}
                </div>
              </div>
              <div className="flex flex-row gap-3.5 flex-wrap">
                <AddUser
                  handleFieldChange={handleFieldChange}
                  handleSubmit={handleSubmit}
                  newUser={newUser}
                  setNewUser={setNewUser}
                />
                <Button color="primary" startContent={<ExitToApp />}>
                  Export to CSV
                </Button>
              </div>
            </div>
            <TableWrapper
              columns={columns}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              items={users}
              title='users'
            />
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  )
}

export default AccountsDashboard
