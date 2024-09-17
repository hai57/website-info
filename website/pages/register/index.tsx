/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
'use client';
import React, { useEffect, useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import axios from 'axios';

import logo from '@/assets/logo.png'
import { EyeSlashFilledIcon } from '@/components/icons/eyeSlashFilledIcon';
import { EyeFilledIcon } from '@/components/icons/eyeFilledIcon';
import { siteConfig } from '@/config/site';
import { storage } from '@/lib/utils/storage';
import { isauthorize } from '@/store/action/authorizeAction';
import { setSelf } from '@/store/action/selfAction';
import { setRole } from '@/store/action/setRole';

const Register = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
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
          const response = await axios.get('/api/tokens/route', {
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
    if (!username || !email || !password) {
      toast.error('All fields are necessary')

      return;
    }
    try {
      const res = await axios.post("/api/register/route", {
        email: email,
        password: password,
        username: username,
        phone: phone
      });

      if (res.status === 201) {
        const data = await res.data

        const { token, user, role } = data;

        localStorage.setItem('isAuthenticated', JSON.stringify(true));
        dispatch(setSelf(user));
        dispatch(setRole(role));
        storage.set('role', role);
        storage.set('user', user);
        storage.set('token', token);
        dispatch(isauthorize());
        setEmail('')
        router.push(siteConfig.portals.dashboard.href)
      } else {
        toast.error('User register failed')
      }
    } catch (err) {
      console.log("Error", err);
    }
  };


  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-r from-blueCs to-purpleCs'>
      <div className='relative w-[700] h-[500]  flex flex-row items-center justify-center rounded bg-white shadow-sm'>
        <Link href="/">
          <Button className="absolute top-0 left-0 mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-400">
            Quay về trang chủ
          </Button>
        </Link>
        <div className='flex flex-col items-center justify-center text-center mr-10'>
          <Image alt='logo' className='mb-4' src={logo} width={200} />
          <p className='mb-4'>Đã có tài khoản? Đăng nhập tại đây!</p>
          <Link href="/login">
            <Button className='border-zinc-450 text-zinc-900 hover:border-zinc-900 hover:text-zinc-900 transition-colors border rounded-full px-8'>
              Trang Đăng Nhập
            </Button>
          </Link>
        </div>
        <div className='flex flex-col items-center  '>
          <h1 className='m-3 font-bold text-2xl uppercase'>Đăng Ký Hội Viên</h1>
          <div className='w-full flex flex-col items-center justify-center'>
            <Input
              isRequired
              className='max-w-xs my-2'
              color='warning'
              label="Họ và Tên"
              placeholder='Nguyễn Văn A'
              value={username}
              variant='bordered'
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              isRequired
              className='max-w-xs my-2'
              color='warning'
              label="Hãy nhập Email"
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
              className='max-w-xs my-2'
              color='warning'
              label="Số điện thoại"
              placeholder='090xxxxxxxx'
              value={phone}
              variant='bordered'
              onChange={(e) => setPhone(e.target.value)}
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
              label="Mật Khẩu"
              placeholder="Hãy tạo một mật khẩu cho tài khoản của bạn"
              type={isVisible ? "text" : "password"}
              value={password}
              variant='bordered'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className='my-4 w-full max-w-xs uppercase text-white font-medium' color='success' radius='sm' onClick={handleSubmit}>
              Đăng Ký
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>


  )
}

export default Register
