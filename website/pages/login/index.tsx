/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { storage } from '@/lib/utils/storage';
import { isauthorize } from '@/store/action/authorizeAction';
import logo from '@/assets/logo.png'
import { EyeSlashFilledIcon } from '@/components/icons/eyeSlashFilledIcon';
import { EyeFilledIcon } from '@/components/icons/eyeFilledIcon';
import { siteConfig } from '@/config/site';
import { setSelf } from '@/store/action/selfAction';
import { setRole } from '@/store/action/setRole';

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = storage.get('token');
      const storedRole = storage.get('role')

      if (storedToken) {
        try {
          const response = await axios.get('/api/users/route', {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            }
          })


          if (response.status === 200) {
            dispatch(isauthorize());
            if (storedRole === "ADMIN") {
              router.push(siteConfig.portals.dashboard.href);
            } else[
              router.push('/users')
            ]
          } else {
            // Xử lý trường hợp token không hợp lệ (ví dụ: xóa token, hiển thị thông báo)
            storage.remove('token');
            toast.error('Token không hợp lệ');
          }
        } catch (error) {
          console.error('Error checking token:', error);
          storage.remove('token');
          toast.error('Lỗi khi kiểm tra token');
        }
      }
      else {
        console.log("Error")
      }
    };

    checkToken();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('All fields are necessary')

      return;
    }
    try {
      const res = await axios.post('/api/users/route', {
        email, password
      })

      if (res.status === 200) {
        const data = await res.data

        const { token, user, role } = data;

        if (user) {
          console.log(user)
          dispatch(setSelf(user));
          dispatch(setRole(role));
          storage.set('role', role);
          storage.set('user', user);
          storage.set('token', token);
          dispatch(isauthorize());
          if (role === "ADMIN") {
            router.push(siteConfig.portals.dashboard.href);
          } else {
            router.push('/users')
          }
        } else {
          // Handle case where user is undefined
          console.error('User object is undefined');
          toast.error('User login failed');
        }
      } else {
        toast.error('User login failed');
      }
    } catch (err) {
      console.log("Errors", err);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-r from-blueCs to-purpleCs'>
      <div className='relative w-[700] h-[500] flex flex-row items-center justify-center rounded bg-white shadow-sm'>
        <Link href="/">
          <Button className="absolute top-0 left-0 mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-400">
            Quay về trang chủ
          </Button>
        </Link>
        <div className='flex flex-col items-center justify-center text-center mr-10'>
          <Image alt='logo' className='mb-4' src={logo} width={200} />
          <p className='mb-4'>Đăng ký hội viên tại đây</p>
          <Link href="/register">
            <Button className='border-zinc-450 text-zinc-900 hover:border-zinc-900 hover:text-zinc-900 transition-colors border rounded-full px-8'>
              Trang Đăng Ký
            </Button>
          </Link>
        </div>
        <div className='flex flex-col items-center  '>
          <h1 className='m-3 font-bold text-2xl uppercase'>Đăng Nhập Hội viên</h1>
          <div className='w-full flex flex-col items-center justify-center'>
            <Input
              isRequired
              className='max-w-xs my-2'
              color='warning'
              label="Email"
              placeholder='exmp@gmail.com'
              type="email"
              value={email}
              variant='bordered'
              onChange={(e) => setEmail(e.target.value)}
            // endContent={
            //   <div className="pointer-events-none flex items-center">
            //     <span className="text-default-400 text-small">@gmail.com</span>
            //   </div>
            // }
            />
            <Input
              isRequired
              className="max-w-xs my-2"
              color='warning'
              endContent={
                <button aria-label="toggle password visibility" className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              type={isVisible ? "text" : "password"}
              value={password}
              variant='bordered'
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className='flex justify-end w-full'>
              <Link href={siteConfig.register.href}>
                <span className='text-green-500 flex justify-end'>
                  Quên mật khẩu
                </span>
              </Link>
            </div>

            <Button className='my-4 w-full max-w-xs uppercase text-white font-medium' color='success' radius='sm' onClick={handleSubmit}>
              Đăng nhập
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>

  )
}

export default Login
